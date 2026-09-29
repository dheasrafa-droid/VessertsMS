/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PointSignal.js
 * Concentrated point signal emitted by user engagement spikes and breakout interactions.
 * Parallels Three.js PointLight.
 */

import { Signal } from './Signal.js';

class PointSignal extends Signal {
  constructor(color, intensity, distance = 0, decay = 2) {
    super(color, intensity);

    this.isPointSignal = true;
    this.type = 'PointSignal';

    this.distance = distance;
    this.decay = decay;
    this.echo = null; // Parallels PointLightShadow
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.distance = source.distance;
    this.decay = source.decay;

    return this;
  }

  dispose() {
    if (this.echo !== null) this.echo.dispose();
  }
}

export { PointSignal };
