import React from 'react';
import {View, Text, Dimensions} from 'react-native';
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
  async init() {
    let url = 'http://192.168.1.220:7002';
    global.defaulturl = url;
    let urlRet = await getItem('baseurl');
    if (urlRet.value != null) {
      global.baseurl = urlRet.value;
    } else {
      global.baseurl = url;
      await setItem('baseurl', baseurl);
    }
   let t = setTimeout(()=>{
    clearTimeout(t);
    this.props.navigation.navigate("Home");
   }, 2000)
  }
  componentDidMount() {
    this.init();
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
        <Text style={{color: 'white'}}>加载中...</Text>
      </View>
    );
  }
}
export default Init;
