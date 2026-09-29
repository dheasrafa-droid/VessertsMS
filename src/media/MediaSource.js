/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - MediaSource.js
 * Source holder for media images and video streams with revision tracking.
 * Parallels Three.js Source.
 */

import { MathUtils } from '../math/MathUtils.js';

let _sourceId = 0;

class MediaSource {
  constructor(data = null) {
    this.isMediaSource = true;
    this.id = _sourceId++;
    this.uuid = MathUtils.generateUUID();
    this.data = data;
    this.version = 0;
  }

  set needsUpdate(value) {
    if (value === true) this.version++;
  }
}

export { MediaSource };
