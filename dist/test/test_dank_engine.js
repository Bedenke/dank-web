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
const __1 = require("..");
const context_1 = require("../src/context");
const blog_website_example_1 = __importDefault(require("../example/pages/blog_website_example"));
const globalData = {
    "footer": {
        "text": "Global footer text"
    },
    "links": [
        { "url": "/global/url1", "label": "Global Link Name 1" },
        { "url": "/global/url2", "label": "Global Link Name 2" },
        { "url": "/global/url3", "label": "Global Link Name 3" }
    ]
};
const htmlEngine = new __1.HtmlEngine();
describe("Html Engine", () => {
    it("should render html project", () => __awaiter(this, void 0, void 0, function* () {
        let context = new context_1.Context({
            dataDirectory: "example/data/",
            global: globalData
        });
        context.browser.go("http://localhost/");
        let htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /\n", htmlRender, "\n");
        context.browser.go("http://localhost/blog/post-1");
        htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /blog/post-1\n", htmlRender, "\n");
        context.browser.go("http://localhost/blog/post-2");
        htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /blog/post-2\n", htmlRender, "\n");
        context.browser.go("http://localhost/blog/not-found");
        htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /blog/not-found\n", htmlRender, "\n");
        context.browser.go("http://localhost/404");
        htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /404\n", htmlRender, "\n");
        context.browser.go("http://localhost/api");
        htmlRender = yield htmlEngine.render(blog_website_example_1.default, context);
        console.log("Html Render /api\n", htmlRender, "\n");
    }));
});
