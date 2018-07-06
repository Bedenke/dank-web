import { Context } from "./context";
export default class HtmlEngine {
    render(content: Content, context: Context): Promise<string>;
}
