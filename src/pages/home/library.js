import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Btn from '@/pages/components/btn';
import {
  getTeleplayClassify,
  getMovieClassify,
  getTeleplayList,
  getMovieList,
  getLastAdd,
  getRecommendRandom,
} from '@/api/index';
import TouchableItem from '@/pages/components/TouchableItem';
import {getItem} from '@/utils/storage';
import Hint from '@/pages/components/hint.js';

const colorList = [
  ['#196B0B', '#5FC749'],
  ['#0B2C6D', '#4FABCB'],
  ['#612279', '#E95AD9'],
  ['#d8bb00', '#e7d591'],
  ['#a61e34', '#e8b5ba'],
  ['#3b9da6', '#64c8d1'],
  ['#b08b38', '#dcc061'],
];

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvList: [],
      movieList: [],
      lastList: [],
      historyList: [],
      recommendList: [],
    };
    this.tvPicPrefix = global.base.public_tv_img;
    this.moviePicPrefix = global.base.public_movie_img;
  }
  headPressHandle(item, idx) {
    let state = this.state;
    if (idx == 0) {
      if (state.historyList.length < 1) {
        this.hint.show('在暂时没有观看记录~');
        return;
      }
      this.props.mainScrollTo(80);
      return;
    }
    if (idx == 1) {
      if (state.lastList.length < 1) {
        this.hint.show('在暂时没有最近添加的影视资源~');
        return;
      }
      this.props.mainScrollTo(350);
      return;
    }
    if (idx == 2) {
      if (state.recommendList.length < 1) {
        this.hint.show('在暂时没有随机推荐的影视资源~');
        return;
      }
      this.props.mainScrollTo(520);
      return;
    }
    this.props.nav.navigate('List', {
      type: item.type,
    });
  }
  async componentDidMount() {
    let state = this.state;
    try {
      let ret1 = await getTeleplayClassify({show: 'true'});
      let ret2 = await getMovieClassify({show: 'true'});
      let ret3 = await getTeleplayList({
        limit: 16,
        offset: 0,
        query: {show: true},
      });
      let ret4 = await getMovieList({
        limit: 16,
        offset: 0,
        query: {show: true},
      });
      let ret5 = await getLastAdd();
      let ret6 = await getRecommendRandom();
      if (ret1.code != 200) {
        this.hint.show('获取数据失败，请检查服务器设置或稍后重试');
        console.log(ret1);
      }
      let historyRet = await getItem('history');
      state.historyList = historyRet.value == null ? [] : historyRet.value;
      state.lastList = ret5.data.rows;
      state.tvList = ret3.data.rows;
      state.movieList = ret4.data.rows;
      state.recommendList = ret6.data.rows;
      this.setState(state);
    } catch (e) {
      let msg = `获取数据失败，请检查服务器设置或稍后重试`;
      this.hint.show(msg, 'red');
      console.log(msg, e);
    }
  }
  render() {
    let state = this.state;
    let arr1 = [
      {
        icon: 'search',
      },
      {
        icon: 'rotate-cw',
      },
    ];
    let arr2 = [
      {title: '最近添加', icon: 'timer-outline'},
      {title: '最近播放', icon: 'walk-outline'},
      {title: '随机推荐', icon: 'thumbs-up-outline'},
      {title: '电视剧', icon: 'tv-outline', type: 'tv'},
      {title: '电影', icon: 'videocam-outline', type: 'movie'},
      {title: '综艺', icon: 'color-palette-outline', type: 'classify_综艺'},
      {title: '动漫', icon: 'planet-outline', type: 'classify_动漫'},
    ];
    return (
      <View style={{width: '100%', paddingBottom: 30}}>
        <Hint ref={e => (this.hint = e)} />
        <View
          style={[styles.flexCenter, {marginTop: 10, flexDirection: 'row'}]}>
          {arr1.map((itm, idx) => {
            return (
              <Btn
                icon={itm.icon}
                key={idx}
                style={{
                  ...styles.flexCenter,
                  width: 35,
                  height: 35,
                  borderRadius: 4,
                  marginRight: 4,
                  backgroundColor: 'transparent',
                }}
                iconStyle={{color: '#fff', fontSize: 16}}
                activeStyle={{color: '#222', backgroundColor: '#E9E9E9'}}
              />
            );
          })}
        </View>
        <View style={{width: '100%', paddingLeft: 40}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{marginTop: 10}}>
            {arr2.map((itm, idx) => {
              return (
                <TouchableItem
                  style={{width: 145, height: 85}}
                  title={itm.title}
                  icon={itm.icon}
                  key={idx}
                  onPress={this.headPressHandle.bind(this, itm, idx)}
                  colors={colorList[idx % colorList.length]}
                />
              );
            })}
          </ScrollView>

          {(() => {
            if (state.historyList.length > 0) {
              return (
                <View>
                  <View style={{paddingVertical: 10}}>
                    <Text>最近播放</Text>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginTop: 10}}>
                    {state.historyList.map((itm, idx) => {
                      return (
                        <TouchableItem
                          title={itm.name}
                          key={idx}
                          onPress={() => {
                            this.props.nav.navigate('Player', {
                              id: itm.id,
                              idx: itm.idx,
                              type: itm.type,
                              play_time: itm.play_time,
                            });
                          }}
                          uri={
                            (itm.type == 'tv'
                              ? this.tvPicPrefix
                              : this.moviePicPrefix) + itm.pic
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }
          })()}

          {(() => {
            if (state.lastList.length > 0) {
              return (
                <View>
                  <View style={{paddingVertical: 10}}>
                    <Text>最近添加</Text>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginTop: 10}}>
                    {state.lastList.map((itm, idx) => {
                      return (
                        <TouchableItem
                          title={itm.name}
                          key={idx}
                          score={itm.score}
                          onPress={() => {
                            this.props.nav.navigate('Detail', {
                              type: itm.type,
                              id: itm.id,
                            });
                          }}
                          uri={
                            (itm.type == 'tv'
                              ? this.tvPicPrefix
                              : this.moviePicPrefix) + itm.pic
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }
          })()}

          {(() => {
            if (state.recommendList.length > 0) {
              return (
                <View>
                  <View style={{paddingVertical: 10}}>
                    <Text>随机推荐</Text>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginTop: 10}}>
                    {state.recommendList.map((itm, idx) => {
                      return (
                        <TouchableItem
                          title={itm.name}
                          key={idx}
                          score={itm.score}
                          onPress={() => {
                            this.props.nav.navigate('Detail', {
                              type: itm.type,
                              id: itm.id,
                            });
                          }}
                          uri={
                            (itm.type == 'tv'
                              ? this.tvPicPrefix
                              : this.moviePicPrefix) + itm.pic
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }
          })()}

          <View style={{paddingVertical: 10}}>
            <Text>电视剧</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{marginTop: 10}}>
            {state.tvList.map((itm, idx) => {
              return (
                <TouchableItem
                  title={itm.name}
                  score={itm.score}
                  onPress={() => {
                    this.props.nav.navigate('Detail', {type: 'tv', id: itm.id});
                  }}
                  uri={this.tvPicPrefix + itm.pic}
                  key={idx}
                />
              );
            })}
            <TouchableItem
              style={{width: 115, height: 163}}
              title="查看更多"
              colors={['#c44601', '#f57600']}
              icon="albums-outline"
              onPress={() => {
                this.props.nav.navigate('List', {
                  type: 'tv',
                  classify: 'none',
                });
              }}
            />
          </ScrollView>

          <View style={{paddingVertical: 10}}>
            <Text>电影</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{marginTop: 10}}>
            {state.movieList.map((itm, idx) => {
              return (
                <TouchableItem
                  title={itm.name}
                  score={itm.score}
                  onPress={() => {
                    this.props.nav.navigate('Detail', {
                      type: 'movie',
                      id: itm.id,
                    });
                  }}
                  key={idx}
                  uri={this.moviePicPrefix + itm.pic}
                />
              );
            })}
            <TouchableItem
              style={{width: 115, height: 163}}
              colors={['#00bf7d', '#00b4c5']}
              a
              title="查看更多"
              icon="albums-outline"
              onPress={() => {
                this.props.nav.navigate('List', {
                  type: 'movie',
                  classify: 'none',
                });
              }}
            />
          </ScrollView>
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
});
export default Library;
