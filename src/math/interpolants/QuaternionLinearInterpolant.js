/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - QuaternionLinearInterpolant.js
 * Spherical linear interpolation (slerp) for orientation tracks.
 */

import { Interpolant } from '../Interpolant.js';
import { Quaternion } from '../Quaternion.js';

class QuaternionLinearInterpolant extends Interpolant {
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = 4;

    const offset1 = i1 * stride;
    const offset0 = offset1 - stride;

    const alpha = (t - t0) / (t1 - t0);

    _q0.fromArray(values, offset0);
    _q1.fromArray(values, offset1);

    _q0.slerp(_q1, alpha);
    _q0.toArray(result, 0);

    return result;
  }
}

const _q0 = new Quaternion();
const _q1 = new Quaternion();

export { QuaternionLinearInterpolant };
