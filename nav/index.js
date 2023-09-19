import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home';  
import Player from '../pages/player';  
import Detail from '../pages/detail';  

const Stack = createNativeStackNavigator ();
  // stack路由配置
  export default function Navigation(){
    return (
      <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>

    )
}