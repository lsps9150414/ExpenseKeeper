'use strict';

import Icon from 'react-native-vector-icons/MaterialIcons'
import React, {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import TextPrimary from '../material/text/TextPrimary'
import TextSecondary from '../material/text/TextSecondary'

export default class ListItemWithAmount extends Component {
  static propTypes = {
    amountSpent: PropTypes.number.isRequired,
    amountRemain: PropTypes.number.isRequired,
    expenseCategory: PropTypes.string,
    amountSpentSize: PropTypes.number,
    categoryIcon: PropTypes.string,
    categoryBgColor: PropTypes.string,
    percentageSpent: PropTypes.number,
    dateToday: PropTypes.number.isRequired,
    monthToday: PropTypes.number.isRequired,
    budgetTimeframe: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  _todayToPercentageBarWidth(budgetTimeframe, dateToday, monthToday) {
    if (budgetTimeframe == 'month') {
      if (monthToday == 2) {
        return (dateToday/28)
      }else if (monthToday == 1 || monthToday == 3 || monthToday == 5 || monthToday == 7 || monthToday == 8 || monthToday == 10 || monthToday == 12) {
        return (dateToday/31)
      }else {
        return (dateToday/30)
      }
    }else if (budgetTimeframe == 'year') {
      return (monthToday/12)
    }
  }

  render() {
    const {
      amountSpent,
      amountRemain,
      expenseCategory,
      amountSpentSize,
      categoryIcon,
      categoryBgColor,
      percentageSpent,
      dateToday,
      monthToday,
      budgetTimeframe,
      onPress
    } = this.props;

    var defaultListItemHeight = 72;
    var defaultTextSizePrimary = 16;
    var defaultTextSizeSecondary = 14;
    var todayPercentageBarWidth = this._todayToPercentageBarWidth(budgetTimeframe, dateToday, monthToday);

    if (categoryIcon) {
      var leftElement = (
        <View style={[
            styles.avatarContainer,
            categoryBgColor && {backgroundColor: categoryBgColor}]}>
            <Icon name={categoryIcon} size={24} color={'#fff'} style={styles.icon}/>
          </View>
        );
    }
    var rightElement = <Icon name={'chevron-right'} size={24} color={'#aaa'} style={styles.icon}/>;

    return (
      <TouchableHighlight onPress={onPress} underlayColor={"rgba(0,0,0,0.1)"}>
        <View style={[
            styles.container,
            {height: defaultListItemHeight}]}>

          <View style={[styles.percentageBarContainer]}>
            <View style={[{backgroundColor: categoryBgColor, flex: percentageSpent}]}></View>
            <View style={[styles.percentageBarSpacer, {flex: 1-percentageSpent}]}></View>
          </View>
          <View style={[styles.percentageBarContainer]}>
            <View style={[{backgroundColor: 'rgba(0,0,0,0.15)', flex: todayPercentageBarWidth}]}></View>
            <View style={[styles.percentageBarSpacer, {flex: 1-todayPercentageBarWidth}]}></View>
          </View>

          <View style={styles.horizontalContainer}>
            {/* left element */}
            {leftElement && <View style={[
                styles.rowElementContainer,
                styles.leftElementContainer]}>
              {leftElement}
            </View>}
            {/* left text */}
            <View style={[
                styles.rowElementContainer,
                styles.leftTextContainer,
                expenseCategory && styles.multiLineText]}>
              <TextPrimary style={[
                  styles.amountSpent,
                  {fontSize: defaultTextSizePrimary},
                  amountSpentSize && {fontSize: amountSpentSize}]}>
                  ${amountSpent}
                </TextPrimary>
                {expenseCategory && <TextSecondary style={[
                    styles.expenseCategory,
                    {fontSize: defaultTextSizeSecondary}]}>
                  {expenseCategory}
                </TextSecondary>}
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            {/* right text */}
            {amountRemain && <View style={[
                styles.rowElementContainer,
                styles.rightTextContainer,
                !rightElement && {marginRight: 16}]}>
              <TextPrimary style={[
                  styles.amountSpent,
                  styles.amountRemain,
                  {fontSize: defaultTextSizePrimary}]}>
                ${amountRemain}
              </TextPrimary>
            </View>}
            {/* right element */}
            {rightElement && <View style={[
                styles.rowElementContainer,
                styles.rightElementContainer]}>
              {rightElement}
            </View>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  // Container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderTopWidth: 0.3,
    // borderBottomWidth: 0.3
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // , backgroundColor: 'yellow'
  },
  rowElementContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftElementContainer: {
    marginLeft: 16
    // , backgroundColor: 'pink'
  },
  leftTextContainer: {
    marginLeft: 16
  },
  rightElementContainer: {
    // backgroundColor: 'pink',
    marginHorizontal: 4,
    padding: 12
  },
  rightTextContainer: {
    justifyContent: 'flex-end'
  },
  // Icon & Avatar
  avatarContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: 'transparent'
  },
  // Text
  multiLineText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  amountSpent: {
    // color: '#000'
  },
  expenseCategory: {
    color: '#555'
  },
  amountRemain: {
    textAlign: 'right'
  },
  percentageBarContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    flexDirection: 'row',
    height: 72
  },
  percentageBarSpacer: {
    backgroundColor: 'transparent'
  }
})
