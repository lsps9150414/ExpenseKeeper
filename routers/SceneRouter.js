'use strict';

import React, {
  Text,
  View,
  Switch,
  StyleSheet,
  Component
} from 'react-native'

import CategprySettingContainer from '../containers/CategorySettingContainer'
import CategoryEditingContainer from '../containers/CategoryEditingContainer'
import BudgetSettingContainer   from '../containers/BudgetSettingContainer'
import BudgetSetting            from '../components/pages/settings/BudgetSetting'
import ExpenseContainer         from '../containers/ExpenseContainer'
import ExpenseEditingContainer  from '../containers/ExpenseEditingContainer'
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
    case 'expense':
      scene = (<ExpenseContainer navigator={navigator} />);
      break;
    case 'expenseEditing':
      scene = (<ExpenseEditingContainer getSceneState={mainRef._getSceneState.bind(mainRef)} />);
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
      scene = (<BudgetSettingContainer />);
      break;

    // TODO: Build dailyReportSetting.
    // case 'dailyReportSetting':
    //   scene = (<CategorySetting/>);
    //   break;

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
