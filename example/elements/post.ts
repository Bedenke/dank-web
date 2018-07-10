import { div, h1, a } from "../..";

export interface PostAttributes {
  id: string;
  title: string;
  body: string;
}

export function PostLink(attributes: PostAttributes) {
  return a(
    { href: "/blogs/" + attributes.id },
    div({ class: "post-item" }, attributes.title)
  );
}

export function PostView(attributes: PostAttributes) {
  return div(
    { class: "post" },
    h1(attributes.title),
    div({ class: "body" }, attributes.body),
    a({ href: "/blogs/" + attributes.id })
  );
}
