/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RepeatedLayoutGeometry.js
 * Layout geometry configured for instanced rendering of repeated cards.
 * Parallels Three.js InstancedBufferGeometry.
 */

import { Layout } from './Layout.js';

class RepeatedLayoutGeometry extends Layout {
  constructor() {
    super();

    this.isRepeatedLayoutGeometry = true;
    this.type = 'RepeatedLayoutGeometry';
    this.instanceCount = Infinity;
  }

  copy(source) {
    super.copy(source);
    this.instanceCount = source.instanceCount;
    return this;
  }
}

export { RepeatedLayoutGeometry };
