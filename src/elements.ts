import { Context } from "./context";

export type EventTrigger = string | string[];

export interface $SubscriptionAttributes {
  on: EventTrigger;
  render: ElementFunction;
}
declare global {
  export class BaseElement {
    $tag: string;
    $attributes?: any;
    $content?: any[];
  }
  export type Content = string | BaseElement | any[] | undefined;
  export interface ElementAttributes {
    $subscribe?: $SubscriptionAttributes;
  }
  export type ElementFunction = (context: Context) => Content;
}

export function $subscribe(on: EventTrigger, render: ElementFunction): ElementAttributes {
  return {
    $subscribe: {
      on: on,
      render: render
    }
  }
}

export function el(
  tag: string,
  attributesOrContent?: any,
  ...content: any[]
): BaseElement {
  if (typeof attributesOrContent == "object") {
    if (attributesOrContent.$tag == undefined) {
      // Is attribute
      return {
        $tag: tag,
        $attributes: attributesOrContent,
        $content: content
      };
    }
  }
  // Is content (string, number, array)
  return {
    $tag: tag,
    $content: [attributesOrContent].concat(content || [])
  };
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

export interface $GetResult {
  loading: boolean;
  context: Context;
  data?: any;
  error?: Error;
}

export interface $GetAttributes {
  from(context: Context): Promise<any>;
  render(result: $GetResult): Content;
}
export function $get(attributes: $GetAttributes) {
  return el("$get", attributes);
}

export type DataRenderer<T> = (data: T, context: Context) => Content;

export function $<T>(key: string, defaultValue?: T, render?: DataRenderer<T>) {
  return $get({
    from: context => context.global(key) || defaultValue || "${"+key+"}",
    render: result => render ? render(result.data, result.context) : result.data
  });
}