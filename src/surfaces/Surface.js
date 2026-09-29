/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Surface.js
 * Root container for social graph nodes, cards, clusters, and signals.
 * Parallels Three.js Scene.
 */

import { Node } from '../core/Node.js';

class Surface extends Node {
  constructor() {
    super();

    this.isSurface = true;
    this.type = 'Surface';

    this.background = null;
    this.environment = null;
    this.ambient = null; // Parallels Fog

    this.backgroundNode = null;
    this.environmentNode = null;
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    if (source.background !== null) this.background = source.background.clone();
    if (source.environment !== null) this.environment = source.environment.clone();
    if (source.ambient !== null) this.ambient = source.ambient.clone();

    return this;
  }
}

export { Surface };
