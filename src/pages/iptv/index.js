import React from 'react';

import {WebView} from 'react-native-webview';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  endLoad() {
    // 在H5调用一个名为 `receiveMessage` 的函数，并传入一个字符串,  参数true不可少
    // setTimeout(()=>{
    //   console.log('loadend')
    //   this.webView.injectJavaScript(`document.querySelector("#player_fullscreen_player").click();`);
    // },3000)
    // userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  }
  render() {
    
    return (
      <WebView
        ref={view => (this.webView = view)}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        source={{uri: 'https://tv.cctv.cn/live/cctv13/m/'}}
        onLoadEnd={() => {
          this.endLoad();
        }}
      />
    );
  }
}
export default Detail;
