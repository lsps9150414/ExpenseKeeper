import { categoryIconColors } from '../constants/categoryIconColors'

export var initStateTree = {
  expenses: [
    {
      id: 'ID-0',
      amount: 100,
      date: new Date(2015, 10, 1),
      note: 'lunch at BurgerKing',
      category_id: 'ID-0',
    },
    {
      id: 'ID-1',
      amount: 20,
      date: new Date(2015, 10, 2),
      note: 'egg',
      category_id: 'ID-1',
    },
    {
      id: 'ID-2',
      date: new Date(2016, 1),
      amount: 20,
      category_id: 'ID-1',
      note: 'egg',
    }
  ],
  categories: [
    {
      id: 'ID-0',
      order: 0,
      name: 'Food',
      icon_name: 'local-dining',
      // color: categoryIconColors['local-dining'],
      budget_enabled: true,
      budget_timeframe: 'month',
      budget_amount: 1500,
      expenses_id: [1,3,5,7,9,11,13],
    },
    {
      id: 'ID-1',
      order: 1,
      name: 'Groceries',
      icon_name: 'local-grocery-store',
      // color: categoryIconColors['local-grocery-store'],
      budget_enabled: true,
      budget_timeframe: 'month',
      budget_amount: 2000,
      expenses_id: [14,15,16,17],
    },
    {
      id: 'ID-2',
      order: 2,
      name: 'Travel',
      icon_name: 'flight',
      // color: categoryIconColors['flight'],
      budget_enabled: true,
      budget_timeframe: 'year',
      budget_amount: 10000,
      expenses_id: [14,15,16,17],
    },
    {
      id: 'ID-3',
      order: 3,
      name: 'Dating',
      icon_name: 'favorite',
      // color: categoryIconColors['local-dining'],
      budget_enabled: true,
      budget_timeframe: 'month',
      budget_amount: 1500,
      expenses_id: [1,3,5,7,9,11,13],
    },
    {
      id: 'ID-4',
      order: 4,
      name: 'Transportation',
      icon_name: 'directions-bus',
      // color: categoryIconColors['local-grocery-store'],
      budget_enabled: true,
      budget_timeframe: 'month',
      budget_amount: 2000,
      expenses_id: [14,15,16,17],
    },
    {
      id: 'ID-5',
      order: 5,
      name: 'Health',
      icon_name: 'local-hospital',
      // color: categoryIconColors['flight'],
      budget_enabled: false,
      budget_timeframe: 'year',
      budget_amount: 10000,
      expenses_id: [14,15,16,17],
    },
    {
      id: 'ID-6',
      order: 6,
      name: 'Learning',
      icon_name: 'lightbulb-outline',
      // color: categoryIconColors['flight'],
      budget_enabled: true,
      budget_timeframe: 'year',
      budget_amount: 10000,
      expenses_id: [14,15,16,17],
    },
  ]
}

export var MockupExpenses = {
  expenses: [
    {
      id: 1,
      date: '2016-03-07',
      amount: 100,
      category_id: 1,
      note: 'lunch at BurgerKing',
      photo: null,
    },
    {
      id: 2,
      date: '2016-03-08',
      amount: 20,
      category_id: 2,
      note: 'egg',
      photo: null,
    }
  ]
}

export var MockupCategories = {
  categories: [
    {
      id: 1,
      order: 1,
      name: 'food',
      icon: 'local-dining',
      color: '#ccc',
      budget_enabled: false,
      budget_timeframe: 'year',
      budget: 1500,
      expenses: [1,3,5,7,9,11,13],
    },
    {
      id: 2,
      order: 2,
      name: 'Groceries',
      icon: 'local-grocery-store',
      color: '#ccc',
      budget_enabled: false,
      budget_timeframe: 'month',
      budget: 2000,
      expenses: [14,15,16,17],
    },
    {
      id: 3,
      order: 3,
      name: 'transportation',
      icon: 'directions-bus',
      color: '#ccc',
      budget_enabled: false,
      budget_timeframe: 'month',
      budget: 1000,
      expenses: [2,4,6,8,10,12],
    },
    {
      id: 4,
      order: 4,
      name: 'travel',
      icon: 'flight',
      color: '#ccc',
      budget_enabled: true,
      budget_timeframe: 'year',
      budget: 10000,
      expenses: [18,19,20],
    },
    {
      id: 5,
      order: 5,
      name: 'shopping',
      icon: 'local-mall',
      color: '#ccc',
      budget_enabled: false,
      budget_timeframe: 'year',
      budget: 3000,
      expenses: [2,4,6,8,10,12],
    },
    {
      id: 6,
      order: 6,
      name: 'learning',
      icon: 'lightbulb-outline',
      color: '#ccc',
      budget_enabled: true,
      budget_timeframe: 'year',
      budget: 10000,
      expenses: [18,19,20],
    },
    {
      id: 7,
      order: 7,
      name: 'dating',
      icon: 'favorite',
      color: '#ccc',
      budget_enabled: false,
      budget_timeframe: 'month',
      budget: 1000,
      expenses: [2,4,6,8,10,12],
    },
    {
      id: 8,
      order: 8,
      name: 'health',
      icon: 'local-hospital',
      color: '#ccc',
      budget_enabled: true,
      budget_timeframe: 'year',
      budget: 10000,
      expenses: [18,19,20],
    },
  ]
}
