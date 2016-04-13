'use strict';

import React, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  PropTypes,
  Component
} from 'react-native'

import ListItem from '../../material/ListItem'
import Subheader from '../../material/text/Subheader'
import DialogBudgetEditing from '../../../components/custom/dialogs/DialogBudgetEditing'
import { categoryIconColors } from '../../../constants/categoryIconColors'
import Modal from 'react-native-modalbox'
import NumberPad from '../../../components/custom/dialogs/NumberPad'

export default class BudgetSetting extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      pressedCategoryID: '',
      pressedCategoryBudgetAmount: 0,
      pressedCategoryBudgetTimeframe: '',
    }
  }
  static propTypes = {
    monthlyBudgetCategories:  PropTypes.array,
    yearlyBudgetCategories:   PropTypes.array,
    disabledBudgetCategories: PropTypes.array,
  }

  render() {
    // TODO: Format currency using Number.toLocaleString().
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          { this._renderBudgetSubheader('MONTHLY BUDGET', this.props.monthlyBudgetTotalAmount) }
          {
            this.props.monthlyBudgetCategories.sort(this._compareOrder).map((category, index) => {
              return this._renderBudgetCategory(category.id, category.name, category.icon_name, category.budget_amount, category.budget_timeframe, this._openDialogBudgetEditing.bind(this), index);
            })
          }

          { this._renderBudgetSubheader('YEARLY BUDGET', this.props.yearlyBudgetTotalAmount) }
          {
            this.props.yearlyBudgetCategories.sort(this._compareOrder).map((category, index) => {
              return this._renderBudgetCategory(category.id, category.name, category.icon_name, category.budget_amount, category.budget_timeframe, this._openDialogBudgetEditing.bind(this), index);
            })
          }
          { this._renderBudgetSubheader('NO BUDGET', null) }
          {
            this.props.disabledBudgetCategories.sort(this._compareOrder).map((category, index) => {
              return this._renderBudgetCategory(category.id, category.name, category.icon_name, 'disabled', category.budget_timeframe, this._openDialogBudgetEditing.bind(this), index);
            })
          }
        </ScrollView>
        <DialogBudgetEditing
          backdrop={true}
          position={'center'}
          isOpen={this.state.openModal}
          closeModal={ () => {this.setState({openModal: false})} }
          defaultBudgetAmount={this.state.pressedCategoryBudgetAmount}
          defaultBudgetTimeframe={this.state.pressedCategoryBudgetTimeframe}
          updateBudget={(budgetInput, budgetTimeframe) => {
            this.props.onBudgetUpdateHandler(this.state.pressedCategoryID, budgetInput, budgetTimeframe);
          }}
          disableBudget={() => {
            this.props.onBudgetDisableHandler(this.state.pressedCategoryID);
          }}
        />
      </View>
    )
  }
  _renderBudgetSubheader(text, totalAmount) {
    let displayedTotalAmount = (typeof totalAmount == 'number') ? ('$ ' + totalAmount.toLocaleString()) : '';
    return (
      <Subheader
        style={{paddingRight: 56}}
        textRightStyle={{fontWeight: '500'}}
        color={'#000'}
        textRight={displayedTotalAmount}>
        {text}
      </Subheader>
    )
  }
  _renderBudgetCategory(id, name, iconName, budgetAmount, budgetTimeframe, onEditPress, index = 0) {
    return (
      <ListItem
        key={index}
        avatarLeftName={iconName}
        avatarColor={'#fff'}
        avatarBgColor={ categoryIconColors[iconName] }
        iconRightName={'edit'}
        onIconRightPress={() => {onEditPress(id, budgetAmount, budgetTimeframe)}}
        textPrimary={name.charAt(0).toUpperCase() + name.slice(1)}
        textRight={(typeof budgetAmount == "number") ? ('$ ' + budgetAmount.toLocaleString()) : budgetAmount}
      />
    )
  }
  _openDialogBudgetEditing(categoryID, categoryBudget, categoryBudgetTimeframe) {
    this.setState({
      openModal: true,
      pressedCategoryID: categoryID,
      pressedCategoryBudgetAmount: Number(categoryBudget) ? categoryBudget : 0,
      pressedCategoryBudgetTimeframe: categoryBudgetTimeframe,
    });
  }
  _compareOrder(a, b) {
    return a.order - b.order
  }
};

let styles = StyleSheet.create({

})
