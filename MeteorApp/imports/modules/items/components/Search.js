import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'debounce';

import { filter } from '../actions';

const { func } = PropTypes;

class Search extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
  }

  state = {
    value: '',
  }

  componentWillMount() {
    this.handleSubmit = debounce(this.props.handleSubmit, 500);
  }

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newVal = event.target.value;

    this.setState({
      value: newVal,
    });

    this.handleSubmit(newVal);
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.handleSubmit(this.state.value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="item-search">
        <form onSubmit={this.handleSubmitForm}>
          <input
            aria-label="Filter your stuff"
            onChange={this.handleChange}
            placeholder="Filter your stuff…"
            type="text"
            value={value}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: f => dispatch(filter(f)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
