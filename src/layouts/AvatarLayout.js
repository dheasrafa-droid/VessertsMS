/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AvatarLayout.js
 * Circular avatar profile layout with standard profile picture aspect ratios.
 */

import { CircleLayout } from './CircleLayout.js';

class AvatarLayout extends CircleLayout {
  constructor(radius = 24, segments = 32) {
    super(radius, segments);

    this.type = 'AvatarLayout';
    this.radius = radius;
  }
}

export { AvatarLayout };
