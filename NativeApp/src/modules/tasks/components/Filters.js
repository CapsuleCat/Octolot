import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MKCheckbox } from 'react-native-material-kit';

import appStyles from '../../app/styles';
import { SHOW_ACTIVE, SHOW_ALL } from '../constants';

const styles = Object.assign({}, appStyles, StyleSheet.create({
  filterCheckbox: {
    flex: -1,
    justifyContent: 'center',
    width: 20,
  },
  filterText: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}));

const { func, string } = PropTypes;

export default class Filters extends Component {
  static propTypes = {
    filter: string,
    onSetFilter: func.isRequired,
  }

  handleToggleFilter = () => {
    const { filter, onSetFilter } = this.props;

    let newFilter = SHOW_ACTIVE;

    if (filter === SHOW_ACTIVE) {
      newFilter = SHOW_ALL;
    }

    onSetFilter(newFilter);
  }

  render() {
    const { filter } = this.props;

    return (
      <View style={styles.row}>
        <View style={[styles.col, styles.filterCheckbox]}>
          <MKCheckbox
            checked={filter === SHOW_ACTIVE}
            onCheckedChange={this.handleToggleFilter}
            value="showActive"
          />
        </View>
        <View
          style={[styles.col, styles.filterText]}
        >
          <Text>
            Hide Completed Tasks
          </Text>
        </View>
      </View>
    );
  }
}
