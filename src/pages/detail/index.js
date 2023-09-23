import React from "react";
import { Text, View, Button, Image, StyleSheet, ScrollView } from "react-native";
import Btn from "../home/components/btn"


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{ name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "恐怖" }, { name: "悬疑" }, { name: "恐怖" },]
    };
  }
  render() {
    let { list } = this.state
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <View style={[styles.container]}>
          <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingHorizontal: 20, marginVertical: 10 }}>
            <Btn title="返回" onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginBottom: 10, paddingHorizontal: 20, width: "100%", }}>
            <View style={{ marginRight: 10 }}>
              <Image style={{ width: 180, height: 250, borderRadius: 5  }} source={{ uri: "https://img.wemp4.com/vod/c/650904f023c21.jpg" }} />
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255, 255,255, 0.8)", padding: 10, borderRadius: 5 }}>
              <Text style={[styles.text]}>海绵宝宝大作战</Text>
              <Text style={[styles.text]}>动画片</Text>
              <Text style={[styles.text]}>87分钟</Text>
              <Text style={[styles.text]}>2004</Text>
              <Text style={[styles.text, {fontSize: 12}]}>
              蟹堡王毗邻本店的二号店即将开张了！海绵宝宝满心期待，以为分店经理一职非自己莫属，然而蟹老板却以他不够成熟为理由，将分店交给章鱼哥打理。同时看着蟹堡王做大的痞老板再出毒计，他偷走了海王星国王的王冠，并嫁祸蟹老板，盛怒的海王星要处死蟹老板，但为了拿回王冠，给忠诚的海绵宝宝和派大星六天时间，让他们去无人能够生还的贝壳城取回王冠。而痞老板得逞后偷走了蟹老板的蟹黄堡配方，生意迅速大热，他趁机把能够操纵思想的头盔赠送给顾客们，要通过控制海洋生物称霸世界。另一面，海绵宝宝和派大星踏上了无厘头又凶险万分的寻冠之路，前往传说中独眼巨人栖息的贝壳城……
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 20, }}>
            <Text style={{marginBottom: 10, fontSize: 18}}>剧集</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                {list.map((item, index) => {
                  return (
                    <View style={{ marginRight: 4 }} key={index}>
                      <Btn title={`${index + 1}`} onPress={() => this.props.navigation.navigate("Player")} />
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={[styles.fullScreen, { zIndex: 1, }]}>
          <Image style={{ width: "100%", height: "100%", opacity: 0.7 }} source={require("../../assets/detail.jpg")} />
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
  text: {
    color: "black", marginBottom: 4, fontSize: 20
  },
})
export default Detail