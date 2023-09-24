import React from "react";
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import Hint from "../components/hint";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      is_focus: false
    };
  }
  changeHandle(text) {
    this.setState({
      ip: text,
    })
  }
  focusHandle() {
    this.ipinput.focus();
  }
  pressHandle(){
    global.ip = this.state.ip;
  }
  componentDidMount(){
    this.setState({
      ip: global.ip
    })
  }
  render() {
    let { ip } = this.state;
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <Hint />
        <View style={[styles.container]}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 4,
            paddingHorizontal: 20
          }}>
            <View>
              <Text style={{ color: "black" }}>服务器IP</Text>
            </View>
            <TouchableOpacity
              onFocus={this.focusHandle.bind(this)}
              activeOpacity={1}
              style={{ flex: 1, marginHorizontal: 10 }}>
              <TextInput
                ref={e => this.ipinput = e}
                keyboardType="numeric"
                onChangeText={this.changeHandle.bind(this)} value={ip}
                style={{ color: "black", width: "100%" }} />
            </TouchableOpacity>
            <View>
              <Button onPress={this.pressHandle.bind(this)} title="修改" />
            </View>
          </View>
        </View>
        <View style={[styles.fullScreen, { zIndex: 1, }]}>
          <Image style={{ width: "100%", height: "100%", opacity: 0.4 }} source={require("../../assets/setting.jpg")} />
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    height: "100%", width: "100%", display: "flex", flexDirection: "column",
    position: "relative", zIndex: 10, padding: 60
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
export default Setting