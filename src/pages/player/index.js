import React from 'react';
import { Text, View, TVEventHandler, StyleSheet, Image } from 'react-native';
import Hint from '@/pages/components/hint.js';
import { getTeleplayPlay, getMovieInfo } from '@/api/index';
import { setItem, getItem } from '@/utils/storage.js';
import Video from '@/pages/components/video.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.tvPrefix = global.base.public_tv_space;
    this.moviePrefix = global.base.public_movie_space;
    this.state = {
      source_type: 'teleplay',
      uri: '',
      playDetail: {},
      playList: [],
      isPlay: false,
      source_id: null,
      play_time: 0,
    };
  }

  async updateHistory(currentTime, total_time) {
    let state = this.state;
    let historyRet = await getItem('history');
    let history = historyRet.value == null ? [] : historyRet.value;
    let index = history.findIndex(
      a => a.source_type == state.source_type && a.id == state.source_id,
    );
    let film = {
      id: state.source_id,
      idx: state.source_type == 'teleplay' ? state.playDetail.idx : 1,
      source_type: state.source_type,
      name: state.playDetail.name,
      pic: state.playDetail.pic,
      play_time: currentTime,
      total_time: total_time,
    };
    if (index == -1) {
      if (history.length > 20) {
        history.pop();
      }
      history.unshift(film);
    } else {
      history.splice(index, 1);
      history.unshift(film);
    }
    await setItem('history', history);
  }

  async playNextPrev(type) {
    let state = this.state;
    if (state.source_type != 'teleplay') {
      return;
    }
    let params = {
      id: state.playDetail.tv_id,
    };
    if (type == 'next') {
      if (state.playDetail.idx == state.playDetail.count) {
        let msg = `抱歉电视剧没有下一集了哟~`;
        this.hint.show(msg);
        return;
      }
      params.idx = state.playDetail.idx + 1;
      this.hint.show('正在为您加载下一集');
    }
    if (type == 'prev') {
      if (state.playDetail.idx == 1) {
        let msg = `已经是第一集了哟~`;
        this.hint.show(msg);
        return;
      }
      params.idx = state.playDetail.idx - 1;
      this.hint.show('正在为您加载上一集');
    }
    state.play_time = 0;
    this.setState(state);
    await this.getTvPlay(params);
  }
  async getTvPlay(params) {
    let state = this.state;
    try {
      let ret = await getTeleplayPlay(params);
      if (ret.code != 200) {
        this.hint.show('获取数据失败，请检查服务器设置或稍后重试');
        return;
      }

      state.playDetail = ret.data;
      state.uri = `${this.tvPrefix}${state.playDetail.word}/${state.playDetail.link}`;
      // state.uri = `http://192.168.1.220:7005/tv/${state.playDetail.word}/${state.playDetail.link}`
      state.isPlay = true;
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
  async getMovieDetail(params) {
    let state = this.state;
    try {
      let ret = await getMovieInfo(params);
      state.playDetail = ret.data;
      state.uri = `${this.moviePrefix}${state.playDetail.link}`;
      state.isPlay = true;
      this.setState(state);
    } catch (e) {
      let msg = `获取电影资源失败`;
      console.log(e);
      this.hint.show(msg, 'err');
    }
  }
  enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      console.log(evt);
      if (evt && evt.eventType === 'right') {
        cmp.player.playFastBack('fast');
      } else if (evt && evt.eventType === 'up') {
        cmp.playNextPrev('prev');
      } else if (evt && evt.eventType === 'left') {
        cmp.player.playFastBack('back');
      } else if (evt && evt.eventType === 'down') {
        cmp.playNextPrev('next');
        // console.log('next');
      } else if (evt && evt.eventType === 'select') {
        cmp.player.togglePlayPause();
      }
    });
  }
  disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  async componentDidMount() {
    let { source_type, id, idx, play_time } = this.props.route.params;
    let state = this.state;
    state.source_type = source_type;
    state.source_id = id;
    state.play_time = play_time;
    // this.touchView.focus();
    // console.log(play_time);
    this.enableTVEventHandler();
    try {
      if (source_type == 'teleplay') {
        await this.getTvPlay({ id, idx });
      } else {
        await this.getMovieDetail({ id });
      }
    } catch (e) {
      let msg = `获取资源详情失败`;
      console.log(msg, e);
    }
    this.setState(state);
  }
  componentWillUnmount() {
    this.disableTVEventHandler();
  }
  onProgress(ev) {
    let { currentTime, seekableDuration } = ev;
    let tmp = Math.floor(currentTime);
    if (tmp > 4 && tmp % 5 == 0) {
      this.updateHistory(currentTime, seekableDuration);
    }
  }
  onEnd() {
    let that = this;
    if (this.state.source_type == 'teleplay') {
      this.playNextPrev('next');
    } else {
      this.hint.show('影片播放结束，正在返回首页。。。');
      let t = setTimeout(() => {
        clearTimeout(t);
        that.props.navigation.navigate('Home');
      }, 1000 * 4);
    }
  }
  renderVideo() {
    let { uri, playDetail, isPlay, play_time } = this.state;
    if (isPlay) {
      return (
        <Video
          name={playDetail.play_name}
          ref={e => (this.player = e)}
          source={{ uri }}
          onEnd={this.onEnd.bind(this)}
          onProgress={this.onProgress.bind(this)}
          playTime={play_time}
        />
      );
    }
  }
  /**
   * https://vjs.zencdn.net/v/oceans.mp4
   * http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8
   * http://dg1sy-vodcdn.migucloud.com/mgc_transfiles/4947/2021/3/27/0f8Cmn55zakUGv45Btz0/83300486/custom_origin_4M/0f8Cmn55zakUGv45Btz0custom_origin_4Mhls.mp4.m3u8
   */
  render() {
    return (
      <View style={[styles.container]}>
        <Hint ref={e => (this.hint = e)} />
        {this.renderVideo()}
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
