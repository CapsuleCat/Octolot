import React, { Component, PropTypes } from 'react';

const { instanceOf, number, shape, string } = PropTypes;

export default class Item extends Component {
  static propTypes = {
    item: shape({
      createdAt: instanceOf(Date).isRequired,
      images: shape({
        small: shape({
          link: string,
          height: number,
          width: string
        }),
      }),
      links: shape({
        external: string,
      }).isRequired,
      productGroup: string.isRequired,
      title: string.isRequired,
    }),
  }

  render() {
    const { item } = this.props;
    const {
      createdAt,
      title,
      productGroup,
      links,
      images,
    } = item;

    return (
      <div className="item">
        <article>
          <div className="item__image">
            <img
              alt={title}
              src={images.small.link}
            />
          </div>
          <div className="item__text">
            <h2>{title}</h2>

            <p>This {productGroup} was added {createdAt.toString()}</p>
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
        </article>
      </div>
    );
  }
}
