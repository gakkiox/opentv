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
import {setItem, getItem} from '../../utils/storage.js';

class Player extends React.Component {
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
      uri: "'http://192.168.1.220:8440/public/tv/1fa5cea063d84891/12ba9818f21da1c8/index.m3u8",
    };
    this.tvPrefix = global.tvPrefix;
    this.player = {
      controlTimeout: null,
      controlTimeoutDelay: 3000,
      step: 10,
      timeoutHandle: null,
    };
    this.LastViewTmpTime = 0;
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
    state.progress = 0;
    state.hintText = '';
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
    this.setState(state);
    this.updateLastView();
  }
  _onEnd() {
    this.playNextPrev('next');
  }
  _onError(e) {
    console.log(e);
    this.hint.show('播放加载视频失败', 'err');
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
  updateLastView() {
    let {source_type, tv_id} = this.props.route.params;
    let state = this.state;
    let delay = 1000 * 10;
    let curTime = new Date().getTime();
    let diff = delay - (curTime - this.LastViewTmpTime);
    if (diff <= 0) {
      setItem('lastView', {
        type: source_type,
        id: tv_id,
        name: state.playDetail.name,
        idx: state.playDetail.idx,
        play_time: state.currentTime,
      });
      this.LastViewTmpTime = curTime;
    }
  }
  async updateHistory() {
    let {source_type, tv_id} = this.props.route.params;
    let state = this.state;
    let historyRet = await getItem('history');
    let history = historyRet.value;
    let index = history.findIndex(
      a => a.source_type == source_type && a.id == tv_id,
    );
    let film = {
        id: tv_id,
        idx: state.playDetail.idx,
        source_type,
        name: state.playDetail.name,
        pic: state.playDetail.pic,
      },
      tmp = {};
    if (index == -1) {
      if(history.length>20){
        history.pop();
      }
      history.unshift(film);

    } else {
      tmp = history[index];
      (tmp.idx = state.playDetail.idx), history.splice(index, 1);
      history.unshift(tmp);
    }
    await setItem('history', history);
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
  seekHandle(state) {
    this.video.seek(state.progress);
    state.currentTime = state.progress;
    state.seeking = false;
    if (state.showControls) {
      this.setControlTimeout();
    }
    this.setState(state);
  }
  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      console.log(evt);
      if (evt && evt.eventType === 'right') {
        cmp.playFastBack('fast');
      } else if (evt && evt.eventType === 'up') {
        cmp.playNextPrev('prev');
      } else if (evt && evt.eventType === 'left') {
        cmp.playFastBack('back');
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
      let ret = await getTeleplayPlay(params);
      state.playDetail = ret.data.play_detail;
      state.playList = ret.data.play_list;
      state.uri = `${this.tvPrefix}${state.playDetail.word}/${state.playDetail.link}`;
      this.setState(state);
      await this.updateHistory();
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
    let {source_type, tv_id, idx} = this.props.route.params;
    let state = this.state;
    this.touchView.focus();
    this._enableTVEventHandler();
    try {
      if (source_type == 'teleplay') {
        await this.getTvDetail({tv_id, idx});
      }
      global.showLastView = false;
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
      progress,
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
                      backgroundColor: 'red',
                      position: 'relative',
                    }}>
                    <View
                      style={[
                        styles.dot,
                        {
                          left: `${((progress / duration) * 100).toFixed(2)}%`,
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
