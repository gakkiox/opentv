import React from 'react';
 
import {WebView} from 'react-native-webview';
 
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
  let script = `document.querySelector('#player_pagefullscreen_player').click();`;
    return (
      <WebView
        mediaPlaybackRequiresUserAction={false}
        source={{uri: 'https://tv.cctv.cn/live/cctv1/m/'}}
      />
    );
  }
}
export default Detail;
