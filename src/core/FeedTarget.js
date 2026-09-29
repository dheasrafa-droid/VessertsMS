/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FeedTarget.js
 * Offscreen rendering destination for capturing snapshots, sheet frames, and post-processing feeds.
 * Parallels Three.js WebGLRenderTarget.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { Vector4 } from '../math/Vector4.js';
import { LinearFilter, RGBAFormat } from '../constants.js';

class FeedTarget extends EventDispatcher {
  constructor(width = 1, height = 1, options = {}) {
    super();

    this.isFeedTarget = true;
    this.width = width;
    this.height = height;
    this.depth = 1;

    this.scissor = new Vector4(0, 0, width, height);
    this.scissorTest = false;

    this.viewport = new Vector4(0, 0, width, height);

    this.options = {
      mapping: options.mapping,
      wrapS: options.wrapS,
      wrapT: options.wrapT,
      magFilter: options.magFilter !== undefined ? options.magFilter : LinearFilter,
      minFilter: options.minFilter !== undefined ? options.minFilter : LinearFilter,
      format: options.format !== undefined ? options.format : RGBAFormat,
      type: options.type,
      anisotropy: options.anisotropy,
      encoding: options.encoding,
      generateMipmaps: options.generateMipmaps !== undefined ? options.generateMipmaps : false,
      minLOD: options.minLOD,
      maxLOD: options.maxLOD,
      samples: options.samples !== undefined ? options.samples : 0,
      count: options.count !== undefined ? options.count : 1
    };

    this.layeringBuffer = options.layeringBuffer !== undefined ? options.layeringBuffer : true;
    this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
  }

  setSize(width, height, depth = 1) {
    if (this.width !== width || this.height !== height || this.depth !== depth) {
      this.width = width;
      this.height = height;
      this.depth = depth;

      this.viewport.set(0, 0, width, height);
      this.scissor.set(0, 0, width, height);

      this.dispose();
    }
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(source) {
    this.width = source.width;
    this.height = source.height;
    this.depth = source.depth;
    this.viewport.copy(source.viewport);
    this.scissor.copy(source.scissor);
    this.scissorTest = source.scissorTest;
    this.layeringBuffer = source.layeringBuffer;
    this.stencilBuffer = source.stencilBuffer;
    return this;
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}

export { FeedTarget };
