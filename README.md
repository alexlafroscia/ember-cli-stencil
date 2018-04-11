ember-cli-stencil
=================================================================================

> Automatic discovery of [Stencil.js][stencil] components for your Ember application

Stencil provides a great, opinionated process for defining Web Components
(custom elements) using TypeScript and JSX. The problem is that Ember has to be
told about what these custom elements are and what events they can emit for you
to integrate the two libraries together.

Because of the conventions of Stencil and the Ember CLI respectively, we can wrap
up all of that boilerplate so that your custom elements "just work".

Installation
---------------------------------------------------------------------------------

TBD

Usage
---------------------------------------------------------------------------------

`ember-cli-stencil` automatically find Stencil collections in your `package.json`
dependencies (and `devDependencies` for addons) and includes them in your
application. With your Stencil collection and this addon installed, you should be
able to start using Stencil-authored WebComponents in your Ember app with no
additional configuration.

Debugging
---------------------------------------------------------------------------------

If the build seems slow, or you think there are packages missing, you can log some
debugging information like so:

```bash
DEBUG=ember-cli-stencil:* ember serve
```

* Which packages were discovered to be Stencil collections
* Which files were imported into your `vendor.js` file
* Which files were added to the `public` folder of the build

If there are any issues around judging a file to be a Stencil collection
incorrectly or importing the wrong files, please [file an issue][issues].

[stencil]: https://stenciljs.com/
[issues]: https://github.com/alexlafroscia/ember-cli-stencil/issues
