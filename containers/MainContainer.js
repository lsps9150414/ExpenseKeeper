import { connect } from 'react-redux'

import Main from '../components/Main'
import {
  categoryAdd,
  categoryUpdate,
  categoryDelete
} from '../actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryAddHandler: (categoryAddState) => {
      dispatch(categoryAdd(
        categoryAddState.categoryName,
        categoryAddState.categoryIconName
      ));
    },
    onCategoryUpdateHandler: (categoryUpdateState) => {
      dispatch(categoryUpdate(
        categoryUpdateState.categoryID,
        categoryUpdateState.categoryName,
        categoryUpdateState.categoryIconName,
      ));
    },
    onCategoryDeleteHandler: (categoryDeleteState) => {
      dispatch(categoryDelete(categoryDeleteState.categoryID));
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer
