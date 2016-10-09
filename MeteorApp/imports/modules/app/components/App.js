import React, { Component } from 'react';

import Accounts from '/imports/modules/auth/components/Accounts';
import IsLoggedIn from '/imports/modules/auth/components/IsLoggedIn';
import MyStuff from './MyStuff';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <IsLoggedIn
          LoggedIn={<MyStuff />}
          NotLoggedIn={<Accounts />}
        />
      </div>
    );
  }
}
