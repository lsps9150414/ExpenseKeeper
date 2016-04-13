import { connect } from 'react-redux'

import ExpenseEditing from '../components/pages/ExpenseEditing'

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ExpenseEditingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseEditing)

export default ExpenseEditingContainer
