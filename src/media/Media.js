/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Media.js
 * Base class for media assets (images, video textures, audio waveforms, vector maps).
 * Parallels Three.js Texture.
 */

import { EventDispatcher } from '../core/EventDispatcher.js';
import { MathUtils } from '../math/MathUtils.js';
import {
  ClampToEdgeWrapping,
  LinearFilter,
  LinearMipmapLinearFilter,
  RGBAFormat,
  UnsignedByteType
} from '../constants.js';

let _mediaId = 0;

class Media extends EventDispatcher {
  constructor(image = Media.DEFAULT_IMAGE, mapping = Media.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = Media.DEFAULT_ANISOTROPY) {
    super();

    this.isMedia = true;
    this.id = _mediaId++;
    this.uuid = MathUtils.generateUUID();

    this.name = '';
    this.source = { data: image };

    this.mapping = mapping;

    this.wrapS = wrapS;
    this.wrapT = wrapT;

    this.magFilter = magFilter;
    this.minFilter = minFilter;

    this.anisotropy = anisotropy;

    this.format = format;
    this.type = type;

    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;

    this.version = 0;
  }

  get image() {
    return this.source.data;
  }

  set image(value) {
    this.source.data = value;
  }

  set needsUpdate(value) {
    if (value === true) {
      this.version++;
      this.source.version++;
    }
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(source) {
    this.name = source.name;
    this.image = source.image;
    this.mapping = source.mapping;
    this.wrapS = source.wrapS;
    this.wrapT = source.wrapT;
    this.magFilter = source.magFilter;
    this.minFilter = source.minFilter;
    this.anisotropy = source.anisotropy;
    this.format = source.format;
    this.type = source.type;
    this.generateMipmaps = source.generateMipmaps;
    return this;
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}

Media.DEFAULT_IMAGE = null;
Media.DEFAULT_MAPPING = 300;
Media.DEFAULT_ANISOTROPY = 1;

export { Media };
