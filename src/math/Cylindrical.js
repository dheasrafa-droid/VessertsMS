/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Cylindrical.js
 * Cylindrical coordinate system (radius, theta, y).
 */

class Cylindrical {
  constructor(radius = 1, theta = 0, y = 0) {
    this.radius = radius;
    this.theta = theta;
    this.y = y;
  }

  set(radius, theta, y) {
    this.radius = radius;
    this.theta = theta;
    this.y = y;
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(other) {
    this.radius = other.radius;
    this.theta = other.theta;
    this.y = other.y;
    return this;
  }

  setFromVector3(v) {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  }

  setFromCartesianCoords(x, y, z) {
    this.radius = Math.sqrt(x * x + z * z);
    this.theta = Math.atan2(x, z);
    this.y = y;
    return this;
  }
}

export { Cylindrical };
