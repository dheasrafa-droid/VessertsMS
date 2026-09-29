/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - DataMedia.js
 * Media constructed from raw typed array bytes/floats.
 * Parallels Three.js DataTexture.
 */

import { Media } from './Media.js';
import { NearestFilter } from '../constants.js';

class DataMedia extends Media {
  constructor(data = null, width = 1, height = 1, format, type, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy) {
    super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

    this.isDataMedia = true;
    this.image = { data: data, width: width, height: height };
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.needsUpdate = true;
  }
}

export { DataMedia };
