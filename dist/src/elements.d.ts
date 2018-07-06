import { Context } from "./context";
export declare type EventTrigger = string | string[];
export interface $SubscriptionAttributes {
    on: EventTrigger;
    render: ElementFunction;
}
declare global  {
    class BaseElement {
        $tag: string;
        $attributes?: any;
        $content?: any[];
    }
    type Content = string | BaseElement | any[] | undefined;
    interface ElementAttributes {
        $subscribe?: $SubscriptionAttributes;
    }
    type ElementFunction = (context: Context) => Content;
}
export declare function $subscribe(on: EventTrigger, render: ElementFunction): ElementAttributes;
export declare function el(tag: string, attributesOrContent?: any, ...content: any[]): BaseElement;
export interface $FormAttributes {
    key?: string;
    label?: string;
    type?: "textfield" | "textarea" | "number" | "email" | "checkbox" | "currency" | "datagrid";
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
export declare function $get(attributes: $GetAttributes): BaseElement;
export declare type DataRenderer<T> = (data: T, context: Context) => Content;
export declare function $<T>(key: string, defaultValue?: T, render?: DataRenderer<T>): BaseElement;
