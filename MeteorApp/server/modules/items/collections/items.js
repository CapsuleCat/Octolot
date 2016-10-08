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

        const parseable = result && result.Items && result.Items.Item instanceof Array;

        if (!parseable) {
          return reject(
            new Meteor.Error({}, 'We could not parse the results Amazon gave us')
          );
        }

        const results = result.Items.Item.filter(item => {
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

Meteor.methods({
  // XXX only logged in users can search
  'items.search'(term) {
    check(term, String);

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
