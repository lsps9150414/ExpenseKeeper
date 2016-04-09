import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import DialogButton from './DialogButton'

export default class DialogButtonGroup extends Component {

  static propTypes = {
    buttonTexts:      PropTypes.array.isRequired,
    onPressHandlers:  PropTypes.array.isRequired,
    style:            PropTypes.object,
  }
  render() {
    let buttonGroup = [];
    for (let i = 0; i < this.props.buttonTexts.length; i++) {
      buttonGroup.push(
        <DialogButton
          key={i}
          onPress={this.props.onPressHandlers[i]}>
          {this.props.buttonTexts[i]}
        </DialogButton>
      )
    };
    return (
      <View style={[styles.container, this.props.style]}>{buttonGroup}</View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row'
  }
})
