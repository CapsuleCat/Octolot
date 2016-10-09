import React, { Component, PropTypes } from 'react';

const { func } = PropTypes;

export default class Form extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
  }

  state = {
    value: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { value } = this.state;
    const { onSubmit } = this.props;

    onSubmit(value);
  }

  handleChange = (event) => {
    event.preventDefault();

    const { value } = event.target;
    const { onSubmit } = this.props;

    this.setState({
      value,
    });

    onSubmit(value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <input
            aria-label="Search"
            onChange={this.handleChange}
            placeholder="Search…"
            type="text"
            value={value}
          />
        </form>
      </div>
    );
  }
}
