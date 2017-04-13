import { connect } from 'react-redux'

import CategoryEditing from '../components/pages/settings/CategoryEditing'

const getCategoryByID = (categories, categoryID) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id == categoryID) {
      return categories[i];
    }
  }
  return null;
}

const mapStateToProps = (state, passedProps) => {
  let category = getCategoryByID(state.categories, passedProps.categoryID);
  return {
    categoryName:     category ? category.name:  '',
    categoryIconName: category ? category.icon_name : '',
    scene:            category ? 'categoryUpdate' : 'categoryAdd',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const CategoryEditingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryEditing)

export default CategoryEditingContainer
