"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_parser_1 = __importDefault(require("route-parser"));
const context_1 = require("./context");
const __1 = require("..");
function website(attributes) {
    return __1.html(__1.head(__1.$subscribe([context_1.ContextEvents.Request, context_1.ContextEvents.Head], attributes.renderHead)), __1.body(__1.$subscribe(context_1.ContextEvents.Request, context => {
        for (let route of attributes.routes) {
            let routeParser = new route_parser_1.default(route.path);
            let params = routeParser.match(context.browser.request.pathname);
            if (params) {
                context.browser.request.params = params;
                const children = route.render(context);
                return attributes.renderBody(children, context);
            }
        }
        return attributes.renderNotFound(context);
    })));
}
exports.website = website;
