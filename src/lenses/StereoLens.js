/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - StereoLens.js
 * Dual stereoscopic lens pair for spatial/VR interfaces.
 * Parallels Three.js StereoCamera.
 */

import { PerspectiveLens } from './PerspectiveLens.js';

class StereoLens {
  constructor() {
    this.type = 'StereoLens';

    this.aspect = 1;
    this.eyeSep = 0.064;

    this.lensL = new PerspectiveLens();
    this.lensL.layers.enable(1);
    this.lensL.matrixAutoUpdate = false;

    this.lensR = new PerspectiveLens();
    this.lensR.layers.enable(2);
    this.lensR.matrixAutoUpdate = false;
  }

  update(lens) {
    this.lensL.fov = lens.fov;
    this.lensR.fov = lens.fov;

    this.lensL.near = lens.near;
    this.lensR.near = lens.near;

    this.lensL.far = lens.far;
    this.lensR.far = lens.far;

    this.lensL.updateProjectionMatrix();
    this.lensR.updateProjectionMatrix();
  }
}

export { StereoLens };
