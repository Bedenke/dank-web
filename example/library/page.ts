import { $component, $children, div } from "../../src/elements";

export const Page = $component(
  {
    id: "Page",
    name: "Page",
    description: "Page Example"
  },
  div({ class: "page" }, $children())
);
