/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationUtils.js
 * Utility methods for animation clip manipulation and keyframe processing.
 */

export const AnimationUtils = {
  arraySlice: function (array, from, to) {
    if (AnimationUtils.isTypedArray(array)) {
      return new array.constructor(array.subarray(from, to));
    }
    return array.slice(from, to);
  },

  convertArray: function (array, type, clone) {
    if (!array || (!clone && array.constructor === type)) return array;
    if (typeof type.BYTES_PER_ELEMENT === 'number') {
      return new type(array);
    }
    return Array.prototype.slice.call(array);
  },

  isTypedArray: function (object) {
    return ArrayBuffer.isView(object) && !(object instanceof DataView);
  },

  getKeyframeOrder: function (times) {
    function compareTime(i, j) {
      return times[i] - times[j];
    }
    const n = times.length;
    const result = new Array(n);
    for (let i = 0; i !== n; ++i) result[i] = i;
    result.sort(compareTime);
    return result;
  },

  sortedArray: function (values, stride, order) {
    const nValues = values.length;
    const result = new values.constructor(nValues);

    for (let i = 0, dstOffset = 0; dstOffset !== nValues; ++i) {
      const srcOffset = order[i] * stride;
      for (let j = 0; j !== stride; ++j) {
        result[dstOffset++] = values[srcOffset + j];
      }
    }

    return result;
  }
};
