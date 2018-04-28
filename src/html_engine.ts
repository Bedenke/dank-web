import { Element, Content, ElementFunction } from "./elements";

export default class HtmlEngine {
  render(content: Content, data?: any): string {
    if (content instanceof Array) {
      let out = "";
      content.map(node => (out += this.render(node, data)));
      return out;
    } else if (typeof content == "function") {
      return this.render((content as ElementFunction)(), data);
    } else if (typeof content == "object") {
      let node = content as Element;
      if (node.tag == "$") {
        return this.getValueFromData(data, node.attributes.id, node.attributes.defaultValue || node.content![0] || "$("+node.attributes.id+")");
      }
      var tagDefinition = "<" + node.tag;
      if (node.attributes) {
        for (let key of Object.keys(node.attributes)) {
          if (key == "trigger" || key == "tag") continue;
          let attribute = node.attributes[key];
          let value: any;
          if (key.indexOf("on") == 0) {
            value = attribute.toString(); //TODO support scripts
          } else {
            if (typeof attribute == "function") {
              value = attribute();
            } else if (typeof attribute == "object") {
              if (attribute.tag == "$") {
                let nodeAttribute = attribute;
                value = this.getValueFromData(data, nodeAttribute.attributes.id, nodeAttribute.attributes.defaultValue || nodeAttribute.content![0] || "$("+nodeAttribute.attributes.id+")");
              } else {
                console.warn("WARNING! Invalid attribute for ", node, attribute);                
              }
            } else {
              value = attribute;
            }
            if (key == "style") {
              var styleKeyValuePairs = "";
              if (typeof value == "object") {
                Object.keys(value).forEach(function(styleKey) {
                  var dashedKey = styleKey
                    .replace(/([a-z])([A-Z])/g, "$1-$2")
                    .toLowerCase();
                  styleKeyValuePairs += dashedKey + ":" + value[styleKey] + ";";
                });
              } else {
                styleKeyValuePairs = value;
              }
              value = styleKeyValuePairs;
            }
            tagDefinition += " " + key + '="' + value + '"';
          }
        }
      }
      tagDefinition += ">";
      let innerHTML = "";
      if (node.content) innerHTML = this.render(node.content, data);
      return tagDefinition + innerHTML + "</" + node.tag + ">";
    } else {
      return content.toString();
    }
  }

  getValueFromData(data: any, key: string, defaultValue: string = ""): string {
    const path = key.split(".");
    let node = data;
    for (let item of path) {
      if (!node) return defaultValue;
      node = node[item];
    }
    return node || defaultValue;
  }
}
