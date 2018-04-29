import {
  ul,
  li,
  a,
  $let,
  $children,
  $component,
  $subscribe
} from "../../index";

export interface NavigatorItemAttributes {
  url: string;
  label: string;
}
export function NavigatorItem(attributes: NavigatorItemAttributes) {
  return li(a({ href: attributes.url }, attributes.label));
}

export const Navigator = $component(
  {
    id: "Navigator",
    name: "Navigator",
    description: "Simple navigation UI",
    allowedComponents: ["NavigatorItem"]
  },
  ul(
    { class: "navigator" },
    $let(
      "links",
      {
        links: [
          { url: "/default/url1", label: "Link Name 1" },
          { url: "/default/url2", label: "Link Name 2" }
        ]
      },
      {
        label: "Navigation Links",
        type: "datagrid",
        components: [
          {
            label: "Url",
            key: "url"
          },
          {
            label: "Label",
            key: "label"
          }
        ],
        valueDecorator: input => {
          return input.map(NavigatorItem)
        }
      }
    )
  )
);
