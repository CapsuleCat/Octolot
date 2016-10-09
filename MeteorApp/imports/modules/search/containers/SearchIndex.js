import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';

import SearchIndex from '../components/SearchIndex';

const mapDataToProps = () => {
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
    }
  }
};

export default createContainer(mapDataToProps, SearchIndex);
