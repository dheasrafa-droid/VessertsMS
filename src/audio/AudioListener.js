/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AudioListener.js
 * Virtual listener / ear attached to the active Lens or user viewport.
 */

import { Node } from '../core/Node.js';
import { Vector3 } from '../math/Vector3.js';
import { Quaternion } from '../math/Quaternion.js';
import { AudioContext } from './AudioContext.js';

class AudioListener extends Node {
  constructor() {
    super();

    this.type = 'AudioListener';
    this.context = AudioContext.getContext();
    this.gain = this.context ? this.context.createGain() : null;

    if (this.gain && this.context) {
      this.gain.connect(this.context.destination);
    }

    this.timeDelta = 0;
  }

  getInput() {
    return this.gain;
  }

  getMasterVolume() {
    return this.gain ? this.gain.gain.value : 0;
  }

  setMasterVolume(value) {
    if (this.gain) {
      this.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    }
    return this;
  }

  updateMatrixWorld(force) {
    super.updateMatrixWorld(force);

    const listener = this.context ? this.context.listener : null;
    if (listener) {
      this.getWorldPosition(_position);
      this.getWorldQuaternion(_quaternion);

      _orientation.set(0, 0, -1).applyQuaternion(_quaternion);

      if (listener.positionX) {
        listener.positionX.setValueAtTime(_position.x, this.context.currentTime);
        listener.positionY.setValueAtTime(_position.y, this.context.currentTime);
        listener.positionZ.setValueAtTime(_position.z, this.context.currentTime);
        listener.forwardX.setValueAtTime(_orientation.x, this.context.currentTime);
        listener.forwardY.setValueAtTime(_orientation.y, this.context.currentTime);
        listener.forwardZ.setValueAtTime(_orientation.z, this.context.currentTime);
      }
    }
  }
}

const _position = new Vector3();
const _quaternion = new Quaternion();
const _orientation = new Vector3();

export { AudioListener };
