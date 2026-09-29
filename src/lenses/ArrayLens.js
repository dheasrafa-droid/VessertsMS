/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ArrayLens.js
 * Multi-viewport lens array (split-screen, grid layout feeds).
 * Parallels Three.js ArrayCamera.
 */

import { PerspectiveLens } from './PerspectiveLens.js';

class ArrayLens extends PerspectiveLens {
  constructor(array = []) {
    super();

    this.isArrayLens = true;
    this.lenses = array;
  }
}

export { ArrayLens };
