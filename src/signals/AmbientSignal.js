/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AmbientSignal.js
 * Universal ambient social velocity and platform-wide baseline priority.
 * Parallels Three.js AmbientLight.
 */

import { Signal } from './Signal.js';

class AmbientSignal extends Signal {
  constructor(color, intensity) {
    super(color, intensity);

    this.isAmbientSignal = true;
    this.type = 'AmbientSignal';
  }
}

export { AmbientSignal };
