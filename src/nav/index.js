import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Init from '../pages/home/init';
import Home from '../pages/home/index';
import Player from '../pages/player/index';
import Detail from '../pages/detail/index';
import Setting from '../pages/setting/index';
import History from '../pages/history/index';
import serverSetting from '../pages/setting/serverSetting';
import playTest from '../pages/setting/playTest';
import otherSetting from '../pages/setting/otherSetting';
import {View, Text} from 'react-native';
const Stack = createNativeStackNavigator();
// stack路由配置
export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Init"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Init" component={Init} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="serverSetting" component={serverSetting} />
      <Stack.Screen name="playTest" component={playTest} />
      <Stack.Screen name="otherSetting" component={otherSetting} />
    </Stack.Navigator>
  );
}
