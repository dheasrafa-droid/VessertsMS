/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - HTMLMedia.js
 * Media sourced directly from an HTMLElement (DOM rasterization).
 */

import { Media } from './Media.js';

class HTMLMedia extends Media {
  constructor(domElement) {
    super(domElement);

    this.isHTMLMedia = true;
    this.needsUpdate = true;
  }
}

export { HTMLMedia };
