import { website, div } from "../..";
import IndexPage from "./blog_index_page";
import BlogPage from "./blog_page";

export default website({
  routes: [
    { path: "/", render: context => IndexPage() },
    {
      path: "/blog/:slug",
      render: context => BlogPage({ slug: context.browser.request.params.slug })
    }
  ],
  renderNotFound: context => {
    return div({class:"not-found-page"}, "PAGE NOT FOUND: " + context.browser.request.url);
  }
});
