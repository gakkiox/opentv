/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Text, View, Button } from "react-native";
import Video from "react-native-video"

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
    };
  }
  render() {
    return <View>
      <Text>Jsx</Text>
      <Video source={{uri: 'http://192.168.1.15:8445/b04.mp4'}}
        paused={this.state.paused}
        style={{
          width: 300,
          height: 200,
        }}
      />
      <Button title="play" />
    </View>
  }
}

export default Index