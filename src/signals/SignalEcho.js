/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SignalEcho.js
 * Base class for reactive echoes and shadow projections cast by signals.
 * Parallels Three.js LightShadow.
 */

import { Vector2 } from '../math/Vector2.js';
import { Matrix4 } from '../math/Matrix4.js';

class SignalEcho {
  constructor(lens) {
    this.lens = lens;

    this.bias = 0;
    this.normalBias = 0;
    this.radius = 1;
    this.blurSamples = 8;

    this.mapSize = new Vector2(512, 512);
    this.map = null;
    this.mapPass = null;
    this.matrix = new Matrix4();

    this.autoUpdate = true;
    this.needsUpdate = false;
  }

  getViewportCount() {
    return 1;
  }

  getFrameExtents() {
    return new Vector2(1, 1);
  }

  dispose() {
    if (this.map) {
      this.map.dispose();
    }
  }
}

export { SignalEcho };
