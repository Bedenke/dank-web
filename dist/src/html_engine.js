"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlEngine {
    render(content, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content instanceof Array) {
                let out = "";
                for (let child of content) {
                    if (child) {
                        out += yield this.render(child, context);
                    }
                }
                return out;
            }
            else if (typeof content == "function") {
                let updated = content(context);
                return yield this.render(updated, context);
            }
            else if (typeof content == "object") {
                let node = content;
                if (node.$tag == "$get") {
                    let getAttributes = node.$attributes;
                    let result = { loading: false, context: context };
                    try {
                        result.data = yield getAttributes.from(context);
                    }
                    catch (err) {
                        result.error = err;
                    }
                    let output = getAttributes.render(result);
                    if (!output)
                        return "";
                    return yield this.render(output, context);
                }
                let tagDefinition = "<" + node.$tag;
                let innerHTML = "";
                if (node.$attributes) {
                    for (let key of Object.keys(node.$attributes)) {
                        if (key == "$subscribe")
                            continue;
                        let attribute = node.$attributes[key];
                        let value;
                        if (key.indexOf("on") == 0) {
                            value = attribute.toString(); //TODO support scripts
                        }
                        else {
                            if (typeof attribute == "function") {
                                value = attribute(context);
                            }
                            else {
                                value = attribute;
                            }
                            if (key == "style") {
                                let styleKeyValuePairs = "";
                                if (typeof value == "object") {
                                    Object.keys(value).forEach(function (styleKey) {
                                        var dashedKey = styleKey
                                            .replace(/([a-z])([A-Z])/g, "$1-$2")
                                            .toLowerCase();
                                        styleKeyValuePairs += dashedKey + ":" + value[styleKey] + ";";
                                    });
                                }
                                else {
                                    styleKeyValuePairs = value;
                                }
                                value = styleKeyValuePairs;
                            }
                            if (value.$tag) {
                                value = yield this.render(value, context);
                            }
                            tagDefinition += " " + key + '="' + value + '"';
                        }
                    }
                    if (node.$attributes.$subscribe) {
                        let subscribeAttributes = node.$attributes.$subscribe;
                        let dynamicContent = subscribeAttributes.render(context);
                        innerHTML += yield this.render(dynamicContent, context);
                    }
                }
                tagDefinition += ">";
                if (node.$content) {
                    innerHTML += yield this.render(node.$content, context);
                }
                return tagDefinition + innerHTML + "</" + node.$tag + ">";
            }
            else {
                return (content || "").toString();
            }
        });
    }
}
exports.default = HtmlEngine;
