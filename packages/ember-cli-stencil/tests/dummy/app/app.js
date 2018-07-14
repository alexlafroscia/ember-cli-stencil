import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import CustomEvents from 'ember-cli-stencil/mixins/custom-events';

import { defineCustomElements as defineDemoComponents } from 'demo-components';
defineDemoComponents(window);

const App = Application.extend(CustomEvents, {
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
