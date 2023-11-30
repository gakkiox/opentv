import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/nav/index';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer style={{zIndex: 1}}>
        <Navigation />
      </NavigationContainer>
    );
  }
}

export default App;
