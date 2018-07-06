"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elements_1 = require("./elements");
//<html>
function html(attributes, ...content) {
    return elements_1.el("html", attributes, ...content);
}
exports.html = html;
//<head>
function head(attributes, ...content) {
    return elements_1.el("head", attributes, ...content);
}
exports.head = head;
//<title>
function title(content) {
    return elements_1.el("title", undefined, content);
}
exports.title = title;
function meta(attributes, ...content) {
    return elements_1.el("meta", attributes, ...content);
}
exports.meta = meta;
function link(attributes, ...content) {
    return elements_1.el("link", attributes, ...content);
}
exports.link = link;
//<body>
function body(attributes, ...content) {
    return elements_1.el("body", attributes, content);
}
exports.body = body;
//<div>
function div(attributes, ...content) {
    return elements_1.el("div", attributes, ...content);
}
exports.div = div;
//<span>
function span(attributes, ...content) {
    return elements_1.el("span", attributes, ...content);
}
exports.span = span;
//<h1>
function h1(attributes, ...content) {
    return elements_1.el("h1", attributes, ...content);
}
exports.h1 = h1;
//<h2>
function h2(attributes, ...content) {
    return elements_1.el("h2", attributes, ...content);
}
exports.h2 = h2;
//<h3>
function h3(attributes, ...content) {
    return elements_1.el("h3", attributes, ...content);
}
exports.h3 = h3;
//<header>
function header(attributes, ...content) {
    return elements_1.el("header", attributes, ...content);
}
exports.header = header;
//<footer>
function footer(attributes, ...content) {
    return elements_1.el("footer", attributes, ...content);
}
exports.footer = footer;
//<style>
function style(content) {
    return elements_1.el("style", undefined, content);
}
exports.style = style;
//<ul>
function ul(attributes, ...content) {
    return elements_1.el("ul", attributes, ...content);
}
exports.ul = ul;
//<li>
function li(attributes, ...content) {
    return elements_1.el("li", attributes, ...content);
}
exports.li = li;
//<p>
function p(attributes, ...content) {
    return elements_1.el("p", attributes, ...content);
}
exports.p = p;
function form(attributes, ...content) {
    return elements_1.el("form", attributes, ...content);
}
exports.form = form;
function input(attributes) {
    return elements_1.el("input", attributes);
}
exports.input = input;
function select(attributes, ...content) {
    return elements_1.el("select", attributes, ...content);
}
exports.select = select;
function option(attributes) {
    return elements_1.el("option", attributes);
}
exports.option = option;
function textarea(attributes, ...content) {
    return elements_1.el("textarea", attributes, ...content);
}
exports.textarea = textarea;
function label(attributes, content) {
    return elements_1.el("label", attributes, content);
}
exports.label = label;
function a(attributes, ...content) {
    return elements_1.el("a", attributes, ...content);
}
exports.a = a;
function main(attributes, ...content) {
    return elements_1.el("main", attributes, ...content);
}
exports.main = main;
function img(attributes, ...content) {
    return elements_1.el("img", attributes, ...content);
}
exports.img = img;
function table(attributes, ...content) {
    return elements_1.el("table", attributes, ...content);
}
exports.table = table;
function tr(attributes, ...content) {
    return elements_1.el("tr", attributes, ...content);
}
exports.tr = tr;
function td(attributes, ...content) {
    return elements_1.el("td", attributes, ...content);
}
exports.td = td;
function center(attributes, ...content) {
    return elements_1.el("center", attributes, ...content);
}
exports.center = center;
//<strong>
function strong(attributes, ...content) {
    return elements_1.el("strong", attributes, ...content);
}
exports.strong = strong;
//<b>
function b(attributes, ...content) {
    return elements_1.el("b", attributes, ...content);
}
exports.b = b;
//<i>
function i(attributes, ...content) {
    return elements_1.el("i", attributes, ...content);
}
exports.i = i;
function script(attributes, content = "") {
    return elements_1.el("script", attributes, content);
}
exports.script = script;
function iframe(attributes) {
    return elements_1.el("iframe", attributes);
}
exports.iframe = iframe;
function svg(attributes, ...content) {
    return elements_1.el("svg", attributes, ...content);
}
exports.svg = svg;
function polygon(attributes, ...content) {
    return elements_1.el("polygon", attributes, ...content);
}
exports.polygon = polygon;
