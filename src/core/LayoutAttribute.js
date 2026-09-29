/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LayoutAttribute.js
 * Typed array container for layout vertex data, UV coordinates, and custom attributes.
 * Parallels Three.js BufferAttribute.
 */

import { MathUtils } from '../math/MathUtils.js';

class LayoutAttribute {
  constructor(array, itemSize, normalized = false) {
    if (Array.isArray(array)) {
      throw new TypeError('VessertID.LayoutAttribute: array must be a typed array.');
    }

    this.name = '';
    this.array = array;
    this.itemSize = itemSize;
    this.count = array !== undefined ? array.length / itemSize : 0;
    this.normalized = normalized;

    this.usage = 35044; // StaticDrawUsage
    this.updateRange = { offset: 0, count: -1 };
    this.version = 0;
  }

  set needsUpdate(value) {
    if (value === true) this.version++;
  }

  get isLayoutAttribute() {
    return true;
  }

  setUsage(value) {
    this.usage = value;
    return this;
  }

  copy(source) {
    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;
    this.usage = source.usage;
    return this;
  }

  getX(index) {
    return this.array[index * this.itemSize];
  }

  setX(index, x) {
    this.array[index * this.itemSize] = x;
    return this;
  }

  getY(index) {
    return this.array[index * this.itemSize + 1];
  }

  setY(index, y) {
    this.array[index * this.itemSize + 1] = y;
    return this;
  }

  getZ(index) {
    return this.array[index * this.itemSize + 2];
  }

  setZ(index, z) {
    this.array[index * this.itemSize + 2] = z;
    return this;
  }

  setXY(index, x, y) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    return this;
  }

  setXYZ(index, x, y, z) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    return this;
  }

  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
}

export { LayoutAttribute };
