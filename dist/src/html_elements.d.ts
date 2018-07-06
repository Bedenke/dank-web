import { Context } from "./context";
export declare type AnyAttribute = any | ((context: Context) => any);
export declare type StyleAttribute = string | ((context: Context) => string) | object | (() => object);
export declare type StringAttribute = string | ((context: Context) => string) | BaseElement;
export declare type NumberAttribute = number | ((context: Context) => number) | BaseElement;
export interface EventAttributes {
    nativeEvent: Event;
    context: Context;
}
export interface Attributes extends ElementAttributes {
    id?: StringAttribute;
    style?: StyleAttribute;
    class?: StringAttribute;
    onclick?(e: EventAttributes): boolean;
}
export declare function html(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function head(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function title(content: StringAttribute): BaseElement;
export interface MetaAttributes extends Attributes {
    charset?: StringAttribute;
    content?: StringAttribute;
    name?: StringAttribute;
    httpEquiv?: StringAttribute;
    "http-equiv"?: StringAttribute;
}
export declare function meta(attributes?: MetaAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface LinkAttributes extends Attributes {
    type?: StringAttribute;
    rel?: StringAttribute;
    href?: StringAttribute;
}
export declare function link(attributes?: LinkAttributes | Content, ...content: BaseElement[]): BaseElement;
export declare function body(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function div(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function span(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function h1(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function h2(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function h3(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function header(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function footer(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function style(content: StyleAttribute): BaseElement;
export declare function ul(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function li(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function p(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
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
export declare function form(attributes?: FormAttributes | Content, ...content: Content[]): BaseElement;
export interface InputAttributes extends Attributes {
    type?: "text" | "email" | "phone" | "password" | "submit" | "button";
    value?: string;
}
export declare function input(attributes?: InputAttributes): BaseElement;
export interface SelectAttributes extends Attributes {
    autofocus?: boolean;
    disabled?: boolean;
    form?: StringAttribute;
    multiple?: boolean;
    name?: StringAttribute;
    required?: boolean;
    size?: NumberAttribute;
}
export declare function select(attributes?: SelectAttributes | Content, ...content: Content[]): BaseElement;
export interface OptionAttributes {
    disabled?: boolean;
    label?: StringAttribute;
    selected?: boolean;
    value?: StringAttribute;
}
export declare function option(attributes?: OptionAttributes): BaseElement;
export interface TextAreaAttributes extends Attributes {
    cols?: NumberAttribute;
    rows?: NumberAttribute;
}
export declare function textarea(attributes?: TextAreaAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface LabelAttributes {
    for?: StringAttribute;
}
export declare function label(attributes?: LabelAttributes, content?: string): BaseElement;
export interface AAttributes extends Attributes {
    href?: StringAttribute;
    class?: StringAttribute;
    target?: StringAttribute;
}
export declare function a(attributes?: AAttributes | Content, ...content: Content[]): BaseElement;
export interface MainAttributes extends Attributes {
    role?: StringAttribute;
}
export declare function main(attributes?: MainAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface ImgAttributes extends Attributes {
    src?: StringAttribute;
    alt?: StringAttribute;
    width?: StringAttribute;
    height?: StringAttribute;
}
export declare function img(attributes?: ImgAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface TableAttributes extends Attributes {
    width?: StringAttribute;
    height?: StringAttribute;
    cellpadding?: StringAttribute;
    cellspacing?: StringAttribute;
    border?: StringAttribute;
    align?: StringAttribute;
}
export declare function table(attributes?: TableAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface TableRowAttributes extends Attributes {
}
export declare function tr(attributes?: TableRowAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface TableDataAttributes extends TableAttributes {
    colspan?: StringAttribute;
}
export declare function td(attributes?: TableDataAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface CenterAttributes extends Attributes {
}
export declare function center(attributes?: CenterAttributes | Content, ...content: BaseElement[]): BaseElement;
export declare function strong(attributes?: Attributes | Content, ...content: BaseElement[]): BaseElement;
export declare function b(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export declare function i(attributes?: Attributes | Content, ...content: Content[]): BaseElement;
export interface ScriptAttributes extends Attributes {
    type?: StringAttribute;
    src?: StringAttribute;
}
export declare function script(attributes?: ScriptAttributes, content?: string): BaseElement;
export interface IFrameAttributes extends Attributes {
    src?: StringAttribute;
}
export declare function iframe(attributes?: IFrameAttributes): BaseElement;
export interface SvgAttributes extends Attributes {
    xmlsns?: StringAttribute;
    viewBox?: StringAttribute;
    preserveAspectRatio?: StringAttribute;
    class?: StringAttribute;
}
export declare function svg(attributes?: SvgAttributes | Content, ...content: BaseElement[]): BaseElement;
export interface PolygonAttributes extends Attributes {
    points?: StringAttribute;
}
export declare function polygon(attributes?: PolygonAttributes | Content, ...content: BaseElement[]): BaseElement;
