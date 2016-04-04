'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native';

import DrawerProfile from './DrawerProfile';
import ListItem from './ListItem';
import {GlobalStyle} from '../../styles/GlobalStyles';

export default class Drawer extends Component {
  static propsType: {
    routes: PropTypes.array.isRequired,
    userName: PropTypes.string,
    userEmail: PropTypes.string
  };

  _handleOnListItemClicked(routeName, routeTitle) {
    this.props.onListItemClicked(routeName, routeTitle)
  }

  render() {
    const {
      routes,
      userName,
      userEmail,
      navigatorRef,
      onListItemClicked
    } = this.props;

    console.log(this.props);

    return (
      <View style={[GlobalStyle.page, {backgroundColor: '#fff'}]}>
        <View>
          <DrawerProfile
            userName={userName}
            userEmail={userEmail}
          />
        </View>
        <ScrollView>
          {routes.map((route, index) => (
            <ListItem
              key={index}
              drawer={true}
              dense={true}
              iconLeftName={route.iconName}
              textPrimary={route.title}
              onPress={this._handleOnListItemClicked(route.name, route.title)}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
