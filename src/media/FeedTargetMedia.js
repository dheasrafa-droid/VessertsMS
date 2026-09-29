/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FeedTargetMedia.js
 * Texture directly referencing the output buffer of a FeedTarget.
 * Parallels Three.js FramebufferTexture.
 */

import { Media } from './Media.js';
import { NearestFilter } from '../constants.js';

class FeedTargetMedia extends Media {
  constructor(width, height) {
    super(null);

    this.isFeedTargetMedia = true;
    this.format = 1023; // RGBAFormat
    this.magFilter = NearestFilter;
    this.minFilter = NearestFilter;
    this.generateMipmaps = false;
    this.needsUpdate = true;
  }
}

export { FeedTargetMedia };
