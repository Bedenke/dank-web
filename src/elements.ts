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


declare global {
  export interface Library extends Element {}
  export interface Component extends Element {}
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

export function $let(attributeName:string, defaultValue: string, attributes?: $LetAttributes): Element {
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