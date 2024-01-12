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
      url: "https://www.w3schools.com/html/movie.mp4",
      playCurrent: "mp4"
    };
  }
  playMp4(){
    this.setState({
      url: "https://www.w3schools.com/html/movie.mp4",
      playCurrent: "mp4"
    })
  }
  playM3u8(){
    this.setState({
      url: "http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8",
      playCurrent: "m3u8"
    })
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
          <View style={{flexDirection: "row", marginBottom: 10}}>
            <Btn
              borderRadius={3}
              paddingVertical={10}
              paddingHorizontal={25}
              marginRight={6}
              title="MP4测试"
              backgroundColor="rgba(255,255,255,0.6)"
              color="#297FF8"
              activeColor="red"
              icon={playCurrent=='mp4'?'play':'none'}
              iconSize={24}
              onPress={this.playMp4.bind(this)}
            />
            <Btn
              borderRadius={3}
              paddingVertical={10}
              paddingHorizontal={25}
              marginRight={6}
              title="M3U8测试"
              backgroundColor="rgba(255,255,255,0.6)"
              color="#297FF8"
              activeColor="red"
              icon={playCurrent=='m3u8'?'play':'none'}
              iconSize={24}
              onPress={this.playM3u8.bind(this)}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: '50%', backgroundColor: 'black'}}>
              <Video
                ref={e => (this.player = e)}
                resizeMode="contain"
                name="播放测试"
                source={{
                  uri:url,
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
});
export default PlayTest;
