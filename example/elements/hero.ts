import { div, $var, h1, h2 } from "../../index";

export default function Hero() {
  return div(
    { class: "hero" },
    h1($var("Main Title", { key: "main" })),
    h2($var("Subtitle", { key: "subtitle" }))
  );
}
