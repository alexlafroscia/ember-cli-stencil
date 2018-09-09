import test from 'ava';
import theredoc from 'theredoc';

import generateInitialzier from '../lib/generate-import-initializer';

test('generating the initializer for a single collection', t => {
  const generated = generateInitialzier(['demo-components']);

  t.is(
    generated,
    theredoc`
      import { defineCustomElements as defineDemoComponents } from 'demo-components';

      defineDemoComponents(window);

      export function initialize() {
        // No-op
      };

      export default {
        initialize
      };
    `
  );
});

test('generating the initializer for multiple collections', t => {
  const generated = generateInitialzier([
    'demo-components',
    'some-other-components'
  ]);

  t.is(
    generated,
    theredoc`
      import { defineCustomElements as defineDemoComponents } from 'demo-components';
      import { defineCustomElements as defineSomeOtherComponents } from 'some-other-components';

      defineDemoComponents(window);
      defineSomeOtherComponents(window);

      export function initialize() {
        // No-op
      };

      export default {
        initialize
      };
    `
  );
});
