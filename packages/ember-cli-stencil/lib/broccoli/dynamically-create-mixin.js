const FileCreator = require('broccoli-file-creator');

function mixinWithContent(content) {
  return `
    import Mixin from '@ember/object/mixin';

    export default Mixin.create(${JSON.stringify(content)});
  `;
}

module.exports = function(collections) {
  const customEvents = Object.assign(
    {},
    ...collections
      .map(collection => collection.allEvents)
      .reduce((acc, events) => [...acc, ...events], [])
      .map(({ event }) => ({ [event]: event }))
  );

  return new FileCreator(
    'mixins/custom-events.js',
    mixinWithContent({ customEvents })
  );
};
