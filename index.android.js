'use strict';

import React, {
  AppRegistry,
  Component
} from 'react-native'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducers from './reducers'
import { initStateTree } from './containers/mockupdata'

// import Main from './components/Main'
import MainContainer from './containers/MainContainer'

let store = createStore(combinedReducers, initStateTree);

class ExpenseKeeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    )
  }
};

AppRegistry.registerComponent('ExpenseKeeper', () => ExpenseKeeper);
