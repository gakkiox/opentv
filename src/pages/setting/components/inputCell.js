import React from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
class InputCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {is_focus: false};
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderColor: this.state.is_focus ? 'white' : 'black',
        }}>
        <View style={{justifyContent: 'center', width: 120}}>
          <Text style={{fontSize: 18, color: 'black'}}>{this.props.label}</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onBlur={() => {
              this.setState({is_focus: false});
            }}
            onFocus={() => {
              this.input.focus();
              this.setState({is_focus: true});
            }}>
            <TextInput
            selectionColor="white"
              onBlur={() => {
                this.setState({is_focus: false});
              }}
              onFocus={() => {
                this.setState({is_focus: true});
              }}
              onChangeText={this.props.changeValue}
              style={{color: '#000'}}
              keyboardType="numeric"
              value={this.props.value}
              ref={e => (this.input = e)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default InputCell;
