/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PointSignalEcho.js
 * Omnidirectional echo projection for point signals.
 * Parallels Three.js PointLightShadow.
 */

import { SignalEcho } from './SignalEcho.js';
import { PerspectiveLens } from '../lenses/PerspectiveLens.js';

class PointSignalEcho extends SignalEcho {
  constructor() {
    super(new PerspectiveLens(90, 1, 0.5, 500));

    this.isPointSignalEcho = true;
    this._frameExtents = [1, 1];
  }
}

export { PointSignalEcho };
