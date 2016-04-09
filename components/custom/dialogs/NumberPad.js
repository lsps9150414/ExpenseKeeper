import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class NumberPad extends Component {
  static propTypes = {
    defaultInput: PropTypes.number,
    getInput:     PropTypes.func.isRequired,
  }
  static defaultProps = {
    defaultInput: 0,
  }
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.defaultInput,
    };
  }
  componentWillMount() {
    this.props.getInput(this.state.input);
  }
  render() {
    let numberPadButton = [];
    for (let i = 1; i <= 9; i++) {
      numberPadButton.push(this._renderNumberButton(i));
    };
    numberPadButton.push(this._renderNumberButton('00'));
    numberPadButton.push(this._renderNumberButton(0));
    numberPadButton.push(this._renderNumberButton('.'));
    return (
      <View>
        <View style={styles.inputContainer}>
          <Text
            style={styles.input}>
            $ {this.state.input}
          </Text>
          <TouchableHighlight
            style={styles.backspaceButtonContainer}
            onPress={this._deleteNumber.bind(this)}>
            <Icon name={'backspace'} size={24} color={'gray'} style={styles.icon}/>
          </TouchableHighlight>
        </View>

        <View style={styles.numberPadContainer}>
          <View style={styles.numberPadRowContainer}>{numberPadButton.slice(0, 3)}</View>
          <View style={styles.numberPadRowContainer}>{numberPadButton.slice(3, 6)}</View>
          <View style={styles.numberPadRowContainer}>{numberPadButton.slice(6, 9)}</View>
          <View style={styles.numberPadRowContainer}>{numberPadButton.slice(9, 12)}</View>
        </View>
      </View>
    )
  }
  _renderNumberButton(number) {
    return (
      <TouchableHighlight
        key={number}
        style={styles.numberPadButton}
        onPress={ () => {this._addNumber(number)} }>
        <Text style={styles.numberPadNumber}>{number}</Text>
      </TouchableHighlight>
    )
  }
  _addNumber(number) {
    // TODO: Enable decimals.
    // TODO: prevent super large number that is not in the supported range.
    this.setState({
      input: Number( this.state.input.toString() + number.toString() ),
    });
    this.props.getInput(this.state.input);
  }
  _deleteNumber() {
    this.setState({
      input: Number( this.state.input.toString().slice(0, -1) ),
    });
    this.props.getInput(this.state.input);
  }
}

let styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  input: {
    textAlign: 'right',
    fontWeight: '500',
    color: 'black',
    fontSize: 30
  },
  backspaceButtonContainer: {
    padding: 12,
  },
  numberPadContainer: {
    flex: 1,
  },
  numberPadRowContainer: {
    flexDirection: 'row',
  },
  numberPadButton: {
    flex: 1,
  },
  numberPadNumber: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30
  }
})
