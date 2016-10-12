import React, { Component, PropTypes } from 'react';

import Loading from '/imports/modules/app/components/Loading';
import Result from './Result';

const { arrayOf, func, oneOf, shape, string } = PropTypes;

export default class Results extends Component {
  static propTypes = {
    error: shape({
      reason: string,
    }),
    items: arrayOf(shape({
      uuid: string,
    })),
    onAddResult: func.isRequired,
    results: arrayOf(shape({
      uuid: string,
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
    const { error } = this.props;

    if (error) {
      return <p>{error.reason}</p>
    }
    return <p>Something bad happend on our end. Try again in a bit</p>;
  }

  renderEmptyList = () => {
    return <p>No results found</p>;
  }

  renderList = () => {
    const { items, onAddResult, results } = this.props;

    return results.map((result) => {
      const owned = items.some(i => i.uuid === result.uuid);

      return (
        <Result
          isAdded={owned}
          item={result}
          key={result.uuid}
          onAddItem={onAddResult}
        />
      );
    });
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
