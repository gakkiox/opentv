import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import Video from "../components/video"
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
    return (
      <View>
        <Video source={{uri: "uri"}} />
      </View>
    )
  }
}export default Test;