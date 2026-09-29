/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Lens.js
 * Base class for lenses (view projection modes across the social surface).
 * Parallels Three.js Camera.
 */

import { Matrix4 } from '../math/Matrix4.js';
import { Node } from '../core/Node.js';

class Lens extends Node {
  constructor() {
    super();

    this.isLens = true;
    this.type = 'Lens';

    this.matrixWorldInverse = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.projectionMatrixInverse = new Matrix4();
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.matrixWorldInverse.copy(source.matrixWorldInverse);
    this.projectionMatrix.copy(source.projectionMatrix);
    this.projectionMatrixInverse.copy(source.projectionMatrixInverse);

    return this;
  }

  getWorldDirection(target) {
    return super.getWorldDirection(target).negate();
  }

  updateMatrixWorld(force) {
    super.updateMatrixWorld(force);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }

  updateWorldMatrix(updateParents, updateChildren) {
    super.updateWorldMatrix(updateParents, updateChildren);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }

  clone() {
    return new this.constructor().copy(this);
  }
}

export { Lens };
