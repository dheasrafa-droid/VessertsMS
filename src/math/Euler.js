/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Euler.js
 * Euler angles representation.
 */

import { Quaternion } from './Quaternion.js';
import { MathUtils } from './MathUtils.js';

class Euler {
  constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER) {
    Euler.prototype.isEuler = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }

  get z() {
    return this._z;
  }

  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }

  get order() {
    return this._order;
  }

  set order(value) {
    this._order = value;
    this._onChangeCallback();
  }

  set(x, y, z, order = this._order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
    this._onChangeCallback();
    return this;
  }

  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }

  copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this._onChangeCallback();
    return this;
  }

  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }

  _onChangeCallback() {}
}

Euler.DEFAULT_ORDER = 'XYZ';

export { Euler };
