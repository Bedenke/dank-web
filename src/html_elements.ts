import { el } from "./elements";
import { Context } from "./context";

// HTML elements

export type AnyAttribute = any | ((context: Context) => any);
export type StyleAttribute =
  | string
  | ((context: Context) => string)
  | object
  | (() => object);
export type StringAttribute =
  | string
  | ((context: Context) => string)
  | BaseElement;
export type NumberAttribute =
  | number
  | ((context: Context) => number)
  | BaseElement;

export interface EventAttributes {
  nativeEvent: Event;
  context: Context;
}

// These are the global html attributes. If you extend this, your tag will inherit this. If not, make sure you extend only 'Attributes'.
export interface Attributes extends ElementAttributes {
  id?: StringAttribute;
  style?: StyleAttribute;
  class?: StringAttribute;
  onclick?(e: EventAttributes): boolean;
}

//<html>
export function html(attributes?: Attributes | Content, ...content: Content[]) {
  return el("html", attributes, ...content);
}

//<head>
export function head(attributes?: Attributes | Content, ...content: Content[]) {
  return el("head", attributes, ...content);
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
  ...content: BaseElement[]
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
  ...content: BaseElement[]
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
): BaseElement {
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

//<header>
export function header(
  attributes?: Attributes | Content,
  ...content: Content[]
) {
  return el("header", attributes, ...content);
}

//<footer>
export function footer(
  attributes?: Attributes | Content,
  ...content: Content[]
) {
  return el("footer", attributes, ...content);
}

//<style>
export function style(content: StyleAttribute) {
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

//<form>
export interface FormAttributes extends Attributes {
  "accept-charset"?: StringAttribute;
  action?: StringAttribute;
  autocomplete?: StringAttribute;
  enctype?: StringAttribute;
  metho?: StringAttribute;
  name?: StringAttribute;
  novalidate?: StringAttribute;
  target?: StringAttribute;
  onsubmit?: (event: EventAttributes) => void;
}
export function form(
  attributes?: FormAttributes | Content,
  ...content: Content[]
) {
  return el("form", attributes, ...content);
}

//<input>
export interface InputAttributes extends Attributes {
  name?: string;
  placeholder?: string;
  type?: "text" | "email" | "phone" | "password" | "submit" | "button";
  value?: string;
}
export function input(attributes?: InputAttributes) {
  return el("input", attributes);
}

//<select>
export interface SelectAttributes extends Attributes {
  autofocus?: boolean;
  disabled?: boolean;
  form?: StringAttribute;
  multiple?: boolean;
  name?: StringAttribute;
  required?: boolean;
  size?: NumberAttribute;
}
export function select(
  attributes?: SelectAttributes | Content,
  ...content: Content[]
) {
  return el("select", attributes, ...content);
}

//<option>
export interface OptionAttributes {
  disabled?: boolean;
  label?: StringAttribute;
  selected?: boolean;
  value?: StringAttribute;
}
export function option(attributes?: OptionAttributes) {
  return el("option", attributes);
}

//<textarea>
export interface TextAreaAttributes extends Attributes {
  cols?: NumberAttribute;
  rows?: NumberAttribute;
}
export function textarea(
  attributes?: TextAreaAttributes | Content,
  ...content: BaseElement[]
) {
  return el("textarea", attributes, ...content);
}

//<option>
export interface LabelAttributes {
  for?: StringAttribute;
}
export function label(attributes?: LabelAttributes, content?: string) {
  return el("label", attributes, content);
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
  ...content: BaseElement[]
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
  ...content: BaseElement[]
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
  ...content: BaseElement[]
) {
  return el("table", attributes, ...content);
}

//<tr>
export interface TableRowAttributes extends Attributes {}

export function tr(
  attributes?: TableRowAttributes | Content,
  ...content: BaseElement[]
) {
  return el("tr", attributes, ...content);
}

//<td>
export interface TableDataAttributes extends TableAttributes {
  colspan?: StringAttribute;
}
export function td(
  attributes?: TableDataAttributes | Content,
  ...content: BaseElement[]
) {
  return el("td", attributes, ...content);
}

//<center>
export interface CenterAttributes extends Attributes {}

export function center(
  attributes?: CenterAttributes | Content,
  ...content: BaseElement[]
) {
  return el("center", attributes, ...content);
}

//<strong>
export function strong(
  attributes?: Attributes | Content,
  ...content: BaseElement[]
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
  ...content: BaseElement[]
) {
  return el("svg", attributes, ...content);
}

//<polygon>
export interface PolygonAttributes extends Attributes {
  points?: StringAttribute;
}
export function polygon(
  attributes?: PolygonAttributes | Content,
  ...content: BaseElement[]
) {
  return el("polygon", attributes, ...content);
}

