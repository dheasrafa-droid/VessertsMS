/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FocusedSignalEcho.js
 * Conical spotlight echo projection for focused signals.
 * Parallels Three.js SpotLightShadow.
 */

import { SignalEcho } from './SignalEcho.js';
import { PerspectiveLens } from '../lenses/PerspectiveLens.js';
import { MathUtils } from '../math/MathUtils.js';

class FocusedSignalEcho extends SignalEcho {
  constructor() {
    super(new PerspectiveLens(50, 1, 0.5, 500));

    this.isFocusedSignalEcho = true;
    this.focus = 1;
  }

  updateMatrices(signal) {
    const lens = this.lens;
    const fov = MathUtils.RAD2DEG * 2 * signal.angle * this.focus;
    const aspect = this.mapSize.x / this.mapSize.y;
    const far = signal.distance || lens.far;

    if (fov !== lens.fov || aspect !== lens.aspect || far !== lens.far) {
      lens.fov = fov;
      lens.aspect = aspect;
      lens.far = far;
      lens.updateProjectionMatrix();
    }

    super.updateMatrices ? super.updateMatrices(signal) : null;
  }
}

export { FocusedSignalEcho };
