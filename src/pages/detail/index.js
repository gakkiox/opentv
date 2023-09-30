import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { getTeleplayDetail, getMovieDetail } from "../api/index";
import Hint from "../components/hint.js";
import Btn from "../components/btn";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film_data: { teleplay_list: [] }
    };
    this.baseurl = global.baseurl;
  }
  async componentDidMount() {
    try {
      let state = this.state;
      let { current_show, id } = this.props.route.params;
      if (current_show == "teleplay") {
        let ret = await getTeleplayDetail({ id });
        state.film_data = ret.data;
      } else {
        let ret2 = await getMovieDetail({ id });
        state.film_data = ret2.data;
      }
      this.hint.show("获取数据成功");
      this.setState(state);
    } catch (e) {
      let msg = `获取影视详细信息失败`;
      this.hint.show(msg, "red");
      console.log(e, msg);
    }

  }
  renderPlaylist() {
    let { current_show } = this.props.route.params;
    let { film_data } = this.state;
    if (current_show == "teleplay") {
      return (
        <View>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>剧集</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              {film_data.teleplay_list.map((item, index) => {
                return (
                  <View style={{ marginRight: 4 }} key={index}>
                    <Btn title={`${index + 1}`} onPress={() => this.props.navigation.navigate("Player", {
                      tv_id: film_data.id,
                      idx: item.idx,
                      current_show
                    })} />
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Btn title="立即播放" />
      </View>
    )
  }
  render() {
    let { film_data } = this.state
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <Hint ref={e => this.hint = e} />
        <View style={[styles.container]}>
          <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingHorizontal: 20, marginVertical: 10 }}>
            <Btn title="返回" onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginBottom: 10, paddingHorizontal: 20, width: "100%", }}>
            <View style={{ marginRight: 10 }}>
              <Image style={{ width: 180, height: 250, borderRadius: 5 }} source={{ uri: `${this.baseurl}/public/tv_img/` + film_data.pic }} />
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255, 255,255, 0.8)", padding: 10, borderRadius: 5 }}>
              <Text style={{ color: "black", fontSize: 22 }}>{film_data.name}</Text>
              <Text style={{ color: "black", fontSize: 14 }}>{this.props.route.params.current_show == "teleplay" ? "电视剧" : "电影"}</Text>
              <Text style={{ color: "black", fontSize: 14 }}>{film_data.actors}</Text>
              <Text style={{ color: "black", fontSize: 14 }}>{film_data.score}</Text>
              <Text style={{ fontSize: 12, color: "black" }}>
                {film_data.desc}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", paddingHorizontal: 20, }}>
            {this.renderPlaylist()}
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
})
export default Detail