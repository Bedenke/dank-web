export type Trigger = string | string[];

export interface Element {
  tag: string;  
  attributes?: any;
  content?: any[];
}

export interface ElementAttributes {}
export type ElementFunction = () => Element;
export type Content = string | Element | Element[];// | ElementFunction;

export function el(
  tag: string,
  attributesOrElement?: any,
  ...content: any[]
): Element {
  if (attributesOrElement && attributesOrElement.tag) {
    return {
      tag: tag,
      content: [attributesOrElement].concat(content || [])
    };
  }
  return {
    tag: tag,
    attributes: attributesOrElement,
    content: content
  };
}

export interface Library extends Element {};
export interface Component extends Element {};

export interface LibraryAttributes {
  id: string;
  name: string;
  components: Component[]
}
export function $library(attributes: LibraryAttributes): Library {
  return el("$library", attributes)
}

export interface ComponentAttributes {
  id: string;
  name: string;  
  description?: string;
  allowedComponents?: string[] | boolean;
}
export function $component(attributes: ComponentAttributes, ...content: Content[]): Component {
  return el("$component", attributes, ...content);
}

// Dynamic Element (form generation)  
// https://github.com/formio/formio.js/wiki/Components-JSON-Schema
export interface $Attributes {
  label: string,
  type?: 'textfield' | 'textarea' | 'number' | 'email' | 'checkbox' | 'currency',
  placeholder?: string,
  multiple?: boolean,
  name?: string,
  value?: string,
  defaultValue?: string
}

export function $(defaultValue: string | number | boolean, attributes: $Attributes): Element {
  return {
    tag: "$attribute",
    attributes: attributes,
    content: [defaultValue]
  }
}

export function $let(attributeName:string, defaultValue: string, attributes?: $Attributes): Element {
  return {
    tag: "$let",
    attributes: {
      id: attributeName,
      ...attributes
    },
    content: [defaultValue]
  }
}

export function $children(): Element {
  return {
    tag: "$children"
  }
}

export interface ElementProperties {
  attributes: any;
  children: Element[];
}
export function $on(trigger: Trigger, render: (ctx: any, props: ElementProperties) => Content): Element {
  return {
    tag: "$on",
    attributes: {
      trigger: trigger,
      render: render
    }
  }
}

// HTML elements

export type AnyAttribute = any | (() => any);
export type StyleAttribute = string | (() => string) | object | (() => object);
export type StringAttribute = string | (() => string) | Element;
export type NumberAttribute = number | (() => number) | Element;

// These are the global html attributes. If you extend this, your tag will inherit this. If not, make sure you extend only 'Attributes'.
export interface Attributes {
  id?: StringAttribute;
  trigger?: Trigger;
  style?: StyleAttribute;
  class?: StringAttribute;
  onclick?(e: any): boolean;
}

//<html>
export function html(...content: Content[]) {
  return el("html", undefined, ...content);
}

//<head>
export function head(...content: Content[]) {
  return el("head", undefined, ...content);
}

//<title>
export function title(content: StringAttribute) {
  return el("title", undefined, content);
}

//<meta>
export interface MetaAttributes extends Attributes {
  charset?: StringAttribute;
  content?: StringAttribute;
  name?: StringAttribute;
  httpEquiv?: StringAttribute;
  "http-equiv"?: StringAttribute;
}
export function meta(
  attributes?: MetaAttributes | Content,
  ...content: Element[]
) {
  return el("meta", attributes, ...content);
}

//<link>
export interface LinkAttributes extends Attributes {
  type?: StringAttribute;
  rel?: StringAttribute;
  href?: StringAttribute;
}
export function link(
  attributes?: LinkAttributes | Content,
  ...content: Element[]
) {
  return el("link", attributes, ...content);
}

//<body>
export function body(attributes?: Attributes | Content, ...content: Content[]) {
  return el("body", attributes, content);
}

//<div>
export function div(attributes?: Attributes | Content, ...content: Content[]) {
  return el("div", attributes, ...content);
}

//<span>
export function span(attributes?: Attributes | Content, ...content: Content[]) {
  return el("span", attributes, ...content);
}

//<h1>
export function h1(
  attributes?: Attributes | Content,
  ...content: Content[]
): Element {
  return el("h1", attributes, ...content);
}

//<h2>
export function h2(attributes?: Attributes | Content, ...content: Content[]) {
  return el("h2", attributes, ...content);
}

