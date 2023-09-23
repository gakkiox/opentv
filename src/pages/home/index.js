import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Btn from "./components/btn";
import HeadBtn from "./components/headBtn";
import Item from "./components/item";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{ name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" },]
    };
  }
  imageload(e) {
    console.log(e)
  }
  render() {
    let { list } = this.state
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <View style={[styles.container]}>
          <View style={[styles.head]}>
            <View>
              <HeadBtn title="电视剧"></HeadBtn>
            </View>
            <View >
              <HeadBtn title="电影" onPress={() => { console.log("sss") }} ></HeadBtn>
            </View>
            <View >
              <HeadBtn title="设置" ></HeadBtn>
            </View>
          </View>
          <View style={{ paddingVertical: 8 }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {list.map((item, index) => {
                return (
                  <View key={index}>
                    <Btn title={item.name} />
                  </View>
                )
              })}
            </ScrollView>

          </View>
          <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>

            <View style={{ flex: 1, display: "flex", flexDirection: "row", paddingHorizontal: 10 }}>
              <ScrollView style={{ height: "100%", width: "100%", }} showsVerticalScrollIndicator={false}>
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                  {list.map((item, index) => {
                    return (
                      <View key={index} style={{ marginBottom: 10 }}>
                        <Item
                          source={{ uri: "https://img.wemp4.com/vod/a/5de91e79b61d7.jpg" }}
                          onPress={() => this.props.navigation.navigate("Detail")}
                          title={item.name} />
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={[styles.fullScreen, { zIndex: 1, }]}>
          <Image style={{ width: "100%", height: "100%", opacity: 0.4 }} source={require("../../assets/home.jpg")} />
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
  head: {
    width: "100%", paddingVertical: 6, display: "flex", flexDirection: "row"
  }
})
export default Home