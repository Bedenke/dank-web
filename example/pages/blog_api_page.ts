import { h1, div, $get, ul, li } from "../../index";
import Footer from "../elements/Footer";
import Navigator from "../elements/navigator";
import Header from "../elements/header";
import { PostAttributes, PostLink } from "../elements/post";
import Fetch from "../../src/fetch";

export default function BlogApiPage() {
  return div(
    { class: "index-page" },
    Navigator(),
    Header({ subtitle: "All blogs" }),
    h1("Here are the posts"),
    $get({
      from: async context => {
        let response = await Fetch.get("https://jsonplaceholder.typicode.com/posts");
        let posts = response.body as PostAttributes[];
        return posts;
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
