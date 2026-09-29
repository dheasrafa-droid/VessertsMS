/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CanvasMedia.js
 * Media sourced dynamically from an HTMLCanvasElement.
 * Parallels Three.js CanvasTexture.
 */

import { Media } from './Media.js';

class CanvasMedia extends Media {
  constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

    this.isCanvasMedia = true;
    this.needsUpdate = true;
  }
}

export { CanvasMedia };
