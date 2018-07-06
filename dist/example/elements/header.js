"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function Header(attributes) {
    return index_1.header({ class: "header" }, index_1.h1(index_1.$("header.title", "My First Blog")), index_1.h2(attributes.subtitle));
}
exports.default = Header;
