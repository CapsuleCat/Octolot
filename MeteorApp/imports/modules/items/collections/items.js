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

  Meteor.publishComposite('items', (filter) => ({
    find() {
      const { userId } = this;

      check(filter, Match.OneOf(Boolean, String));
      check(userId, String);

      return UserItems.find({
        userId,
      });
    },
    children: [{
      find(userItem) {
        const { selectors, options } = getSelectors(filter);

        return Items.find({
          ...selectors,
          uuid: userItem.itemUuid,
        }, options);
      }
    }]
  }));
}
