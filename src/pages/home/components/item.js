import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
      theme: global.theme.color1,
    };
  }
  render() {
    let {is_focus, theme} = this.state;
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
          <View>
            <View
              style={{
                marginBottom: 6,
                padding: 6,
                borderWidth: 2,
                borderColor: is_focus ? theme : 'transparent',
                borderRadius: 4,
              }}>
              <Image
                style={{width: 140, height: 200, borderRadius: 4}}
                source={this.props.source}
              />
            </View>
            <View style={{paddingHorizontal: 6}}>
              <Text
                style={{
                  color: is_focus ? theme : 'white',
                  fontSize: 16,
                  width: 140,
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
