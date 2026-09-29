/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RepeatedLayoutAttribute.js
 * Attribute holding per-instance data for repeated cards and instanced streams.
 * Parallels Three.js InstancedBufferAttribute.
 */

import { LayoutAttribute } from './LayoutAttribute.js';

class RepeatedLayoutAttribute extends LayoutAttribute {
  constructor(array, itemSize, normalized = false, meshPerAttribute = 1) {
    super(array, itemSize, normalized);

    this.isRepeatedLayoutAttribute = true;
    this.meshPerAttribute = meshPerAttribute;
  }

  copy(source) {
    super.copy(source);
    this.meshPerAttribute = source.meshPerAttribute;
    return this;
  }
}

export { RepeatedLayoutAttribute };
