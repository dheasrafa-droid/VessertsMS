/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Binding.js
 * Data binding container for dynamic uniform values.
 * Parallels Three.js Uniform.
 */

class Binding {
  constructor(value) {
    this.value = value;
  }

  clone() {
    return new Binding(this.value && this.value.clone ? this.value.clone() : this.value);
  }
}

export { Binding };
