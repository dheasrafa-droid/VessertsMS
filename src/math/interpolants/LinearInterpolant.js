/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LinearInterpolant.js
 * Linear interpolation between keyframes.
 */

import { Interpolant } from '../Interpolant.js';

class LinearInterpolant extends Interpolant {
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;

    const offset1 = i1 * stride;
    const offset0 = offset1 - stride;

    const weight1 = (t - t0) / (t1 - t0);
    const weight0 = 1 - weight1;

    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
    }

    return result;
  }
}

export { LinearInterpolant };
