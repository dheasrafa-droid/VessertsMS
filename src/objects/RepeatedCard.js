/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RepeatedCard.js
 * High performance instanced card rendering for large feed streams.
 * Parallels Three.js InstancedMesh.
 */

import { Card } from './Card.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Matrix4 } from '../math/Matrix4.js';

class RepeatedCard extends Card {
  constructor(layout, skin, count) {
    super(layout, skin);

    this.isRepeatedCard = true;
    this.instanceMatrix = new LayoutAttribute(new Float32Array(count * 16), 16);
    this.instanceColor = null;
    this.count = count;
  }

  setMatrixAt(index, matrix) {
    matrix.toArray(this.instanceMatrix.array, index * 16);
  }

  getMatrixAt(index, matrix) {
    return matrix.fromArray(this.instanceMatrix.array, index * 16);
  }
}

export { RepeatedCard };
