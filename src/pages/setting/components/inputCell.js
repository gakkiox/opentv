import React from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
class InputCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{flexDirection: "row", marginBottom: 15,}}>
        <View style={{justifyContent: "center", width: 120}}>
          <Text style={{fontSize: 18}}>{this.props.label}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingHorizontal: 20, 
            flex: 1
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onFocus={() => {
              this.input.focus();
            }}>
            <TextInput onChangeText={this.props.changeValue} style={{color: "#000"}} keyboardType="numeric" value={this.props.value} ref={e => (this.input = e)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default InputCell;
