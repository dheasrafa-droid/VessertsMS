/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Dots.js
 * Particle-like node representing unread dot indicators, reaction sparks, and network points.
 * Parallels Three.js Points.
 */

import { Node } from '../core/Node.js';

class Dots extends Node {
  constructor(layout, skin) {
    super();

    this.isDots = true;
    this.type = 'Dots';

    this.layout = layout !== undefined ? layout : null;
    this.skin = skin !== undefined ? skin : null;
  }
}

export { Dots };
