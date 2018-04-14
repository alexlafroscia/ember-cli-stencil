const debug = require('debug')('ember-cli-stencil:install-custom-events');

const CUSTOM_EVENTS_MIXIN = 'ember-cli-stencil/custom-events';

module.exports = function(fileInfo, api) {
  if (fileInfo.source.includes(CUSTOM_EVENTS_MIXIN)) {
    debug('%o already seems to have the mixin applied', fileInfo.path);
    return fileInfo.source;
  }

  debug('Running codemod on %o', fileInfo.path);

  const j = api.jscodeshift;
  const tree = j(fileInfo.source);

  const mixinIdentifier = j.identifier('CustomStencilEvents');

  // Import the "custom events" mixin
  const imports = tree.find(j.ImportDeclaration, node => {
    return node.source.value === '@ember/application';
  });
  const applicationVariableName = imports.get('specifiers').value[0].local.name;

  const newImport = j.importDeclaration(
    [j.importDefaultSpecifier(mixinIdentifier)],
    j.literal(CUSTOM_EVENTS_MIXIN)
  );

  imports.insertAfter(newImport);

  // Inject the mixin into the application
  const applicationExtension = tree.find(j.CallExpression, node => {
    return (
      node.callee.type === 'MemberExpression' &&
      node.callee.object.name === applicationVariableName
    );
  });

  applicationExtension.get('arguments').unshift(mixinIdentifier);

  return tree.toSource();
};
