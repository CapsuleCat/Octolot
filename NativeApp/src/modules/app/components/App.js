import React, { Component } from 'react';
import { View } from 'react-native';

import styles from '../styles';
import TaskIndex from '../../tasks/components';
import Meteor from 'react-native-meteor';

const SERVER_URL = 'ws://localhost:3000/websocket';

// App component - represents the whole app
export default class App extends Component {
  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  render() {
    return (
      <View style={styles.container}>
        <TaskIndex />
      </View>
    );
  }
}
