import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { UserItems } from './user-items';
import { check, Match } from 'meteor/check';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  const getSelectors = (filters) => {
    if (filters) {
      return {
        selectors: {
          $text: {
            $search: filters,
          },
        },
        options: {
          fields: {
            score: { $meta: "textScore" }
          },
          sort: {
            score: { $meta: 'textScore' },
          },
        }
      };
    } else {
      return {
        selectors: {},
        options: {},
      };
    }
  };

  Meteor.publish('items', function itemsPublication(filter) {
    check(filter, Match.OneOf(Boolean, String));

    const { userId } = this;

    const userItems = UserItems.find({
      userId,
    });

    const uuids = userItems.map(i => i.itemUuid);
    const { selectors, options } = getSelectors(filter);

    const items = Items.find({
      ...selectors,
      uuid: {
        $in: uuids,
      }
    }, options);

    return [
      userItems,
      items,
    ];
  });
}
