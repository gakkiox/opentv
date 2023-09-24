import React from 'react';
import { Text, View, } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

class HintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    (
      <View style={{
        position: "absolute",
        top: 0, left: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        zIndex: 100,
        width: "100%",
        height: 40
      }}>
        <Icon name="alert-circle" />
        <Text style={{ color: "red" }}>{this.props.msg}</Text>
      </View>
    )
  }
}
export default HintComponent