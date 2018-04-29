import { $library } from "../../index";
import { Navigator } from "./navigator";
import { Router, Route } from "./router";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Image } from "./image";
import { Page } from "./page";
import { Section } from "./section";

export default $library({
  id: "sample_library",
  name: "Sample Library",
  components: [
    Router,
    Route,
    Navigator,
    Footer,
    Hero,
    Image,
    Page,
    Section
  ]
});
