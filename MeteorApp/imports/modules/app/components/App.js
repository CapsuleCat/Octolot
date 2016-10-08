import React, { Component } from 'react';
import MyStuff from './MyStuff';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <MyStuff />
      </div>
    );
  }
}
