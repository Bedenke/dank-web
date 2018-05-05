import { ul, li, a, $subscribe, $var } from "../../index";

export interface NavigatorItemAttributes {
  url: string;
  label: string;
}
export function NavigatorItem(attributes: NavigatorItemAttributes) {
  return li(a({ href: attributes.url }, attributes.label));
}

export default function Navigator() {
  return ul(
    { class: "navigator" },
    $var(
      [
        { url: "/default/url1", label: "Link Name 1" },
        { url: "/default/url2", label: "Link Name 2" }
      ],
      {
        key: "links",
        label: "Navigation Links",
        type: "datagrid",
        components: [
          { label: "Url", key: "url" },
          { label: "Label", key: "label" }
        ],
        valueDecorator: input => {
          return input.map(NavigatorItem);
        }
      }
    )
  );
}
