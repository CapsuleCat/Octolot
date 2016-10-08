import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { ITEM_TYPES } from '../constants';

export const UserItems = new Mongo.Collection('userItems');

// XXX Add authentication and authorization to publication
if (Meteor.isServer) {
  Meteor.publish('userItems', function itemsPublication() {
    return UserItems.find({});
  });
}

Meteor.methods({
  // XXX only logged in users can insert items
  'items.insert'({
    itemUuid,
    type = ITEM_TYPES.OWN,
  }) {
    check(itemUuid, String);
    check(type, String);
    // XXX check type is oneOfType
    const userId = this.userId;

    UserItems.insert({
      itemUuid,
      userId,
      type,
      createdAt: new Date(),
    });
  },
  // XXX only logged in users can delete items
  // XXX only the given user id can delete the item
  'items.delete'(id) {
    check(id, String);

    const userId = this.userId;

    UserItems.remove({
      id,
    });
  },
  // XXX only logged in users can move items
  // XXX only the given user id can delete the item
  'items.move'(id, type) {
    check(id, String);
    check(type, String);
    // XXX check type is oneOfType

    UserItems.update({
      id,
    }, {
      $set: {
        type,
      }
    });
  }
});
