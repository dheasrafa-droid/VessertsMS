/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ColorKeyframeTrack.js
 * Keyframe track for animated color values.
 */

import { KeyframeTrack } from '../KeyframeTrack.js';

class ColorKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}

ColorKeyframeTrack.prototype.ValueTypeName = 'color';

export { ColorKeyframeTrack };
