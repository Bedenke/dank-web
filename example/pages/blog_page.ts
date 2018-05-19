import { h1, div, $get } from "../..";
import Footer from "../elements/Footer";
import Navigator from "../elements/navigator";
import Blog from "../elements/blog";
import Header from "../elements/header";
import { PostView, PostAttributes } from "../elements/post";

export interface BlogPageAttributes {
  slug?: string;
}
export default function BlogPage(attributes: BlogPageAttributes) {
  return div(
    { class: "blog-page" },
    Navigator(),
    $get({
      from: async context => {
        if (!attributes.slug) return;
        const data = await context.data("posts.json");
        const posts = data.posts as PostAttributes[];
        const post = posts.filter(post => post.slug == attributes.slug)[0];
        return post;
      },
      render: result => {
        if (result.loading) return div({ class: "loader" });
        if (result.error) return div({ class: "error" }, result.error.message);
        if (!result.data) return div({ class: "error" }, "Post not found");
        const post = result.data as PostAttributes;
        return [Header({ subtitle: post.title }), PostView(post)];
      }
    }),
    Footer()
  );
}
