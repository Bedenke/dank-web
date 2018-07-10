import { ul, li, a, $ } from "../..";

export interface NavigatorItem {
  url: string;
  label: string;
}

export interface NavigatorItemAttributes extends NavigatorItem {
  active: boolean;
}
export function NavigatorItemElement(attributes: NavigatorItemAttributes) {
  return li(
    attributes.active
      ? attributes.label
      : a({ href: attributes.url }, attributes.label)
  );
}

const defaultLinks = [
  { url: "/default/url1", label: "Link Name 1" },
  { url: "/default/url2", label: "Link Name 2" }
];

export default function Navigator() {
  return ul(
    { class: "navigator" },
    $("links", defaultLinks, (items, context) =>
      items.map(item => {
        return NavigatorItemElement({
          ...item,
          active: item.url == context.browser.request.pathname
        });
      })
    )
  );
}
