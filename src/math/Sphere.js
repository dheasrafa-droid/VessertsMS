/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Sphere.js
 * Bounding sphere.
 */

import { Vector3 } from './Vector3.js';

class Sphere {
  constructor(center = new Vector3(), radius = -1) {
    Sphere.prototype.isSphere = true;
    this.center = center;
    this.radius = radius;
  }

  set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  }

  isEmpty() {
    return this.radius < 0;
  }

  makeEmpty() {
    this.center.set(0, 0, 0);
    this.radius = -1;
    return this;
  }

  containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  }

  intersectsBox(box) {
    return box.intersectsSphere(this);
  }
}

export { Sphere };
