import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text, TVEventHandler} from 'react-native';
import Video from '@/pages/components/video.js';
class PlayTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      console.log(evt);
      if (evt && evt.eventType === 'right') {
        cmp.player.playFastBack("fast")
      } else if (evt && evt.eventType === 'up') {
        console.log("prev")
      } else if (evt && evt.eventType === 'left') {
        cmp.player.playFastBack("back")
      } else if (evt && evt.eventType === 'down') {
        console.log("next")
      } else if (evt && evt.eventType === 'select') {
        cmp.player.togglePlayPause();
      }
    });
  }
  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  async componentDidMount() {
    this._enableTVEventHandler();
  }
  componentWillUnmount() {
    this._disableTVEventHandler();
  }
  render() {
    let {cellKey} = this.state;
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
          <View></View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: '60%'}}>
              <Video
                ref={e => (this.player = e)}
                resizeMode="contain"
                name="当今四大基石"
                source={{
                  uri: 'http://192.168.1.220:8440/public/tv/1fa5cea063d84891/12ba9818f21da1c8/index.m3u8',
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
