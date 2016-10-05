import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import { View, Text } from 'react-native';

import styles from '../../app/styles';
import Filters from './Filters';
import Form from './Form';
import { default as TaskList } from './Tasks';
import { setFilter } from '../actions';
import { SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL } from '../constants';

const { arrayOf, func, number, object, oneOfType, shape, string } = PropTypes;

class TaskIndex extends Component {
  static propTypes = {
    filter: string,
    incompleteCount: number,
    handleDelete: func.isRequired,
    handleToggleCompleted: func.isRequired,
    handleSetFilter: func.isRequired,
    handleSubmit: func.isRequired,
    tasks: arrayOf(shape({
      _id: oneOfType([string, object]),
    })),
  }

  render() {
    const {
      filter,
      handleDelete,
      handleToggleCompleted,
      handleSetFilter,
      handleSubmit,
      incompleteCount,
      tasks
    } = this.props;

    return (
      <View>
        <View style={[styles.row, styles.header]}>
          <View style={styles.col}>
            <Text style={styles.headerText}>
              Todo List ({incompleteCount})
            </Text>
          </View>

          <View style={styles.col}>
            <Filters
              filter={filter}
              onSetFilter={handleSetFilter}
            />
          </View>
        </View>

        <View>
          <Form onSubmit={handleSubmit} />
        </View>

        <TaskList
          onDelete={handleDelete}
          onToggleCompleted={handleToggleCompleted}
          tasks={tasks}
        />
      </View>
    )
  }
}

const getSelectors = (filter) => {
  switch (filter) {
  case SHOW_COMPLETED:
    return { completed: true };
  case SHOW_ACTIVE:
    return { completed: { $ne: true } };
  case SHOW_ALL:
  default:
    return {};
  }
};

const mapDataToProps = ({ filter }) => {
  Meteor.subscribe('tasks');
  const Tasks = Meteor.collection('tasks');

  return {
    handleToggleCompleted: (id, completed) => {
      Meteor.call('tasks.setCompleted', id, !completed);

    },
    handleDelete: (id) => {
      Meteor.call('tasks.remove', id);
    },
    handleSubmit: (text) => {
      Meteor.call('tasks.insert', text);
    },
    tasks: Tasks.find(getSelectors(filter), {
      sort: { createdAt: -1 }
    }),
    incompleteCount: Tasks.find(getSelectors('SHOW_ACTIVE')).length,
  }
};


const mapStateToProps = (state) => {
  const { filter } = state.tasks;

  return {
    filter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetFilter: filter => dispatch(setFilter(filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  createContainer(
    mapDataToProps,
    TaskIndex
  )
);
