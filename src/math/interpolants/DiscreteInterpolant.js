/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - DiscreteInterpolant.js
 * Step / discrete interpolation (holds previous value until next keyframe).
 */

import { Interpolant } from '../Interpolant.js';

class DiscreteInterpolant extends Interpolant {
  interpolate_(i1, t0, t, t1) {
    return this.copySampleValue_(i1 - 1);
  }
}

export { DiscreteInterpolant };
