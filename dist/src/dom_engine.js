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
class DomEngine {
    render(element, content, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content instanceof Array) {
                for (let child of content) {
                    if (child) {
                        yield this.render(element, child, context);
                    }
                }
            }
            else if (typeof content == "function") {
                let updated = content(context);
                yield this.render(element, updated, context);
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
                    if (output) {
                        yield this.render(element, output, context);
                    }
                    return;
                }
                let newElement = document.createElement(node.$tag);
                element.appendChild(newElement);
                if (node.$attributes) {
                    for (let key of Object.keys(node.$attributes)) {
                        let attribute = node.$attributes[key];
                        if (key == "$subscribe") {
                            let subscriptionAttributes = attribute;
                            const subscriptionId = context.subscribe((c) => __awaiter(this, void 0, void 0, function* () {
                                const newContent = yield subscriptionAttributes.render(c);
                                yield this.render(newElement, newContent, context);
                            }), subscriptionAttributes.on);
                            const newContent = subscriptionAttributes.render(context);
                            yield this.render(newElement, newContent, context);
                            continue;
                        }
                        let value;
                        if (key.indexOf("on") == 0) {
                            newElement[key] = (e) => {
                                console.log("EVENT 2", e, context);
                                return attribute({ nativeEvent: e, context: context });
                            };
                        }
                        else {
                            if (typeof attribute == "function") {
                                value = attribute(context);
                            }
                            else {
                                value = attribute;
                            }
                            if (value == undefined)
                                continue;
                            if (value.$tag) {
                                value = yield this.render(newElement, value, context);
                            }
                            try {
                                newElement.setAttribute(key, value);
                            }
                            catch (err) {
                                console.error("Invalid attribute name", key, value, node);
                            }
                        }
                    }
                }
                if (node.$content) {
                    yield this.render(newElement, node.$content, context);
                }
            }
            else if (content) {
                element.innerHTML = content.toString();
            }
        });
    }
}
exports.default = DomEngine;
