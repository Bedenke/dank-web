import { expect } from "chai";
import sample_library from "../example/library/sample_library";
import project from "../example/projects/sample_project";
import { DankEngine, HtmlEngine } from "..";

describe("Dank Engine", () => {
  it("should render dank project", () => {
    const dankEngine = new DankEngine();
    dankEngine.using(sample_library);

    console.log("Using components:");
    Object.keys(dankEngine.components).map((id: any) => {
      console.log(id);
    });

    console.log("");
    console.log("Dank Render");
    const projectRender = dankEngine.render(project);
    console.log(projectRender);
  });
});


describe("Html Engine", () => {
  it("should render html project", () => {
    const dankEngine = new DankEngine();
    dankEngine.using(sample_library);

    const projectRender = dankEngine.render(project);

    const htmlEngine = new HtmlEngine();
    const htmlRender = htmlEngine.render(projectRender, { request: { path: "/second" } })

    console.log("");
    console.log("Html Render");
    console.log(htmlRender);
  });
});
