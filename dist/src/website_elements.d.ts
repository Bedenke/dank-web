import { Context } from "./context";
export interface PageElement {
    path: string;
    render: ElementFunction;
}
export declare type RenderBodyFunction = (children: Content, context: Context) => Content;
export interface WebSiteAttributes {
    routes: PageElement[];
    renderHead: ElementFunction;
    renderBody: RenderBodyFunction;
    renderNotFound: ElementFunction;
}
export declare function website(attributes: WebSiteAttributes): BaseElement;
