import React from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';

class BtnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
    };
  }
  static defaultProps = {
    borderRadius: 0,
    borderColor: "transparent",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: "auto",
    paddingHorizontal: "auto",
    fontSize: 16,
    color: "white",
    marginRight: "auto"
  };
  render() {
    let {is_focus} = this.state,
      props = this.props;
    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: props.borderRadius,
          borderWidth: props.borderWidth,
          borderColor: props.borderColor,
          backgroundColor: is_focus ? 'white' : props.backgroundColor,
          marginRight: props.marginRight
        }}>
        <TouchableNativeFeedback
          onFocus={() => {
            this.setState({is_focus: true});
          }}
          onBlur={() => {
            this.setState({is_focus: false});
          }}
          onPress={props.onPress}>
          <View
            style={{
              paddingVertical: props.paddingVertical,
              paddingHorizontal: props.paddingHorizontal,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <Text
              style={{
                color: is_focus ? global.theme.color1 : props.color,
                fontSize: props.fontSize,
                marginRight: 4,
              }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default BtnComponent;
