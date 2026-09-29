/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - StringKeyframeTrack.js
 * Keyframe track for string values (labels, classnames, URLs).
 */

import { InterpolateDiscrete } from '../../constants.js';
import { KeyframeTrack } from '../KeyframeTrack.js';

class StringKeyframeTrack extends KeyframeTrack {
  constructor(name, times, values) {
    super(name, times, values, InterpolateDiscrete);
  }
}

StringKeyframeTrack.prototype.ValueTypeName = 'string';
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = undefined;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;

export { StringKeyframeTrack };
