import React from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class BtnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
    };
  }
  static defaultProps = {
    borderRadius: 0,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 'auto',
    paddingHorizontal: 'auto',
    fontSize: 16,
    color: 'white',
    marginRight: 'auto',
    activeColor: '#297FF8',
    icon: false,
    iconSize: 16,
  };
  render() {
    let {is_focus} = this.state,
      props = this.props;
    function renderIcon() {
      if (!props.icon) return;
      return (
        <Icon
          name={props.icon}
          size={props.iconSize}
          color={is_focus ? props.activeColor : props.color}
          style={{marginRight: 8}}
        />
      );
    }
    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: props.borderRadius,
          borderWidth: props.borderWidth,
          borderColor: props.borderColor,
          backgroundColor: is_focus ? 'white' : props.backgroundColor,
          marginRight: props.marginRight,
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
            {renderIcon()}
            <Text
              style={{
                color: is_focus ? props.activeColor : props.color,
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
