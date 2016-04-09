'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Navigator,
  PropTypes,
  Component
} from 'react-native';

import ListItem from '../../components/material/ListItem';
import Subheader from '../material/text/Subheader';
import {GlobalStyle} from '../../styles/GlobalStyles';
import {RoutesSettings} from '../../routers/RoutesSettings';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
    }
  }
  static propTypes = {
    navigator: PropTypes.object,
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Subheader color={'#000'}>EXPENSES</Subheader>
          {RoutesSettings.map((route, index) => {
            switch (route.name) {
              case 'currencySymbol':
                return (
                  <ListItem
                    key={index}
                    textPrimary={route.props.title}
                    textRight={
                      route.props.rightItem
                    }
                    onPress={ () => this.props.navigator.push(RoutesSettings[index]) }
                  />
                );
              case 'currencyDecimals':
                return (
                  <ListItem
                    key={index}
                    textPrimary={route.props.title}
                    switchValue={this.state.switchValue}
                    onSwitchValueChange={() => {
                      this.setState({switchValue: !this.state.switchValue});
                    }}
                  />
                )
              case 'categoryEditing':
                // NOTE: Hide categoryEditing in Settings List.
                return null;

              default:
                return (
                  <ListItem
                    key={index}
                    textPrimary={route.props.title}
                    onPress={ () => this.props.navigator.push(RoutesSettings[index]) }
                  />
                )
            }
          })}
        </ScrollView>
      </View>
    )
  }
}
