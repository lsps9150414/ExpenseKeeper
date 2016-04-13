'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Component
} from 'react-native';

import BudgetControlListItem from '../custom/BudgetControlListItem';
import Subheader from '../material/text/Subheader';
import TodayIndicator from '../custom/TodayIndicator';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Subheader center={true} color={'#000'}>OVERALL BUDGET (Month)</Subheader>
          <TodayIndicator
            budgetTimeframe={'month'}
            dateToday={10}
            monthToday={3}
          />
          <BudgetControlListItem
            categoryBgColor={'#ddd'}
            amountSpent={80}
            amountSpentSize={30}
            amountRemain={620}
            percentageSpent={0.2}
            dateToday={10}
            monthToday={3}
            budgetTimeframe={'month'}
            onPress={()=>{}}
          />

          <Subheader center={true} color={'#000'}>MONTHLY BUDGET</Subheader>
          <TodayIndicator
            budgetTimeframe={'month'}
            dateToday={10}
            monthToday={3}
          />
          <BudgetControlListItem
            categoryIcon={'directions-bus'}
            categoryBgColor={'#3F51B5'}
            amountSpent={80}
            expenseCategory={'TRANSPORTATION'}
            amountRemain={620}
            percentageSpent={0.8}
            dateToday={10}
            monthToday={3}
            budgetTimeframe={'month'}
            onPress={()=>{}}
          />

          <Subheader center={true} color={'#000'}>YEARLY BUDGET</Subheader>
          <TodayIndicator
            budgetTimeframe={'year'}
            dateToday={10}
            monthToday={3}
          />
          <BudgetControlListItem
            categoryIcon={'directions-bus'}
            categoryBgColor={'#3F51B5'}
            amountSpent={80}
            expenseCategory={'TRANSPORTATION'}
            amountRemain={620}
            percentageSpent={0.8}
            dateToday={10}
            monthToday={3}
            budgetTimeframe={'year'}
            onPress={()=>{}}
          />
          <BudgetControlListItem
            categoryIcon={'directions-bus'}
            categoryBgColor={'#3F51B5'}
            amountSpent={80}
            expenseCategory={'TRANSPORTATION'}
            amountRemain={620}
            percentageSpent={0.8}
            dateToday={10}
            monthToday={3}
            budgetTimeframe={'year'}
            onPress={()=>{}}
          />
          <BudgetControlListItem
            categoryIcon={'directions-bus'}
            categoryBgColor={'#3F51B5'}
            amountSpent={80}
            expenseCategory={'TRANSPORTATION'}
            amountRemain={620}
            percentageSpent={0.8}
            dateToday={10}
            monthToday={3}
            budgetTimeframe={'year'}
            onPress={()=>{}}
          />
        </ScrollView>
      </View>
    )
  }
};

var styles = StyleSheet.create({
})
