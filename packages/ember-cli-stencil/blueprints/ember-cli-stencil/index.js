/* eslint-env node */

const withTransform = require('ember-blueprint-jscodeshift');

module.exports = withTransform({
  description: 'Install the Custom Events mixin to the application',

  normalizeEntityName() {
    return '';
  },

  transforms: [
    {
      match: 'app/app.js',
      transform: '../../lib/transforms/install-custom-events.js'
    }
  ]
});
