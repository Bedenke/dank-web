import { h1, div } from "../..";
import Hero from "../elements/Hero";
import Footer from "../elements/Footer";
import Navigator from "../elements/navigator";
import Blog from "../elements/blog";

export default function AwardsPage() {
  return div(
    { class: "page" },
    Navigator(),
    Hero(),
    h1("Here are the awards"),
    Blog({ source: "blogs/awards.json" }),
    Footer()
  );
}
