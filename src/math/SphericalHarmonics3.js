/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SphericalHarmonics3.js
 * 3rd-order Spherical Harmonics for ambient signal probes and irradiance caches.
 */

import { Vector3 } from './Vector3.js';

class SphericalHarmonics3 {
  constructor() {
    this.coefficients = [];
    for (let i = 0; i < 9; i++) {
      this.coefficients.push(new Vector3());
    }
  }

  set(coefficients) {
    for (let i = 0; i < 9; i++) {
      this.coefficients[i].copy(coefficients[i]);
    }
    return this;
  }

  zero() {
    for (let i = 0; i < 9; i++) {
      this.coefficients[i].set(0, 0, 0);
    }
    return this;
  }

  add(sh) {
    for (let i = 0; i < 9; i++) {
      this.coefficients[i].add(sh.coefficients[i]);
    }
    return this;
  }

  scale(s) {
    for (let i = 0; i < 9; i++) {
      this.coefficients[i].multiplyScalar(s);
    }
    return this;
  }

  clone() {
    return new this.constructor().set(this.coefficients);
  }
}

export { SphericalHarmonics3 };
