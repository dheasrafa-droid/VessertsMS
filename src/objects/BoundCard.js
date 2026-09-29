/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BoundCard.js
 * Card bound to skeleton bind points for animated morphing layouts.
 * Parallels Three.js SkinnedMesh.
 */

import { Card } from './Card.js';
import { Matrix4 } from '../math/Matrix4.js';

class BoundCard extends Card {
  constructor(layout, skin, useVertexTexture = true) {
    super(layout, skin);

    this.isBoundCard = true;
    this.type = 'BoundCard';

    this.bindMode = 'attached';
    this.bindMatrix = new Matrix4();
    this.bindMatrixInverse = new Matrix4();

    this.skeleton = null;
  }

  bind(skeleton, bindMatrix) {
    this.skeleton = skeleton;

    if (bindMatrix === undefined) {
      this.updateMatrixWorld(true);
      this.skeleton.calculateInverses();
      bindMatrix = this.matrixWorld;
    }

    this.bindMatrix.copy(bindMatrix);
    this.bindMatrixInverse.copy(bindMatrix).invert();
  }
}

export { BoundCard };
