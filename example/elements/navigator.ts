import { ul, li, a, $subscribe, $get } from "../../index";

export interface NavigatorItem {
  url: string;
  label: string;
}

export interface NavigatorItemAttributes extends NavigatorItem {
  active: boolean;
}
export function NavigatorItemElement(attributes: NavigatorItemAttributes) {
  return li(a({ href: attributes.url }, attributes.label));
}

const defaultLinks = [
  { url: "/default/url1", label: "Link Name 1" },
  { url: "/default/url2", label: "Link Name 2" }
];

export default function Navigator() {
  return ul(
    { class: "navigator" },
    $get({
      from: async context => {
        let items: NavigatorItem[] = context.global("links") || defaultLinks;
        return items.map(item => {
          return {
            ...item,
            active: item.url == context.request().path
          };
        });
      },
      render: result => result.data.map(NavigatorItemElement)
    })
  );
}
