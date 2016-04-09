import _ from 'lodash'

import {
  CATEGORY_ADD,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_SORT,
  BUDGET_UPDATE,
  BUDGET_DISABLE,
} from '../actions/actionTypes'

const categoryReducer = (prevStateCategories, action, category) => {
  switch (action.type) {
    case CATEGORY_ADD:
      let maxID = 0;
      for (var i = 0; i < prevStateCategories.length; i++) {
        if (Number(prevStateCategories[i].id.substr(3)) >= maxID) {
          maxID = Number(prevStateCategories[i].id.substr(3));
        }
      };
      return {
        id:               'ID-' + (maxID + 1),
        order:            prevStateCategories.length,
        name:             action.name,
        icon_name:        action.icon_name,
        budget_enabled:   action.budget_enabled,
        budget_timeframe: action.budget_timeframe,
        budget_amount:    action.budget_amount,
        expenses_id: [],
      }

    case CATEGORY_UPDATE:
      return {
        id:               category.id,
        order:            category.order,
        name:             action.name,
        icon_name:        action.icon_name,
        budget_enabled:   category.budget_enabled,
        budget_timeframe: category.budget_timeframe,
        budget_amount:    category.budget_amount,
        expenses_id:      category.expenses
      }

    case BUDGET_UPDATE:
      return {
        id:               category.id,
        order:            category.order,
        name:             category.name,
        icon_name:        category.icon_name,
        budget_enabled:   true,
        budget_timeframe: action.budget_timeframe,
        budget_amount:    action.budget_amount,
        expenses_id:      category.expenses
      }

    case BUDGET_DISABLE:
      return {
        id:               category.id,
        order:            category.order,
        name:             category.name,
        icon_name:        category.icon_name,
        budget_enabled:   false,
        budget_timeframe: category.budget_timeframe,
        budget_amount:    0,
        expenses_id:      category.expenses
      }

    default:
      return category
  }
}

const categoriesReducer = (prevStateCategories = [], action) => {
  switch (action.type) {
    case CATEGORY_ADD:
      return [
        ...prevStateCategories,
        categoryReducer(prevStateCategories, action)
      ]

    case CATEGORY_UPDATE:
      return prevStateCategories.map((category) => {
        if (action.id === category.id) {
          return categoryReducer(prevStateCategories, action, category);
        }
        else {
          return category;
        }
      })

    case CATEGORY_SORT:
      let reorderedCategories = prevStateCategories.map((category) => {
        let clonedCategory = _.cloneDeep(category);
        if (clonedCategory.order == action.moveFromOrder) {
          clonedCategory.order = action.moveToOrder;
          return clonedCategory;
        }
        else {
          // move down
          if (action.moveFromOrder < action.moveToOrder) {
            // between moveFromOrder and moveToOrder row: order - 1
            if ( action.moveFromOrder < clonedCategory.order && clonedCategory.order <= action.moveToOrder ) {
              clonedCategory.order -= 1;
              return clonedCategory;
            }
          }
          // move up
          else if (action.moveFromOrder > action.moveToOrder) {
            // between moveFromOrder and moveToOrder row: order + 1
            if ( action.moveFromOrder > clonedCategory.order && clonedCategory.order >= action.moveToOrder ) {
              clonedCategory.order += 1;
              return clonedCategory;
            }
          }
          // not between moveFromOrder and moveToOrder
          return clonedCategory;
        }
      });
      return reorderedCategories;

    case CATEGORY_DELETE:
      let deletedCategoryOrder = null;
      let afterDeleteCategories =  prevStateCategories.filter( (category) => {
        if (category.id == action.id) {
          deletedCategoryOrder = category.order;
          return false;
        }
        else {
          return true;
        }
      });
      for (let i = 0; i < afterDeleteCategories.length; i++) {
        if (afterDeleteCategories[i].order > deletedCategoryOrder) {
          afterDeleteCategories[i].order -= 1;
        }
      };
      return afterDeleteCategories;

    case BUDGET_UPDATE:
      return prevStateCategories.map((category) => {
        if (action.id === category.id) {
          return categoryReducer(prevStateCategories, action, category);
        }
        else {
          return category;
        }
      })

    case BUDGET_DISABLE:
      return prevStateCategories.map((category) => {
        if (action.id === category.id) {
          return categoryReducer(prevStateCategories, action, category);
        }
        else {
          return category;
        }
      })


    default:
      return prevStateCategories;
  }
}

export default categoriesReducer
