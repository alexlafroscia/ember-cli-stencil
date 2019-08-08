'use strict';

const camelCase = require('lodash.camelcase');
const theredoc = require('theredoc');

function generateInitializer(moduleNames) {
  const modules = moduleNames.map(module => ({
    name: module,
    polyfillFunction: camelCase(`apply-polyfills-${module}`),
    importFunction: camelCase(`define-${module}`)
  }));

  const moduleImports = modules
    .map(
      ({ name, polyfillFunction, importFunction }) =>
        theredoc`
          import {
            applyPolyfills as ${polyfillFunction},
            defineCustomElements as ${importFunction}
          } from '${name}/loader';
        `
    )
    .reduce(
      (acc, importStatement) =>
        acc + (acc === '' ? '' : '\n') + importStatement,
      ''
    );

  const defineComponents = modules.reduce(
    (acc, { polyfillFunction, importFunction }) =>
      acc +
      (acc === '' ? '' : '\n') +
      theredoc`
        ${polyfillFunction}().then(function() {
          ${importFunction}(window);
        });
      `,
    ''
  );

  const initializer = theredoc`
    export function initialize() {
      // No-op
    };

    export default {
      initialize
    };
  `;

  return moduleImports + '\n\n' + defineComponents + '\n\n' + initializer;
}

module.exports = generateInitializer;
