import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { ITEM_TYPES } from '../constants';

export const UserItems = new Mongo.Collection('userItems');

if (Meteor.isServer) {
  Meteor.publish('userItems', function itemsPublication() {
    const { userId } = this;

    return UserItems.find({
      userId,
    });
  });
}

const checkType = (type) => {
  const typeIsValid = Object.keys(ITEM_TYPES)
    .map(k => ITEM_TYPES[k])
    .map(t => t === type)
    .reduce((a, b) => a || b, false);

  if (! typeIsValid) {
    throw new Meteor.Error('invalid-type');
  }
}

Meteor.methods({
  'items.insert'({
    itemUuid,
    type = ITEM_TYPES.OWN,
  }) {
    const { userId } = this;

    check(itemUuid, String);
    check(type, String);
    checkType(type);

    if (! userId) {
      throw new Meteor.Error('not-authorized');
    }

    return UserItems.insert({
      itemUuid,
      userId,
      type,
      createdAt: new Date(),
    });
  },
  'items.delete'(id) {
    const { userId } = this;

    check(id, String);

    if (! userId) {
      throw new Meteor.Error('not-authorized');
    }

    return UserItems.remove({
      _id: id,
      userId,
    });
  },
  'items.move'(id, type) {
    const { userId } = this;

    check(id, String);
    check(type, String);
    checkType(type);

    if (! userId) {
      throw new Meteor.Error('not-authorized');
    }

    return UserItems.update({
      _id: id,
      userId,
    }, {
      $set: {
        type,
      }
    });
  }
});
