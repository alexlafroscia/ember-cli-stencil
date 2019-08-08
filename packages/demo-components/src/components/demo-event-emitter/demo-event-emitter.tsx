import { Component, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "demo-event-emitter",
  shadow: true
})
export class DemoEventEmitter {
  @Event() demoEvent: EventEmitter;

  render() {
    return (
      <button onClick={() => this.demoEvent.emit({ foo: "bar" })}>
        <slot />
      </button>
    );
  }
}
