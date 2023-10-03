import React from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';

class BtnComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
    };
  }
  render() {
    let {is_focus} = this.state;
    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'transparent',
          backgroundColor: is_focus ? 'white' : 'transparent',
        }}>
        <TouchableNativeFeedback
          onFocus={() => {
            this.setState({is_focus: true});
          }}
          onBlur={() => {
            this.setState({is_focus: false});
          }}
          onPress={this.props.onPress}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <Text
              style={{
                color: is_focus ? global.theme.color1 : 'white',
                fontSize: 16,
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
