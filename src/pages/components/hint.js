import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class HintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      title: '',
      color: '#52c41a',
    };
  }
  show(title = '', type = 'success') {
    this.setState({
      active: true,
      color: type == 'success' ? '#52c41a' : 'red',
      title,
    });
    setTimeout(() => {
      this.setState({
        active: false,
      });
    }, 4000);
  }
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 100,
          paddingHorizontal: 10,
          paddingVertical: 5,
          opacity: this.state.active ? 1 : 0,
        }}>
        <Icon name="alert-circle" size={22} color={this.state.color} />
        <Text
          style={{
            color: this.state.color,
            fontSize: 18,
            marginLeft: 10,
          }}>
          {this.state.title}
        </Text>
      </View>
    );
  }
}
export default HintComponent;
