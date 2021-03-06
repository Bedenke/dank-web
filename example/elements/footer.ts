import { $, footer } from "../..";

export interface FooterGlobalAttributes {
  text: string;
}

export default function Footer() {
  return footer(
    { class: "footer" },
    $("footer.text", "Default Footer Text")
  );
}
