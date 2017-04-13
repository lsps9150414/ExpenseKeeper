import {
  EXPENSE_ADD,
} from '../actions/actionTypes'

const expenseReducer = (prevStateExpenses, action) => {
  let maxID = 0;
  for (var i = 0; i < prevStateExpenses.length; i++) {
    if (Number(prevStateExpenses[i].id.substr(3)) >= maxID) {
      maxID = Number(prevStateExpenses[i].id.substr(3));
    }
  };
  return {
    id:           'ID-' + (maxID + 1),
    amount:       action.amount,
    date:         action.date,
    note:         action.note,
    category_id:  action.category_id,
  }
}

const expensesReducer = (prevStateExpenses = [], action) => {
  switch (action.type) {
    case EXPENSE_ADD:
      return [
        ...prevStateExpenses,
        expenseReducer(prevStateExpenses, action)
      ]
  }
  return prevStateExpenses;
}

export default expensesReducer
