import React from "react";
import { Text, View, Button, StyleSheet, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{ name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" },]
    };
  }
  render() {
    let { list } = this.state
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <View style={[styles.container]}>
          <View style={[styles.head]}>
            <View style={[styles.headBtn]}>
              <Button title="电视剧" onPress={() => { }} />
            </View>
            <View style={[styles.headBtn]}>
              <Button title="电影" onPress={() => { }} />
            </View>
            <View style={[styles.headBtn]}>
              <Icon.Button
                name="settings"
                backgroundColor="#3b5998"
                onPress={this.loginWithFacebook}
              >
                设置
              </Icon.Button>

            </View>
          </View>
          <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <View style={{ width: 100, height: "100%" }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {list.map((item, index) => {
                  return (
                    <View style={{}} key={index}>
                      <Button title={item.name} onPress={() => { }} />
                    </View>
                  )
                })}
              </ScrollView>

            </View>
            <View style={{ flex: 1, display: "flex", flexDirection: "row", paddingHorizontal: 10 }}>
              <ScrollView style={{ height: "100%", width: "100%", }} showsVerticalScrollIndicator={false}>
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                  {list.map((item, index) => {
                    return (
                      <View style={{ marginRight: 10, marginBottom: 10 }} key={index}>
                        <Image style={{ width: 180, height: 250, marginBottom: 10 }} source={{ uri: "https://img.wemp4.com/vod/c/650904f023c21.jpg" }} />
                        <Button title={item.name} onPress={() => this.props.navigation.navigate("Detail")} />
                      </View>
                    )
                  })}
                </View>

              </ScrollView>
            </View>
          </View>
        </View>
        <View style={[styles.fullScreen, { zIndex: 1, }]}>
          <Image style={{ width: "100%", height: "100%", opacity: 0.4 }} source={require("../assets/home.jpg")} />
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    height: "100%", width: "100%", display: "flex", flexDirection: "column",
    position: "relative", zIndex: 10
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headBtn: {
    marginHorizontal: 10
  },
  head: {
    width: "100%", paddingVertical: 8, display: "flex", flexDirection: "row"
  }
})
export default Home