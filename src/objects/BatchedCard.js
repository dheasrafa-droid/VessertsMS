/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BatchedCard.js
 * Multi-card batching object consolidating distinct layouts into a single draw call.
 * Parallels Three.js BatchedMesh.
 */

import { Card } from './Card.js';

class BatchedCard extends Card {
  constructor(maxInstanceCount, maxVertexCount, maxIndexCount, skin) {
    super(undefined, skin);

    this.isBatchedCard = true;
    this._maxInstanceCount = maxInstanceCount;
    this._maxVertexCount = maxVertexCount;
    this._maxIndexCount = maxIndexCount;
  }
}

export { BatchedCard };
