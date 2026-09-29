/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RankedSignalEcho.js
 * Echo projection for directional ranked signals.
 * Parallels Three.js DirectionalLightShadow.
 */

import { SignalEcho } from './SignalEcho.js';
import { OrthographicLens } from '../lenses/OrthographicLens.js';

class RankedSignalEcho extends SignalEcho {
  constructor() {
    super(new OrthographicLens(-5, 5, 5, -5, 0.5, 500));

    this.isRankedSignalEcho = true;
  }
}

export { RankedSignalEcho };