//<h3>
export function h3(attributes?: Attributes | Content, ...content: Content[]) {
  return el("h3", attributes, ...content);
}

//<style>
export function style(content: StyleAttribute) {
  if (typeof content == "function") {
    content = content();
  }
  return el("style", undefined, content);
}

//<ul>
export function ul(attributes?: Attributes | Content, ...content: Content[]) {
  return el("ul", attributes, ...content);
}

//<li>
export function li(attributes?: Attributes | Content, ...content: Content[]) {
  return el("li", attributes, ...content);
}

//<p>
export function p(attributes?: Attributes | Content, ...content: Content[]) {
  return el("p", attributes, ...content);
}

//<input>
export interface InputAttributes extends Attributes {
  type: "text" | "email" | "phone" | "password" | "submit" | "button";
  value: string;
  onsubmit?: (event: any) => void;
}
export function input(attributes?: InputAttributes) {
  return el("input", attributes);
}

//<textarea>
export interface TextAreaAttributes extends Attributes {
  cols?: NumberAttribute;
  rows?: NumberAttribute;
}
export function textarea(
  attributes?: TextAreaAttributes | Content,
  ...content: Element[]
) {
  return el("textarea", attributes, ...content);
}

//<a>
export interface AAttributes extends Attributes {
  href?: StringAttribute;
  class?: StringAttribute;
  target?: StringAttribute;
}
export function a(attributes?: AAttributes | Content, ...content: Content[]) {
  return el("a", attributes, ...content);
}

//<main>
export interface MainAttributes extends Attributes {
  role?: StringAttribute;
}
export function main(
  attributes?: MainAttributes | Content,
  ...content: Element[]
) {
  return el("main", attributes, ...content);
}

//<img>
export interface ImgAttributes extends Attributes {
  src?: StringAttribute;
  alt?: StringAttribute;
  width?: StringAttribute;
  height?: StringAttribute;
}
export function img(
  attributes?: ImgAttributes | Content,
  ...content: Element[]
) {
  return el("img", attributes, ...content);
}

//<table>
export interface TableAttributes extends Attributes {
  width?: StringAttribute;
  height?: StringAttribute;
  cellpadding?: StringAttribute;
  cellspacing?: StringAttribute;
  border?: StringAttribute;
  align?: StringAttribute;
}
export function table(
  attributes?: TableAttributes | Content,
  ...content: Element[]
) {
  return el("table", attributes, ...content);
}

//<tr>
export interface TableRowAttributes extends Attributes {}

export function tr(
  attributes?: TableRowAttributes | Content,
  ...content: Element[]
) {
  return el("tr", attributes, ...content);
}

//<td>
export interface TableDataAttributes extends TableAttributes {
  colspan?: StringAttribute;
}
export function td(
  attributes?: TableDataAttributes | Content,
  ...content: Element[]
) {
  return el("td", attributes, ...content);
}

//<center>
export interface CenterAttributes extends Attributes {}

export function center(
  attributes?: CenterAttributes | Content,
  ...content: Element[]
) {
  return el("center", attributes, ...content);
}

//<strong>
export function strong(
  attributes?: Attributes | Content,
  ...content: Element[]
) {
  return el("strong", attributes, ...content);
}

//<b>
export function b(attributes?: Attributes | Content, ...content: Content[]) {
  return el("b", attributes, ...content);
}

//<i>
export function i(attributes?: Attributes | Content, ...content: Content[]) {
  return el("i", attributes, ...content);
}

//<script>
export interface ScriptAttributes extends Attributes {
  type?: StringAttribute;
  src?: StringAttribute;
}
export function script(attributes?: ScriptAttributes, content: string = "") {
  return el("script", attributes, content);
}

//<iframe>
export interface IFrameAttributes extends Attributes {
  src?: StringAttribute;
}
export function iframe(attributes?: IFrameAttributes) {
  return el("iframe", attributes);
}

//<svg>
export interface SvgAttributes extends Attributes {
  xmlsns?: StringAttribute;
  viewBox?: StringAttribute;
  preserveAspectRatio?: StringAttribute;
  class?: StringAttribute;
}
export function svg(
  attributes?: SvgAttributes | Content,
  ...content: Element[]
) {
  return el("svg", attributes, ...content);
}

//<polygon>
export interface PolygonAttributes extends Attributes {
  points?: StringAttribute;
}
export function polygon(
  attributes?: PolygonAttributes | Content,
  ...content: Element[]
) {
  return el("polygon", attributes, ...content);
}
