import { h1, div } from "../src/elements";

export interface SampleElementAttributes {
  title: string;
  type: "type1" | "type2";
}
export default function SampleElement(attributes: SampleElementAttributes) {
  return div(h1({ class: attributes.type }, attributes.title));
}
