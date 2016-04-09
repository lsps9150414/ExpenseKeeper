'use strict';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Component
} from 'react-native';

import {RoutesMain} from '../routers/RoutesMain';
import {RoutesSettings} from '../routers/RoutesSettings';

// TODO: STYLING set title & icon style with props
export default function(mainRef) {
  return {
    Title(route, navigator, index, navState) {
      return (
        <View style={styles.title}>
          <Text style={{color: 'white', fontSize: 16}}>
            {route.props.title}
          </Text>
        </View>
      );
    },
    LeftButton(route, navigator, index, navState) {
      // For RoutesMain
      for (var i = 0; i < RoutesMain.length; i++) {
        if (route.name == RoutesMain[i].name) {
          return (
            <TouchableHighlight
              style={styles.leftButton}
              onPress={ () => {mainRef.drawerRef.openDrawer()} }
              >
              <Icon name={'menu'} size={24} color={'#fff'}/>
            </TouchableHighlight>
          )
        }
      }
      // For RoutesSettings
      for (var i = 0; i < RoutesSettings.length; i++) {
        if (route.name == RoutesSettings[i].name) {
          return (
            <TouchableHighlight
              style={styles.leftButton}
              onPress={ () => {navigator.pop()} }
              >
              <Icon name={'arrow-back'} size={24} color={'#fff'}/>
            </TouchableHighlight>
          )
        }
      }
    },
    RightButton(route, navigator, index, navState) {
      switch (route.name) {
        case 'categorySetting':
          // TODO: make passing props via navigator more general and make it possible to manage all Routes at a central place.
          let categoryEditingRoute = {
            name: 'categoryEditing',
            props: {
              title: 'Edit Category',
              getSceneState: mainRef._getSceneState.bind(mainRef),
            }
          };
          return (
            <View style={styles.rightButtonContainer}>
              <TouchableHighlight
                  style={styles.rightButton}
                  onPress={ () => {navigator.push(categoryEditingRoute)} } >
                <Icon name={'add'} size={24} color={'#fff'}/>
              </TouchableHighlight>
            </View>
          );

        case 'categoryEditing':
          return (
            <View style={styles.rightButtonContainer}>
              <TouchableHighlight
                  style={styles.rightButton}
                  onPress={ () => {
                    mainRef._onCategoryEditDelete();
                    navigator.pop();
                  }} >
                <Icon name={'delete'} size={24} color={'#fff'}/>
              </TouchableHighlight>
              <TouchableHighlight
                  style={styles.rightButton}
                  onPress={ () => {
                    mainRef._onCategoyEditDone() && navigator.pop();
                  }}>
                <Icon name={'check'} size={24} color={'#fff'}/>
              </TouchableHighlight>
            </View>
          );
        default:
          return (
            <View style={styles.rightButtonContainer}>
              <TouchableHighlight
                  style={styles.rightButton}
                  onPress={ () => {} } >
                <Icon name={'more-vert'} size={24} color={'#fff'}/>
              </TouchableHighlight>
            </View>
          );
      }
    }
  }
};

var styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    width: 56
  },
  rightButtonContainer: {
    flexDirection: 'row'
  },
  rightButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    marginVertical: 4
  }
})
