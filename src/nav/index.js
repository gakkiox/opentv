import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home/index';
import Player from '../pages/player/index';
import Detail from '../pages/detail/index';

const Stack = createNativeStackNavigator();
// stack路由配置
export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}  >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  )
}