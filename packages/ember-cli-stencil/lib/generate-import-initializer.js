const { camelCase } = require('lodash');
const theredoc = require('theredoc');

function generateInitializer(moduleNames) {
  const modules = moduleNames.map(module => ({
    name: module,
    importFunction: camelCase(`define-${module}`)
  }));

  const moduleImports = modules
    .map(
      ({ name, importFunction }) =>
        `import { defineCustomElements as ${importFunction} } from '${name}';`
    )
    .reduce(
      (acc, importStatement) =>
        acc + (acc === '' ? '' : '\n') + importStatement,
      ''
    );

  const defineComponents = modules
    .map(module => module.importFunction)
    .reduce(
      (acc, importFunction) =>
        acc + (acc === '' ? '' : '\n') + `${importFunction}(window);`,
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
