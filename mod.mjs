/**
 * @typedef {Object} XmlNode
 * @property {string} tag
 * @property {string[][]} attributes
 * @prop {(XmlNode | string)[]} [children]
 */

/**
 * Create an element node
 * @param {string} tag
 */
export function element(tag) {
  /**
   * @param {string[][]} attributes
   * @param {(XmlNode | string)[]} children
   * @returns {XmlNode}
   */
  return function (attributes, children) {
    return { tag, attributes, children };
  };
}

/**
 * Create an empty element node
 * @param {string} tag
 */
export function emptyElement(tag) {
  /**
   * @param {string[][]} attributes
   * @returns {XmlNode}
   */
  return function (attributes) {
    return { tag, attributes };
  };
}

/**
 * Render a XML Node tree to a string
 * @param {XmlNode | string} node
 * @returns {string}
 */
export function toString(node) {
  if (typeof node === "string") {
    return node;
  }

  let buffer = `<${node.tag}`;

  buffer += node.attributes
    .filter((a) => a.length)
    .map(([key, ...values]) => {
      if (values.length) {
        return ` ${key}="${values.map(String).join(" ")}"`;
      }
      return ` ${key}`;
    })
    .join("");

  if (node.children !== undefined) {
    buffer += `>${node.children.map(toString).join("")}</${node.tag}>`;
  } else {
    buffer += "/>";
  }

  return buffer;
}

/**
 * Create a HTMLElement from XML node tree with given DOM
 * @param {Document} document
 * @param {XmlNode | string} node
 * @returns {HTMLElement}
 */
export function toDom(document, node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const domElement = document.createElement(node.tag);

  node.attributes
    .filter((a) => a.length)
    .forEach(([key, ...values]) =>
      domElement.setAttribute(key, values.map(String).join(" "))
    );

  if (node.children !== undefined) {
    node.children.forEach((c) => domElement.appendChild(toDom(document, c)));
  }

  return domElement;
}

// Premade elements

export const div = element("div");
export const span = element("span");
export const h1 = element("h1");
export const h2 = element("h2");
export const a = element("a");
export const table = element("table");
export const thead = element("thead");
export const tbody = element("tbody");
export const tr = element("tr");
export const th = element("th");
export const td = element("td");
export const code = element("code");
export const script = element("script");
export const style = element("style");

export const br = emptyElement("br");
export const input = emptyElement("input");
