'use strict';

const path = require('path');

const MergeTree = require('broccoli-merge-trees');
const writeFile = require('broccoli-file-creator');
const debug = require('debug');

const StencilCollection = require('./lib/stencil-collection');
const customEventsMixin = require('./lib/broccoli/dynamically-create-mixin');
const generateInitializer = require('./lib/generate-import-initializer');

module.exports = {
  name: require('./package').name,

  allOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  addonOptions() {
    const config = this.allOptions();

    return Object.assign(
      {
        autoImportCollections: true,
        generateWrapperComponents: true,
        generateCustomEventsMixin: true
      },
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
    const logDiscovery = debug(`${this.name}:discovery`);
    this._super.included.apply(this, arguments);

    // Ensure that `ember-auto-import` can handle the dynamic imports
    const opts = this.allOptions();
    opts.babel = opts.babel || {};
    opts.babel.plugins = opts.babel.plugins || [];
    opts.babel.plugins.push(require('ember-auto-import/babel-plugin'));

    let parentDepsPackages;
    if (this.addonDiscovery) {
      // ember-cli < 3.4
      parentDepsPackages = this.getParentDependencies()
        .map(dep => this.addonDiscovery.resolvePackage(this.parent.root, dep))
        .map(pathToDep => {
          return {
            root: pathToDep,
            pkg: require(path.join(pathToDep, 'package.json'))
          };
        });
    } else {
      // ember-cli >= 3.4
      const dependencies = Object.assign(
        {},
        this.parent._packageInfo.dependencyPackages,
        this.parent._packageInfo.devDependencyPackages
      );
      parentDepsPackages = Object.keys(dependencies).map(key => {
        const { realPath, pkg } = dependencies[key];

        return { root: realPath, pkg };
      });
    }

    // Find all Stencil collections in the dependencies
    this.stencilCollections = parentDepsPackages.reduce(
      (acc, { root, pkg }) => {
        if (StencilCollection.looksLike(pkg)) {
          logDiscovery('found Stencil collection %o at %o', pkg.name, root);
          acc.push(new StencilCollection(pkg, root));
        }

        return acc;
      },
      []
    );
  },

  treeForAddon(tree) {
    const config = this.addonOptions();

    if (config.generateCustomEventsMixin) {
      const merged = new MergeTree([
        tree,
        customEventsMixin(this.stencilCollections)
      ]);

      return this._super.treeForAddon.call(this, merged);
    }

    return tree;
  },

  treeForApp(tree) {
    const log = debug(`${this.name}:app`);
    const config = this.addonOptions();

    log('using addon configuration:\n%O', config);

    if (config.autoImportCollections) {
      log('configuration enabled auto-importing stencil collections');

      const importedCollectionsTree = writeFile(
        'initializers/auto-import-stencil-collections.js',
        generateInitializer(
          this.stencilCollections.map(collection => collection.name)
        )
      );

      tree = MergeTree([tree, importedCollectionsTree]);
    } else {
      log('configuration disabled auto-importing stencil collections');
    }

    if (config.generateWrapperComponents) {
      log('configuration enabled generating wrapper components');

      const generatedComponents = this.stencilCollections.reduce((acc, dep) => {
        return [
          ...acc,
          ...dep.collection.components.map(component => {
            log('generating component %o from %o', component.tag, dep.name);

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

      tree = MergeTree([tree, ...generatedComponents]);
    } else {
      log('configuration disabled generating wrapper components');
    }

    return tree;
  }
};
