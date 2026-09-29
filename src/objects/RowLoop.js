/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RowLoop.js
 * Closed loop lines connecting social node networks.
 * Parallels Three.js LineLoop.
 */

import { Row } from './Row.js';

class RowLoop extends Row {
  constructor(layout, skin) {
    super(layout, skin);

    this.isRowLoop = true;
    this.type = 'RowLoop';
  }
}

export { RowLoop };
