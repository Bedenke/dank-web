import { expect } from "chai";
import { HtmlEngine } from "..";
import { Context } from "../src/context";
import BlogWebsiteExample from "../example/pages/blog_website_example";
  
const globalData = {
  "footer": {
    "text": "Global footer text"
  },
  "links": [
    { "url": "/global/url1", "label": "Global Link Name 1" },
    { "url": "/global/url2", "label": "Global Link Name 2" },
    { "url": "/global/url3", "label": "Global Link Name 3" }
  ]
}

const htmlEngine = new HtmlEngine();

describe("Html Engine", () => {
  it("should render html project", async () => {
    let context = new Context({
      dataDirectory: "example/data/",
      global: globalData
    });

    context.browser.go("http://localhost/");

    let htmlRender = await htmlEngine.render(BlogWebsiteExample, context);
    console.log("Html Render /\n", htmlRender, "\n");

    context.browser.go("http://localhost/blog/post-1");
    htmlRender = await htmlEngine.render(BlogWebsiteExample, context);
    console.log("Html Render /blog/post-1\n", htmlRender, "\n");

    context.browser.go("http://localhost/blog/post-2");
    htmlRender = await htmlEngine.render(BlogWebsiteExample, context);    
    console.log("Html Render /blog/post-2\n", htmlRender, "\n");

    context.browser.go("http://localhost/blog/not-found");
    htmlRender = await htmlEngine.render(BlogWebsiteExample, context);    
    console.log("Html Render /blog/not-found\n", htmlRender, "\n");

    context.browser.go("http://localhost/404");
    htmlRender = await htmlEngine.render(BlogWebsiteExample, context);
    console.log("Html Render /404\n", htmlRender, "\n");

    context.browser.go("http://localhost/api");
    htmlRender = await htmlEngine.render(BlogWebsiteExample, context);
    console.log("Html Render /api\n", htmlRender, "\n");

  });
});
