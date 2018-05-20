import { website, div } from "../..";
import IndexPage from "./blog_index_page";
import BlogApiPage from "./blog_api_page";
import BlogPostPage from "./blog_post_page";

export default website({
  routes: [
    { path: "/", render: context => IndexPage() },
    {
      path: "/blog/:id",
      render: context => BlogPostPage({ id: context.browser.request.params.id })
    },
    {
      path: "/api",
      render: context => BlogApiPage()
    }
  ],
  renderNotFound: context => {
    return div({class:"not-found-page"}, "PAGE NOT FOUND: " + context.browser.request.url);
  }
});
