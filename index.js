/**
 * @format
 */

import { AppRegistry, Dimensions } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
global.theme = {
  color1: "#297FF8",
  color2: "#fed854",
}
global.baseurl = "http://192.168.1.10:7001";
global.windowWidth = Dimensions.get("window").width
AppRegistry.registerComponent(appName, () => App);
