import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {getItem, setItem} from '@/utils/storage';
import { getConfigSpace } from '@/api/index';


global.windowWidth = Dimensions.get('window').width;

class Init extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getSpace(){
    let ret = await getConfigSpace();
    global.base = ret.data;
  }
  async initBaseUrl() {
    let url = 'http://192.168.1.220:7001';
    if (process.env.NODE_ENV == 'development') {
      url = 'http://192.168.1.102:8440';
    }
    global.defaulturl = url;
    let urlRet = await getItem('baseurl');
    if (urlRet.value != null) {
      global.baseurl = urlRet.value;
    } else {
      global.baseurl = url;
      await setItem('baseurl', url);
    }
    global.baseurl = url;
    console.log(global.baseurl)
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
    await this.getSpace();
    await this.initHistory();
    let t = setTimeout(() => {
      clearTimeout(t);
      this.props.navigation.navigate('Home');
    }, 2000);
  }
  async componentDidMount() {
    await this.init()
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
          source={require('@/assets/loading.gif')}
        />
        <Text style={{color: 'white'}}>加载中...</Text>
      </View>
    );
  }
}
export default Init;
