import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/nav/index';
import CodePush from 'react-native-code-push';
let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  render() {
    return (
      <NavigationContainer style={{zIndex: 1}}>
        <Navigation />
      </NavigationContainer>
    );
  }
}

export default CodePush(CodePushOptions)(App);
/**
 * appcenter
```
添加React-Native app
appcenter apps create -d opentv -o Android -p React-Native
appcenter apps create -d opentv -o iOS -p React-Native
添加环境
appcenter codepush deployment add -a gakkiox-outlook.com/opentv Staging
appcenter codepush deployment add -a gakkiox-outlook.com/opentv Production
查看环境
appcenter codepush deployment list -k -a gakkiox-outlook.com/opentv
上传更新到Production
appcenter codepush release-react -a gakkiox-outlook.com/opentv -d Production
```
 */