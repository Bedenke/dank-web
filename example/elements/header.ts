import { div, $, h1, h2, header } from "../../index";

export interface HeaderAttributes {
  subtitle: string;
}
export default function Header(attributes: HeaderAttributes) {
  return header(
    { class: "header" },
    h1($("header.title", "My First Blog")),
    h2(attributes.subtitle)
  );
}
