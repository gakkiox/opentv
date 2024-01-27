import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import Cell from './components/cell.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {clear} from '@/utils/storage';
import Hint from '@/pages/components/hint.js';
import CodePush from 'react-native-code-push';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellKey: 'setting',
    };
    this.cellData = {
      setting: {
        name: 'settings-outline',
        text: '设置页面',
      },
      serverSetting: {
        name: 'finger-print-outline',
        text: '重新设置服务器IP、端口',
      },
      playTest: {
        name: 'film-outline',
        text: '测试视频播放',
      },
      restoreDefault: {
        name: 'extension-puzzle-outline',
        text: '恢复默认',
      },
      checkUpdate: {
        name: 'construct-outline',
        text: '检查更新',
      },
      otherSetting: {
        name: 'cog-outline',
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
  checkAppUpdate() {
    CodePush.notifyAppReady();
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      status => {
        // codePush.SyncStatus.AWAITING_USER_ACTION 1 ： 有更新可用，并向最终用户显示确认对话框。（仅在updateDialog使用时适用）
        // odePush.SyncStatus.DOWNLOADING_PACKAGE 2 ： 在从 CodePush 服务器下载可用更新。
        // codePush.SyncStatus.INSTALLING_UPDATE 3 ： 已下载可用更新并将安装
        // codePush.SyncStatus.UP_TO_DATE 4 ：应用程序已完全更新到配置的部署
        // codePush.SyncStatus.UPDATE_IGNORED 5 ： 应用程序有一个可选更新，最终用户选择忽略该更新。（仅在updateDialog使用时适用）
        // codePush.SyncStatus.UPDATE_INSTALLED 6 ： 已安装可用更新，并将在syncStatusChangedCallback函数返回后立即运行或在下次应用程序恢复/重新启动时运
        // codePush.SyncStatus.SYNC_IN_PROGRESS 7: 正在进行的sync操作阻止当前调用的执行。
        // codePush.SyncStatus.UNKNOWN_ERROR -1 ： 同步操作发现未知错误。
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            ToastAndroid.show(
              '正在从 CodePush 服务器下载可用更新',
              ToastAndroid.SHORT,
            );
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            ToastAndroid.show(
              '有更新可用，已下载可用更新并将安装',
              ToastAndroid.SHORT,
            );
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            ToastAndroid.show('当前已经是最新版本', ToastAndroid.SHORT);
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            ToastAndroid.show('最新版本已安装', ToastAndroid.SHORT);
            break;

          default:
            break;
        }

        console.log(status);
      },
      // ({receivedBytes, totalBytes}) => {
      //   // 计算出下载百分比
      //   const percent = Math.floor((receivedBytes / totalBytes) * 100);
      // },
    ).catch(error => {
      console.log(JSON.stringify(error));
    });
  }
  clearAppUpdate() {
    CodePush.clearUpdates();
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
                  title="检查更新"
                  focusCell={() => this.focusCellHandle('checkUpdate')}
                  pressCell={this.checkAppUpdate.bind(this)}
                />
                <Cell
                  title="其他设置"
                  focusCell={() => this.focusCellHandle('otherSetting')}
                  pressCell={() => {
                    this.props.navigation.navigate('otherSetting');
                  }}
                />
                <Cell
                  title="清除所有本地数据"
                  focusCell={() => this.focusCellHandle('restoreDefault')}
                  pressCell={this.restoreDefault.bind(this)}
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
