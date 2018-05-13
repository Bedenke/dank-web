import { $get, div, h1 } from "../../index";
import Post, { PostAttributes } from "./post";

export interface BlogAttributes {
  source: string;
}
export default function Blog(attributes: BlogAttributes) {
  return div(
    { class: "blog" },
    $get({
      from: async context => {
        let data = await context.data(attributes.source);
        let posts = data.posts as PostAttributes[];
        let query = context.request().query || { page: 0 };
        return posts.filter((post, idx) => idx >= query.page);
      },
      render: result => {
        if (result.loading) return div("Loading....");
        if (result.error) return div(result.error.message);
        if (result.data) {
          let posts = result.data as PostAttributes[];
          return posts.map(Post)
        }
      }
    })
  );
}
