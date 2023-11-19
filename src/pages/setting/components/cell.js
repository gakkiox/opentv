import React from 'react';
import {Text, Button, TouchableNativeFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class CellComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_focus: false,
    };
  }
  render() {
    let {is_focus} = this.state;
    return (
      <TouchableNativeFeedback
        onFocus={() => {
          this.props.focusCell();
          this.setState({is_focus: true});
        }}
        onBlur={() => {
          this.setState({is_focus: false});
        }}
        onPress={() => {
          this.props.pressCell();
        }}
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: is_focus ? 'white' : 'grey',
          borderRadius: 5,
          marginVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        activeOpacity={1}>
        <View
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: is_focus ? 'white' : 'grey',
            borderRadius: 5,
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: is_focus ? 'grey' : 'white', fontSize: 14}}>
            {this.props.title}
          </Text>
          <Icon
            name="chevron-right"
            color={is_focus ? 'grey' : 'white'}
            size={18}
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default CellComponent;
