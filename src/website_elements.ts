import RouteParser from "route-parser";
import { ContextEvents, Context } from "./context";
import { html, head, title, body, $subscribe } from "..";

//<website>
export interface PageElement {
  path: string;
  render: ElementFunction;
}

export type RenderBodyFunction = (children: Content, context: Context) => Content;

export interface WebSiteAttributes {
  routes: PageElement[];
  renderHead: ElementFunction;
  renderBody: RenderBodyFunction;
  renderNotFound: ElementFunction;
}
export function website(attributes: WebSiteAttributes) {
  return html(
    head(
      $subscribe([ContextEvents.Request, ContextEvents.Head], attributes.renderHead)
    ),
    body(
        $subscribe(ContextEvents.Request, context => {
        for (let route of attributes.routes) {
          let routeParser = new RouteParser(route.path);
          let params = routeParser.match(context.browser.request.pathname);
          if (params) {
            context.browser.request.params = params;
            const children = route.render(context);
            return attributes.renderBody(children, context);
          }
        }
        return attributes.renderNotFound(context);
      })
    )
  );
}
