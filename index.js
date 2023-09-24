/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
global.theme = {
  color1: "#297FF8",
  color2: "#fed854",
}
global.baseurl = "http://192.168.1.102:7001";

AppRegistry.registerComponent(appName, () => App);
