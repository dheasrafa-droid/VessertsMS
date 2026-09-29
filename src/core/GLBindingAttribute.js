/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - GLBindingAttribute.js
 * Direct low-level GPU buffer attribute wrapper.
 * Parallels Three.js GLBufferAttribute.
 */

class GLBindingAttribute {
  constructor(buffer, type, itemSize, elementSize, count) {
    this.name = '';
    this.buffer = buffer;
    this.type = type;
    this.itemSize = itemSize;
    this.elementSize = elementSize;
    this.count = count;

    this.version = 0;
  }

  get isGLBindingAttribute() {
    return true;
  }

  set needsUpdate(value) {
    if (value === true) this.version++;
  }
}

export { GLBindingAttribute };
