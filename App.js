import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/nav/index'

function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;