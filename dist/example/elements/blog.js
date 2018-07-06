"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const post_1 = require("./post");
function Blog(attributes) {
    return index_1.div({ class: "blog" }, index_1.$get({
        from: (context) => __awaiter(this, void 0, void 0, function* () {
            let posts = context.get("posts");
            let query = context.browser.request.query;
            let page = parseInt(query.page || "0");
            return posts.filter((post, idx) => idx >= page);
        }),
        render: result => {
            if (result.loading)
                return index_1.div({ class: "loader" });
            if (result.error)
                return index_1.div({ class: "error" }, result.error.message);
            if (result.data) {
                let posts = result.data;
                return index_1.ul({ class: "posts" }, posts.map(post => index_1.li(post_1.PostLink(post))));
            }
        }
    }));
}
exports.default = Blog;
