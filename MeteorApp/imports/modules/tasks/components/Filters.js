import React, { Component, PropTypes } from 'react';
import { SHOW_ACTIVE, SHOW_ALL } from '../constants';

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
      <label
        className="hide-completed"
        htmlFor="taskFilters"
      >
        <input
          checked={filter === SHOW_ACTIVE}
          id="taskFilters"
          onClick={this.handleToggleFilter}
          readOnly
          type="checkbox"
        />
        Hide Completed Tasks
      </label>
    );
  }
}
