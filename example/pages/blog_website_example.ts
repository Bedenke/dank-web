import { html, head, body, div, router, script, link } from "../../index";
import IndexPage from "./blog_index_page";
import BlogApiPage from "./blog_api_page";
import BlogPostPage from "./blog_post_page";

export default html(
  head(
    script({ src: "/static/gen/bundle.js" }),
    link({
      rel: "stylesheet",
      type: "text/css",
      href: "/static/gen/index.css"
    })
  ),
  body(
    div(
      { id: "app" },
      div(
        router({
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
            return div(
              { class: "not-found-page" },
              "PAGE NOT FOUND: " + context.browser.request.url
            );
          }
        })
      )
    )
  )
);
