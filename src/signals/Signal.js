/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Signal.js
 * Base class for all priority and social energy sources in the graph.
 * Parallels Three.js Light.
 */

import { Node } from '../core/Node.js';
import { Color } from '../math/Color.js';

class Signal extends Node {
  constructor(color, intensity = 1) {
    super();

    this.isSignal = true;
    this.type = 'Signal';

    this.color = new Color(color);
    this.intensity = intensity;
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.color.copy(source.color);
    this.intensity = source.intensity;

    return this;
  }

  dispose() {
    // Override in subclasses if resources exist
  }
}

export { Signal };
