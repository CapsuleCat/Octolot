import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { Items as ItemsCollection } from '../collections/items';
import Items from '../components/Items';

const mapStateToProps = (state) => {
  return {
    filter: state.items.filter,
  };
};

const mapDataToProps = ({ filter }) => {
  const subscription = Meteor.subscribe('items', filter);

  return {
    state: subscription.ready() ? 'RESOLVED' : 'FETCHING',
    items: ItemsCollection.find({}, {
      sort: { createdAt: -1 }
    }).fetch(),
  };
};

export default connect(
  mapStateToProps
)(createContainer(mapDataToProps, Items));
