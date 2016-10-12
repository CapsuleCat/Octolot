import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const { bool, func, object, shape, string } = PropTypes;

export default class Result extends Component {
  static propTypes = {
    isAdded: bool,
    item: shape({
      uuid: string,
      images: shape({
        small: shape({
          link: string,
          height: object,
          width: object,
        }),
      }),
      links: shape({
        external: string,
      }).isRequired,
      productGroup: string.isRequired,
      title: string.isRequired,
    }),
    onAddItem: func.isRequired,
  }

  static defaultProps = {
    isAdded: false,
  }

  handleAddItem = (event) => {
    const { onAddItem, item } = this.props;
    event.preventDefault();

    onAddItem(item.uuid);
  }

  render() {
    const { isAdded, item } = this.props;
    const {
      title,
      productGroup,
      links,
      images
    } = item;

    const resultClass = classNames({
      'item': true,
      'item__owned': isAdded,
    });

    return (
      <div className={resultClass}>
        <article>
          <div className="item__image">
            <img
              alt={title}
              src={images.small.link}
            />
          </div>
          <div className="item__text">
            <h2>{title}</h2>
            <p>{productGroup}</p>
          </div>
          <div className="item__links">
            {
              links.external ?
              <a href={links.external} target="tab">
                See on Amazon
              </a> :
              null
            }
          </div>
          <div className="item__actions">
            <button
              className="item__actions__add"
              onClick={this.handleAddItem}
            >
              Add Item to My Stuff
            </button>
          </div>
        </article>
      </div>
    );
  }
}
