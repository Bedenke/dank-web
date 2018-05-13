import { div, $, h1, h2 } from "../../index";

export default function Hero() {
  return div(
    { class: "hero" },
    h1($("hero.title", "Main Title")),
    h2($("hero.subtitle", "Subtitle"))
  );
}
