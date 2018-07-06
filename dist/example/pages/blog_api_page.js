"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Footer_1 = __importDefault(require("../elements/Footer"));
const navigator_1 = __importDefault(require("../elements/navigator"));
const header_1 = __importDefault(require("../elements/header"));
const post_1 = require("../elements/post");
const fetch_1 = __importDefault(require("../../src/fetch"));
function BlogApiPage() {
    return __1.div({ class: "index-page" }, navigator_1.default(), header_1.default({ subtitle: "All blogs" }), __1.h1("Here are the posts"), __1.$get({
        from: (context) => __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch_1.default.get("https://jsonplaceholder.typicode.com/posts");
            let posts = response.body;
            return posts;
        }),
        render: result => {
            if (result.loading)
                return __1.div({ class: "loader" });
            if (result.error)
                return __1.div({ class: "error" }, result.error.message);
            if (result.data) {
                let posts = result.data;
                return __1.ul({ class: "posts" }, posts.map(post => __1.li(post_1.PostLink(post))));
            }
        }
    }), Footer_1.default());
}
exports.default = BlogApiPage;
