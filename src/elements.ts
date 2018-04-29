export type Trigger = string | string[];

export interface Element {
  tag: string;  
  attributes?: any;
  content?: any[];
}

export interface ElementAttributes {}
export interface ElementMetaProperties {
  component: string;
  attributes: any;
  children: ElementMetaProperties[];
  content: Content;
}
export type ElementFunction = (props: ElementMetaProperties, data?: any) => Content;
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


declare global {
  export interface Library extends Element {}
  export interface Component extends Element {}
  export interface LetElement extends Element {}
}

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
  attributes?: LetElement[]
}
export function $component(attributes: ComponentAttributes, ...content: Content[]): Component {
  return el("$component", attributes, ...content);
}

// Dynamic Element (form generation)  
// https://github.com/formio/formio.js/wiki/Components-JSON-Schema
export interface $LetAttributes {
  label: string,
  type?: 'textfield' | 'textarea' | 'number' | 'email' | 'checkbox' | 'currency',
  placeholder?: string,
  multiple?: boolean,
  name?: string,
  value?: string,
  defaultValue?: string
}

export function $let(attributeName:string, defaultValue: string, attributes?: $LetAttributes): LetElement {
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

export interface $SubscribeProperties {
  element: Element,
  on: Trigger,
  render: ElementFunction
}
export function $subscribe(attributes: $SubscribeProperties): Element {
  return {
    tag: "$subscribe",
    attributes: attributes
  }
}