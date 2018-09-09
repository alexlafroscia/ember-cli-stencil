const path = require('path');

const COLLECTION = Symbol();

class StencilCollection {
  constructor(pkg, path) {
    this.pkg = pkg;
    this.path = path;
  }

  get name() {
    return this.pkg.name;
  }

  get collection() {
    if (this[COLLECTION]) {
      return this[COLLECTION];
    }

    const collectionPath = this.pkg.collection;
    const collection = require(path.join(this.path, collectionPath));

    this[COLLECTION] = collection;

    return collection;
  }

  get manifest() {
    const collectionPath = this.pkg.collection;

    return require(path.join(this.path, collectionPath));
  }

  get allEvents() {
    return this.manifest.components
      .map(component => component.events || [])
      .reduce((acc, events) => [...acc, ...events]);
  }

  /**
   * Determine if the package looks like a Stencil collection
   * @param {object} pkg the package.json for a dependency
   * @return {boolean} whether the package is likely a Stencil collection
   */
  static looksLike(pkg) {
    return Boolean(pkg.collection);
  }
}

module.exports = StencilCollection;
