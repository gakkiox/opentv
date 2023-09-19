

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Platform } from 'react-native';
const running_on_tv = Platform.isTV;
console.log(running_on_tv)
AppRegistry.registerComponent(appName, () => App);
