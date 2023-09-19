

import React from "react";
import { Text, View, Button, } from "react-native";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <Text>home</Text>

      </View>
    )
  }
}

export default Home