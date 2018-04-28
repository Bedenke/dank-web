import { $component, $let, img } from "../../src/elements";

export const Image = $component(
  {
    id: "Image",
    name: "Image",
    description: "Image Example"
  },
  img({ src: $let("source", "Image Source") })
);
