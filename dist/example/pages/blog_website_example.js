"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const blog_index_page_1 = __importDefault(require("./blog_index_page"));
const blog_api_page_1 = __importDefault(require("./blog_api_page"));
const blog_post_page_1 = __importDefault(require("./blog_post_page"));
exports.default = __1.website({
    routes: [
        { path: "/", render: context => blog_index_page_1.default() },
        {
            path: "/blog/:id",
            render: context => blog_post_page_1.default({ id: context.browser.request.params.id })
        },
        {
            path: "/api",
            render: context => blog_api_page_1.default()
        }
    ],
    renderHead: context => {
        return [];
    },
    renderBody: (children, context) => {
        return children;
    },
    renderNotFound: context => {
        return __1.div({ class: "not-found-page" }, "PAGE NOT FOUND: " + context.browser.request.url);
    }
});
