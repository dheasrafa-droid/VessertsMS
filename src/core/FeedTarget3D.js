/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FeedTarget3D.js
 * 3D volumetric render target.
 * Parallels Three.js WebGLRenderTarget3D.
 */

import { FeedTarget } from './FeedTarget.js';

class FeedTarget3D extends FeedTarget {
  constructor(width = 1, height = 1, depth = 1, options = {}) {
    super(width, height, options);

    this.isFeedTarget3D = true;
    this.depth = depth;
  }
}

export { FeedTarget3D };
