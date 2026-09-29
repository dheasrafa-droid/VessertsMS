/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Box3.js
 * 3D bounding box.
 */

import { Vector3 } from './Vector3.js';

class Box3 {
  constructor(min = new Vector3(+Infinity, +Infinity, +Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
    Box3.prototype.isBox3 = true;
    this.min = min;
    this.max = max;
  }

  set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  }

  makeEmpty() {
    this.min.x = this.min.y = this.min.z = +Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  }

  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }

  getCenter(target) {
    return this.isEmpty()
      ? target.set(0, 0, 0)
      : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  }

  getSize(target) {
    return this.isEmpty()
      ? target.set(0, 0, 0)
      : target.subVectors(this.max, this.min);
  }

  containsPoint(point) {
    return point.x >= this.min.x && point.x <= this.max.x &&
           point.y >= this.min.y && point.y <= this.max.y &&
           point.z >= this.min.z && point.z <= this.max.z;
  }

  intersectsBox(box) {
    return !(box.max.x < this.min.x || box.min.x > this.max.x ||
             box.max.y < this.min.y || box.min.y > this.max.y ||
             box.max.z < this.min.z || box.min.z > this.max.z);
  }

  intersectsSphere(sphere) {
    this.clampPoint(sphere.center, _vector);
    return _vector.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  }

  clampPoint(point, target) {
    return target.copy(point).clamp(this.min, this.max);
  }
}

const _vector = new Vector3();

export { Box3 };
