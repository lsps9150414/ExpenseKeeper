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

export default class DialogBudgetEditing extends Component {
  static propTypes = {
  }
  constructor() {
    super();
    this.state = {
      budgetInput: 0,
    }
    this.radioGroup = new MKRadioButton.Group();
  }

  render() {
    // FIXME: Unkonw warning: seState on an unmounted component when changing budget Timeframe.
    return (
      <Modal
        style={[styles.modal, this.props.style]}
        backdrop={this.props.backdrop}
        position={this.props.position}
        animationDuration={200}
        isOpen={this.props.isOpen}>
        <View
          style={styles.radioButtonAreaContainer}
          onLayout={ (e) => {modalHeight += e.nativeEvent.layout.height} }>
          <View style={styles.radioButtonContainer}>
            <MKRadioButton
              checked={this.props.defaultBudgetTimeframe == 'month'}
              group={this.radioGroup}
              onCheckedChange={(arg) => {
                arg.checked && this.setState({budgetTimeframe: 'month'});
              }}/>
            <Text>Monthly</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <MKRadioButton
              checked={this.props.defaultBudgetTimeframe == 'year'}
              group={this.radioGroup}
              onCheckedChange={(arg) => {
                arg.checked && this.setState({budgetTimeframe: 'year'});
              }}/>
            <Text>Yearly</Text>
          </View>
        </View>
        <NumberPad
          defaultInput={this.props.defaultBudgetAmount}
          getInput={ (input) => {this.setState({budgetInput: input})} }
          onLayout={ (e) => {modalHeight += e.nativeEvent.layout.height} }/>
        <DialogButtonGroup
          buttonTexts={['cancel', 'disable', 'ok']}
          onPressHandlers={[
            this._onCancelHandler.bind(this),
            this._onDisableHandler.bind(this),
            this._onOkHandler.bind(this)
          ]}
          onLayout={ (e) => {modalHeight += e.nativeEvent.layout.height} }/>
      </Modal>
    )
  }
  _onCancelHandler() {
    this.props.closeModal();
  }
  _onDisableHandler() {
    this.props.disableBudget();
    this.props.closeModal();
  }
  _onOkHandler() {
    this.props.updateBudget(this.state.budgetInput, this.state.budgetTimeframe);
    this.props.closeModal();
  }
}

let styles = StyleSheet.create({
  modal: {
    position: 'relative',
    width: 280,
    height: modalHeight,
  },
  radioButtonAreaContainer: {
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
