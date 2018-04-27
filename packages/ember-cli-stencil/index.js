'use strict';

const path = require('path');

const MergeTree = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const debug = require('debug');

const StencilCollection = require('./lib/stencil-collection');

module.exports = {
  name: 'ember-cli-stencil',

  addonOptions() {
    const config =
      (this.parent && this.parent.options) ||
      (this.app && this.app.options) ||
      {};

    return Object.assign(
      { generateWrapperComponents: true },
      config['ember-cli-stencil']
    );
  },

  // Get the parent's dependencies, including `devDependencies` for Ember addons
  getParentDependencies() {
    return Object.keys(
      this.parent.dependencies(this.parent.pkg, !this.parent.isEmberCLIAddon())
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    const logDiscovery = debug(`${this.name}:discovery`);

    this.stencilCollections = this.getParentDependencies()
      .map(dep => this.addonDiscovery.resolvePackage(this.parent.root, dep))
      .reduce((acc, pathToDep) => {
        const packagePath = path.join(pathToDep, 'package.json');
        const pkg = require(packagePath);

        if (StencilCollection.looksLike(pkg)) {
          logDiscovery(
            'found Stencil collection %o at %o',
            pkg.name,
            pathToDep
          );
          acc.push(new StencilCollection(pkg, pathToDep));
        } else {
          logDiscovery(
            'package %o does not seem to be a Stencil collection',
            pkg.name
          );
        }

        return acc;
      }, []);

    const logVendor = debug(`${this.name}:vendor`);
    this.stencilCollections.forEach(dep => {
      logVendor('importing browser file for %o at %o', dep.name, dep.browser);
      this.import(`vendor/${dep.browser}`);
    });
  },

  treeForApp(tree) {
    if (!this.addonOptions().generateWrapperComponents) {
      return tree;
    }

    const generatedComponents = this.stencilCollections.reduce((acc, dep) => {
      return [
        ...acc,
        ...dep.collection.components.map(component => {
          const props = component.props;
          const events = component.events;

          return writeFile(
            `components/${component.tag}.js`,
            `
              import generateComponent from 'ember-cli-stencil/-private/generate-component';

              export default generateComponent('${
                component.tag
              }', ${JSON.stringify(props)}, ${JSON.stringify(events)});
            `
          );
        })
      ];
    }, []);

    return new MergeTree([tree, ...generatedComponents]);
  },

  treeForVendor(tree) {
    const collectionTrees = this.stencilCollections.map(dep => {
      return new Funnel(dep.path, {
        files: [dep.browser]
      });
    });

    return new MergeTree([tree, ...collectionTrees]);
  },

  treeForPublic() {
    const log = debug(`${this.name}:public`);
    const collectionTrees = this.stencilCollections.map(dep => {
      log('copying files for %o at %o', dep.name, dep.publicFilesDir);

      return new Funnel(dep.publicFilesDir, {
        destDir: `assets/${dep.namespace}`
      });
    });

    return new MergeTree(collectionTrees);
  }
};
