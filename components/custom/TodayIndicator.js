'use strict';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Component
} from 'react-native';

export default class TodayIndicator extends Component {
  _todayToLeftPosition(budgetTimeframe, dateToday, monthToday) {
    let screenWidth = Dimensions.get('window').width;
    if (budgetTimeframe == 'month') {
      if (monthToday == 2) {
        return (dateToday/28 * screenWidth - 18)
      }else if (monthToday == 1 || monthToday == 3 || monthToday == 5 || monthToday == 7 || monthToday == 8 || monthToday == 10 || monthToday == 12) {
        return (dateToday/31 * screenWidth - 18)
      }else {
        return (dateToday/30 * screenWidth - 18)
      }
    }else if (budgetTimeframe == 'year') {
      return (monthToday/12 * screenWidth - 18)
    }
  }

  render() {
    const {
      budgetTimeframe,
      dateToday,
      monthToday
    } = this.props;

    var screenWidth = Dimensions.get('window').width;
    var percentage = 1;
    var todayIndicatorLeftPosition = this._todayToLeftPosition(budgetTimeframe, dateToday, monthToday);

    return (
      <View style={styles.percentageBarContainer}>
        <View style={[styles.container, {left: todayIndicatorLeftPosition}]}>
          <Text style={styles.text}>Today</Text>
          <Icon name={'arrow-drop-down'} size={20} color={'#ccc'} style={styles.icon}/>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  percentageBarContainer: {
    // backgroundColor: 'red'
  },
  container: {
    position: 'relative',
    alignItems: 'center',
    width: 36,
    height: 20
    // backgroundColor: 'red'
  },
  text: {
    fontSize: 12
  },
  icon: {
    position: 'relative',
    top: -10,
    height: 13
    // backgroundColor: 'green'
  }
})
