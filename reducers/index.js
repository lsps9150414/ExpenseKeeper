import { combineReducers } from 'redux'
import categories from './categories'
import expenses from './expenses'

const combinedReducers = combineReducers({
  categories,
  expenses
})

export default combinedReducers
