/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Line3.js
 * 3D line segment defined by start and end points.
 */

import { Vector3 } from './Vector3.js';

class Line3 {
  constructor(start = new Vector3(), end = new Vector3()) {
    this.start = start;
    this.end = end;
  }

  set(start, end) {
    this.start.copy(start);
    this.end.copy(end);
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(line) {
    this.start.copy(line.start);
    this.end.copy(line.end);
    return this;
  }

  getCenter(target) {
    return target.addVectors(this.start, this.end).multiplyScalar(0.5);
  }

  delta(target) {
    return target.subVectors(this.end, this.start);
  }

  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }

  distance() {
    return this.start.distanceTo(this.end);
  }

  at(t, target) {
    return this.delta(target).multiplyScalar(t).add(this.start);
  }
}

export { Line3 };
