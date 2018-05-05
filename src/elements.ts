export type Trigger = string | string[];

declare global {
  export interface BaseElement {
    tag: string;
    attributes?: any;
    content?: any[];
  }
  export interface $Page {
    attributes: $PageAttributes;
    content: Content;
  }
  export interface VarElement extends BaseElement {}
  export type Content = string | BaseElement | BaseElement[]; // | ElementFunction;
}

export interface ElementAttributes {}
export type ElementFunction = (data?: any) => Content;

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

export interface $PageAttributes {
  name: string;
  description?: string;
}
export function $page(attributes: $PageAttributes, content: Content): $Page {
  return { attributes, content };
}

// Dynamic Element (form generation)
// https://github.com/formio/formio.js/wiki/Components-JSON-Schema
export interface $FormAttributes {
  key?: string;
  label?: string;
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
  input?: boolean;
  components?: $FormAttributes[];
}

export interface $VarAttributes extends $FormAttributes {
  path?: string;
  valueDecorator?: $VarValueDecorator;
}

export type $VarValueDecorator = (input: any) => Content;

export function $var(
  defaultValue: any,
  attributes: $VarAttributes
): VarElement {
  return {
    tag: "$var",
    attributes: attributes,
    content: [defaultValue]
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
