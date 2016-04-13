import { connect } from 'react-redux'

import Main from '../components/Main'
import {
  categoryAdd,
  categoryUpdate,
  categoryDelete,
  expenseAdd,
  expenseUpdate,
  expenseDelete,
} from '../actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for category
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
    },
    // for expense
    onExpenseAddHandler: (expenseAddState) => {
      dispatch(expenseAdd(
        expenseAddState.expenseAmount,
        expenseAddState.expenseDate,
        expenseAddState.expenseNote,
        expenseAddState.expenseCategory
      ));
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer
