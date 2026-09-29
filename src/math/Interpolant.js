/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Interpolant.js
 * Abstract base class for time-series and parameter curve interpolation.
 */

class Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    this.parameterPositions = parameterPositions;
    this._cachedIndex = 0;

    this.resultBuffer = resultBuffer !== undefined ?
      resultBuffer : new sampleValues.constructor(sampleSize);
    this.sampleValues = sampleValues;
    this.valueSize = sampleSize;
  }

  evaluate(t) {
    const pp = this.parameterPositions;
    let i1 = this._cachedIndex;
    let t1 = pp[i1];
    let t0 = pp[i1 - 1];

    validate_interval: {
      seek: {
        let right;
        linear_scan: {
          // Linear scan around cached interval
          if (t < t1) {
            if (t0 === undefined) {
              return this.beforeStart_(0, t, t1);
            }
            if (t >= t0) {
              break validate_interval;
            }
            right = i1;
            break linear_scan;
          }

          if (t1 === undefined) {
            return this.afterEnd_(pp.length - 1, t, pp[pp.length - 1]);
          }

          right = i1 + 1;
        }

        // Interval search
        while (right < pp.length && pp[right] <= t) right++;
        i1 = right;
        this._cachedIndex = i1;
        t1 = pp[i1];
        t0 = pp[i1 - 1];
      }
    }

    return this.interpolate_(i1, t0, t, t1);
  }

  interpolate_(i1, t0, t, t1) {
    throw new Error('call to abstract method');
  }

  beforeStart_(i0, t, t0) {
    return this.copySampleValue_(i0);
  }

  afterEnd_(iN, t, tN) {
    return this.copySampleValue_(iN);
  }

  copySampleValue_(index) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const offset = index * stride;

    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset + i];
    }

    return result;
  }
}

export { Interpolant };
