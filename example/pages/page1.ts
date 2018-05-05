import { $page, h1 } from "../..";
import Page from "../elements/page";
import Hero from "../elements/Hero";
import Footer from "../elements/Footer";
import Image from "../elements/image";
import Navigator from "../elements/navigator"

export default $page(
  {
    name: "Page 1",
    description: "Example Page 1"
  },
  Page(
    { title: "Page 1" },
    h1("Hello Page 1"),
    Navigator(),
    Hero(),
    Image(),
    Footer()
  )
);
