import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';

import styles from '../../app/styles';
import Task from './Task';

const { arrayOf, func, object, oneOfType, shape, string } = PropTypes;

export default class Tasks extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    onToggleCompleted: func.isRequired,
    tasks: arrayOf(shape({
      _id: oneOfType([string, object]),
    })),
  }

  render() {
    const { onDelete, onToggleCompleted, tasks } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={[styles.scrollView, styles.header]}
      >
        {
          tasks.map(t =>
            <Task
              key={t._id}
              onDelete={onDelete}
              onToggleCompleted={onToggleCompleted}
              task={t}
            />
          )
        }
      </ScrollView>
    );
  }
}
