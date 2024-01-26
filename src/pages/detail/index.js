import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {getTeleplayInfo, getMovieInfo} from '@/api/index';
import Btn from '@/pages/components/btn';
import {BlurView} from '@react-native-community/blur';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {teleplay_list: []},
      type: 'tv',
    };
    this.tvPicPrefix = global.base.public_tv_img;
    this.moviePicPrefix = global.base.public_movie_img;
  }
  async componentDidMount() {
    let state = this.state;
    let {type, id} = this.props.route.params;
    let ret = {code: 400};
    if (type == 'tv') {
      ret = await getTeleplayInfo({id});
    } else {
      ret = await getMovieInfo({id});
    }
    if (ret.code != 200) {
      this.hint.show('获取数据失败，请检查服务器设置或稍后重试');
      return;
    }
    state.type = type;
    state.detail = ret.data;
    this.setState(state);
  }

  render() {
    let state = this.state;
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
            padding: 30,
            position: 'relative',
            zIndex: 10,
          }}>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View>
                <Text style={{color: '#fff', fontSize: 30}}>
                  {state.detail.name}
                </Text>
              </View>
              <View style={{marginTop: 15}}>
                <Text style={{color: '#fff', fontSize: 12}}>
                  添加日期：2023年4月20日
                </Text>
              </View>
              <View
                style={{marginTop: 15, display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#FCC900', fontSize: 12, marginRight: 14}}>
                  评分：{state.detail.score}
                </Text>
                <Text style={{color: '#fff', fontSize: 12, marginRight: 14}}>
                  分类：{state.detail.classify}
                </Text>
                <Text style={{color: '#fff', fontSize: 12, marginRight: 14}}>
                  演员：{state.detail.actors}
                </Text>
              </View>
              <View style={{marginTop: 15}}>
                <Text style={{color: '#fff', fontSize: 12}}>
                  剧情简介：{state.detail.desc}
                </Text>
              </View>
              <View style={{marginTop: 15, width: 120, ...styles.flexCenter}}>
                <Btn
                  style={{
                    width: 120,
                    height: 60,
                    borderRadius: 4,
                    ...styles.flexCenter,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    color: '#59C381',
                  }}
                  activeStyle={{
                    backgroundColor: '#59C381',
                    color: '#fff',
                  }}
                  icon="play"
                  iconStyle={{fontSize: 30, color: '#59C381'}}
                  onPress={() => {
                    this.props.navigation.navigate('Player', {
                      type: state.type,
                      id: state.detail.id,
                      idx: 1,
                      play_time: 0,
                    });
                  }}
                />
                <Text>播放</Text>
              </View>
            </View>
            <View style={{width: 155, height: 220, marginLeft: 20}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    (state.type == 'tv'
                      ? this.tvPicPrefix
                      : this.moviePicPrefix) + state.detail.pic,
                }}
              />
            </View>
          </View>
          {(() => {
            if (state.type == 'tv') {
              return (
                <View style={{marginTop: 15}}>
                  <Text>剧集列表</Text>
                  <ScrollView
                    style={{marginTop: 10}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {state.detail.teleplay_list.map((itm, idx) => {
                      return (
                        <Btn
                          style={{
                            width: 80,
                            height: 30,
                            borderRadius: 4,
                            marginRight: 8,
                            ...styles.flexCenter,
                            backgroundColor: '#fff',
                            color: '#59C381',
                          }}
                          key={idx}
                          onPress={() => {
                            this.props.navigation.navigate('Player', {
                              type: state.type,
                              id: state.detail.id,
                              idx: itm.idx,
                              play_time: 0,
                            });
                          }}
                          activeStyle={{
                            backgroundColor: '#59C381',
                            color: '#fff',
                          }}
                          title={`第${itm.idx}集`}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }
          })()}
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
export default Detail;
