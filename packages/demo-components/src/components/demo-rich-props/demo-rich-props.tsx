import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "demo-rich-props",
  shadow: true
})
export class DemoRichProps {
  @Prop() list: Array<string> = [];

  render() {
    return (
      <ul>
        {this.list.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    );
  }
}
