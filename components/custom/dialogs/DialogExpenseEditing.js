import React, {
  Text,
  View,
  StyleSheet,
  Component
} from 'react-native'

import Modal from 'react-native-modalbox'
import NumberPad from './NumberPad'
import DialogButtonGroup from '../../material/dialog/DialogButtonGroup'
import {
  setTheme,
  MKColor,
  MKRadioButton,
 } from 'react-native-material-kit'

let modalHeight = 0;

export default class DialogExpenseEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spentInput: 0,

    }
  }
  render() {
    // TODO: make clear button work
    return (
      <Modal
        style={[styles.modal, this.props.style]}
        backdrop={this.props.backdrop}
        position={this.props.position}
        animationDuration={200}
        isOpen={this.props.isOpen}>
        <NumberPad
          defaultInput={this.props.defaultSpentAmount}
          getInput={ (input) => {this.setState({spentInput: input})} }
          onLayout={ (e) => {modalHeight += e.nativeEvent.layout.height} }/>
        <DialogButtonGroup
          buttonTexts={['cancel', /*'clear',*/ 'ok']}
          onPressHandlers={[
            this._onCancelHandler.bind(this),
            // this._onClearHandler.bind(this),
            this._onOkHandler.bind(this)
          ]}
          onLayout={ (e) => {modalHeight += e.nativeEvent.layout.height} }/>
      </Modal>
    )
  }
  _onCancelHandler() {
    this.props.closeModal();
  }
  // _onClearHandler() {
  //   this.setState({spentInput: 0});
  // }
  _onOkHandler() {
    this.props.updateSpent(this.state.spentInput);
    this.props.closeModal();
  }
}

let styles = StyleSheet.create({
  modal: {
    position: 'relative',
    width: 280,
    height: modalHeight,
  },
})
