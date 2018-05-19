import RouteParser from "route-parser";
import { ContextEvents, Context } from "./context";
import { html, head, title, body, $subscribe } from "..";

//<website>
export interface PageElement {
  path: string;
  render: ElementFunction;
}

export interface WebSiteAttributes {
  routes: PageElement[];
  renderHeadElements?: ElementFunction;
  renderNotFound: ElementFunction;
}
export function website(attributes: WebSiteAttributes) {
  return html(
    head(
      $subscribe(ContextEvents.Head, context => {
        return [
          title(context.browser.title), 
          attributes.renderHeadElements ? attributes.renderHeadElements(context) : null
        ];
      })
    ),
    body(
      $subscribe(ContextEvents.Request, context => {
        for (let route of attributes.routes) {
          let routeParser = new RouteParser(route.path);
          let params = routeParser.match(context.browser.request.pathname);
          if (params) {
            context.browser.request.params = params;
            return route.render(context);
          }
        }
        return attributes.renderNotFound(context);
      })
    )
  );
}
