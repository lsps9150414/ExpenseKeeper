import React, {
  Text,
  View,
  TouchableHighlight,
  Component
} from 'react-native'

export default class TestComponent extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => {this.props.onPress()} }>
        <Text>click me</Text>
      </TouchableHighlight>
    )
  }
}
