import { div } from "../../index";

export default function Section(...content: Content[]) {
  return div({ class: "section" }, ...content);
}
