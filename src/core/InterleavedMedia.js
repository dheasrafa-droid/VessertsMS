/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - InterleavedMedia.js
 * Interleaved data buffer for layout attributes.
 * Parallels Three.js InterleavedBuffer.
 */

import { MathUtils } from '../math/MathUtils.js';

class InterleavedMedia {
  constructor(array, stride) {
    if (Array.isArray(array)) {
      throw new TypeError('VessertID.InterleavedMedia: array must be a typed array.');
    }

    this.isInterleavedMedia = true;
    this.array = array;
    this.stride = stride;
    this.count = array !== undefined ? array.length / stride : 0;

    this.usage = 35044; // StaticDrawUsage
    this.updateRange = { offset: 0, count: -1 };
    this.version = 0;
  }

  set needsUpdate(value) {
    if (value === true) this.version++;
  }

  setUsage(value) {
    this.usage = value;
    return this;
  }

  copy(source) {
    this.array = new source.array.constructor(source.array);
    this.stride = source.stride;
    this.count = source.count;
    this.usage = source.usage;
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }
}

export { InterleavedMedia };
