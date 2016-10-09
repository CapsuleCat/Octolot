import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { UserItems } from './user-items';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('items', function itemsPublication() {
    const { userId } = this;

    const userItems = UserItems.find({
      userId,
    });

    const uuids = userItems.map(i => i.itemUuid);

    const items = Items.find({
      uuid: {
        $in: uuids,
      }
    });

    return [
      userItems,
      items,
    ];
  });
}
