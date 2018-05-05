import {
  $subscribe,
  html,
  head,
  title,
  body,
  div
} from "../../index";

export interface Route {
  title: string;
  path: string;
  content: Content;
};

export interface RouterAttributes {
  routes: Route[];
}
export default function Router(attributes: RouterAttributes) {
  return $subscribe({
    element: html(),
    on: "Router.Navigation",
    render: (data) => {
      let routeTitle = "Oops! Page Not Found";
      let content: Content = div("PAGE NOT FOUND: " + data.request.path);      
      for (let child of attributes.routes) {
        if (child.path == data.request.path) {
          routeTitle = child.title;
          content = child.content;
          break;
        }
      }
      return [head(title(routeTitle)), body(content)];
    }
  })
}
