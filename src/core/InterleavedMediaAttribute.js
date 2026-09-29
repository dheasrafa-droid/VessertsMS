/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - InterleavedMediaAttribute.js
 * Attribute referencing an interleaved media data slice.
 * Parallels Three.js InterleavedBufferAttribute.
 */

class InterleavedMediaAttribute {
  constructor(interleavedMedia, itemSize, offset, normalized = false) {
    this.name = '';
    this.data = interleavedMedia;
    this.itemSize = itemSize;
    this.offset = offset;
    this.normalized = normalized;
  }

  get count() {
    return this.data.count;
  }

  get array() {
    return this.data.array;
  }

  set needsUpdate(value) {
    this.data.needsUpdate = value;
  }

  getX(index) {
    return this.data.array[index * this.data.stride + this.offset];
  }

  setX(index, x) {
    this.data.array[index * this.data.stride + this.offset] = x;
    return this;
  }

  getY(index) {
    return this.data.array[index * this.data.stride + this.offset + 1];
  }

  setY(index, y) {
    this.data.array[index * this.data.stride + this.offset + 1] = y;
    return this;
  }

  getZ(index) {
    return this.data.array[index * this.data.stride + this.offset + 2];
  }

  setZ(index, z) {
    this.data.array[index * this.data.stride + this.offset + 2] = z;
    return this;
  }
}

export { InterleavedMediaAttribute };
