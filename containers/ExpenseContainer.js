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
  // let totalMonths = (currentYear - earliestYear - 1) * 12 + (12 - earliestMonth) + (currentMonth + 1);
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
        monthsBlob[i + '-' + ("0" + j).slice(-2)] = {
          Year: i,
          month: monthNames[j],
          spent: 0,
        }
      }
    }
  }
  return monthsBlob;
}
const getSectionIDs = (monthsBlob) => {
  return Object.keys(monthsBlob).reverse();
}
const getRowIDs = (expenses, sectionIDs) => {
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
        // TODO: sort rowIDs by date
        rowIDs[j].push(clonedExpenses[i].id);
      }
    }
  }
  return rowIDs;
}
const getExpensesBlob = (expenses, categories) => {
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
    }
  }
  return expensesBlob;
}
const mapStateToProps = (state) => {
  let monthsBlob =  getMonthsBlob(state.expenses);
  let sectionIDs =  getSectionIDs(monthsBlob);
  let rowIDs =      getRowIDs(state.expenses, sectionIDs);
  let expensesBlob = getExpensesBlob(state.expenses, state.categories);

  // console.log('monthsBlob', monthsBlob);
  // console.log('sectionIDs', sectionIDs);
  // console.log('rowIDs', rowIDs);

  return {
    dataBlob: { ...monthsBlob, ...expensesBlob },
    sectionIDs: sectionIDs,
    rowIDs: rowIDs,
  }
  // var dataBlob = {
  //   '2016-03'  : { "month": 'Mar', 'year': '2016', "spent": 18000 },
  //   '2016-02'  : { "month": 'Feb', 'year': '2016', "spent": 18000 },
  //   '2016-01'  : { "month": 'Jan', 'year': '2016', "spent": 18000 },
  //
  //   '2016-03:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 3, 2016",  "amount": 150 },
  //   '2016-03:rowID2': {"category": "TRANSPORTATION", "icon": "home", "color": "#ccc", "date": "Mar 2, 2016",  "amount": 250 },
  //   '2016-03:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //   '2016-03:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //   '2016-03:rowID5': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //   '2016-03:rowID6': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //   '2016-03:rowID7': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //   '2016-03:rowID8': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Mar 1, 2016",  "amount": 350 },
  //
  //   '2016-01:rowID1': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 28, 2016", "amount": 350 },
  //   '2016-01:rowID2': {"category": "GROCERIES",      "icon": "home", "color": "#ccc", "date": "Feb 27, 2016", "amount": 450 },
  //   '2016-01:rowID3': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
  //   '2016-01:rowID4': {"category": "FOOD",           "icon": "home", "color": "#ccc", "date": "Feb 26, 2016", "amount": 550 },
  // };

  // var  sectionIDs = [ '2016-03', '2016-02', '2016-01' ];

  // grouped by mounth
  // var  rowIDs = [
  //   [ 'rowID1', 'rowID2', 'rowID3', 'rowID4', 'rowID5', 'rowID6', 'rowID7', 'rowID8'],
  //   [ 'rowID1', 'rowID2', 'rowID3' ],
  //   [ 'rowID1', 'rowID2', 'rowID3', 'rowID4'],
  // ];
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ExpenseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense)

export default ExpenseContainer
