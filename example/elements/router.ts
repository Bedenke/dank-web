import { $subscribe, html, head, title, body, div } from "../../index";

export interface Route {
  title: string;
  path: string;
  content: Content;
}

export interface RouterAttributes {
  routes: Route[];
}
export default function Router(attributes: RouterAttributes) {
  return $subscribe({
    element: html(),
    on: "Router.Navigation",
    render: async context => {
      let path = context.request().path;
      for (let route of attributes.routes) {
        if (route.path == path) {
          return [head(title(route.title)), body(route.content)];
        }
      }
      return [
        head(title("Oops! Page Not Found")),
        body(div("PAGE NOT FOUND: " + path))
      ];
    }
  });
}
