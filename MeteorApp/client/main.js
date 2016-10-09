import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import a11y from 'react-a11y';
import App from '/imports/modules/app/components/App';
import '/imports/modules/auth/startup/config';

const store = createStore(combineReducers(
  {
  }
));

Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    a11y(React);
  }

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('render-target')
  );
});
