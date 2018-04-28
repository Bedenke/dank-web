import { ul, li, a, $let, $children, $component } from "../../src/elements";

export const NavigatorItem = $component(
  {
    id: "NavigatorItem",
    name: "Navigator Item",
    description: "Each element of navigator"
  },
  li(a({ href: $let("url", "/default/url") }, $let("link", "Link Name")))
);

export const Navigator = $component(
  {
    id: "Navigator",
    name: "Navigator",
    description: "Simple navigation UI"
  },
  ul({ class: "navigator" }, $children())
);
