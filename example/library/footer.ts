import { $component, $children, $let, footer } from "../../src/elements";

export const Footer = $component(
  {
    id: "Footer",
    name: "Footer",
    description: "Footer Example"
  },
  footer({ class: "footer" }, $let("about", "About This Footer"))
);
