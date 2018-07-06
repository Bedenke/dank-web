"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function NavigatorItemElement(attributes) {
    return index_1.li(attributes.active
        ? attributes.label
        : index_1.a({ href: attributes.url }, attributes.label));
}
exports.NavigatorItemElement = NavigatorItemElement;
const defaultLinks = [
    { url: "/default/url1", label: "Link Name 1" },
    { url: "/default/url2", label: "Link Name 2" }
];
function Navigator() {
    return index_1.ul({ class: "navigator" }, index_1.$("links", defaultLinks, (items, context) => items.map(item => {
        return NavigatorItemElement(Object.assign({}, item, { active: item.url == context.browser.request.pathname }));
    })));
}
exports.default = Navigator;
