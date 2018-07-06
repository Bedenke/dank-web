"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
function Footer() {
    return index_1.footer({ class: "footer" }, index_1.$("footer.text", "Default Footer Text"));
}
exports.default = Footer;
