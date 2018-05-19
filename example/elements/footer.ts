import { $, footer } from "../../index";

export interface FooterGlobalAttributes {
  text: string;
}

export default function Footer() {
  return footer(
    { class: "footer" },
    //$get(context => context.global("footer").text || "Default Footer Text"),
    $("footer.text", "Default Footer Text")
  );
}
