import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import Hint from '../components/hint';
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <Hint ref={e => (this.hint = e)} />
        <View style={[styles.container]}>
          <Text>Hitory</Text>
        </View>
        <View style={[styles.fullScreen, {zIndex: 1}]}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.4}}
            source={require('../../assets/setting.jpg')}
          />
        </View>
      </View>
    )
  }
};
var styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 10,
    padding: 60,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default History;