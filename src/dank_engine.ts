import {
  Element,
  Content,
  ElementFunction,
  LibraryAttributes,
  ComponentAttributes,
  $LetAttributes,
  $SubscribeProperties,
  ElementMetaProperties
} from "./elements";

export default class DankEngine {
  components: { [id: string]: Component } = {};

  using(library: Library) {
    let attributes = library.attributes as LibraryAttributes;
    for (let component of attributes.components) {
      let componentAttributes = component.attributes as ComponentAttributes;
      if (this.components[componentAttributes.id]) {
        console.warn(
          `🔥 Component ${componentAttributes.id} already registered`
        );
      } else {
        this.components[componentAttributes.id] = component;
      }
    }
  }

  render(project: any): Content {
    let rootElementMetaProperties = project.root as ElementMetaProperties;
    let outputElement = this.recurse(rootElementMetaProperties);
    return outputElement;
  }

  private recurse(node: ElementMetaProperties): Content {
    let component = this.components[node.component];
    if (!component) {
      console.error("🔥 Component not found", node.component);
      return "[🔥 Component not found " + node.component + "]";
    }
    if (!component.content) {
      console.error("🔥 Component is empty", node.component);
      return "[🔥 Component is empty " + node.component + "]";
    }

    let childrenContent: Content[] = [];
    if (node.children) {
      for (let child of node.children) {
        childrenContent.push(this.recurse(child));
      }
    }
    node.content = this.recurseContent(node, component.content, childrenContent);
    return node.content;
  }

  private recurseContent(
    node: ElementMetaProperties,
    content: any[],
    childrenContent: Content[]
  ): any {
    if (content instanceof Array) {
      let out = [];
      for (let child of content) {
        out.push(this.recurseContent(node, child, childrenContent));
      }
      return out.length == 1 ? out[0] : out;
    }

    if (typeof content == "object") {
      let element = content as Element;

      if (element.tag == "$let") {
        return node.attributes[element.attributes!.id] || element.content![0];
      }
      if (element.tag == "$children") {
        return childrenContent.length == 1
          ? childrenContent[0]
          : childrenContent;
      }
      if (element.tag == "$subscribe") {
        let attributes = element.attributes as $SubscribeProperties;
        return {
          tag: element.tag,
          attributes: {
            $on: attributes.on,
            $props: node
          },
          content: {
            tag: attributes.element.tag,
            attribute: attributes.element.attributes,
            content: attributes.render
          }
        };
      }

      let newContent: any[] = [];
      if (element.content) {
        newContent = this.recurseContent(
          node,
          element.content,
          childrenContent
        );
      }

      if (element.attributes) {
        for (let key of Object.keys(element.attributes)) {
          let attribute = element.attributes[key];
          if (attribute.tag == "$let") {
            element.attributes[key] =
              node.attributes[attribute.attributes!.id] ||
              attribute.content![0];
          }
        }
      }

      return {
        tag: element.tag,
        attributes: {
          ...element.attributes,
          $props: node
        },
        content: newContent.length == 1 ? newContent[0] : newContent
      };
    }

    return content;
  }
}
