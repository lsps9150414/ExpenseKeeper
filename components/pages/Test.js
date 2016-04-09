'use strict';

import React, {
  Text,
  View,
  Switch,
  TouchableHighlight,
  StyleSheet,
  Component
} from 'react-native';

import ListItem from '../material/ListItem'
import TestComponent from '../TestComponent'
import Modal from 'react-native-modalbox'
// import Slider from 'react-native-slider'

var DialogAndroid = require('react-native-dialogs');

var options = {
  title: 'Hello, World!',
  content: 'I\'m just simple Dialog',
  positiveText: 'OK',
  negativeText: 'Cancel'
};

var showDialog = function () {
  var dialog = new DialogAndroid();
  dialog.set(options);
  dialog.show();
}

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      modalText: 'Test'
    }
  }

  _onPress() {
    console.log('THIS', this);
  }

  openModal(id) {
    this.modalRef.open();
  }


  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.openModal.bind(this)} >
          <Text>Position top</Text>
        </TouchableHighlight>

        <Modal style={[styles.modal, styles.modal2]} backdrop={true}  position={"center"} isOpen={this.state.isOpen} ref={(ref) => {this.modalRef = ref}}>
          <Text style={[styles.text]}>{this.state.modalText}</Text>
        </Modal>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  modal: {
    height: 300,
    width: 300
  },
});
