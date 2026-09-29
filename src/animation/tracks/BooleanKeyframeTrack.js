/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BooleanKeyframeTrack.js
 * Keyframe track for boolean states (visible, active, highlighted).
 */

import { InterpolateDiscrete } from '../../constants.js';
import { KeyframeTrack } from '../KeyframeTrack.js';

class BooleanKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values) {
    super(name, times, values, InterpolateDiscrete);
  }
}

BooleanKeyframeTrack.prototype.ValueTypeName = 'bool';
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = undefined;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;

export { BooleanKeyframeTrack };
