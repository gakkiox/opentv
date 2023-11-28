import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

class HintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      title: '',
      color: '#000',
    };
  }

  show(title = '', type = 'success') {
    let t = null;
    t = setTimeout(() => {
      this.setState({
        active: false,
      });
      if (this.view != null) {
        this.view.transitionTo({top: -150});
      }
      clearTimeout(t);
    }, 4000);
    this.setState({
      active: true,
      color: type == 'success' ? '#000' : 'red',
      title,
    });
    this.view.transitionTo({top: 0});
  }
  render() {
    return (
      <Animatable.View
        ref={e => (this.view = e)}
        style={{
          position: 'absolute',
          top: -150,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#fff',
          opacity: 1,
        }}>
        <Icon name="alert-circle" size={24} color={this.state.color} />
        <Text
          style={{
            color: this.state.color,
            fontSize: 18,
            marginLeft: 10,
          }}>
          {this.state.title}
        </Text>
      </Animatable.View>
    );
  }
}
export default HintComponent;
