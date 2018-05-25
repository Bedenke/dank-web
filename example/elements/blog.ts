import { $get, div, h1, li, ul } from "../../index";
import { PostLink, PostAttributes } from "./post";

export interface BlogAttributes {
  source: string;
}
export default function Blog(attributes: BlogAttributes) {
  return div(
    { class: "blog" },

    $get({
      from: async context => {
        let posts = context.get("posts") as PostAttributes[];
        let query = context.browser.request.query;
        let page = parseInt(query.page || "0");
        return posts.filter((post, idx) => idx >= page);
      },
      render: result => {
        if (result.loading) return div({class:"loader"});
        if (result.error) return div({class:"error"}, result.error.message);
        if (result.data) {
          let posts = result.data as PostAttributes[];
          return ul({ class: "posts" }, posts.map(post => li(PostLink(post))));
        }
      }
    })
  );
}
