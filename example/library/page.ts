import { $component, $children, div } from "../../index";

export const Page = $component(
  {
    id: "Page",
    name: "Page",
    description: "Page Example"
  },
  div({ class: "page" }, $children())
);
