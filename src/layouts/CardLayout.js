/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardLayout.js
 * Dedicated card layout geometry with rounded corners and slot boundaries.
 */

import { PlaneLayout } from './PlaneLayout.js';

class CardLayout extends PlaneLayout {
  constructor(width = 400, height = 240, widthSegments = 1, heightSegments = 1) {
    super(width, height, widthSegments, heightSegments);

    this.type = 'CardLayout';
    this.width = width;
    this.height = height;
  }
}

export { CardLayout };
