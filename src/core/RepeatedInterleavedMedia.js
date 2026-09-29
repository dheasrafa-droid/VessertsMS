/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RepeatedInterleavedMedia.js
 * Interleaved data buffer with per-instance repetition divisor.
 * Parallels Three.js InstancedInterleavedBuffer.
 */

import { InterleavedMedia } from './InterleavedMedia.js';

class RepeatedInterleavedMedia extends InterleavedMedia {
  constructor(array, stride, meshPerAttribute = 1) {
    super(array, stride);

    this.isRepeatedInterleavedMedia = true;
    this.meshPerAttribute = meshPerAttribute;
  }

  copy(source) {
    super.copy(source);
    this.meshPerAttribute = source.meshPerAttribute;
    return this;
  }
}

export { RepeatedInterleavedMedia };
