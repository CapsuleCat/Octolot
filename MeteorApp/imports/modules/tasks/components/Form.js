import React, { Component, PropTypes } from 'react';

const { func } = PropTypes;

export default class Form extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const value = this.refs.textInput.value;

    this.props.onSubmit(value);

    this.refs.textInput.value = '';
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit}>
        <input
          placeholder="Type to add new tasks"
          ref="textInput"
          type="text"
        />
      </form>
    );
  }
}
