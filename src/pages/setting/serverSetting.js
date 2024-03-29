import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {getItem, setItem} from '@/utils/storage';
import InputCell from './components/inputCell';
import Btn from '@/pages/components/btn.js';
import Hint from '@/pages/components/hint.js';
// import * as Updates from 'expo-updates';
import RNRestart from 'react-native-restart';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      port: null,
    };
  }

  async changeUrl() {
    let patern =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (this.state.ip.match(patern) == null) {
      this.hint.show('您输入的IPV4地址不正确', 'red');
      return;
    }
    let numPort = Number(this.state.port);
    if (isNaN(numPort) && 0 < numPort && numPort < 65536) {
      this.hint.show('您输入的端口号不正确，0--65535之间哟', 'red');
      return;
    }
    let url = `http://${this.state.ip}:${this.state.port}`;
    await setItem('baseurl', url);
    this.hint.show('服务器配置成功，两秒后将重启应用');
    setTimeout(() => {
      RNRestart.restart();
    }, 2000);
  }
  async restoreDefault() {
    let url = global.defaulturl;
    await setItem('baseurl', url);
    this.hint.show('默认设置恢复成功，两秒后将重启应用');
    setTimeout(() => {
      RNRestart.restart();
    }, 2000);
  }
  async componentDidMount() {
    let baseurl = await getItem('baseurl');
    if (!baseurl.status) {
      this.hint.show('获取 Storage 数据失败', 'red');
      return;
    }
    let t1 = baseurl.value.split('//')[1];
    this.setState({
      ip: t1.split(':')[0],
      port: t1.split(':')[1],
    });
  }
  render() {
    let {ip, port} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <Hint ref={e => (this.hint = e)} />
        <View style={[styles.container]}>
          <View>
            <Text style={{textAlign: 'center', fontSize: 28}}>服务器设置</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                width: '60%',
                height: 300,
                borderRadius: 5,
                paddingHorizontal: 50,
                paddingVertical: 50,
              }}>
              <View style={{marginBottom: 15}}>
                <InputCell
                  value={ip}
                  label="服务器   IP"
                  changeValue={e => {
                    this.setState({ip: e});
                  }}
                />
              </View>
              <View style={{marginBottom: 25}}>
                <InputCell
                  value={port}
                  label="服务器端口"
                  changeValue={e => {
                    this.setState({port: e});
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Btn
                  style={{
                    width: 100,
                    height: 35,
                    borderRadius: 4,
                    marginRight: 20,
                    ...styles.flexCenter,
                    backgroundColor: 'transparent',
                    color: '#000',
                    borderWidth: 3,
                    borderColor: "#000"
                  }}
                  onPress={this.changeUrl.bind(this)}
                  activeStyle={{
                    backgroundColor: '#59C381',
                    color: '#fff',
                  }}
                  title="确认修改"
                />
                <Btn
                  style={{
                    width: 100,
                    height: 35,
                    borderRadius: 4,
                    ...styles.flexCenter,
                    backgroundColor: 'transparent',
                    color: '#000',
                    borderWidth: 3,
                    borderColor: "#000"
                  }}
                  onPress={this.restoreDefault.bind(this)}
                  activeStyle={{
                    backgroundColor: '#59C381',
                    color: '#fff',
                  }}
                  title="恢复默认"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.fullScreen, {zIndex: 1}]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.4}}
            source={require('@/assets/setting.jpg')}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
    padding: 60,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Setting;
