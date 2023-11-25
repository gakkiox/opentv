import React, {useRef} from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';

class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
      ImageScaleAnim: new Animated.Value(0),
    };
  }

  ImageScale = {
    ImageScaleFadeIn: () => {
      Animated.timing(ImageScaleAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    },
    ImageScaleFadeOut: () => {
      Animated.timing(ImageScaleAnim, {
        toValue: 30,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    },
  };

  render() {
    let {is_focus} = this.state;
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: 'transparent',
        }}>
        <TouchableOpacity
          onFocus={() => {
            this.setState({is_focus: true});
          }}
          onBlur={() => {
            this.setState({is_focus: false});
          }}
          onPress={this.props.onPress}
          activeOpacity={1}>
          <View
            style={{
              backgroundColor: is_focus ? 'white' : 'transparent',
              padding: 6,
              alignItems: 'center',
            }}>
            <View
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: 140,
                height: 195,
                zIndex: 20,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 4,

                  transform: [{scale: is_focus ? 1.3 : 1}],
                }}
                source={this.props.source}
              />
              <View
                style={{
                  position: 'absolute',
                  zIndex: 40,
                  bottom: 1,
                  right: 10,
                }}>
                <Text style={{fontSize: 16, color: '#fff200'}}>
                  {this.props.score}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 6}}>
              <Text
                style={{
                  color: is_focus ? 'black' : 'white',
                  fontSize: 18,
                  width: 140,
                  textAlign: 'center',
                }}>
                {this.props.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ItemComponent;
