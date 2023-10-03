import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TVEventHandler,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Feather';
import Hint from '../components/hint.js';
import {getTeleplayPlay} from '../../api/index';

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
      playDetail: {},
      playList: [],
      listEnd: false,
      hintText: '',
      uri: 'http://192.168.1.20:8445/a05.mp4',
    };
    this.baseurl = global.baseurl;
    this.player = {
      controlTimeout: null,
      controlTimeoutDelay: 3000,
      step: 5,
      timeoutHandle: null,
    };
    this.opts = {};
    this.event = {
      onLoad: this._onLoad.bind(this),
      onProgress: this._onProgress.bind(this),
      onEnd: this._onEnd.bind(this),
      onError: this._onError.bind(this),
      onSeek: this._onSeek.bind(this),
    };
  }

  _onLoad(ev) {
    console.log('video load');
    let state = this.state;
    state.duration = ev.duration;
    state.paused = false;
    state.hintText = '';
    if (state.showControls) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  _onProgress(ev) {
    let state = this.state;
    state.currentTime = ev.currentTime;
    this.setState(state);
  }
  _onEnd() {
    this.playNextPrev('next');
  }
  _onError(e) {
    console.log(e);
    this.hint.show('播放加载视频失败', 'err');
  }
  _hideControls() {
    let state = this.state;
    state.showControls = false;
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
  _togglePlayPause() {
    let state = this.state;
    state.paused = !state.paused;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  advanceHandle() {
    let state = this.state;
    if (state.duration - state.currentTime < this.player.step) {
      this.video.seek(state.duration - 1);
      this.setState({currentTime: state.duration - 1});
      return;
    }
    this.video.seek(state.currentTime + this.player.step);
    state.currentTime += this.player.step;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  recoilHandle() {
    let state = this.state;
    if (state.currentTime < this.player.step) {
      this.video.seek(0);
      this.setState({currentTime: 0});
      return;
    }
    this.video.seek(state.currentTime - this.player.step);
    state.currentTime -= this.player.step;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    this.setState(state);
  }
  _enableTVEventHandler() {
    console.log('enable ');
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      console.log(evt);
      if (evt && evt.eventType === 'right') {
        cmp.advanceHandle();
      } else if (evt && evt.eventType === 'up') {
        cmp.playNextPrev('prev');
      } else if (evt && evt.eventType === 'left') {
        cmp.recoilHandle();
      } else if (evt && evt.eventType === 'down') {
        cmp.playNextPrev('next');
      } else if (evt && evt.eventType === 'select') {
        cmp._togglePlayPause();
      }
    });
  }
  async playNextPrev(type) {
    let state = this.state;
    let params = {
      tv_id: state.playDetail.tv_id,
    };
    if (type == 'next') {
      if (state.playDetail.idx == state.playList.length) {
        let msg = `抱歉电视剧没有下一集了哟~`;
        this.hint.show(msg);
        return;
      }
      params.idx = state.playDetail.idx + 1;
      this.showMsg('正在为您加载下一集');
    }
    if (type == 'prev') {
      if (state.playDetail.idx == 1) {
        let msg = `已经是第一集了哟~`;
        this.hint.show(msg);
        return;
      }
      params.idx = state.playDetail.idx - 1;
      this.showMsg('正在为您加载上一集');
    }
    this.setState(state);
    await this.getTvDetail(params);
  }
  async getTvDetail(params) {
    let state = this.state;
    try {
      console.log(params);
      let ret = await getTeleplayPlay(params);
      state.playDetail = ret.data.play_detail;
      state.playList = ret.data.play_list;
      state.uri = `${this.baseurl}/public/tv/${state.playDetail.word}/${state.playDetail.link}`;
      this.setState(state);
      if (state.playDetail.idx != this.state.playDetail.idx) {
        this.hint.show('数据获取成功，但是渲染失败', 'err');
      }
    } catch (e) {
      let msg = `获取资源失败`;
      this.hint.show(msg, 'err');
      console.log(msg, e);
    }
  }
  async delay(time) {
    return new Promise(resolve => {
      this.player.timeoutHandle = setTimeout(() => {
        resolve();
      }, time);
    });
  }
  showMsg(msg) {
    let state = this.state;
    state.showControls = true;
    if (this.player.controlTimeout) {
      this.resetControlTimeout();
    }
    state.paused = true;
    state.hintText = msg;
    this.setState(state);
  }
  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }
  async componentDidMount() {
    let {current_show, tv_id, idx} = this.props.route.params;
    let state = this.state;
    this.touchView.focus();
    this._enableTVEventHandler();
    try {
      if (current_show == 'teleplay') {
        await this.getTvDetail({tv_id, idx});
      }
    } catch (e) {
      let msg = `获取资源详情失败`;
      console.log(msg, e);
    }
    this.setState(state);
  }
  componentWillUnmount() {
    this._disableTVEventHandler();
    this.clearControlTimeout();
    clearTimeout(this.player.timeoutHandle);
  }
  renderMinutes(num) {
    let time = Math.floor(num / 60);
    return <Text>{time < 10 ? '0' + time : time}</Text>;
  }
  renderSecond(num) {
    let time = Math.floor(num % 60);
    return <Text>{time < 10 ? '0' + time : time}</Text>;
  }
  render() {
    let {
      currentTime,
      duration,
      paused,
      muted,
      showControls,
      uri,
      playDetail,
      hintText,
    } = this.state;
    return (
      <TouchableOpacity
        ref={e => (this.touchView = e)}
        activeOpacity={1}
        style={[styles.container]}>
        <Hint ref={e => (this.hint = e)} />
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
              <Text style={{fontSize: 16}}>{playDetail.play_name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 22}}>{hintText}</Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Icon
                    name={paused ? 'play' : 'pause'}
                    size={30}
                    color="white"
                  />
                </View>
              </View>
              <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
                <Text style={{textAlign: 'center'}}>
                  {this.renderMinutes(currentTime)}:
                  {this.renderSecond(currentTime)}
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
                      backgroundColor: 'red',
                      position: 'relative',
                    }}>
                    <View
                      style={[
                        styles.dot,
                        {
                          left: `${((currentTime / duration) * 100).toFixed(
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

        <View style={[styles.fullScreen]}>
          <Video
            ref={e => (this.video = e)}
            source={{uri: uri}}
            paused={paused}
            muted={muted}
            style={[styles.fullScreen, {zIndex: 1}]}
            onLoad={this.event.onLoad}
            onEnd={this.event.onEnd}
            onError={this.event.onError}
            onProgress={this.event.onProgress}
            onSeek={this.event.onSeek}
            repeat={false}
            resizeMode="contain"
            bufferConfig={{
              minBufferMs: 20000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        </View>
      </TouchableOpacity>
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
export default Player;
