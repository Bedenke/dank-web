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
  $,
  component,
  project
} from "../src/elements";

const MyElement = (title: string) => {
  return div(h1(title + " is a beatle"));
};

const sample = component(
  {
    name: "Sample Component"
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
        MyElement("My title"),
        ["Paul", "George", "John", "Ringo"].map(MyElement),
        $("This is a dynamic element", {
          id: "test.dynamic",
          label: "Dynamic Element"
        })
      )
    )
  )
);

export default project({
  name: "Project name",
  components: [sample]
});
