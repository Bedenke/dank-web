import Router from "../elements/router";
import NewsPage from "./news_page";
import AwardsPage from "./awards_page";

export default Router({
  routes: [
    {
      path: "/",
      title: "News",
      content: NewsPage()
    },
    {
      path: "/news",
      title: "News",
      content: NewsPage()
    },
    {
      path: "/awards",
      title: "Awards",
      content: AwardsPage()
    }
  ]
});
