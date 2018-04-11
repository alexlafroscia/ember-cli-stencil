'use strict';

const path = require('path');

const MergeTree = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

function isStencilCollection(pkg) {
  return Boolean(pkg.collection);
}

module.exports = {
  name: 'ember-cli-stencil',

  // Get the parent's dependencies, including `devDependencies` for Ember addons
  getParentDependencies() {
    return Object.keys(
      this.parent.dependencies(this.parent.pkg, !this.parent.isEmberCLIAddon())
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    this.stencilCollections = this.getParentDependencies()
      .map(dep => this.addonDiscovery.resolvePackage(this.parent.root, dep))
      .reduce((acc, dep) => {
        const packagePath = path.join(dep, 'package.json');
        const pkg = require(packagePath);

        if (isStencilCollection(pkg)) {
          acc[dep] = pkg;
        }

        return acc;
      }, {});

    Object.keys(this.stencilCollections).forEach(dep => {
      const pkg = this.stencilCollections[dep];

      this.import(`vendor/${pkg.browser}`);
    });
  },

  treeForVendor(tree) {
    const collectionTrees = Object.keys(this.stencilCollections).map(dep => {
      const pkg = this.stencilCollections[dep];

      return new Funnel(dep, {
        files: [pkg.browser]
      });
    });

    return new MergeTree([tree, ...collectionTrees]);
  },

  treeForPublic() {
    const collectionTrees = Object.keys(this.stencilCollections).map(dep => {
      const pkg = this.stencilCollections[dep];
      const { dir, name } = path.parse(path.join(dep, pkg.browser));
      const publicFilesDir = path.join(dir, name);

      return new Funnel(publicFilesDir, {
        destDir: `assets/${name}`
      });
    });

    return new MergeTree(collectionTrees);
  }
};
