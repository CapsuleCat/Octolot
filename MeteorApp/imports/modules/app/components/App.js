import React, { Component } from 'react';
import TaskIndex from '/imports/modules/tasks/components';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <TaskIndex />
      </div>
    );
  }
}
