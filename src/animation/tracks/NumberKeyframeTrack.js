/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - NumberKeyframeTrack.js
 * Keyframe track for numeric scalar properties (opacity, signal weight, order, etc.).
 */

import { KeyframeTrack } from '../KeyframeTrack.js';

class NumberKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}

NumberKeyframeTrack.prototype.ValueTypeName = 'number';

export { NumberKeyframeTrack };
