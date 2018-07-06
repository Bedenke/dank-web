"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_parse_1 = __importDefault(require("url-parse"));
var ContextEvents;
(function (ContextEvents) {
    ContextEvents["Request"] = "Context.Request";
    ContextEvents["Head"] = "Context.Head";
})(ContextEvents = exports.ContextEvents || (exports.ContextEvents = {}));
class RequestContext {
    constructor(url) {
        this.params = {};
        let parsedURL = url_parse_1.default(url);
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
exports.RequestContext = RequestContext;
class Browser {
    constructor(context) {
        this.backHistory = [];
        this.forwardHistory = [];
        this.request = new RequestContext("root://url");
        this.title = "";
        this.context = context;
    }
    go(url) {
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
    setTitle(title) {
        this.title = title;
        this.context.emit(ContextEvents.Head);
    }
}
exports.Browser = Browser;
class Context {
    constructor(data) {
        this.browser = new Browser(this);
        this.subscribersMap = {};
        this.unsubscribed = {};
        this.subscriberIds = 0;
        this.data = data;
    }
    emit(...events) {
        let matches = {};
        const result = [];
        for (const event of events) {
            const subscribers = this.subscribersMap[event];
            if (!subscribers)
                continue;
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
        if (this.emitTimeout)
            clearTimeout(this.emitTimeout);
        this.emitTimeout = setTimeout(() => {
            delete this.emitTimeout;
            for (const subscriber of result) {
                subscriber(this);
            }
        }, 0);
    }
    subscribe(subscriber, events) {
        const id = this.subscriberIds++;
        if (typeof events == "string")
            events = [events];
        for (const event of events) {
            this.subscribersMap[event] = this.subscribersMap[event] || {};
            this.subscribersMap[event][id] = subscriber;
        }
        return id;
    }
    unsubscribe(subscriberId) {
        this.unsubscribed[subscriberId] = true;
    }
    get(key) {
        const path = key.split(".");
        let node = this.data;
        for (let item of path) {
            if (!node)
                return;
            node = node[item];
        }
        return node;
    }
}
exports.Context = Context;
