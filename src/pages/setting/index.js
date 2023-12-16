import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import Cell from './components/cell.js';
import Icon from 'react-native-vector-icons/Feather';
import {clear} from '@/utils/storage';
import Hint from '@/pages/components/hint.js';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellKey: 'setting',
    };
    this.cellData = {
      setting: {
        name: 'settings',
        text: '设置页面',
      },
      serverSetting: {
        name: 'server',
        text: '重新设置服务器IP、端口',
      },
      playTest: {
        name: 'film',
        text: '测试视频播放',
      },
      restoreDefault: {
        name: 'sunset',
        text: '恢复默认',
      },
      otherSetting: {
        name: 'sliders',
        text: '设置其他内容',
      },
    };
  }
  focusCellHandle(key) {
    this.setState({
      cellKey: key,
    });
  }
  async restoreDefault() {
    await clear();
    this.hint.show('恢复设置成功！');
  }
  render() {
    let {cellKey} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <Hint ref={e => (this.hint = e)} />
        <View
          style={{
            height: '100%',
            width: '100%',
            padding: 30,
            position: 'relative',
            zIndex: 10,
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={{color: 'white', fontSize: 30}}>设置</Text>
          </View>
          <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
            <View style={{flex: 0.6, padding: 20}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Cell
                  title="服务器设置"
                  focusCell={() => this.focusCellHandle('serverSetting')}
                  pressCell={() => {
                    this.props.navigation.navigate('serverSetting');
                  }}
                />
                <Cell
                  title="播放测试"
                  focusCell={() => this.focusCellHandle('playTest')}
                  pressCell={() => {
                    this.props.navigation.navigate('playTest');
                  }}
                />
                <Cell
                  title="所有设置恢复默认"
                  focusCell={() => this.focusCellHandle('restoreDefault')}
                  pressCell={this.restoreDefault.bind(this)}
                />
                <Cell
                  title="其他设置"
                  focusCell={() => this.focusCellHandle('otherSetting')}
                  pressCell={() => {
                    this.props.navigation.navigate('otherSetting');
                  }}
                />
              </ScrollView>
            </View>
            <View style={{flex: 0.4}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <Icon name={this.cellData[cellKey].name} size={130} />
                <Text style={{color: 'white', fontSize: 20, marginTop: 20}}>
                  {this.cellData[cellKey].text}
                </Text>
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
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Setting;
