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
  $
} from "../src/elements";

const MyComponent = (title: string) => {
  return div(h1(title + " is a beatle"));
};

export const sample = html(
  head(title("Hello World")),
  body(
    h1("Title"),
    h2("Subtitle"),
    div(
      { id: "my-id", class: "hello" },
      h3({ class: "blink" }, "Wow!"),
      [span("Foo"), b("Bar"), i("Far")],
      MyComponent("My title"),
      ["Paul", "George", "John", "Ringo"].map(MyComponent),
      $("This is a dynamic element", {
        id: "test.dynamic",
        label: "Dynamic Element"
      })
    )
  )
);
