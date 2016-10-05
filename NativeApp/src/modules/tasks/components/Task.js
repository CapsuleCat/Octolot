import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  MKButton,
  MKCheckbox
} from 'react-native-material-kit';

import appStyles from '../../app/styles';

const styles = Object.assign({}, appStyles, StyleSheet.create({
  taskCheckbox: {
    flex: -1,
    justifyContent: 'center',
    width: 20,
  },
  taskText: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  taskTextContent: {
    textAlign: 'left',
  },
  taskButton: {
    flex: -1,
    justifyContent: 'center',
    width: 10,
  }
}));

const { bool, func, object, oneOfType, shape, string } = PropTypes;

// Task component - represents a single todo item
export default class Task extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    task: shape({
      _id: oneOfType([object, string]),
      checked: bool,
      text: string,
    }).isRequired,
  }

  handleDeleteTask = () => {
    const { task } = this.props;
    const { _id } = task;

    this.props.onDelete(_id);
  }

  handleToggleCompleted = () => {
    const { task } = this.props;
    const { _id, completed } = task;
    this.props.onToggleCompleted(_id, completed);
  }

  render() {
    const { task } = this.props;
    const { completed } = task;

    return (
      <View style={styles.row}>
        <View style={[styles.col, styles.taskCheckbox]}>
          <MKCheckbox
            checked={completed}
            onCheckedChange={this.handleToggleCompleted}
          />
        </View>

        <View style={[styles.col, styles.taskText]}>
          <Text style={styles.taskTextContent}>
            {task.text}
          </Text>
        </View>

        <View style={[styles.col, styles.taskButton]}>
          <MKButton
            onPress={this.handleDeleteTask}
          >
            <Text pointerEvents="none">&times;</Text>
          </MKButton>
        </View>
      </View>
    );
  }
}
