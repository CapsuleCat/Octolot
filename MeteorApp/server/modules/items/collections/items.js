import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Promise } from 'meteor/promise';
import aws from 'aws-lib';

import { Items } from '/imports/modules/items/collections/items';

const amazon = aws.createProdAdvClient(
  Meteor.settings.keys.amazon.access_key_id,
  Meteor.settings.keys.amazon.secret_access_key,
  Meteor.settings.keys.amazon.associate_tag
);

const OPTIONS = {
  SearchIndex: 'Blended',
  ResponseGroup: 'Images,ItemAttributes'
};

const querySearchFromAmazon = (term) => {
  return new Promise((resolve, reject) => {
    amazon.call('ItemSearch', { ...OPTIONS, Keywords: term }, Meteor.bindEnvironment(
      (error, result) => {
        if (error) {
          // Send the error to the client
          reject(
            new Meteor.Error(error, 'We could not get results from Amazon')
          );
        }

        if (result && result.Items &&
            result.Items.Request &&
            result.Items.Request.Errors) {
          return reject(
            new Meteor.Error(result.Items.Request.Errors, 'We could not get results from Amazon')
          );
        }

        const parseable = result && result.Items;

        if (!parseable) {
          return reject(
            new Meteor.Error({}, 'We could not parse the results Amazon gave us')
          );
        }

        const wrappedResults = result.Items.Item instanceof Array ? result.Items.Item : [result.Items.Item];

        const results = wrappedResults.filter(item => {
          // skip any results that don't make sense
          return (
            'ASIN' in item &&
            'ItemAttributes' in item &&
            'DetailPageURL' in item &&
            'SmallImage' in item &&
            'MediumImage' in item &&
            'LargeImage' in item
          );
        }).map(item => {
          const transformed = {
            createdAt: new Date(),
            uuid: item.ASIN,
            title: item.ItemAttributes.Title,
            productGroup: item.ItemAttributes.ProductGroup,
            links: {
              external: item.DetailPageURL,
            },
            images: {}
          };

          ['SmallImage', 'MediumImage', 'LargeImage'].forEach(type => {
            if (item[type]) {
              transformed.images[type.toLowerCase().replace('image', '')] = {
                link: item[type].URL,
                height: item[type].Height,
                width: item[type].Width,
              };
            }
          });

          Items.upsert({
            uuid: item.ASIN,
          }, {
            $set: transformed,
          });

          return transformed;
        });

        resolve(results);
      }
    ));
  });
}

Items._ensureIndex({
  title: 'text',
  productGroup: 'text',
});

Meteor.methods({
  'items.search'(term) {
    check(term, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Promise.await(querySearchFromAmazon(term));
  }
});

const searchRule = {
  userId() {
    return true;
  },
  type: 'method',
  method: 'items.search',
};

// No more than 5 search every 2 seconds
DDPRateLimiter.addRule(searchRule, 5, 2000);
