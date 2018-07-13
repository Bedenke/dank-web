import URL from "url-parse";

export enum ContextEvents {
  Request = "Context.Request",
  Head = "Context.Head"
}

export class RequestContext {
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
  query: { [key: string]: string | undefined };
  params: { [key: string]: string | undefined } = {};

  constructor(url: string) {
    let parsedURL = URL(url);
    this.url = url;
    this.auth = parsedURL.auth;
    this.hash = parsedURL.hash;
    this.host = parsedURL.host;
    this.hostname = parsedURL.hostname;
    this.href = parsedURL.href;
    this.origin = parsedURL.origin;
    this.username = parsedURL.username;
    this.password = parsedURL.password;
    this.pathname = parsedURL.pathname;
    this.port = parsedURL.port;
    this.protocol = parsedURL.protocol;
    this.search = parsedURL.search;
    this.query = parsedURL.query;
  }
}

export class Browser {
  private context: Context;
  private backHistory: RequestContext[] = [];
  private forwardHistory: RequestContext[] = [];

  request: RequestContext = new RequestContext("root://url");
  title: string = "";

  constructor(context: Context) {
    this.context = context;
  }

  go(url: string) {
    this.backHistory.push(this.request);
    this.request = new RequestContext(url);
    this.context.emit(ContextEvents.Request);
  }

  back() {
    this.forwardHistory.push(this.request);
    let previous = this.backHistory.pop();
    if (previous) {
      this.request = previous;
      this.context.emit(ContextEvents.Request);
    }
  }

  forward() {
    this.backHistory.push(this.request);
    let next = this.forwardHistory.pop();
    if (next) {
      this.request = next;
      this.context.emit(ContextEvents.Request);
    }
  }

  setTitle(title: string) {
    this.title = title;
    this.context.emit(ContextEvents.Head);
  }
}

export type ContextSubscriber = (context: Context) => void;

export class Context {
  actions: any;
  private data: any;
  readonly browser: Browser = new Browser(this);
  private subscribersMap: {
    [event: string]: { [id: string]: ContextSubscriber };
  } = {};
  private unsubscribed: { [id: string]: boolean } = {};
  private emitTimeout: any;
  private subscriberIds: number = 0;

  constructor(data: any) {
    this.data = data;
  }

  emit(...events: string[]) {
    let matches: { [id: string]: boolean } = {};
    const result: ContextSubscriber[] = [];
    for (const event of events) {
      const subscribers = this.subscribersMap[event];
      if (!subscribers) continue;
      let subscriberIdsForEvent = Object.keys(subscribers);
      for (const subscriberId of subscriberIdsForEvent) {
        if (this.unsubscribed[subscriberId]) {
          delete subscribers[subscriberId];
          continue;
        }
        if (!matches[subscriberId]) {
          matches[subscriberId] = true;
          result.push(subscribers[subscriberId]);
        }
      }
    }
    this.unsubscribed = {};
    if (this.emitTimeout) clearTimeout(this.emitTimeout);
    this.emitTimeout = setTimeout(() => {
      delete this.emitTimeout;
      for (const subscriber of result) {
        subscriber(this);
      }
    }, 0);
  }

  subscribe(subscriber: ContextSubscriber, events: EventTrigger): number {
    const id = this.subscriberIds++;
    if (typeof events == "string") events = [events];
    for (const event of events) {
      this.subscribersMap[event] = this.subscribersMap[event] || {};
      this.subscribersMap[event][id] = subscriber;
    }
    return id;
  }

  unsubscribe(subscriberId: string) {
    this.unsubscribed[subscriberId] = true;
  }

  get<T>(key: string): T | undefined {
    const path = key.split(".");
    let node = this.data;
    for (let item of path) {
      if (!node) return;
      node = node[item];
    }
    return node as T;
  }
}
