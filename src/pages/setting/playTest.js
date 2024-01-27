import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TVEventHandler,
} from 'react-native';
import Video from '@/pages/components/video.js';
import Btn from '@/pages/components/btn';

class PlayTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://www.w3schools.com/html/movie.mp4',
      playCurrent: 'mp4',
    };
  }
  playMp4() {
    this.setState({
      url: 'https://www.w3schools.com/html/movie.mp4',
      playCurrent: 'mp4',
    });
  }
  playM3u8() {
    this.setState({
      url: 'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8',
      playCurrent: 'm3u8',
    });
  }
  async componentDidMount() {}
  componentWillUnmount() {}
  render() {
    let {url, playCurrent} = this.state;
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
            height: '100%',
            width: '100%',
            padding: 30,
            position: 'relative',
            zIndex: 10,
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'white', fontSize: 30}}>播放测试</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'center'}}>
            <Btn
              style={{
                width: 120,
                height: 40,
                borderRadius: 4,
                ...styles.flexCenter,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                color: '#fff',
                borderWidth: 3,
                borderColor: '#fff',
                marginRight: 20,
              }}
              onPress={this.playMp4.bind(this)}
              icon={playCurrent == 'mp4' ? 'play' : 'none'}
              iconStyle={{fontSize: 18}}
              activeStyle={{
                backgroundColor: '#59C381',
                color: '#fff',
              }}
              title="MP4测试"
            />
            <Btn
              style={{
                width: 120,
                height: 40,
                borderRadius: 4,
                ...styles.flexCenter,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                color: '#fff',
                borderWidth: 3,
                borderColor: '#fff',
              }}
              onPress={this.playM3u8.bind(this)}
              icon={playCurrent == 'm3u8' ? 'play' : 'none'}
              iconStyle={{fontSize: 18}}
              activeStyle={{
                backgroundColor: '#59C381',
                color: '#fff',
              }}
              title="M3U8测试"
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: '50%', backgroundColor: 'black'}}>
              <Video
                ref={e => (this.player = e)}
                resizeMode="contain"
                name="播放测试"
                source={{
                  uri: url,
                }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.fullScreen, {zIndex: 1}]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.4}}
            source={require('@/assets/setting.jpg')}
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
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PlayTest;
