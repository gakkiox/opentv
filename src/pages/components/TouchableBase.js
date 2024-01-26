import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

class TouchableBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {is_focus: false};
  }
  static defaultProps = {
    style: {},
    onPress: () => {},
  };
  focusHandle() {
    this.setState({is_focus: true});
  }
  blurHandle() {
    this.setState({is_focus: false});
  }
  renderContent() {}
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        onFocus={this.focusHandle.bind(this)}
        onBlur={this.blurHandle.bind(this)}>
        {this.renderContent()}
      </TouchableOpacity>
    );
  }
}
export default TouchableBase;
