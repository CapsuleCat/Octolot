import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';

import { Items } from '/imports/modules/items/collections/items';
import { ITEM_TYPES } from '/imports/modules/items/constants';
import SearchIndex from '../components/SearchIndex';

const mapDataToProps = () => {
  Meteor.subscribe('items');

  return {
    handleSearch: (term) => {
      return new Promise((resolve, reject) => {
        Meteor.call('items.search', term, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
    handleAdd: (uuid, type = ITEM_TYPES.OWN) => {
      return new Promise((resolve, reject) => {
        Meteor.call('items.insert', { itemUuid: uuid, type }, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result);
          }
        });
      });
    },
    items: Items.find({}).fetch(),
  }
};

export default createContainer(mapDataToProps, SearchIndex);
