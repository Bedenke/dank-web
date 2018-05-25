import { h1, div, $get, ul, li } from "../..";
import Footer from "../elements/Footer";
import Navigator from "../elements/navigator";
import Blog from "../elements/blog";
import Header from "../elements/header";
import { PostAttributes, PostLink } from "../elements/post";
import Fetch from "../../src/fetch";

export default function IndexPage() {
  return div(
    { class: "index-page" },
    Navigator(),
    Header({ subtitle: "All blogs" }),
    h1("Here are the posts"),
    $get({
      from: async context => {
        let data = context.get("data")
        let posts = data.posts as PostAttributes[];
        let query = context.browser.request.query;
        let page = parseInt(query.page || "0");
        return posts.filter((post, idx) => idx >= page);
      },
      render: result => {
        if (result.loading) return div({ class: "loader" });
        if (result.error) return div({ class: "error" }, result.error.message);
        if (result.data) {
          let posts = result.data as PostAttributes[];
          return ul({ class: "posts" }, posts.map(post => li(PostLink(post))));
        }
      }
    }),
    Footer()
  );
}
