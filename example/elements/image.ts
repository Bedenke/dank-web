import { $var, img } from "../../index";

export default function Image() {
  return img({ src: $var("/image/source", { key: "source" }) });
}
