import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import nextRAF from 'ember-cli-stencil/test-support/raf';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('passing props', function(hooks) {
  setupRenderingTest(hooks);

  test('passing a string into a property', async function(assert) {
    await render(hbs`<demo-passing-props text="Foobar"></demo-passing-props>`);

    const el = await find('demo-passing-props');

    assert.equal(el.shadowRoot.textContent, 'Foobar');
  });

  test('passing a dynamic property into a component', async function(assert) {
    this.set('text', 'foo');
    await render(hbs`
      <demo-passing-props text={{text}}></demo-passing-props>
    `);

    const el = await find('demo-passing-props');

    assert.equal(el.shadowRoot.textContent, 'foo', 'Has the initial text');

    this.set('text', 'bar');
    await nextRAF();

    assert.equal(
      el.shadowRoot.textContent,
      'bar',
      'Has the updated text value'
    );
  });

  test('passing a function as a property', async function(assert) {
    const action = td.function('action');
    this.set('fn', action);
    await render(hbs`
      <demo-passing-props action={{fn}}></demo-passing-props>
    `);

    const el = await find('demo-passing-props');
    const button = el.shadowRoot.querySelector('button');

    await click(button);

    assert.verify(action());
  });
});
