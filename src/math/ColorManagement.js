/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ColorManagement.js
 * Universal color space conversions (Linear sRGB, sRGB, Display P3).
 */

import { SRGBColorSpace, LinearSRGBColorSpace } from '../constants.js';

export const ColorManagement = {
  enabled: true,

  _workingColorSpace: LinearSRGBColorSpace,

  get workingColorSpace() {
    return this._workingColorSpace;
  },

  set workingColorSpace(colorSpace) {
    this._workingColorSpace = colorSpace;
  },

  convert: function (color, sourceColorSpace, targetColorSpace) {
    if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
      return color;
    }

    if (sourceColorSpace === SRGBColorSpace && targetColorSpace === LinearSRGBColorSpace) {
      color.r = SRGBToLinear(color.r);
      color.g = SRGBToLinear(color.g);
      color.b = SRGBToLinear(color.b);
    } else if (sourceColorSpace === LinearSRGBColorSpace && targetColorSpace === SRGBColorSpace) {
      color.r = LinearToSRGB(color.r);
      color.g = LinearToSRGB(color.g);
      color.b = LinearToSRGB(color.b);
    }

    return color;
  },

  fromWorkingColorSpace: function (color, targetColorSpace) {
    return this.convert(color, this._workingColorSpace, targetColorSpace);
  },

  toWorkingColorSpace: function (color, sourceColorSpace) {
    return this.convert(color, sourceColorSpace, this._workingColorSpace);
  }
};

function SRGBToLinear(c) {
  return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}

function LinearToSRGB(c) {
  return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
