import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setCompleted'(taskId, setCompleted) {
    check(taskId, String);
    check(setCompleted, Boolean);

    Tasks.update(taskId, { $set: { completed: setCompleted }});
  }
});
