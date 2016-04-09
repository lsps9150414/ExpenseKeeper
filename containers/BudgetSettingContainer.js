import { connect } from 'react-redux'

import BudgetSetting from '../components/pages/settings/BudgetSetting'
import {
  budgetUpdate,
  budgetDisable,
} from '../actions'

const getBudgetTotalAmount = (categories) => {
  let budgetTotalAmount = 0;
  for (let i = 0; i < categories.length; i++) {
    budgetTotalAmount += categories[i].budget_amount;
  }
  return budgetTotalAmount;
}

const getCategoriesByBudgetTimeframe = (categories, budgetTimeframe) => {
  if (budgetTimeframe) {
    return categories.filter((category) => {
      return category.budget_enabled && category.budget_timeframe == budgetTimeframe.toString();
    });
  }
  else {
    return categories.filter((category) => !category.budget_enabled);
  }
}

const mapStateToProps = (state) => {
  let monthlyBudgetCategories = getCategoriesByBudgetTimeframe(state.categories, 'month');
  let yearlyBudgetCategories =  getCategoriesByBudgetTimeframe(state.categories, 'year');
  return {
    monthlyBudgetTotalAmount: getBudgetTotalAmount(monthlyBudgetCategories),
    yearlyBudgetTotalAmount:  getBudgetTotalAmount(yearlyBudgetCategories),
    monthlyBudgetCategories:  monthlyBudgetCategories,
    yearlyBudgetCategories:   yearlyBudgetCategories,
    disabledBudgetCategories: getCategoriesByBudgetTimeframe(state.categories, false),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBudgetUpdateHandler: (categoryID, budgetAmount, budgetTimeframe) => {
      dispatch(budgetUpdate(categoryID, budgetAmount, budgetTimeframe));
    },
    onBudgetDisableHandler: (categoryID) => {
      dispatch(budgetDisable(categoryID));
    }
  }
}

const BudgetSettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetSetting)

export default BudgetSettingContainer
