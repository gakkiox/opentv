import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Init from '@/pages/home/init';
import Home from '@/pages/home/index';
import Player from '@/pages/player/index';
import Detail from '@/pages/detail/index';
import List from '@/pages/list/index';
import Setting from '@/pages/setting/index';
import Iptv from '@/pages/iptv/index';
import serverSetting from '@/pages/setting/serverSetting';
import playTest from '@/pages/setting/playTest';
import otherSetting from '@/pages/setting/otherSetting';
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
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Iptv" component={Iptv} />
      <Stack.Screen name="serverSetting" component={serverSetting} />
      <Stack.Screen name="playTest" component={playTest} />
      <Stack.Screen name="otherSetting" component={otherSetting} />
    </Stack.Navigator>
  );
}
