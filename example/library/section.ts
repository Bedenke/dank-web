import { $component, $children, div, $let, h1, h2 } from "../../src/elements";

export const Section = $component(
  {
    id: "Section",
    name: "Section",
    description: "Section Example"
  },
  div(
    { class: "section" },
    $children()
  )
);
