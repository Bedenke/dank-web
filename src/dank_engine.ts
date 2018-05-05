import {
  ElementFunction,
  $VarAttributes,
  $SubscribeProperties
} from "./elements";

export default class DankEngine {
  meta: any = {};

  render(page: $Page, data?: any): Content {
    return this.recurse("data", 0, page.content, data);
  }

  private recurse(treeKey: string, index: number, content: Content, data: any): any {
    if (content instanceof Array) {
      let out = [];
      for (let i = 0; i < content.length; i++) {
        let updatedChild = this.recurse(treeKey, i, content[i], data);
        if (updatedChild != undefined) out.push(updatedChild);
      }
      if (out.length == 0) {
        return undefined;
      } else {
        return out.length == 1 ? out[0] : out;
      }
    }

    if (typeof content != "object") {
      return content;
    }

    let element = content as BaseElement;

    if (element.tag == "$var") {
      return this.varValue(treeKey, element, data);
    }

    if (element.tag == "$subscribe") {
      let attributes = element.attributes as $SubscribeProperties;
      return {
        tag: element.tag,
        attributes: {
          $on: attributes.on
        },
        content: {
          tag: attributes.element.tag,
          attribute: attributes.element.attributes,
          content: attributes.render
        }
      };
    }

    let currentTreeKey = treeKey + "_" + element.tag + index;

    let newContent: any[] = [];
    if (element.content) {
      newContent = this.recurse(currentTreeKey, index, element.content, data);
    }

    if (element.attributes) {
      for (let key of Object.keys(element.attributes)) {
        let attribute = element.attributes[key];
        if (attribute.tag == "$var") {
          let varElement = attribute;
          element.attributes[key] = this.varValue(
            currentTreeKey + "." + key,
            varElement,
            data
          );
        }
      }
    }

    return {
      tag: element.tag,
      attributes: {
        ...element.attributes
      },
      content: newContent
        ? newContent.length == 1
          ? newContent[0]
          : newContent
        : undefined
    };
  }

  private varValue(treeKey: string, varElement: VarElement, data?: any) {
    let varAttributes: $VarAttributes = { ...varElement.attributes };

    varAttributes.type = varAttributes.type || "textfield";
    varAttributes.input = true;

    let path = varAttributes.path || treeKey;
    let key = path + ":" + varAttributes.key;

    this.meta[key] = varAttributes;

    let defaultValue = varElement.content ? varElement.content[0] : undefined;
    let localValue = data ? data[key] : undefined;
    let value = localValue || defaultValue;

    if (value == undefined) {
      console.error(
        "🔥 Value is not defined for",
        key,
        "on",
        varElement,
        `(${treeKey})`
      );
      return;
    }

    return varAttributes.valueDecorator
      ? varAttributes.valueDecorator(value)
      : value;
  }
}
