import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Video from "react-native-video";

const step = 5;
class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    paused: false,
    muted: true,
    duration: 0,
    currentTime: 0
  }
  loadHandle(ev) {
    this.setState({ duration: ev.duration });
  }
  progressHandle(ev) {
    this.setState({ currentTime: ev.currentTime });
  }
  advanceHandle() {
    let { currentTime, duration } = this.state;
    if (duration - currentTime < 5) {
      this.video.seek(duration - 1);
      this.setState({ currentTime: duration - 1 });
      return
    }
    this.video.seek(currentTime + 5)
    this.setState({ currentTime: currentTime + 5 });
  }
  recoilHandle() {
    let { currentTime } = this.state;
    if (currentTime < 5) {
      this.video.seek(0);
      this.setState({ currentTime: 0 });
      return
    }
    this.video.seek(currentTime - 5);
    this.setState({ currentTime: currentTime - 5 });
  }
  render() {
    let { currentTime, duration, paused, muted } = this.state;
    return (
      <View style={[styles.container]}>
        <View style={[styles.fullScreen, { zIndex: 10, backgroundColor: "rgba(0,0,0,0)" }]}>
          <View style={{ width: "100%", padding: 10 }}>
            <Text>海绵宝宝大作战</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Button title={this.state.paused ? "播放" : "停止"} onPress={() => this.setState({ paused: !this.state.paused })} />
          </View>
          <View style={{ width: "100%", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Button title="上一集" onPress={() => { }} />
              </View>
              <View>
                <Button title="下一集" onPress={() => { }} />
              </View>
              <View>
                <Button title="后退" onPress={this.recoilHandle.bind(this)} />
              </View>
              <View>
                <Button title="前进" onPress={this.advanceHandle.bind(this)} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}>
              <Text style={{ textAlign: "center" }}>
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
              </Text>
              <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}>
                <View
                  style={{ width: "100%", height: 3, backgroundColor: "red", position: "relative" }}>
                  <View style={[styles.dot, { left: `${(currentTime / duration * 100).toFixed(2)}%` }]}>
                  </View>
                </View>

              </View>
              <Text style={{ textAlign: "center" }}>
                {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
              </Text>
            </View>
          </View>
        </View>
        <Video
          ref={e => this.video = e}
          source={{ uri: 'http://192.168.1.10:8445/b04.mp4' }}
          paused={paused}
          muted={muted}
          style={[styles.fullScreen, { zIndex: 1 }]}
          onLoad={this.loadHandle.bind(this)}
          onProgress={this.progressHandle.bind(this)}
          repeat={false}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000
          }}
        />
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
  },
  dot: {
    position: 'absolute',
    top: -3,
    width: 8,
    height: 8,
    backgroundColor: "black",
    borderRadius: 4
  }
});
export default Player