import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <WebView source={{uri: 'https://tv.cctv.cn/live/cctv1/'}} />;
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
});
export default Detail;
