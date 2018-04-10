import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'demo-event-emitter',
  shadow: true
})
export class DemoEventEmitter {
  @Event() demoEvent: EventEmitter;

  render() {
    return (
      <button onClick={() => this.demoEvent.emit()}>
        <slot />
      </button>
    );
  }
}
