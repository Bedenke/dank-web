import { $GetAttributes, $GetResult, $SubscriptionAttributes } from "./elements";
import { Context } from "./context";

export default class HtmlEngine {
  async render(content: Content, context: Context): Promise<string> {
    if (content instanceof Array) {
      let out = "";
      for (let child of content) {
        if (child) {
          out += await this.render(child, context);
        }
      }
      return out;
    } else if (typeof content == "function") {
      let updated = (content as ElementFunction)(context);
      return await this.render(updated, context);
    } else if (typeof content == "object") {
      let node = content as BaseElement;
      if (node.$tag == "$get") {
        let getAttributes = node.$attributes as $GetAttributes;
        let result: $GetResult = { loading: false, context: context };
        try {
          result.data = await getAttributes.from(context);
        } catch (err) {
          result.error = err;
        }        
        let output = getAttributes.render(result);
        if (!output) return "";
        return await this.render(output, context);
      }      
      let tagDefinition = "<" + node.$tag;
      let innerHTML = "";
      if (node.$attributes) {
        for (let key of Object.keys(node.$attributes)) {
          if (key == "$subscribe") continue;
          let attribute = node.$attributes[key];
          let value: any;
          if (key.indexOf("on") == 0) {
            value = attribute.toString(); //TODO support scripts
          } else {
            if (typeof attribute == "function") {
              value = attribute(context);
            } else {
              value = attribute;
            }
            if (key == "style") {
              let styleKeyValuePairs = "";
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
            if (value.$tag) {
              value = await this.render(value, context);
            }
            tagDefinition += " " + key + '="' + value + '"';
          }
        }

        if (node.$attributes.$subscribe) {
          let subscribeAttributes = node.$attributes.$subscribe as $SubscriptionAttributes;
          let dynamicContent = subscribeAttributes.render(context);
          innerHTML += await this.render(dynamicContent, context);
        }
      }
      tagDefinition += ">";      

      if (node.$content) {
        innerHTML += await this.render(node.$content, context);
      }
      return tagDefinition + innerHTML + "</" + node.$tag + ">";
    } else {
      return (content || "").toString();
    }
  }
}
