import React from "react";
import { Text, View, Button, StyleSheet, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={[styles.container]}>
        <View style={[styles.head]}>
          <View style={[styles.headBtn]}>
            <Button title="电视剧" onPress={() => { }} />
          </View>
          <View style={[styles.headBtn]}>
            <Button title="电影" onPress={() => { }} />
          </View>
          <View style={[styles.headBtn]}>
            <Button title="设置" onPress={() => { }} />
            <Icon name="rocket" size={30} color="#900" />
          </View>
        </View>
        <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          <View style={{ width: 100, height: "100%" }}>
            <ScrollView >
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
            <ScrollView style={{ height: "100%", width: "100%", }}>
              <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {list.map((item, index) => {
                  return (
                    <View style={{ marginRight: 10, marginBottom: 10 }} key={index}>
                      <Image style={{ width: 180, height: 250, marginBottom: 10 }} source={{ uri: "https://img.wemp4.com/vod/c/650904f023c21.jpg" }} />
                      <Button title={item.name} onPress={ ()=>this.props.navigation.navigate("Detail")} />
                    </View>
                  )
                })}
              </View>

            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    height: "100%", width: "100%", display: "flex", flexDirection: "column"
  },
  headBtn: {
    marginHorizontal: 10
  },
  head: {
    width: "100%", paddingVertical: 8, display: "flex", flexDirection: "row"
  }
})
export default Home