import React from "react";
import { View, StyleSheet, ScrollView, Image, FlatList, Text } from "react-native";
import Btn from "./components/btn";
import HeadBtn from "./components/headBtn";
import Item from "./components/item";
import Hint from "../components/hint";
import { getTeleplayClassify, getMovieClassify, getTeleplayList, getMovieList } from "../api/index"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classify_list: [],
      tv_class: [],
      movie_class: [],
      current_show: "teleplay",
      list: [],
      data_total: 0,
      offset: 1
    };
    this.numColumns = Math.floor((global.windowWidth - 100) / 140);
    this.limit = 20;
    this.baseurl = global.baseurl;
  }

  async toggleMovie() {
    let state = this;
    if (state.current_show == "movie") {
      return;
    }
    try {
      let ret = await getMovieList({ limit: this.limit, offset: 1 });
      state.list = ret.data.rows;
      state.data_total = ret.data.total;
      state.current_show = "movie";
      this.setState(state);
    } catch (e) {
      let msg = `获取电影列表失败`;
      console.log(e, msg);
    }

  }
  async toggleTv() {
    let state = this;
    if (state.current_show == "teleplay") {
      return;
    }
    try {
      let ret = await getTeleplayList({ limit: this.limit, offset: 1 });
      state.list = ret.data.rows;
      state.data_total = ret.data.total;
      state.current_show = "teleplay";
      this.setState(state);
    } catch (e) {
      let msg = `获取电视剧列表失败`;
      console.log(e, msg);
    }

  }
  async endReached() {
    let state = this.state;
    try {
      ++state.offset;
      if (state.current_show == "teleplay") {
        let ret = await getTeleplayList({ limit: this.limit, offset: state.offset });
        state.list = state.list.concat(ret.data.rows);
      }else{
        let ret = await getMovieList({ limit: this.limit, offset: state.offset });
        state.list = state.list.concat(ret.data.rows);
      }
      this.setState(state);
    } catch (e) {
      let msg = `获取影视列表失败`;
      console.log(e, msg);
    }

  }
  async componentDidMount() {
    let state = this;
    console.log("componentDidMounts")
    try {
      let ret1 = await getTeleplayClassify();
      let ret2 = await getMovieClassify();
      let ret3 = await getTeleplayList({ limit: this.limit, offset: 1 });
      state.list = ret3.data.rows;
      state.data_total = ret3.data.total;
      state.tv_class = ret1.data;
      state.movie_class = ret2.data;
      state.classify_list = ret2.data;
      this.setState(state);
    } catch (e) {
      let msg = `获取数据失败`;
      console.log(msg);
    }
  }

  renderHeader() {
    let { classify_list } = this.state
    if (this.state.current_show == "teleplay") {
      return <View></View>
    }
    return (
      <View style={{ paddingVertical: 8 }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {classify_list.map((item, index) => {
            return (
              <View key={index}>
                <Btn title={item.name} />
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
  renderItem(item) {
    return (
      <View style={{ marginBottom: 10 }}>
        <Item
          source={{ uri: `${this.baseurl}/public/` + item.pic }}
          onPress={() => this.props.navigation.navigate("Detail", { id: item.id, type: this.state.current_show })}
          title={item.name} />
      </View>
    )
  }
  render() {
    let { list } = this.state
    return (
      <View style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "black" }}>
        <View style={[styles.container]}>
          <View style={[styles.head]}>
            <View>
              <HeadBtn title="电视剧" onPress={this.toggleTv.bind(this)}></HeadBtn>
            </View>
            <View >
              <HeadBtn title="电影" onPress={this.toggleMovie.bind(this)} ></HeadBtn>
            </View>
            <View >
              <HeadBtn
                title="设置"
                onPress={() => this.props.navigation.navigate("Setting")}
              >
              </HeadBtn>
            </View>
          </View>
          {this.renderHeader()}
          <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <FlatList
              onEndReachedThreshold={1}
              showsVerticalScrollIndicator={false}
              numColumns={this.numColumns}
              data={list}
              onEndReached={this.endReached.bind(this)}
              renderItem={({ item }) => this.renderItem(item)}
            />
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
    height: "100%", 
    width: "100%", 
    display: "flex", 
    flexDirection: "column",
    position: "relative", 
    zIndex: 10
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  head: {
    width: "100%", 
    paddingVertical: 6, 
    display: "flex", 
    flexDirection: "row"
  }
})
export default Home