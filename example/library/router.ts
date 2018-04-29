import {
  $component,
  $let,
  $children,
  $subscribe,
  html,
  head,
  title,
  body,
  Content,
  div
} from "../../index";

export const Route = $component(
  {
    id: "Route",
    name: "Route",
    description: "Router's route, to be used as child of Router",
    attributes: [
      $let("path", "/path"),
      $let("title", "Route Title", {
        label: "Page Title",
        placeholder: "My Page Title"
      })
    ]
  },
  $children()
);

export const Router = $component(
  {
    id: "Router",
    name: "Router",
    description: "Simple navigation UI",
    allowedComponents: ["Route"]
  },
  $subscribe({
    element: html(),
    on: "Router.Navigation",
    render: (props, data) => {
      let routeTitle = "Oops! Page Not Found";
      let content: Content = div("PAGE NOT FOUND: " + data.request.path);      
      for (let child of props.children) {
        let attributes = child.attributes;
        if (!attributes) continue;
        if (attributes.path == data.request.path) {
          routeTitle = attributes.title;
          content = child.content;
          break;
        }
      }
      return [head(title(routeTitle)), body(content)];
    }
  })
);
