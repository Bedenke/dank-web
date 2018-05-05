import { div, html, head, title, body } from "../../index";

export interface PageAttributes {
  title: string;
}
export default function Page(attributes: PageAttributes, ...content: Content[]) {
  return html(
    head(title(attributes.title)),
    body(div({ class: "page" }, ...content))
  );
}
