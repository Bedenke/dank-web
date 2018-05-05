import { expect } from "chai";
import page1 from "../example/pages/page1";
import { DankEngine, HtmlEngine } from "..";
import single_page from "../example/pages/single_page";

describe("Dank Engine", () => {
  it("should render dank project", () => {
    const dankEngine = new DankEngine();

    console.log("Dank Render");
    const projectRender = dankEngine.render(page1);
    console.log(projectRender);

    console.log("Meta:");
    Object.keys(dankEngine.meta).map((id: any) => {
      console.log(id);
    });

  });
});


describe("Html Engine", () => {
  it("should render html project", () => {
    const dankEngine = new DankEngine();
    const projectRender = dankEngine.render(single_page);

    const htmlEngine = new HtmlEngine();
    let htmlRender = htmlEngine.render(projectRender, { request: { path: "/" } })

    console.log("");
    console.log("Html Render /");
    console.log(htmlRender);

    htmlRender = htmlEngine.render(projectRender, { request: { path: "/second" } })
    console.log("");
    console.log("Html Render /second");
    console.log(htmlRender);

  });
});
