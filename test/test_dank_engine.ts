import { expect } from "chai";
import { HtmlEngine } from "..";
import website from "../example/pages/website";
import { Context } from "../src/context";
  
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
    let newsPageContext = new Context({
      dataDirectory: "example/data/",
      global: globalData,
      request: {
        url: "https://localhost/",
        path: "/"
      }
    });

    let htmlRender = await htmlEngine.render(website, newsPageContext);
    
    console.log("");
    console.log("Html Render /");
    console.log(htmlRender);

    let awardsPageContext = new Context({
      dataDirectory: "example/data/",
      global: globalData,
      request: {
        url: "https://localhost/",
        path: "/awards"
      }
    });

    htmlRender = await htmlEngine.render(website, awardsPageContext);
    
    console.log("");
    console.log("Html Render /awards");
    console.log(htmlRender);

    let notFoundPageContext = new Context({
      dataDirectory: "example/data/",
      global: globalData,
      request: {
        url: "https://localhost/",
        path: "/not-found"
      }
    });

    htmlRender = await htmlEngine.render(website, notFoundPageContext);
    
    console.log("");
    console.log("Html Render 404");
    console.log(htmlRender);
  });
});
