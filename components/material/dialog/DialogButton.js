import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

export default class DialogButton extends Component {
  static propTypes = {
    children:       PropTypes.string.isRequired,
    onPress:        PropTypes.func.isRequired,
    containerStyle: PropTypes.object,
    textStyle:      PropTypes.object,
  }
  render() {
    return (
      <TouchableHighlight
        style={[styles.container, this.props.containerStyle]}
        onPress={this.props.onPress}>
        <Text style={[styles.text, this.props.textStyle]}>{this.props.children.toUpperCase()}</Text>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 2
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#009688',
  }
})
