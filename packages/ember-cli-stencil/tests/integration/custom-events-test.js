import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import { waitUntilInShadowRoot } from 'ember-cli-stencil/test-support';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('custom events', function(hooks) {
  setupRenderingTest(hooks);

  test('can listen for events with an element modifier', async function(assert) {
    const customEventHandler = td.function();
    this.set('customEventHandler', customEventHandler);

    await render(hbs`
      <demo-event-emitter {{action (action customEventHandler) on='demoEvent'}}>
        Send Event
      </demo-event-emitter>
    `);

    const eventEmitter = await find('demo-event-emitter');
    const button = await waitUntilInShadowRoot(eventEmitter, 'button');

    await click(button);

    assert.verify(customEventHandler());
  });
});
