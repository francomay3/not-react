const add = (parent, child) =>
  parent.appendChild(child?.nodeType ? child : document.createTextNode(child));

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  } else {
    add(parent, child);
  }
  return parent;
};

export const jsx = (tag, props) => {
  const { children = [] } = props || {};

  if (typeof tag === "function") {
    return tag(props);
  }

  // create element
  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([prop, value]) => {
    if (prop === "children") return;
    const lowerCaseProp = prop.toLowerCase();

    // pass events to the element
    if (prop.startsWith("on") && lowerCaseProp in window) {
      const eventString = lowerCaseProp.replace("on", "");
      element.addEventListener(eventString, value);
    } else {
      element.setAttribute(prop, value);
    }
  });

  return appendChild(element, children);
};

export const jsxs = jsx;

export const Fragment = ({ children = [] }) =>
  appendChild(document.createDocumentFragment(), children);
