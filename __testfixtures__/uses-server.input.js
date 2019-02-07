import { module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Scrip | Statement Reports', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    server.create('user');
  });
});
