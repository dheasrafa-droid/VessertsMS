/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Row.js
 * Continuous 1D row node representing thread chains, dividers, and connections.
 * Parallels Three.js Line.
 */

import { Node } from '../core/Node.js';

class Row extends Node {
  constructor(layout, skin) {
    super();

    this.isRow = true;
    this.type = 'Row';

    this.layout = layout !== undefined ? layout : null;
    this.skin = skin !== undefined ? skin : null;
  }
}

export { Row };
