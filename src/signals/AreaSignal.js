/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AreaSignal.js
 * Surface area signal emitted by rectangular sections, media embeds, and banner panels.
 * Parallels Three.js RectAreaLight.
 */

import { Signal } from './Signal.js';

class AreaSignal extends Signal {
  constructor(color, intensity = 1, width = 10, height = 10) {
    super(color, intensity);

    this.isAreaSignal = true;
    this.type = 'AreaSignal';

    this.width = width;
    this.height = height;
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.width = source.width;
    this.height = source.height;

    return this;
  }
}

export { AreaSignal };
