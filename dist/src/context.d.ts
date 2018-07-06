import { EventTrigger } from "..";
export declare enum ContextEvents {
    Request = "Context.Request",
    Head = "Context.Head",
}
export declare class RequestContext {
    readonly url: string;
    readonly auth: string;
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly origin: string;
    readonly username: string;
    readonly password: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly search: string;
    query: {
        [key: string]: string | undefined;
    };
    params: {
        [key: string]: string | undefined;
    };
    constructor(url: string);
}
export declare class Browser {
    private context;
    private backHistory;
    private forwardHistory;
    request: RequestContext;
    title: string;
    constructor(context: Context);
    go(url: string): void;
    back(): void;
    forward(): void;
    setTitle(title: string): void;
}
export declare type ContextSubscriber = (context: Context) => void;
export declare class Context {
    private data;
    readonly browser: Browser;
    private subscribersMap;
    private unsubscribed;
    private emitTimeout;
    private subscriberIds;
    constructor(data: any);
    emit(...events: string[]): void;
    subscribe(subscriber: ContextSubscriber, events: EventTrigger): number;
    unsubscribe(subscriberId: string): void;
    get(key: string): any;
}
