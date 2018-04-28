import DankEngine from "../src/dank_engine";
import HtmlEngine from "../src/html_engine"
import sample_library from "./library/sample_library";
import project from "./projects/sample_project";

const dankEngine = new DankEngine();
dankEngine.using(sample_library);

console.log("Using components:");
console.log(dankEngine.components);
 
console.log("");
console.log("Project Render");
const projectRender = dankEngine.render(project);
console.log(projectRender);

console.log("");
console.log("HTML Render");
const htmlEngine = new HtmlEngine();
//const htmlRender = htmlEngine.render(projectRender);
//console.log(htmlRender);
