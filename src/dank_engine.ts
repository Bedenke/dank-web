import {
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
  private global: any = {};

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
    this.global = project.global || {};
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
    node.content = this.recurseContent(
      node,
      component.content,
      childrenContent
    );
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
        let updatedChild = this.recurseContent(node, child, childrenContent);
        if (updatedChild != undefined) out.push(updatedChild);
      }
      return out.length == 1 ? out[0] : out;
    }

    if (typeof content == "object") {
      let element = content as BaseElement;

      if (element.tag == "$let") {
        return this.letValue(node, element);
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
            element.attributes[key] = this.letValue(node, attribute);
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

  private letValue(node: ElementMetaProperties, letElement: LetElement) {
    let letAttributes = letElement.attributes as $LetAttributes;
    if (letAttributes.global && !this.global) {
      console.error("🔥 global attributes were not defined");
      return [];
    }
    if (!letAttributes.global && !node.attributes) {
      console.error("🔥 $let attributes is not defined for", node.component);
      return [];
    }

    let globalValue = !!letAttributes.global
      ? this.global[letAttributes.key!]
      : undefined;
    let defaultValue = letElement.content ? letElement.content[0] : undefined;
    let localValue = node.attributes ? node.attributes[letAttributes.key!] : undefined;
    let value = localValue || globalValue || defaultValue;

    if (value == undefined) {
      console.error(
        "🔥 Value is not defined for",
        letAttributes.key,
        "on",
        letElement,
        node.component
      );
      return [];
    }

    return letAttributes.valueDecorator
      ? letAttributes.valueDecorator(value)
      : value;
  }
}
