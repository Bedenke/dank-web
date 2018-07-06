import { Context } from "./context";
export default class DomEngine {
    render(element: HTMLElement, content: Content, context: Context): Promise<void>;
}
