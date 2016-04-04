'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Component
} from 'react-native';

import ListItem from '../../material/ListItem';
import Subheader from '../../material/text/Subheader';
import {MockupCategories} from '../../../containers/mockupdata';

export default class BudgetSetting extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Subheader
            color={'#000'}
            textRight={'$5,000/Month'}>
              MONTHLY BUDGET
          </Subheader>
          {this._renderBudgetSettingListItem('layers', '#555', 'overall', 15000, () => {})}
          {
            MockupCategories.categories.sort(this._compare).map((category, index) => {
              if (category.budget_disabled != true && category.budget_timeframe == 'month') {
                return this._renderBudgetSettingListItem(category.icon, category.color, category.name, category.budget, () => {}, index);
              }
            })
          }
          <Subheader
            color={'#000'}
            textRight={'$5,000/Year'}>
            YEARLY BUDGET
          </Subheader>
          {
            MockupCategories.categories.map((category, index) => {
              if (category.budget_disabled != true && category.budget_timeframe == 'year') {
                return this._renderBudgetSettingListItem(category.icon, category.color, category.name, category.budget, () => {}, index);
              }
            })
          }
          <Subheader
            color={'#000'}>
            NO BUDGET
          </Subheader>
          {
            MockupCategories.categories.map((category, index) => {
              if (category.budget_disabled == true) {
                return this._renderBudgetSettingListItem(category.icon, category.color, category.name, 'disabled', () => {}, index);
              }
            })
          }
        </ScrollView>
      </View>
    )
  }
  _renderBudgetSettingListItem(icon, color, name, budget, onEditPress, index = 0) {
    return (
      <ListItem
        key={index}
        avatarLeftName={icon}
        avatarColor={'#fff'}
        avatarBgColor={color}
        iconRightName={'edit'}
        onIconRightPress={onEditPress}
        textPrimary={name.charAt(0).toUpperCase() + name.slice(1)}
        textRight={(typeof budget == "number") ? ('$' + budget) : budget}
      />
    )
  }
  _compare(a, b) {
    return a.order - b.order
  }
};
