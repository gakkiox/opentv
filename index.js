import {AppRegistry, Dimensions} from 'react-native';
import {getItem, setItem} from './src/utils/storage.js';
import App from './App';
import {name as appName} from './app.json';
global.theme = {
  color1: '#297FF8',
  color2: '#fed854',
};
let baseurl = 'http://192.168.1.20:7001';

global.windowWidth = Dimensions.get('window').width;
(async () => {
  let urlRet = await getItem('baseurl');
  if (urlRet.value != null) {
    global.baseurl = urlRet.value;
  } else {
    global.baseurl = baseurl;
    await setItem('baseurl', baseurl);
  }
})();
AppRegistry.registerComponent(appName, () => App);
