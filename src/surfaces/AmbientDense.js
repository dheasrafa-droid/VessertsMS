/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AmbientDense.js
 * Exponential squared atmospheric density falloff.
 * Parallels Three.js FogExp2.
 */

import { Color } from '../math/Color.js';

class AmbientDense {
  constructor(color, density = 0.00025) {
    this.isAmbientDense = true;
    this.name = '';

    this.color = new Color(color);
    this.density = density;
  }

  clone() {
    return new this.constructor(this.color, this.density);
  }
}

export { AmbientDense };
