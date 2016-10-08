import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Items as ItemsCollection } from '../collections/items';
import Items from '../components/Items';

const mapDataToProps = () => {
  const subscription = Meteor.subscribe('items');

  return {
    state: subscription.ready() ? 'RESOLVED' : 'FETCHING',
    items: ItemsCollection.find({}, {
      sort: { createdAt: -1 }
    }).fetch(),
  };
};

export default createContainer(mapDataToProps, Items);
