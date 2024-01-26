import React from 'react';
import {View, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import Btn from '@/pages/components/btn';
import Library from '@/pages/home/library';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showType: 'Home',
    };
    this.tvPicPrefix = global.base.public_tv_img;
    this.moviePicPrefix = global.base.public_movie_img;
  }
  componentDidMount() {
    let state = this.state;
    this.btn1.focusHandle();
    this.setState(state);
  }
  changeShow(type) {
    this.setState({
      showType: type,
    });
    this.props.navigation.navigate(type);
  }
  render() {
    let state = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'black',
        }}>
        <ScrollView
          style={{width: '100%', position: 'relative', zIndex: 10}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={[
                {
                  backgroundColor: '#1D1D1D',
                  borderRadius: 40,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                },
              ]}>
              <Btn
                title="媒体库"
                onPress={this.changeShow.bind(this, 'Home')}
                style={{...styles.headBtn, ...styles.flexCenter}}
                activeStyle={{color: '#222'}}
                ref={e => (this.btn1 = e)}
              />
              <Btn
                title="IPTV"
                onPress={this.changeShow.bind(this, 'Iptv')}
                style={{...styles.headBtn, ...styles.flexCenter}}
                activeStyle={{color: '#222'}}
              />
              <Btn
                title="设置"
                onPress={this.changeShow.bind(this, 'Setting')}
                style={{...styles.headBtn, ...styles.flexCenter}}
                activeStyle={{color: '#222'}}
              />
            </View>
          </View>
          <Library nav={this.props.navigation} />
        </ScrollView>
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}>
          <Image
            style={{width: '100%', height: '100%', opacity: 0.6}}
            source={require('@/assets/home.jpg')}
          />
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headBtn: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    borderRadius: 40,
    margin: 3,
    overflow: 'hidden',
    paddingVertical: 4,
  },
});
export default Home;
