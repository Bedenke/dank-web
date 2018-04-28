import { $component, $let, img } from "../../index";

export const Image = $component(
  {
    id: "Image",
    name: "Image",
    description: "Image Example"
  },
  img({ src: $let("source", "Image Source") })
);
