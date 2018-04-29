export type Trigger = string | string[];

declare global {
  export interface BaseElement {
    tag: string;
    attributes?: any;
    content?: any[];
  }
  export interface Library extends BaseElement {}
  export interface Component extends BaseElement {}
  export interface LetElement extends BaseElement {}
}

export interface ElementAttributes {}
export interface ElementMetaProperties {
  component: string;
  attributes: any;
  children: ElementMetaProperties[];
  content: Content;
}
export type ElementFunction = (
  props: ElementMetaProperties,
  data?: any
) => Content;
export type Content = string | BaseElement | BaseElement[]; // | ElementFunction;

export function el(
  tag: string,
  attributesOrContent?: any,
  ...content: any[]
): BaseElement {
  if (typeof attributesOrContent == "object") {
    if (attributesOrContent.tag) {
      // Is element
      return attributesOrContent;
    }
    // Is attribute
    return {
      tag: tag,
      attributes: attributesOrContent,
      content: content
    };
  }
  // Is content (string, number, array)
  return {
    tag: tag,
    content: [attributesOrContent].concat(content || [])
  };
}

export interface LibraryAttributes {
  id: string;
  name: string;
  components: Component[];
}
export function $library(attributes: LibraryAttributes): Library {
  return el("$library", attributes);
}

export interface ComponentAttributes {
  id: string;
  name: string;
  description?: string;
  allowedComponents?: string[] | boolean;
  attributes?: LetElement[];
}
export function $component(
  attributes: ComponentAttributes,
  ...content: Content[]
): Component {
  return el("$component", attributes, ...content);
}

// Dynamic Element (form generation)
// https://github.com/formio/formio.js/wiki/Components-JSON-Schema
export interface $LetAttributes {
  key?: string;
  label: string;
  type?:
    | "textfield"
    | "textarea"
    | "number"
    | "email"
    | "checkbox"
    | "currency"
    | "datagrid";
  placeholder?: string;
  multiple?: boolean;
  name?: string;
  value?: string;
  defaultValue?: any;
  components?: $LetAttributes[];
  valueDecorator?: $LetValueDecorator,
}

export type $LetValueDecorator = (input: any) => Content;

export function $let(
  attributeKey: string,
  defaultValue: any,
  attributes?: $LetAttributes
): LetElement {
  return {
    tag: "$let",
    attributes: {
      key: attributeKey,
      ...attributes
    },
    content: [defaultValue]
  };
}

export function $children(): BaseElement {
  return {
    tag: "$children"
  };
}

export interface $SubscribeProperties {
  element: BaseElement;
  on: Trigger;
  render: ElementFunction;
}
export function $subscribe(attributes: $SubscribeProperties): BaseElement {
  return {
    tag: "$subscribe",
    attributes: attributes
  };
}
