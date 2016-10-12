import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'debounce';

import Form from './Form';
import SearchResults from './Results';
import { closeSearch } from '../actions';

const { arrayOf, bool, func, shape, string } = PropTypes;

class SearchIndex extends Component {
  static propTypes = {
    handleAdd: func.isRequired,
    handleSearch: func.isRequired,
    handleCloseSearch: func.isRequired,
    items: arrayOf(shape({
      uuid: string,
    })),
    show: bool,
  }

  static defaultProps = {
    show: false,
  }

  state = {
    results: [],
    state: 'INITIAL',
    timestamp: +new Date(),
  }

  componentWillMount() {
    this.handleSearch = debounce((term) => {
      const timestamp = +new Date();

      return this.setState({
        state: 'FETCHING',
        timestamp: Math.max(timestamp, this.state.timestamp),
      }, () => {
        return this.props.handleSearch(term).then((results) => {
          if (timestamp < this.state.timestamp) {
            // ignore
            return;
          }

          this.setState({
            state: 'RESOLVED',
            results,
          });

          return null;
        }).catch((error) => {
          this.setState({
            error,
            state: 'FETCHING_ERROR',
            results: [],
          })
        });
      });
    }, 1000);
  }

  handleSubmit = (term) => {
    this.handleSearch(term);
  }

  handleAddResult = (uuid) => {
    const { handleAdd, handleCloseSearch } = this.props;

    handleAdd(uuid);

    handleCloseSearch();
  }

  render() {
    const { error, results, state } = this.state;
    const { items, show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="search">
        <header>
          <Form
            onSubmit={this.handleSubmit}
          />
        </header>

        <div className="search__main">
          <SearchResults
            error={error}
            items={items}
            onAddResult={this.handleAddResult}
            results={results}
            state={state}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.search.ui.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCloseSearch: () => dispatch(closeSearch()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchIndex);
