import Component from '@ember/component';
import { bind } from '@ember/runloop';
import layout from '../templates/generated-component';

function emberPropertyNameFrom(eventName) {
  return 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
}

export default function generateComponent(tagName, props = [], events = []) {
  const eventNames = events.map(({ event }) => event);

  return Component.extend({
    tagName,
    layout,

    attributeBindings: props
      .filter(({ attr }) => attr)
      .map(prop => `${prop.name}:${prop.attr}`),

    _invokeEmberEvent(event) {
      const actionProperty = emberPropertyNameFrom(event.type);

      this[actionProperty](event);
    },

    didInsertElement() {
      this._super(...arguments);

      this._boundInvokeEmberEvent = bind(this, this._invokeEmberEvent);

      for (const event of eventNames) {
        this.element.addEventListener(event, this._boundInvokeEmberEvent);
      }

      for (const prop of props) {
        this.addObserver(prop.name, this._waitForPropigation);
      }
    },

    willDestroyElement() {
      for (const event of eventNames) {
        this.element.removeEventListener(event, this._boundInvokeEmberEvent);
      }

      this._super(...arguments);
    }
  });
}
