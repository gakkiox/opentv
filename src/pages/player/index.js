import React from "react";
import { Text, View, StyleSheet, TVEventHandler, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/Feather';
import { getTeleplayPlay } from "../api/index";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      muted: false,
      duration: 0,
      currentTime: 0,
      showControls: true,
      playEnd: false,
      playDetail:{},
      playList:[],
      nextPlay: {},
      prevPlay: null,
      // uri: "http://192.168.1.10:8445/a05/a05.m3u8",
      uri: "http://192.168.1.102:8445/a05.mp4",
      // uri: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    }
    this.player = {
      controlTimeout: null,
      controlTimeoutDelay: 3000,
      step: 5,
    }
    this.opts = {

    }
    this.event = {
      onLoad: this._onLoad.bind(this),
      onProgress: this._onProgress.bind(this),
      onEnd: this._onEnd.bind(this),
      onError: this._onError.bind(this),

    }
  }

  _onLoad(ev) {
    let state = this.state;
    state.duration = ev.duration;
    state.playEnd = false;
    state.paused = false;
    if (state.showControls) {
      this.setControlTimeout()
    }
    this.setState({ state });
  }
  _onProgress(ev) {
    let state = this.state;
    state.currentTime = ev.currentTime;
    this.setState({ state });
  }
  _onEnd() {
    let state = this.state;
    state.paused = true;
    state.playEnd = true;
    state.showControls = true;
    setTimeout(() => {
      this.playNext()
    }, 3000);
    this.setState({ state });
  }
  _onError(e) {
    console.log(e)
  }
  playNext() {
    let state = this.state;
    state.uri = "http://192.168.1.102:8445/b04.mp4";
    this.setState({ state });
  }
  playPrev() {

  }
  _hideControls() {
    let state = this.state;
    state.showControls = false;
    this.setState({ state });
  }
  setControlTimeout() {
    this.player.controlTimeout = setTimeout(() => {
      this._hideControls();
    },
      this.player.controlTimeoutDelay
    )
  }
  clearControlTimeout() {
    clearTimeout(this.player.controlTimeout);
  }
  resetControlTimeout() {
    this.clearControlTimeout();
    this.setControlTimeout();
  }
  _togglePlayPause() {
    let state = this.state;
    state.paused = !state.paused;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    this.setState({ state });
  }
  advanceHandle() {
    let state = this.state;
    if (state.duration - state.currentTime < this.player.step) {
      this.video.seek(state.duration - 1);
      this.setState({ currentTime: state.duration - 1 });
      return
    }
    this.video.seek(state.currentTime + this.player.step)
    state.currentTime += this.player.step;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    };
    this.setState({ state });
  }
  recoilHandle() {
    let state = this.state;
    if (state.currentTime < this.player.step) {
      this.video.seek(0);
      this.setState({ currentTime: 0 });
      return
    }
    this.video.seek(state.currentTime - this.player.step);
    state.currentTime -= this.player.step;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    };
    this.setState({ state });
  }
  _enableTVEventHandler() {
    console.log("enable ")
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      console.log(evt)
      if (evt && evt.eventType === 'right') {
        cmp.advanceHandle();
      } else if (evt && evt.eventType === 'up') {

      } else if (evt && evt.eventType === 'left') {
        cmp.recoilHandle();
      } else if (evt && evt.eventType === 'down') {
      } else if (evt && evt.eventType === 'select') {
        cmp._togglePlayPause();
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
    let { tv_id, id } = this.props.route.params;
    let state = this.state;
    this.touchView.focus();
    this._enableTVEventHandler();
    try {
      let ret = await getTeleplayPlay({ tv_id, id });

      console.log(ret.data)
    } catch (e) {
      let msg = `获取资源详情失败`;
      console.log(msg, e);
    }
  }
  componentWillUnmount() {
    this._disableTVEventHandler();
    this.clearControlTimeout();
  }
  renderMinutes(num) {
    let time = Math.floor(num / 60);
    return (
      <Text>{time < 10 ? "0" + time : time}</Text>
    )
  }
  renderSecond(num) {
    let time = Math.floor(num % 60);
    return (
      <Text>{time < 10 ? "0" + time : time}</Text>
    )
  }
  render() {
    let { currentTime, duration, paused, muted, showControls, playEnd, uri } = this.state;
    return (
      <TouchableOpacity
        ref={e => this.touchView = e}
        activeOpacity={1}
        style={[styles.container]}>
        <View style={[styles.fullScreen, { opacity: showControls ? 1 : 0, zIndex: 10, backgroundColor: "transparent" }]}>
          <View style={[styles.fullScreen, { zIndex: 1, }]}>
            <View style={{ width: "100%", padding: 10 }}>
              <Text style={{ fontSize: 16 }}>海绵宝宝大作战</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <View style={{ opacity: playEnd ? 1 : 0 }}>
                <Text style={{ fontSize: 22 }}>
                  {this.props.route.params.current_show == 'teleplay' ? '稍后将为您播放下一集': "播放结束"}
                </Text>
              </View>

            </View>
            <View style={{ width: "100%", padding: 10, flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Icon name={paused ? 'play' : 'pause'} size={30} color="white" />
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}>
                <Text style={{ textAlign: "center" }}>
                  {this.renderMinutes(currentTime)}:{this.renderSecond(currentTime)}
                </Text>
                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}>
                  <View
                    style={{ width: "100%", height: 3, backgroundColor: "red", position: "relative" }}>
                    <View style={[styles.dot, { left: `${(currentTime / duration * 100).toFixed(2)}%` }]}>
                    </View>
                  </View>

                </View>
                <Text style={{ textAlign: "center" }}>
                  {this.renderMinutes(duration)}:{this.renderSecond(duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.fullScreen]}>
          <Video
            ref={e => this.video = e}
            source={{ uri }}
            paused={paused}
            muted={muted}
            style={[styles.fullScreen, { zIndex: 1 }]}
            onLoad={this.event.onLoad}
            onEnd={this.event.onEnd}
            onError={this.event.onError}
            onProgress={this.event.onProgress}
            repeat={false}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000
            }}
          />
        </View>
      </TouchableOpacity>
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
    backgroundColor: "white",
    borderRadius: 4
  }
});
export default Player