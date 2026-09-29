/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PropertyBinding.js
 * Binds track property path to actual node/skin/signal property.
 */

class PropertyBinding {
  constructor(rootNode, path, parsedPath) {
    this.rootNode = rootNode;
    this.path = path;
    this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path);

    this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
    this.targetObject = this.node;
    this.propertyName = this.parsedPath.propertyName;
  }

  getValue(targetArray, offset) {
    this.bind();
    targetArray[offset] = this.targetObject[this.propertyName];
  }

  setValue(sourceArray, offset) {
    this.bind();
    this.targetObject[this.propertyName] = sourceArray[offset];
  }

  bind() {
    let target = this.node;
    const propertyIndex = this.parsedPath.propertyIndex;

    if (propertyIndex !== undefined) {
      this.targetObject = target[this.propertyName];
      this.propertyName = propertyIndex;
    }
  }

  unbind() {
    this.targetObject = null;
  }

  static findNode(root, nodeName) {
    if (!nodeName || nodeName === '' || nodeName === '.') return root;

    let result = null;
    root.traverse((child) => {
      if (child.name === nodeName) {
        result = child;
      }
    });

    return result;
  }

  static parseTrackName(trackName) {
    const parts = trackName.split('.');
    return {
      nodeName: parts.length > 1 ? parts[0] : '',
      propertyName: parts.length > 1 ? parts[1] : parts[0]
    };
  }
}

export { PropertyBinding };
