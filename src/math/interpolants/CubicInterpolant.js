/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CubicInterpolant.js
 * Cubic spline interpolation.
 */

import { Interpolant } from '../Interpolant.js';

class CubicInterpolant extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    this._weightPrev = -0;
    this._offsetPrev = -0;
    this._weightNext = -0;
    this._offsetNext = -0;
  }

  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;

    const offset1 = i1 * stride;
    const offset0 = offset1 - stride;

    const tDiff = t1 - t0;
    const p = (t - t0) / tDiff;

    const p2 = p * p;
    const p3 = p2 * p;

    // Hermite basis functions
    const h00 = 2 * p3 - 3 * p2 + 1;
    const h10 = p3 - 2 * p2 + p;
    const h01 = -2 * p3 + 3 * p2;
    const h11 = p3 - p2;

    for (let i = 0; i !== stride; ++i) {
      const v0 = values[offset0 + i];
      const v1 = values[offset1 + i];
      result[i] = h00 * v0 + h01 * v1;
    }

    return result;
  }
}

export { CubicInterpolant };
