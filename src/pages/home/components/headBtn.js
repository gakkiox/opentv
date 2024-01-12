import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

class HeadBtnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
      theme: "#fed854",
    };
  }
  render() {
    let {is_focus, theme} = this.state;
    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 20,
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
          activeOpacity={1}
          onPress={this.props.onPress}>
          <View
            style={{
              width: 90,
              height: 45,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <View
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 0,
                backgroundColor: is_focus ? theme : 'transparent',
                width: '50%',
                height: 3,
                marginLeft: -20,
                borderRadius: 2,
              }}></View>
            <Text
              style={{
                color: is_focus ? theme : 'white',
                fontSize: is_focus ? 20 : 16,
                marginRight: 4,
              }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HeadBtnComponent;
