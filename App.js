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
