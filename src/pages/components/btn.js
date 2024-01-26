import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class BtnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
    };
  }
  static defaultProps = {
    onPress: () => { },
    title: 'none',
    icon: 'none',
    iconStyle: {},
    style: {},
    activeStyle: {},
  };
  focusHandle() {
    this.setState({ is_focus: true });
  }
  blurHandle() {
    this.setState({ is_focus: false });
  }
  render() {
    let { is_focus } = this.state;
    let { icon, style, activeStyle, title, onPress, iconStyle } = this.props;
    activeStyle.color = activeStyle?.color ?? '#59C381';
    activeStyle.backgroundColor = activeStyle?.backgroundColor ?? "#fff";
    style.backgroundColor = style?.backgroundColor ?? '#9B9B9B';
    function renderIcon() {
      if (icon == 'none') return;
      return <Icon name={icon} size={iconStyle.fontSize} color={is_focus ? activeStyle.color : iconStyle.color} />;
    }
    return (
      <TouchableOpacity
        onFocus={this.focusHandle.bind(this)}
        onBlur={this.blurHandle.bind(this)}
        activeOpacity={1}
        style={{
          ...style,
          backgroundColor: is_focus ? activeStyle.backgroundColor : style.backgroundColor,
        }}
        onPress={onPress}>
        {renderIcon()}
        {
          (() => {
            if (title != 'none') {
              return <Text
                style={{
                  color: is_focus ? activeStyle.color : style.color,
                }}>
                {title}
              </Text>
            }
          })()
        }
      </TouchableOpacity>
    );
  }
}

export default BtnComponent;
