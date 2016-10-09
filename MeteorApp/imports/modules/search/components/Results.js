import React, { Component, PropTypes } from 'react';

import Loading from '/imports/modules/app/components/Loading';
import Item from '/imports/modules/items/components/Item';

const { arrayOf, func, oneOf, shape } = PropTypes;

export default class Results extends Component {
  static propTypes = {
    onAddResult: func.isRequired,
    results: arrayOf(shape({

    })),
    state: oneOf([
      'INITIAL',
      'FETCHING',
      'RESOLVED',
      'FETCHING_ERROR',
    ])
  }

  static defaultProps = {
    results: [],
  }

  renderLoading = () => {
    return <Loading />;
  }

  renderError = () => {
    // TODO use the error to give a better message
    return <p>Something bad happend on our end. Try again in a bit</p>;
  }

  renderEmptyList = () => {
    return <p>No results found</p>;
  }

  renderList = () => {
    const { results } = this.props;
    return results.map(
      result => <Item item={result} key={result.uuid} />
    );
  }

  renderDefault = () => {
    return (
      <p>Search for an item to add to your stuff</p>
    );
  }

  render() {
    const { state, results } = this.props;

    const render = () => {
      if (state === 'FETCHING_ERROR') {
        return this.renderError();
      }
      else if (state === 'FETCHING') {
        return this.renderLoading();
      }
      else if (state === 'INITIAL') {
        return this.renderDefault();
      }
      else if (state === 'RESOLVED' && results.length === 0) {
        return this.renderEmptyList();
      } else {
        return this.renderList();
      }
    };

    return (
      <div className="search-results">
        {render()}
      </div>
    );
  }
}
