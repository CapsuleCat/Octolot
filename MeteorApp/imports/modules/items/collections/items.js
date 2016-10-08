import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('items', function itemsPublication() {
    // XXX return the items that a user has
    return Items.find({});
  });
}
