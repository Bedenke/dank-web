"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function PostLink(attributes) {
    return index_1.a({ href: "/blogs/" + attributes.id }, index_1.div({ class: "post-item" }, attributes.title));
}
exports.PostLink = PostLink;
function PostView(attributes) {
    return index_1.div({ class: "post" }, index_1.h1(attributes.title), index_1.div({ class: "body" }, attributes.body), index_1.a({ href: "/blogs/" + attributes.id }));
}
exports.PostView = PostView;
