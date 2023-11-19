import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import Video from 'react-native-video';
class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Video source={this.props.source} />
      </View>
    );
  }
}
export default VideoComponent;
