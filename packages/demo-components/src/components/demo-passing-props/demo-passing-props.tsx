import { Component, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'demo-passing-props',
  shadow: true
})
export class DemoEventEmitter {
  @Prop() text: string;
  @Prop() action: Function;

  @Watch('text')
  textDidChange() {
    debugger;
  }

  render() {
    return (
      <button onClick={() => this.action()}>{this.text}</button>
    );
  }
}
