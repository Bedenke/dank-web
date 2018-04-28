import { $component, $children, div, $let, h1, h2 } from "../../index";

export const Hero = $component(
  {
    id: "Hero",
    name: "Hero",
    description: "Hero Example"
  },
  div(
    { class: "hero" },
    h1($let("h1.title", "Main Title")),
    h2($let("h2.title", "Subtitle"))
  )
);
