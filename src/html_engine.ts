import {
  Element,
  Content,
  ElementFunction,
  ElementMetaProperties
} from "./elements";

export default class HtmlEngine {
  render(content: Content, data?: any): string {
    return this.recurse(
      content,
      { component: "", attributes: {}, children: [], content: [] },
      data
    );
  }

  private recurse(
    content: Content,
    props: ElementMetaProperties,
    data?: any
  ): string {
    if (content instanceof Array) {
      let out = "";
      content.map(node => (out += this.recurse(node, props, data)));
      return out;
    } else if (typeof content == "function") {
      console.log("RENDER ", props, data);

      let updated = (content as ElementFunction)(props, data);

      console.log("RENDERED ", updated);

      return this.recurse(updated, props, data);
    } else if (typeof content == "object") {
      let node = content as Element;
      if (node.tag == "$subscribe") {
        return this.recurse(node.content || [], node.attributes!.$props, data);
      }
      var tagDefinition = "<" + node.tag;
      if (node.attributes) {
        for (let key of Object.keys(node.attributes)) {
          if (
            key == "tag" ||
            key == "$props" ||
            key == "$on" ||
            key == "$render"
          )
            continue;
          let attribute = node.attributes[key];
          let value: any;
          if (key.indexOf("on") == 0) {
            value = attribute.toString(); //TODO support scripts
          } else {
            if (typeof attribute == "function") {
              value = attribute(node.attributes.$props, data);
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
      if (node.content) {
        let childProps = node.attributes
          ? node.attributes.$props || props
          : props;
        innerHTML = this.recurse(node.content, childProps, data);
      }
      return tagDefinition + innerHTML + "</" + node.tag + ">";
    } else {
      return content.toString();
    }
  }
}
