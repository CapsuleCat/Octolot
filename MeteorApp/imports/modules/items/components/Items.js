import React, { Component, PropTypes } from 'react';

import Error from '/imports/modules/app/components/Error';
import Loading from '/imports/modules/app/components/Loading';
import Item from './Item';

const { arrayOf, oneOf, shape, string } = PropTypes;

class Items extends Component {
  static propTypes = {
    items: arrayOf(shape({
      uuid: string,
    })),
    state: oneOf(['INITIAL', 'RESOLVED', 'FETCHING', 'ERROR_FETCHING']),
  }

  static defaultProps = {
    items: [],
    state: 'INITIAL',
  }

  renderError = () => {
    return (
      <Error>
        Something bad happened…
      </Error>
    );
  }

  renderEmptyList = () => {
    return (
      <div className="items items--empty">
        <div className="items__message">
          <p>
            You don't have any items yet.
          </p>
          <p>
            Get started by searching for items you
            own or by scanning their barcodes!
          </p>
        </div>
      </div>
    );
  }

  renderList = () => {
    const { items } = this.props;

    if (items.length === 0) {
      return this.renderEmptyList();
    }

    return (
      <div className="items">
        {items.map(item => <Item item={item} key={item.uuid} />)}
      </div>
    );
  }

  render() {
    const { state } = this.props;

    switch (state) {
    case 'INITIAL':
    case 'FETCHING':
      return <Loading />;
    case 'ERROR_FETCHING':
      return this.renderError();
    case 'RESOLVED':
      return this.renderList();
    default:
      return <Loading />;
    }
  }
}

export default Items;
