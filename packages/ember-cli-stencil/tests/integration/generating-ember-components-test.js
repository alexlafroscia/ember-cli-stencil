import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, clearRender } from '@ember/test-helpers';
import {
  findInShadowRoot,
  getShadowRoot,
  nextRAF
} from 'ember-cli-stencil/test-support';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('generating ember components', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates an Ember component for each Stencil component', async function(assert) {
    await render(hbs`
      {{demo-passing-props}}
      {{demo-event-emitter}}
    `);

    assert.dom('demo-passing-props').exists();
    assert.dom('demo-event-emitter').exists();
  });

  test('it can render into the slots of the Stencil component', async function(assert) {
    await render(hbs`
      {{#demo-event-emitter}}
        Click me!
      {{/demo-event-emitter}}
    `);

    assert.dom('demo-event-emitter').hasText('Click me!');
  });

  test('passing properties to the underlying element', async function(assert) {
    this.set('text', 'foo');

    await render(hbs`
      {{demo-passing-props text=text}}
    `);

    const el = await find('demo-passing-props');
    const shadowRoot = await getShadowRoot(el);

    assert.equal(shadowRoot.textContent, 'foo', 'Has the initial text');

    this.set('text', 'bar');
    await nextRAF();

    assert.equal(shadowRoot.textContent, 'bar', 'Has the updated text value');
  });

  module('event listeners', function() {
    test('it sets up an event listener for each Stencil event', async function(assert) {
      this.handleDemoEvent = td.function('handler');

      await render(hbs`
        {{demo-event-emitter onDemoEvent=(action handleDemoEvent)}}
      `);

      const el = await find('demo-event-emitter');
      const button = await findInShadowRoot(el, 'button');

      await click(button);

      assert.verify(this.handleDemoEvent(td.matchers.isA(CustomEvent)));
    });

    test('it removes the event listeners when the component is destroyed', async function(assert) {
      this.handleDemoEvent = td.function('handler');

      await render(hbs`
        {{demo-event-emitter onDemoEvent=(action handleDemoEvent)}}
      `);

      const el = await find('demo-event-emitter');
      const removeEventListener = td.replace(el, 'removeEventListener');

      await clearRender();

      assert.verify(
        removeEventListener('demoEvent', td.matchers.isA(Function))
      );
    });
  });
});
