/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - VectorKeyframeTrack.js
 * Keyframe track for vector properties (position, scale).
 */

import { KeyframeTrack } from '../KeyframeTrack.js';

class VectorKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}

VectorKeyframeTrack.prototype.ValueTypeName = 'vector';

export { VectorKeyframeTrack };
