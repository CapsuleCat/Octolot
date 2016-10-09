import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { openSearch } from '/imports/modules/search/actions';

const { func } = PropTypes;

class AddItems extends Component {
  static propTypes = {
    handleSearch: func.isRequired,
  }

  render() {
    const { handleSearch } = this.props;

    return (
      <div className="add-items">
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: () => dispatch(openSearch()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItems);
