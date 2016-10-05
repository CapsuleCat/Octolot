import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';

import { Tasks } from './tasks.js';

const { describe, it, beforeEach } = global;

if (Meteor.isServer) {
  // Tests
  describe('Tasks', () => {
    describe('methods', () => {
      let createdId;

      beforeEach(() => {
        Tasks.remove({});
        createdId = Tasks.insert({
          text: 'Test',
          createdAt: new Date(),
        });
      });

      it('creates a task', () => {
        const task = 'test task';

        const createTask = Meteor.server.method_handlers['tasks.insert'];

        const invocation = {};

        createTask.apply(invocation, [task]);

        expect(Tasks.find().count()).to.be.equal(2);
      });

      it('deletes a task', () => {
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        const invocation = {};

        deleteTask.apply(invocation, [createdId]);

        expect(Tasks.find().count()).to.be.equal(0);
      });
    });
  });
}
