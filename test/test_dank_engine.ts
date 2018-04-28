import { expect } from "chai";
import sample_library from "../example/library/sample_library";
import project from "../example/projects/sample_project";
import { DankEngine } from "..";

describe("Dank Engine", () => {
  it("should render dank project", () => {
    const dankEngine = new DankEngine();
    dankEngine.using(sample_library);

    console.log("Using components:");
    Object.keys(dankEngine.components).map((id: any) => {
      console.log(id);
    });

    console.log("");
    console.log("Project Render");
    const projectRender = dankEngine.render(project);
    console.log(JSON.stringify(projectRender, null, 2));
  });
});
