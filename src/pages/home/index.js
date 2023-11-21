import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Text,
} from 'react-native';
import Btn from '../components/btn';
import HeadBtn from './components/headBtn';
import Item from './components/item';
import Hint from '../components/hint.js';
import {
  getTeleplayClassify,
  getMovieClassify,
  getTeleplayList,
  getMovieList,
} from '../../api/index';
import {getItem} from '../../utils/storage';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classify_list: [],
      tv_class: [],
      movie_class: [],
      source_type: 'teleplay',
      list: [],
      data_total: 0,
      offset: 1,
      lastView: false,
      showLastView: false,
    };
    this.numColumns = Math.floor((global.windowWidth - 100) / 140);
    this.limit = 20;
    this.baseurl = global.baseurl;
  }

  async toggleMovie() {
    let state = this;
    if (state.source_type == 'movie') {
      return;
    }
    try {
      let ret = await getMovieList({limit: this.limit, offset: 1});
      state.list = ret.data.rows;
      state.data_total = ret.data.total;
      state.source_type = 'movie';
      state.classify_list = state.movie_class;
      this.setState(state);
    } catch (e) {
      let msg = `获取电影列表失败`;
      this.hint.show(msg, 'red');
      console.log(e, msg);
    }
  }
  async toggleTv() {
    let state = this;
    if (state.source_type == 'teleplay') {
      return;
    }
    try {
      let ret = await getTeleplayList({limit: this.limit, offset: 1});
      state.list = ret.data.rows;
      state.data_total = ret.data.total;
      state.classify_list = state.tv_class;
      state.source_type = 'teleplay';
      this.setState(state);
    } catch (e) {
      let msg = `获取电视剧列表失败`;
      this.hint.show(msg, 'red');
      console.log(e, msg);
    }
  }
  async endReached() {
    let state = this.state;
    try {
      ++state.offset;
      if (state.source_type == 'teleplay') {
        let ret = await getTeleplayList({
          limit: this.limit,
          offset: state.offset,
        });
        state.list = state.list.concat(ret.data.rows);
      } else {
        let ret = await getMovieList({limit: this.limit, offset: state.offset});
        state.list = state.list.concat(ret.data.rows);
      }
      this.setState(state);
    } catch (e) {
      let msg = `获取影视列表失败`;
      this.hint.show(msg, 'red');
      console.log(e, msg);
    }
  }
  async componentDidMount() {
    let state = this;

    try {
      let ret1 = await getTeleplayClassify();
      let ret2 = await getMovieClassify();
      let ret3 = await getTeleplayList({limit: this.limit, offset: 1});
      let lastViewRet = await getItem('lastView');
      state.showLastView = global.showLastView;
      state.lastView = lastViewRet.value;
      if (lastViewRet.value.id == null) {
        state.showLastView = false;
      }
      state.list = ret3.data.rows;
      state.data_total = ret3.data.total;
      state.tv_class = ret1.data;
      state.movie_class = ret2.data;
      state.classify_list = ret2.data;
      this.hint.show('获取数据成功');
      this.setState(state);
    } catch (e) {
      let msg = `获取数据失败`;
      // this.hint.show(msg, "red");
      console.log(msg, e);
    }
  }
  componentWillUnmount() {
    
  }
  renderHeader() {
    let {classify_list} = this.state;
    return <View></View>;
    if (this.state.source_type == 'teleplay') {
      return <View></View>;
    }
    return (
      <View style={{paddingVertical: 8}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {classify_list.map((item, index) => {
            return (
              <View key={index}>
                <Btn title={item.name} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  renderLastView() {
    let that = this;
    let {showLastView, lastView} = that.state;
    function gotoPlayer() {
      that.props.navigation.navigate('Player', {
        tv_id: lastView.id,
        idx: lastView.idx,
        source_type: lastView.type,
      });
      that.setState({showLastView: false});
    }
    if (showLastView) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Btn title="继续观看" onPress={gotoPlayer}></Btn>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>未看完的</Text>
            <Text style={{marginLeft: 5, color: 'red'}}>{lastView.name}</Text>
          </View>
        </View>
      );
    }
  }
  renderItem(item) {
    return (
      <View style={{marginBottom: 10}}>
        <Item
          source={{uri: `${this.baseurl}/public/tv_img/` + item.pic}}
          onPress={() =>
            this.props.navigation.navigate('Detail', {
              id: item.id,
              source_type: this.state.source_type,
            })
          }
          title={item.name}
        />
      </View>
    );
  }
  renderNoData() {
    if (this.state.data_total < 1) {
      return (
        <View style={{alignItems: 'center', width: '100%', paddingTop: 20}}>
          <Text style={{color: 'grey', fontSize: 16}}>
            暂时该分类还没有影视资源哟！
          </Text>
        </View>
      );
    }
  }
  render() {
    let {list} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <Hint ref={e => (this.hint = e)} />
        <View style={[styles.container]}>
          <View style={[styles.head]}>
            <View>
              <HeadBtn
                title="电视剧"
                onPress={this.toggleTv.bind(this)}></HeadBtn>
            </View>
            <View>
              <HeadBtn
                title="电影"
                onPress={this.toggleMovie.bind(this)}></HeadBtn>
            </View>
            <View>
              <HeadBtn
                title="设置"
                onPress={() =>
                  this.props.navigation.navigate('Setting')
                }></HeadBtn>
            </View>
            <View>
              <HeadBtn
                title="历史观看"
                onPress={() =>
                  this.props.navigation.navigate('History')
                }></HeadBtn>
            </View>
          </View>
          {this.renderHeader()}
          {this.renderLastView()}
          <View></View>
          <View style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            {this.renderNoData()}
            <FlatList
              onEndReachedThreshold={1}
              showsVerticalScrollIndicator={false}
              numColumns={this.numColumns}
              data={list}
              onEndReached={this.endReached.bind(this)}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
        </View>
        <View style={[styles.fullScreen, {zIndex: 1}]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.4}}
            source={require('../../assets/home.jpg')}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  head: {
    width: '100%',
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
  },
});
export default Home;
