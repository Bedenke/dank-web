import { $page, h1 } from "../..";
import Router from "../elements/router";
import Page from "../elements/page";

export default $page(
  {
    name: "Single Page",
    description: "Single Page Example"
  },
  Router({
    routes: [
      {
        path: "/",
        title: "Page 1",
        content: Page({ title: "Page 1" }, h1("Hello Page 1"))
      },
      {
        path: "/second",
        title: "Page 2",
        content: Page({ title: "Page 2" }, h1("Hello Second Page"))
      }
    ]
  })
);
