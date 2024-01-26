import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Text,
} from 'react-native';
import {
  getTeleplayClassify,
  getMovieClassify,
  getTeleplayList,
  getMovieList,
} from '@/api/index';
import TouchableItem from '@/pages/components/TouchableItem';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 0,
      limit: 20,
      offset: 0,
      type: 'tv',
      query: {},

    };
    this.tvPicPrefix = global.base.public_tv_img;
    this.moviePicPrefix = global.base.public_movie_img;
    this.numColumns = Math.floor((global.windowWidth - 100) / 140);
  }
  async componentDidMount() {
    let state = this.state;
    let {type, classify} = this.props.route.params;
    if(classify !='none'){
      state.query = {name: "classify", value: classify}
    }
    let ret = {code: 400};
    if (type == 'tv') {
      ret = await getTeleplayList({
        limit: state.limit,
        offset: 0,
        query: state.query 
      });
    }
    if (type == 'movie') {
      ret = await getMovieList({
        limit: state.limit,
        offset: 0,
        query: state.query
      });
    }
    if (ret.code != 200) {
      this.hint.show('获取数据失败，请检查服务器设置或稍后重试');
      return;
    }
    // console.log(ret);

    state.type = type;
    state.classify = classify;
    state.list = ret.data.rows;
    state.count = ret.data.count;
    this.setState(state);
  }
  async endReached() {
    let state = this.state;
    if (state.offset * state.limit > state.count) {
      return;
    }
    try {
      ++state.offset;
      if (state.type == 'tv') {
        let ret = await getTeleplayList({
          limit: state.limit,
          offset: state.offset * state.limit,
          query: state.query,
        });
        state.list = state.list.concat(ret.data.rows);
      } else {
        let ret = await getMovieList({
          limit: state.limit,
          offset: state.offset * state.limit,
          query: state.query,
        });
        state.list = state.list.concat(ret.data.rows);
      }
      this.setState(state);
    } catch (e) {
      let msg = `获取影视列表失败`;
      this.hint.show(msg, 'red');
      console.log(e, msg);
    }
  }
  renderItem(itm, idx) {
    let {type} = this.state;
    return (
      <TouchableItem
        title={itm.name}
        key={idx}
        score={itm.score}
        uri={(type == 'tv' ? this.tvPicPrefix : this.moviePicPrefix) + itm.pic}
        onPress={() => {
          this.props.navigation.navigate('Detail', {
            type,
            id: itm.id,
          });
        }}
      />
    );
  }
  render() {
    let state = this.state;
    function renderHeader() {
      return (
        <View style={{paddingTop: 30, paddingLeft: 10}}>
          <Text style={{color: '#fff', fontSize: 30}}>电影</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 30,
            position: 'relative',
            zIndex: 10,
          }}>
          <FlatList
            contentContainerStyle={{justifyContent: 'space-between'}}
            ListHeaderComponent={renderHeader}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
            numColumns={this.numColumns}
            data={state.list}
            onEndReached={this.endReached.bind(this)}
            renderItem={({item, idx}) => this.renderItem(item, idx)}
          />
        </View>
        <View style={[{zIndex: 1}, styles.absolute]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.6}}
            source={require('@/assets/detail.jpg')}
            blurRadius={4}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default List;
