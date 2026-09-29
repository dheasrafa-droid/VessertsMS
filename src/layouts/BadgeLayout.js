/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BadgeLayout.js
 * Compact pill/badge layout geometry for status tags and reaction counts.
 */

import { PlaneLayout } from './PlaneLayout.js';

class BadgeLayout extends PlaneLayout {
  constructor(width = 80, height = 28) {
    super(width, height);

    this.type = 'BadgeLayout';
    this.width = width;
    this.height = height;
  }
}

export { BadgeLayout };
