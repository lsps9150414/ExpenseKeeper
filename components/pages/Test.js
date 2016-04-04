'use strict';

import React, {
  Text,
  View,
  Switch,
  StyleSheet,
  Component
} from 'react-native';

import ListItem from '../material/ListItem'
import TestComponent from '../TestComponent'

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
    }
  }

  _onPress() {
    console.log('THIS', this);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TestComponent onPress={this._onPress.bind(this)}></TestComponent>
        <ListItem
          containerStyle={[{backgroundColor: 'pink'}]}
          textPrimary={'Switch'}
          textSecondary={this.state.switchValue.toString()}
          switchValue={this.state.switchValue}
          onSwitchValueChange={() => {
            this.setState({switchValue: !this.state.switchValue});
          }}
        />
      </View>
    )
  }
}
