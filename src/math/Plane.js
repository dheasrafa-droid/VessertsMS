/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Plane.js
 * Geometric plane for clipping and frustum checks.
 */

import { Vector3 } from './Vector3.js';

class Plane {
  constructor(normal = new Vector3(1, 0, 0), constant = 0) {
    Plane.prototype.isPlane = true;
    this.normal = normal;
    this.constant = constant;
  }

  set(normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  }

  setComponents(x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(plane) {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;
    return this;
  }

  normalize() {
    const inverseNormalLength = 1.0 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  }

  distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  }

  distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }
}

export { Plane };
