"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function $subscribe(on, render) {
    return {
        $subscribe: {
            on: on,
            render: render
        }
    };
}
exports.$subscribe = $subscribe;
function el(tag, attributesOrContent, ...content) {
    if (typeof attributesOrContent == "object" &&
        !(attributesOrContent instanceof Array)) {
        if (attributesOrContent.$tag == undefined) {
            // Is attribute
            return {
                $tag: tag,
                $attributes: attributesOrContent,
                $content: content
            };
        }
    }
    // Is content (string, number, array)
    return {
        $tag: tag,
        $content: [attributesOrContent].concat(content || [])
    };
}
exports.el = el;
function $get(attributes) {
    return el("$get", attributes);
}
exports.$get = $get;
function $(key, defaultValue, render) {
    return $get({
        from: context => context.get(key) || defaultValue || "${" + key + "}",
        render: result => render ? render(result.data, result.context) : result.data
    });
}
exports.$ = $;
