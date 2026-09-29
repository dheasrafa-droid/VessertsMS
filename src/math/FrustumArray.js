/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FrustumArray.js
 * Multi-viewport frustum array for split view feeds and multi-lens grids.
 */

import { Frustum } from './Frustum.js';

class FrustumArray {
  constructor(frustums = []) {
    this.frustums = frustums;
  }

  add(frustum) {
    this.frustums.push(frustum);
  }

  intersectsBox(box) {
    for (let i = 0, l = this.frustums.length; i < l; i++) {
      if (this.frustums[i].intersectsBox(box)) {
        return true;
      }
    }
    return false;
  }
}

export { FrustumArray };
