/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SignalHelper.js
 * Base visual indicator for abstract signals.
 */

import { Node } from '../core/Node.js';

class SignalHelper extends Node {
  constructor(signal, color) {
    super();

    this.signal = signal;
    this.color = color;
    this.type = 'SignalHelper';
  }

  update() {
    // Override in subclasses
  }

  dispose() {
    // Clean up helper geometry/materials
  }
}

export { SignalHelper };
