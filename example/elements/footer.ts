import { $var, footer } from "../../index";

export default function Footer() {
  return footer(
    { class: "footer" },
    $var("About This Footer", {
      key: "footer.text",
      path: "global"
    })
  );
}
