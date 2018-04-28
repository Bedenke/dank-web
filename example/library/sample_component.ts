import {
  h1,
  head,
  html,
  title,
  body,
  h2,
  div,
  h3,
  span,
  b,
  i,
  $let,
  $component
} from "../../src/elements";
import SampleElement from "./sample_element";

export default $component(
  {
    id: "sample_component",
    name: "Sample Component",
    description: "A component can be used multiple times in a project"
  },
  html(
    head(title("Hello World")),
    body(
      h1("Title"),
      h2("Subtitle"),
      div(
        { id: "my-id", class: "hello" },
        h3({ class: "blink" }, "Wow!"),
        [span("Foo"), b("Bar"), i("Far")],
        SampleElement({ title: "My title", type: "type1" }),
        ["Paul", "George", "John", "Ringo"].map(beatle =>
          SampleElement({ title: beatle, type: "type2" })
        ),
        $let("dynamic", "This is a dynamic element", {
          label: "Dynamic Element"
        })
      )
    )
  )
);
