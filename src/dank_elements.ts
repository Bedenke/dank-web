import RouteParser from "route-parser";
import { ContextEvents, $subscribe } from "../index";

//<router>
export interface PageElement {
  path: string;
  render: ElementFunction;
}

export interface RouterAttributes {
  routes: PageElement[];
  renderNotFound: ElementFunction;
}
export function router(attributes: RouterAttributes) {
  return $subscribe(ContextEvents.Request, context => {
    for (let route of attributes.routes) {
      let routeParser = new RouteParser(route.path);
      let params = routeParser.match(context.browser.request.pathname);
      if (params) {
        context.browser.request.params = params;
        return route.render(context);
      }
    }
    return attributes.renderNotFound(context);
  });
}
