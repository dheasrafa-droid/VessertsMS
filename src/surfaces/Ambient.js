/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Ambient.js
 * Linear ambient context depth/falloff for background attenuation.
 * Parallels Three.js Fog.
 */

import { Color } from '../math/Color.js';

class Ambient {
  constructor(color, near = 1, far = 1000) {
    this.isAmbient = true;
    this.name = '';

    this.color = new Color(color);
    this.near = near;
    this.far = far;
  }

  clone() {
    return new this.constructor(this.color, this.near, this.far);
  }
}

export { Ambient };
