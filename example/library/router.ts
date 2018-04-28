import {
  $component,
  $let,
  $children,
  $on,
  html,
  head,
  title,
  body,
  Content
} from "../../src/elements";

export const Route = $component(
  {
    id: "Route",
    name: "Route",
    description: "Router's route, to be used as child of Router"
  },
  $let("path", "/path"),
  $let("title", "Route Title", {
    label: "Page Title",
    placeholder: "My Page Title"
  }),
  $children()
);

export const Router = $component(
  {
    id: "Router",
    name: "Router",
    description: "Simple navigation UI",
    allowedComponents: ["Route"]
  },
  html(
    $on("Router.Navigation", (ctx, props) => {
      let routeTitle = "Oops! Page Not Found";
      let content : Content = "PAGE NOT FOUND: " + ctx.request.path;
      for (let child of props.children) {
        let attributes = child.attributes;
        if (!attributes) continue;
        if (attributes.path == ctx.request.path) {
          content = child;
          break;
        }
      }
      return [head(title(routeTitle)), body(content)];
    })
  )
);