import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TouchableBase from '@/pages/components/TouchableBase';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

class TouchableItem extends TouchableBase {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    ...TouchableBase.defaultProps,
    colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
    title: 'none',
    icon: 'none',
    uri: 'none',
    desc: 'none',
    score: 'none',
  };
  renderContent() {
    let {is_focus} = this.state;
    let {title, icon, uri, desc, colors, style, score} = this.props;
    let width = style?.width ?? 115;
    let height = style?.height ?? 163;
    return (
      <View
        style={[styles.flexCenter, {width: width + 20, height: height + 44}]}>
        <Animatable.View
          transition={['width', 'height']}
          duration={500}
          style={{
            width: is_focus ? width + 12 : width,
            height: is_focus ? height + 10 : height,
            backgroundColor: '#4CBB46',
            borderRadius: 4,
            marginBottom: 1,
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={colors}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{
              width: '100%',
              height: '100%',
              ...styles.flexCenter,
              position: 'relative',
            }}>
            {(() => {
              if (icon != 'none') {
                return <Icon name={icon} size={30} color="#fff" />;
              }
            })()}
            {(() => {
              if (uri != 'none') {
                return (
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri}}
                  />
                );
              }
            })()}
            {(() => {
              if (score != 'none') {
                return (
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        textAlign: 'right',
                        paddingRight: 4,
                        paddingBottom: 4,
                        color: '#fff',
                        fontFamily: 'DIN-BoldItalic',
                      }}>
                      {score}
                    </Text>
                  </LinearGradient>
                );
              }
            })()}
          </LinearGradient>
        </Animatable.View>
        <View>
          {(() => {
            if (title != 'none') {
              return (
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 1,
                    height: 14,
                    overflow: 'hidden',
                  }}>
                  {title}
                </Text>
              );
            }
          })()}
          {(() => {
            if (desc != 'none') {
              return <Text style={{fontSize: 10, marginTop: 1}}>{desc}</Text>;
            }
          })()}
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
});
export default TouchableItem;