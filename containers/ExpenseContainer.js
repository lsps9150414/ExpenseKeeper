import _ from 'lodash'
import { connect } from 'react-redux'

import Expense from '../components/pages/Expense'

const getEarliestExpenseDate = (expenses) => {
  // return the earliest month, year
  let earliestDate = new Date();
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].date < earliestDate) {
      earliestDate = expenses[i].date;
    }
  }
  return earliestDate;
}
const getMonthsBlob = (expenses) => {
  let earliestDate = getEarliestExpenseDate(expenses);
  let earliestYear = earliestDate.getFullYear();
  let earliestMonth = earliestDate.getMonth();
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthsBlob = {};

  for (let i = earliestYear; i <= currentYear; i++) {
    for (let j = 0; j < 12; j++) {
      if (i == earliestYear && j < earliestMonth) {
        continue;
      }
      else if (i == currentYear && j > currentMonth) {
        break;
      }
      else {
        monthsBlob[ i + '-' + ("0" + j).slice(-2) ] = {
          year: i,
          month: monthNames[j],
          spent: 0,
        }
      }
    }
  }
  return monthsBlob;
}
const getExpensesBlob = (expenses, categories, monthsBlob) => {
  let expensesBlob = {};
  let categoryMap = {};
  for (let i = 0; i < categories.length; i++) {
    categoryMap[categories[i].id] = {
      name: categories[i].name,
      icon_name: categories[i].icon_name,
    }
  }

  for (let i = 0; i < expenses.length; i++) {
    let expenseYear = expenses[i].date.getFullYear();
    let expenseMonth = expenses[i].date.getMonth();
    let sectionID = expenseYear + '-' + ("0" + expenseMonth).slice(-2);

    expensesBlob[ sectionID + ':' + expenses[i].id ] = {
      'categoryName': categoryMap[expenses[i].category_id].name,
      'iconName':     categoryMap[expenses[i].category_id].icon_name,
      'note':         expenses[i].note,
      'date':         expenses[i].date.toDateString(),
      'amount':       expenses[i].amount,
    };
    monthsBlob[sectionID].spent += expenses[i].amount;
  }
  return expensesBlob;
}
const getSectionIDs = (monthsBlob) => {
  return Object.keys(monthsBlob).reverse();
}
const getRowIDs = (expenses, sectionIDs) => {
  // FIXME: months with no expense do not show up as sections due to empty rowIDs.
  let clonedExpenses = _.cloneDeep(expenses);
  clonedExpenses.sort((a, b) => (b.date - a.date));
  let earliestDate = getEarliestExpenseDate(expenses);
  let earliestYear = earliestDate.getFullYear();
  let earliestMonth = earliestDate.getMonth();
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  let rowIDs = [];
  for (let i = 0; i < sectionIDs.length; i++) {
    rowIDs[i] = [];
  }

  for (let i = 0; i < expenses.length; i++) {
    let expenseYear = clonedExpenses[i].date.getFullYear();
    let expenseMonth = clonedExpenses[i].date.getMonth();

    for (let j = 0; j < sectionIDs.length; j++) {
      let sectionIDYear = Number(sectionIDs[j].slice(0, 4));
      let sectionIDMonth = Number(sectionIDs[j].slice(-2));

      if (expenseYear == sectionIDYear && expenseMonth == sectionIDMonth) {
        rowIDs[j].push(clonedExpenses[i].id);
      }
    }
  }
  return rowIDs;
}

const mapStateToProps = (state) => {
  let monthsBlob =    getMonthsBlob(state.expenses);
  let expensesBlob =  getExpensesBlob(state.expenses, state.categories, monthsBlob);
  let sectionIDs =  getSectionIDs(monthsBlob);
  let rowIDs =      getRowIDs(state.expenses, sectionIDs);
  console.log('dataBlob', { ...monthsBlob, ...expensesBlob });
  console.log('sectionIDs', sectionIDs);
  console.log('rowIDs', rowIDs);
  return {
    dataBlob: { ...monthsBlob, ...expensesBlob },
    sectionIDs: sectionIDs,
    rowIDs: rowIDs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ExpenseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense)

export default ExpenseContainer
