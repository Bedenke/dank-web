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
function BlogPostPage(attributes) {
    return __1.div({ class: "blog-page" }, navigator_1.default(), __1.$get({
        from: (context) => __awaiter(this, void 0, void 0, function* () {
            if (!attributes.id)
                return;
            const data = context.get("posts");
            const posts = data.posts;
            const post = posts.filter(post => post.id == attributes.id)[0];
            return post;
        }),
        render: result => {
            if (result.loading)
                return __1.div({ class: "loader" });
            if (result.error)
                return __1.div({ class: "error" }, result.error.message);
            if (!result.data)
                return __1.div({ class: "error" }, "Post not found");
            const post = result.data;
            return [header_1.default({ subtitle: post.title }), post_1.PostView(post)];
        }
    }), Footer_1.default());
}
exports.default = BlogPostPage;
