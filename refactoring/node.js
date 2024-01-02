class Node {
  constructor(
    tag,
    value = null,
    idName = null,
    className = null,
    existed = false,
  ) {
    this.node = existed
      ? this.selectExistedNode(idName, className)
      : this.createNewNode(tag, idName, className, value);
  }

  selectExistedNode(idName, className) {
    const identifer = idName ? `#${idName}` : `.${className}`;
    return document.querySelector(identifer);
  }

  createNewNode(tag, idName, className, value) {
    const node = document.createElement(tag);
    if (idName) node.id = idName;
    if (className) node.classList.add(className);
    if (value) node.textContent = value;

    return node;
  }

  appendNode(obj) {
    this.node.appendChild(obj.node);
  }

  removeNode(obj) {
    this.node.removeChild(obj.node);
  }

  editValue(text) {
    this.node.textContent = text;
  }

  changeStyle(key, style) {
    this.node.style[key] = style;
  }

  getText() {
    return this.node.value;
  }
}
