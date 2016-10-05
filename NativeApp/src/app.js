import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import taskReducer from './modules/tasks/reducers';
import App from './modules/app/components/App';

const store = createStore(combineReducers(
  {
    tasks: taskReducer,
  }
));

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
