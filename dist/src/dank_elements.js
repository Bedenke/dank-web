"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_parser_1 = __importDefault(require("route-parser"));
const index_1 = require("../index");
function router(attributes) {
    return index_1.$subscribe(index_1.ContextEvents.Request, context => {
        for (let route of attributes.routes) {
            let routeParser = new route_parser_1.default(route.path);
            let params = routeParser.match(context.browser.request.pathname);
            if (params) {
                context.browser.request.params = params;
                return route.render(context);
            }
        }
        return attributes.renderNotFound(context);
    });
}
exports.router = router;
