import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {getItem, setItem} from '@/utils/storage';
import {getConfigSpace} from '@/api/index';
import * as Animatable from 'react-native-animatable';
global.windowWidth = Dimensions.get('window').width;

class Init extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getSpace() {
    let ret = await getConfigSpace();
    console.log(ret.data);
    global.base = ret.data;
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
    global.baseurl = url;
    console.log(global.baseurl);
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
    await this.init();
    this.props.navigation.addListener('focus', () => {
      this.props.navigation.navigate('Home');
    });
  }
  render() {
    let rotateRing1 = {
      from: {
        rotateX: '50deg',
        rotateZ: '110deg',
      },
      to: {
        rotateX: '50deg',
        rotateZ: '470deg',
      },
    };
    let rotateRing2 = {
      from: {
        rotateX: '20deg',
        rotateY: '50deg',
        rotateZ: '20deg',
      },
      to: {
        rotateX: '20deg',
        rotateY: '50deg',
        rotateZ: '380deg',
      },
    };
    let rotateRing3 = {
      from: {
        rotateX: '40deg',
        rotateY: '130deg',
        rotateZ: '450deg',
      },
      to: {
        rotateX: '40deg',
        rotateY: '130deg',
        rotateZ: '90deg',
      },
    };
    let rotateRing4 = {
      from: {
        rotateX: '70deg',
        rotateZ: '270deg',
      },
      to: {
        rotateX: '70deg',
        rotateZ: '630deg',
      },
    };
    return (
      <View
        style={{
          backgroundColor: '#000',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.loadingContent}>
          <Animatable.View
            animation={rotateRing1}
            duration={2000}
            easing="linear"
            iterationCount="infinite"
            style={styles.ring1}></Animatable.View>
          <Animatable.View
            animation={rotateRing2}
            duration={2000}
            easing="linear"
            iterationCount="infinite"
            style={styles.ring2}></Animatable.View>
          <Animatable.View
            animation={rotateRing3}
            duration={2000}
            easing="linear"
            iterationCount="infinite"
            style={styles.ring3}></Animatable.View>
          <Animatable.View
            animation={rotateRing4}
            duration={2000}
            easing="linear"
            iterationCount="infinite"
            style={styles.ring4}></Animatable.View>
          <Text style={{color: 'white'}}>加载中...</Text>
        </View>
      </View>
    );
  }
}

let ringStyle = {
  width: 190,
  height: 190,
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 95,
  position: 'absolute',
  borderBottomWidth: 8,
};
var styles = StyleSheet.create({
  loadingContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ring1: {
    ...ringStyle,
    borderBottomColor: 'rgb(255, 141, 249)',
  },
  ring2: {
    ...ringStyle,
    borderBottomColor: 'rgb(255, 65, 106)',
  },
  ring3: {
    ...ringStyle,
    borderBottomColor: 'rgb(0, 255, 255)',
  },
  ring4: {
    ...ringStyle,
    borderBottomColor: 'rgb(252, 183, 55)',
  },
});
export default Init;
