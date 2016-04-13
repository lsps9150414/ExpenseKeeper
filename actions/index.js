import {
  CATEGORY_ADD,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_SORT,
  BUDGET_UPDATE,
  BUDGET_DISABLE,
  EXPENSE_ADD,
  EXPENSE_UPDATE,
  EXPENSE_DELETE,
} from './actionTypes'

// for category
export const categoryAdd = (name, iconName) => {
  return {
    type: CATEGORY_ADD,
    name: name,
    icon_name: iconName,
    budget_enabled: false,
    budget_timeframe: 'month',
    budget_amount: 0,
  }
}
export const categoryUpdate = (id, name, iconName) => {
  return {
    type: CATEGORY_UPDATE,
    id: id,
    name: name,
    icon_name: iconName,
  }
}
export const categorySort = (moveFromOrder, moveToOrder) => {
  return {
    type: CATEGORY_SORT,
    moveFromOrder: moveFromOrder,
    moveToOrder: moveToOrder
  }
}
export const categoryDelete = (id) => {
  return {
    type: CATEGORY_DELETE,
    id: id,
  }
}
// for budget
export const budgetUpdate = (id, budgetAmount, budgetTimeframe) => {
  return {
    type: BUDGET_UPDATE,
    id: id,
    budget_amount: budgetAmount,
    budget_timeframe: budgetTimeframe,
  }
}
export const budgetDisable = (id) => {
  return {
    type: BUDGET_DISABLE,
    id: id,
  }
}
// for expense
export const expenseAdd = (amount, date, note, categoryID) => {
  return {
    type: EXPENSE_ADD,
    amount: amount,
    date: date,
    note: note,
    category_id: categoryID,
  }
}
export const expenseUpdate = () => {
  return {
    type: EXPENSE_UPDATE,
  }
}
export const expenseDelete = () => {
  return {
    type: EXPENSE_DELETE,
  }
}
