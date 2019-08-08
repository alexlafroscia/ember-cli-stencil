# ember-cli-stencil

[![Build Status](https://travis-ci.org/alexlafroscia/ember-cli-stencil.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-cli-stencil)
[![NPM Version](https://badgen.net/npm/v/ember-cli-stencil)](https://www.npmjs.com/package/ember-cli-stencil)
[![Stencil Compatibility](https://badgen.net/badge/stencil/^0.12.4?label=%40stencil%2Fcore)](https://stenciljs.com)

> Automatic discovery of [Stencil.js][stencil] components for your Ember application

Stencil provides a great, opinionated process for defining Web Components (custom elements) using TypeScript and JSX. The problem is that Ember has to be told about what these custom elements are and what events they can emit for you to integrate the two libraries together.

Because of the conventions of Stencil and the Ember CLI respectively, we can wrap up all of that boilerplate so that your custom elements "just work".

## Installation

Start by installing your Stencil components as `npm` modules, as described in the [distribution instructions][distribution] instructions in the guide. Then, install this addon:

```bash
ember install ember-cli-stencil
```

That's it! Your Stencil components will automatically be detected by the addon and pulled into your application.

## Usage

Since Stencil components are detected automatically, you can just start using any Stencil components discovered in your dependencies without any further configuration required. Props can be passed to them, just like other elements, and events listened to through the [`{{on}}` modifier][on-modifier].

```hbs
<my-custom-component props={{value}} {{on 'someEvent' this.handleEvent}}>
  Rendering into the slot
</my-custom-component>
```

## Debugging

If the build seems slow, or you think there are packages missing, you can log some debugging information like so:

```bash
DEBUG=ember-cli-stencil:* ember serve
```

This will report:

- Which packages were discovered to be Stencil collections
- Which files were imported into your `vendor.js` file
- Which files were added to the `public` folder of the build

If there are any issues around judging a file to be a Stencil collection incorrectly or importing the wrong files, please [file an issue][issues].

[stencil]: https://stenciljs.com/
[distribution]: https://stenciljs.com/docs/distribution
[issues]: https://github.com/alexlafroscia/ember-cli-stencil/issues
[on-modifier]: https://github.com/buschtoens/ember-on-modifier#readme
