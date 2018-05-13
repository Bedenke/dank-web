import { div, h1, a } from "../../index";

export interface PostAttributes {
  slug: string;
  title: string;
  body: string;
}

export default function Post(attributes: PostAttributes) {
  return div(
    { class: "post" },
    h1(attributes.title),
    div({ class: "body" }, attributes.body),
    a({ href: "/blogs/" + attributes.slug })
  );
}