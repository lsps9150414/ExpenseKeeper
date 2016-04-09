import {
  CATEGORY_ADD,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_SORT,
  BUDGET_UPDATE,
  BUDGET_DISABLE,
} from './actionTypes'

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
