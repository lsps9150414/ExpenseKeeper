// TODO: merge and refactor all routes files

export const RoutesMain = [
  {
    name: 'test',
    props: {
      title: 'Test',
      iconName: 'sort'
    }
  },
  {
    name: 'main',
    props: {
      title: 'Home',
      iconName: 'sort'
    }
  },
  {
    name: 'expense',
    props: {
      title: 'History',
      iconName: 'list'
    }
  },
  {
    name: 'charts',
    props: {
      title: 'Charts',
      iconName: 'equalizer'
    }
  },
  {
    name: 'settings',
    props: {
      title: 'Settings',
      iconName: 'settings'
    }
  },
];

export const RoutesSettings = [
  {
    name: 'currencySymbol',
    props: {
      title: 'Currency symbol',
      rightItem: 'NT$'
    }
  },
  {
    name: 'currencyDecimals',
    props: {
      title: 'Currency uses decimals',
    }
  },
  {
    name: 'categorySetting',
    props: {
      title: 'Categories',
    }
  },
  {
    name: 'categoryEditing',
    props: {
      title: 'Edit Category',
    }
  },
  {
    name: 'budgetSetting',
    props: {
      title: 'Budgets',
    }
  },
  // {
  //   name: 'dailyReportSetting',
  //   props: {
  //     title: 'Daily reports',
  //   }
  // },
];

export const RoutesExpenseEditing = {
  name: 'expenseEditing',
  props: {
    title: 'Edit',
  }
}
