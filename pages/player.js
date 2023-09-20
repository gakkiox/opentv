
import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Video from "react-native-video"

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    paused: false,
    muted: true
  }
  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
        <Video source={{ uri: 'http://192.168.1.15:8445/b04.mp4' }}
          paused={this.state.paused}
          muted={this.state.muted}
          style={[styles.fullScreen]}
        />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%", height: "100% ",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: "relative"
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  }
});
export default Player