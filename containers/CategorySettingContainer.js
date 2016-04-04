import _ from 'lodash'
import { connect } from 'react-redux'

import CategorySetting from '../components/pages/settings/CategorySetting'
import { categorySort } from '../actions'
import { categoryIconColors } from '../constants/categoryIconColors'

const _getCategoriesData = (categories) => {
  let categoriesData = {};
  /*categoriesData = {
    CategoryID: {name: 'name', iconName: 'iconName', color: 'color'}
    CategoryID: {name: 'name', iconName: 'iconName', color: 'color'}
    ...
  }*/
  for (let i = 0; i < categories.length; i++) {
    categoriesData[categories[i].id.toString()] = {
      name:     categories[i].name,
      iconName: categories[i].icon_name,
      color:    categoryIconColors[categories[i].icon_name]
    };
  };
  // console.log('categoriesData', categoriesData);
  return categoriesData;
}
const _getCategoriesOrder = (categories) => {
  let clonedCategories = categories.map((category) => {
    return _.cloneDeep(category);
  });
  let categoriesOrder = clonedCategories.sort((category, nextCategory) => {
    return category.order - nextCategory.order;
  }).map((category) => {
    return category.id;
  });
  // console.log('dataOrder', categoriesOrder);
  return categoriesOrder;
}

const mapStateToProps = (state) => {
  return {
    categoriesData: _getCategoriesData(state.categories),
    categoriesOrder: _getCategoriesOrder(state.categories),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onRowMoveHandler: (moveInfo) => {
      dispatch(categorySort(moveInfo.fromOrder, moveInfo.toOrder));
    },
  }
}

const CategprySettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySetting)

export default CategprySettingContainer
