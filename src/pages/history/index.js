import React from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getItem} from '../../utils/storage';
import Hint from '@/pages/components/hint.js';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      focus_idx: false,
    };
    this.tvPicPrefix = global.tvPicPrefix;
    this.moviePicPrefix = global.moviePicPrefix;
  }
  async componentDidMount() {
    let state = this.state;
    let historyRet = await getItem('history');
    state.history = historyRet.value == null ? [] : historyRet.value;
    this.setState(state);
  }
  renderNone() {
    if (this.state.history.length < 1) {
      return (
        <View style={{alignItems: 'center', paddingTop: 50}}>
          <Text>暂时没有观看记录哟~</Text>
        </View>
      );
    }
  }
  renderItemFn({item, index}) {
    let {focus_idx} = this.state;
    console.log(item);
    return (
      <View style={{width: '30%', marginBottom: 30, marginRight: 30}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate('Player', {
              id: item.id,
              idx: item.idx,
              source_type: item.source_type,
              play_time: item.play_time,
            });
          }}
          onFocus={() => {
            this.setState({focus_idx: index});
          }}>
          <View
            style={{
              width: '100%',
              height: 170,
              position: 'relative',
              marginBottom: 10,
              padding: 6,
              borderWidth: 2,
              borderColor: focus_idx == index ? '#fff' : 'transparent',
              borderRadius: 5,
              position: 'relative',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#0094ff',
                zIndex: 10,
                borderRadius: 5,
                paddingHorizontal: 4,
                paddingVertical: 2,
              }}>
              <Text style={{fontSize: 14, color: 'white'}}>
                {item.source_type == 'teleplay' ? '电视剧' : '电影'}
              </Text>
            </View>
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 5,
                width: '100%',
                height: '100%',
                position: 'relative',
              }}>
              <Image
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                }}
                source={{
                  uri:
                    (item.source_type == 'teleplay'
                      ? this.tvPicPrefix
                      : this.moviePicPrefix) + item.pic,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: 4,
                  backgroundColor: 'red',
                  width: Math.floor(item.play_time / item.total_time) + '%',
                }}></View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: focus_idx == index ? '#fff' : '#999',
              }}>
              {item.name}
            </Text>
            <Text style={{color: '#999'}}>
              上次观看到
              {item.source_type == 'teleplay'
                ? `第${item.idx}集--第${Math.floor(item.play_time / 60)}分钟`
                : `第${Math.floor(item.play_time / 60)}分钟`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    let {history} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <Hint ref={e => (this.hint = e)} />
        <View
          style={{
            height: '100%',
            width: '100%',
            padding: 30,
            position: 'relative',
            zIndex: 10,
          }}>
          <View
            style={{
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: 'white', fontSize: 30, marginRight: 40}}>
              观看记录
            </Text>
            <Text>观看记录最多保存20条</Text>
          </View>
          <View style={{flex: 1}}>
            {this.renderNone()}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={history}
              numColumns={3}
              renderItem={this.renderItemFn.bind(this)}
            />
          </View>
        </View>
        <View style={[styles.fullScreen, {zIndex: 1}]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.7}}
            source={require('@/assets/history.jpg')}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default History;
