/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Matrix2.js
 * 2x2 mathematical transformation matrix.
 */

class Matrix2 {
  constructor(n11, n12, n21, n22) {
    this.elements = [
      1, 0,
      0, 1
    ];

    if (n11 !== undefined) {
      this.set(n11, n12, n21, n22);
    }
  }

  set(n11, n12, n21, n22) {
    const te = this.elements;
    te[0] = n11; te[2] = n12;
    te[1] = n21; te[3] = n22;
    return this;
  }

  identity() {
    this.set(1, 0, 0, 1);
    return this;
  }

  clone() {
    return new this.constructor().fromArray(this.elements);
  }

  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0]; te[1] = me[1];
    te[2] = me[2]; te[3] = me[3];
    return this;
  }

  fromArray(array, offset = 0) {
    for (let i = 0; i < 4; i++) {
      this.elements[i] = array[i + offset];
    }
    return this;
  }

  toArray(array = [], offset = 0) {
    const te = this.elements;
    for (let i = 0; i < 4; i++) {
      array[i + offset] = te[i];
    }
    return array;
  }
}

export { Matrix2 };
