'use strict';

import React, {
  Text,
  View,
  Switch,
  StyleSheet,
  Component
} from 'react-native'

import CategprySettingContainer from '../containers/CategorySettingContainer'
// import CategoryEditing from '../components/pages/settings/CategoryEditing'
import CategoryEditingContainer from '../containers/CategoryEditingContainer'
import BudgetSetting from '../components/pages/settings/BudgetSetting'
import History from '../components/pages/History'
import Home from '../components/pages/Home'
import Test from '../components/pages/Test'
import Settings from '../components/pages/Settings'
import {GlobalStyle} from '../styles/GlobalStyles'

export default function(route, navigator, mainRef) {
  let scene = null;
  switch (route.name) {
    // RoutesMain
    case 'test':
      scene = (<Test/>);
      break;
    case 'main':
      scene = (<Home/>);
      break;
    case 'history':
      scene = (<History/>);
      break;
    case 'charts':
      scene =  (
        <View>
          <Text>this is Charts</Text>
        </View>
      );
      break;
    case 'settings':
      scene = (<Settings navigator={navigator} />);
      break;

    // RoutesSetting
    case 'categorySetting':
      scene = (<CategprySettingContainer navigator={navigator} mainRef={mainRef} />);
      break;
    case 'categoryEditing':
      scene = (<CategoryEditingContainer categoryID={route.props.categoryID} getSceneState={route.props.getSceneState} />);
      break;
    case 'budgetSetting':
      scene = (<BudgetSetting/>);
      break;
    case 'dailyReportSetting':
      scene = (<CategorySetting/>);
      break;

    default:
      scene = (<Text>No match route.</Text>)
  }
  let wrappedScene = (
    <View style={GlobalStyle.sceneUnderNavBar}>
      {scene}
    </View>
  )
  return wrappedScene;
}
