# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/alexlafroscia/ember-cli-stencil/compare/v0.4.0...v1.0.0) (2019-08-09)


### ⚠ BREAKING CHANGES

* `ember-cli-stencil` now requires that collections are authored using `@stencil/core` v1.0.0 or higher.
* If you were previously leveraging the custom Ember component wrappers, you should instead just invoke the custom elements like you normally would. Rather than using the `{{action}}` helper to listen to events, you should install `ember-on-modifiers` and leverage that to listen to events from your custom elements. If you were extending your `Application` instance with the `CustomEvents` mixin, that should be removed, as it is no longer necessary thanks to the `{{on}}` modifier.

### Bug Fixes

* changes `.reduce` to have a default value ([ae8a8c9](https://github.com/alexlafroscia/ember-cli-stencil/commit/ae8a8c9))
* check devDependencies for Stencil collections ([53ee6bd](https://github.com/alexlafroscia/ember-cli-stencil/commit/53ee6bd))
* compatibility with ember-cli 3.4 ([3f06969](https://github.com/alexlafroscia/ember-cli-stencil/commit/3f06969))


### Features

* modernize usage of Stencil components ([12b82d3](https://github.com/alexlafroscia/ember-cli-stencil/commit/12b82d3))
* update to support Stencil v1 collection format ([0642e11](https://github.com/alexlafroscia/ember-cli-stencil/commit/0642e11))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/alexlafroscia/ember-cli-stencil/compare/v0.2.0...v0.3.0) (2018-05-11)


### Features

* add mixin for custom Stencil events ([ac2031c](https://github.com/alexlafroscia/ember-cli-stencil/commit/ac2031c)), closes [#1](https://github.com/alexlafroscia/ember-cli-stencil/issues/1)
* Improve build-time logging ([27e859b](https://github.com/alexlafroscia/ember-cli-stencil/commit/27e859b))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/alexlafroscia/ember-cli-stencil/compare/v0.1.2...v0.2.0) (2018-04-27)


### Features

* Generate wrapper Ember components ([edd6d35](https://github.com/alexlafroscia/ember-cli-stencil/commit/edd6d35))
