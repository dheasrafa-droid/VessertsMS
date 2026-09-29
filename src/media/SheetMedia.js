/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SheetMedia.js
 * Multi-image sheet media asset (carousel collections, cubemaps, multi-side cards).
 * Parallels Three.js CubeTexture.
 */

import { Media } from './Media.js';

class SheetMedia extends Media {
  constructor(images = [], mapping = 301, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

    this.isSheetMedia = true;
    this.flipY = false;
  }

  get images() {
    return this.image;
  }

  set images(value) {
    this.image = value;
  }
}

export { SheetMedia };
