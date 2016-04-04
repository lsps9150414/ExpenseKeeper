import React, {
  Text,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native';

export default class TextSecondary extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
    )
  }
};

var styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'rgba(0,0,0,0.87)'
  }
})
