const path = require('path');

class StencilCollection {
  constructor(pkg, path) {
    this.pkg = pkg;
    this.path = path;
  }

  get name() {
    return this.pkg.name;
  }

  get browser() {
    return this.pkg.browser;
  }

  get namespace() {
    return path.parse(this.browser).name;
  }

  get publicFilesDir() {
    const { dir } = path.parse(path.join(this.path, this.browser));

    return path.join(dir, this.namespace);
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
