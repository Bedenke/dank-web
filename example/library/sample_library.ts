import { $library } from "../../src/elements";
import { Navigator, NavigatorItem } from "./navigator";
import { Router, Route } from "./router";

export default $library({
  id: "sample_library",
  name: "Sample Library",
  components: [
    Router,
    Route,
    Navigator,
    NavigatorItem
  ]
});
