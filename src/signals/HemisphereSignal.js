/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - HemisphereSignal.js
 * Dual-gradient ambient signal positioned directly above the surface (sky/ground color gradient).
 * Parallels Three.js HemisphereLight.
 */

import { Signal } from './Signal.js';
import { Color } from '../math/Color.js';
import { Node } from '../core/Node.js';

class HemisphereSignal extends Signal {
  constructor(skyColor, groundColor, intensity) {
    super(skyColor, intensity);

    this.isHemisphereSignal = true;
    this.type = 'HemisphereSignal';

    this.position.copy(Node.DEFAULT_UP);
    this.updateMatrix();

    this.groundColor = new Color(groundColor);
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.groundColor.copy(source.groundColor);

    return this;
  }
}

export { HemisphereSignal };
