import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Feather';
class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      muted: false,
      duration: 0,
      currentTime: 0,
      showControls: true,
      progress: 0,
      seeking: false,
      playEnd: false,
      playDetail: {},
      playList: [],
      listEnd: false,
      hintText: '',
    };
    this.event = {
      onLoad: this._onLoad.bind(this),
      onProgress: this._onProgress.bind(this),
      onError: this._onError.bind(this),
      onSeek: this._onSeek.bind(this),
    };
    this.player = {
      controlTimeout: null,
      controlTimeoutDelay: 3000,
      step: 10,
      timeoutHandle: null,
    };
    this.opts = {};
  }
  static defaultProps = {
    onEnd: () => {},
    onProgress: () => {},
    onLoad: () => {},
    resizeMode: 'contain',
    playTime: 0,
    muted: false, //静音
    bufferConfig: {
      minBufferMs: 20000,
      maxBufferMs: 50000,
      bufferForPlaybackMs: 2500,
      bufferForPlaybackAfterRebufferMs: 5000,
    },
  };

  _onLoad(ev) {
    let state = this.state;
    state.duration = ev.duration;
    state.paused = false;
    state.progress = 0;
    state.hintText = '';
    state.currentTime = this.props.playTime;
    this.video.seek(this.props.playTime);
    if (state.showControls) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  _onProgress(ev) {
    let state = this.state;
    state.currentTime = ev.currentTime;
    if (!state.seeking) {
      state.progress = ev.currentTime;
    }
    this.props.onProgress(ev);
    this.setState(state);
  }
  _onError(e) {
    console.log('Video error', e);
  }
  _onSeek(params) {
    let state = this.state;
    state.currentTime = params.currentTime;
    this.setState(state);
  }
  _hideControls() {
    let state = this.state;
    state.showControls = false;
    this.setState(state);
  }
  playFastBack(type) {
    let state = this.state;
    state.showControls = true;
    state.seeking = true;
    this.setState(state);
    if (type == 'fast') {
      // 快进
      if (state.duration - state.progress < this.player.step) {
        state.progress = state.duration - 1;
        this.seekHandle(state);
        return;
      }
      state.progress += this.player.step;
    }
    if (type == 'back') {
      // 快进
      if (state.progress < this.player.step) {
        state.progress = 0;
        this.seekHandle(state);
        return;
      }
      state.progress -= this.player.step;
    }
    this.setState(state);
    clearTimeout(this.player.timeoutHandle);
    this.player.timeoutHandle = setTimeout(() => {
      this.seekHandle(state);
    }, 1500);
  }
  togglePlayPause() {
    let state = this.state;
    state.paused = !state.paused;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  seekHandle(state) {
    this.video.seek(state.progress);
    state.currentTime = state.progress;
    state.seeking = false;
    if (state.showControls) {
      this.setControlTimeout();
    }
    this.setState(state);
  }

  setControlTimeout() {
    this.player.controlTimeout = setTimeout(() => {
      this._hideControls();
    }, this.player.controlTimeoutDelay);
  }
  clearControlTimeout() {
    clearTimeout(this.player.controlTimeout);
  }
  resetControlTimeout() {
    this.clearControlTimeout();
    this.setControlTimeout();
  }
  renderMinutes(num) {
    let time = Math.floor(num / 60);
    return <Text>{time < 10 ? '0' + time : time}</Text>;
  }
  renderSecond(num) {
    let time = Math.floor(num % 60);
    return <Text>{time < 10 ? '0' + time : time}</Text>;
  }

  componentWillUnmount() {
    this.clearControlTimeout();
    clearTimeout(this.player.timeoutHandle);
  }
  render() {
    let {duration, paused, showControls, progress} = this.state;
    let props = this.props;
    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}>
        <TouchableOpacity
          style={{width: '100%', height: '100%'}}
          ref={e => (this.touchView = e)}
          activeOpacity={1}>
          <View
            style={[
              styles.fullScreen,
              {
                opacity: showControls ? 1 : 0,
                zIndex: 10,
                backgroundColor: 'transparent',
              },
            ]}>
            <View style={[styles.fullScreen, {zIndex: 1}]}>
              <View style={{width: '100%', padding: 10}}>
                <Text style={{fontSize: 16}}>{props.name}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <View>
                    <Icon
                      name={paused ? 'play' : 'pause'}
                      size={30}
                      color="white"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    {this.renderMinutes(progress)}:{this.renderSecond(progress)}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingHorizontal: 15,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor: '#00b96b',
                        position: 'relative',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {
                            left: `${((progress / duration) * 100).toFixed(
                              2,
                            )}%`,
                          },
                        ]}></View>
                    </View>
                  </View>
                  <Text style={{textAlign: 'center'}}>
                    {this.renderMinutes(duration)}:{this.renderSecond(duration)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Video
            style={[styles.fullScreen, {zIndex: 1}]}
            ref={e => (this.video = e)}
            onLoad={this.event.onLoad}
            onEnd={props.onEnd}
            onError={this.event.onError}
            onProgress={this.event.onProgress}
            onSeek={this.event.onSeek}
            repeat={props.repeat}
            resizeMode={props.resizeMode}
            bufferConfig={props.bufferConfig}
            source={props.source}
            paused={paused}
            muted={props.muted}
            progressUpdateInterval={1000}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            opacity: showControls ? 0 : 1,
            width: `${((progress / duration) * 100).toFixed(2)}%`,
            backgroundColor: '#00b96b',
          }}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100% ',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'relative',
  },
  fullScreen: {
    width: '100%',
    height: '100% ',
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
    backgroundColor: 'white',
    borderRadius: 4,
  },
});
export default VideoComponent;
