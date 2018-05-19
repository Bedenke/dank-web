import { div, h1, a } from "../../index";

export interface PostAttributes {
  slug: string;
  title: string;
  content: string;
}

export function PostLink(attributes: PostAttributes) {
  return a(
    { href: "/blogs/" + attributes.slug },
    div({ class: "post-item" }, attributes.title)
  );
}

export function PostView(attributes: PostAttributes) {
  return div(
    { class: "post" },
    h1(attributes.title),
    div({ class: "content" }, attributes.content),
    a({ href: "/blogs/" + attributes.slug })
  );
}
