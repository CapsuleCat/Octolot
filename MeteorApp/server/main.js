import { Meteor } from 'meteor/meteor';

import '/imports/modules/tasks/collections/tasks';
import './modules/auth/startup/config';
import './modules/items/collections/items';

Meteor.startup(() => {
  // code to run on server at startup
});
