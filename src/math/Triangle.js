/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Triangle.js
 * Geometric triangle for spatial surface computation and picking.
 */

import { Vector3 } from './Vector3.js';

class Triangle {
  constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  set(a, b, c) {
    this.a.copy(a);
    this.b.copy(b);
    this.c.copy(c);
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(triangle) {
    this.a.copy(triangle.a);
    this.b.copy(triangle.b);
    this.c.copy(triangle.c);
    return this;
  }

  getArea() {
    _v0.subVectors(this.c, this.b);
    _v1.subVectors(this.a, this.b);
    return _v0.cross(_v1).length() * 0.5;
  }

  getMidpoint(target) {
    return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }

  getNormal(target) {
    _v0.subVectors(this.c, this.b);
    _v1.subVectors(this.a, this.b);
    _v0.cross(_v1);

    const lengthSq = _v0.lengthSq();
    if (lengthSq > 0) {
      return target.copy(_v0).multiplyScalar(1 / Math.sqrt(lengthSq));
    }
    return target.set(0, 0, 0);
  }
}

const _v0 = new Vector3();
const _v1 = new Vector3();

export { Triangle };
