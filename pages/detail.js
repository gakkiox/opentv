
import React from "react";
import { Text, View, Button } from "react-native";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <Text>detail</Text>
      </View>
    )
  }
}

export default Detail