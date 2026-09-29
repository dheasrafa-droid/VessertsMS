/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RowSegments.js
 * Discontinuous segmented lines.
 * Parallels Three.js LineSegments.
 */

import { Row } from './Row.js';

class RowSegments extends Row {
  constructor(layout, skin) {
    super(layout, skin);

    this.isRowSegments = true;
    this.type = 'RowSegments';
  }
}

export { RowSegments };
