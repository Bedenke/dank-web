import {
  $GetAttributes,
  $GetResult,
  $SubscriptionAttributes
} from "./elements";
import { Context } from "./context";

export default class DomEngine {
  async render(
    element: HTMLElement,
    content: Content,
    context: Context
  ): Promise<void> {
    if (content instanceof Array) {
      for (let child of content) {
        if (child) {
          await this.render(element, child, context);
        }
      }
    } else if (typeof content == "function") {
      let updated = (content as ElementFunction)(context);
      await this.render(element, updated, context);
    } else if (typeof content == "object") {
      let node = content as BaseElement;
      
      if (node.$tag == "$get") {
        console.log("content is $get", node);

        let getAttributes = node.$attributes as $GetAttributes;
        let result: $GetResult = { loading: false, context: context };
        try {
          result.data = await getAttributes.from(context);
        } catch (err) {
          result.error = err;
        }
        let output = getAttributes.render(result);
        if (output) {
          await this.render(element, output, context);
        }
        return;
      }

      let newElement = document.createElement(node.$tag);
      element.appendChild(newElement);

      if (node.$attributes) {  
        for (let key of Object.keys(node.$attributes)) {
          let attribute = node.$attributes[key];
          if (key == "$subscribe") {
            let subscriptionAttributes = attribute as $SubscriptionAttributes;
            if (!newElement.getAttribute("subscriptionId")) {
              const subscriptionId = context.subscribe(c => {
                const newContent = subscriptionAttributes.render(c);
                newElement.innerHTML = "";
                this.render(newElement, newContent, context);
              }, subscriptionAttributes.on);
              newElement.setAttribute("$subscriptionId", "" + subscriptionId);
            }
            continue;
          }

          let value: any;
          if (key.indexOf("on") == 0) {
            (newElement as any)[key] = attribute;
          } else {
            if (typeof attribute == "function") {
              value = attribute(context);
            } else {
              value = attribute;
            }
            if (value.$tag) {
              value = await this.render(newElement, value, context);
            }

            newElement.setAttribute(key, value);
          }
        }
      }

      if (node.$content) {
        await this.render(newElement, node.$content, context);
      }
    } else if (content) {
      element.innerHTML = content.toString();
    }

  }
}
