/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - VideoMedia.js
 * Streaming HTML5 video media texture.
 * Parallels Three.js VideoTexture.
 */

import { Media } from './Media.js';

class VideoMedia extends Media {
  constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

    this.isVideoMedia = true;
    this.generateMipmaps = false;

    const scope = this;
    function updateVideo() {
      scope.needsUpdate = true;
      video.requestVideoFrameCallback(updateVideo);
    }

    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(updateVideo);
    }
  }

  clone() {
    return new this.constructor(this.image).copy(this);
  }

  update() {
    const video = this.image;
    const hasVideoFrameCallback = 'requestVideoFrameCallback' in video;

    if (hasVideoFrameCallback === false && video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
}

export { VideoMedia };
