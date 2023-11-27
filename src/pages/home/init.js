import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {getItem, setItem, clear} from '../../utils/storage';
import Icon from 'react-native-vector-icons/Feather';

global.theme = {
  color1: '#297FF8',
  color2: '#fed854',
};

global.windowWidth = Dimensions.get('window').width;

class Init extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async initBaseUrl() {
    let url = 'http://192.168.1.220:7001';
    if (process.env.NODE_ENV == 'development') {
      url = 'http://192.168.1.220:8440';
    }

    global.defaulturl = url;
    let urlRet = await getItem('baseurl');
    if (urlRet.value != null) {
      global.baseurl = urlRet.value;
    } else {
      global.baseurl = url;
      await setItem('baseurl', url);
    }

    global.picPrefix = `${global.baseurl}/public/tv_img/`;
    global.tvPrefix = `${global.baseurl}/public/tv/`;
  }
  async initLastView() {
    let lastView = {
      type: 'tv',
      id: null,
      idx: null,
      playTime: null,
      name: null,
    };
    let ret = await getItem('lastView');
    global.showLastView = true;
    if (ret.value == null) {
      await setItem('lastView', lastView);
      global.showLastView = false;
    }
  }
  async initHistory() {
    let history = [];
    let ret = await getItem('history');
    if (ret.value == null) {
      await setItem('history', history);
    }
  }
  async init() {
    await this.initBaseUrl();
    await this.initLastView();
    await this.initHistory();
    let t = setTimeout(() => {
      clearTimeout(t);
      this.props.navigation.navigate('Home');
    }, 2000);
  }
  async componentDidMount() {
    await this.init();
    this.props.navigation.addListener('focus', () => {
      this.props.navigation.navigate('Home');
    });
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#000',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 50, height: 50, marginBottom: 10}}
          source={require('../../assets/loading.gif')}
        />
        <Text style={{color: 'white'}}>加载中...</Text>
      </View>
    );
  }
}
export default Init;
