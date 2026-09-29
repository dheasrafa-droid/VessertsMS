/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PositionalAudio.js
 * Spatial audio emitter with 3D positioning and panner node.
 */

import { Audio } from './Audio.js';
import { Vector3 } from '../math/Vector3.js';
import { Quaternion } from '../math/Quaternion.js';

class PositionalAudio extends Audio {
  constructor(listener) {
    super(listener);

    this.panner = this.context ? this.context.createPanner() : null;
    if (this.panner && this.gain) {
      this.panner.panningModel = 'HRTF';
      this.panner.connect(this.gain);
    }
  }

  getOutput() {
    return this.panner;
  }

  updateMatrixWorld(force) {
    super.updateMatrixWorld(force);

    if (this.panner) {
      this.getWorldPosition(_position);
      this.getWorldQuaternion(_quaternion);

      _orientation.set(0, 0, 1).applyQuaternion(_quaternion);

      if (this.panner.positionX) {
        this.panner.positionX.setValueAtTime(_position.x, this.context.currentTime);
        this.panner.positionY.setValueAtTime(_position.y, this.context.currentTime);
        this.panner.positionZ.setValueAtTime(_position.z, this.context.currentTime);
        this.panner.orientationX.setValueAtTime(_orientation.x, this.context.currentTime);
        this.panner.orientationY.setValueAtTime(_orientation.y, this.context.currentTime);
        this.panner.orientationZ.setValueAtTime(_orientation.z, this.context.currentTime);
      }
    }
  }
}

const _position = new Vector3();
const _quaternion = new Quaternion();
const _orientation = new Vector3();

export { PositionalAudio };
