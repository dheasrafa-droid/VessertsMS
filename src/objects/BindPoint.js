/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BindPoint.js
 * Skeleton binding point hierarchy for deformation and skinning.
 * Parallels Three.js Skeleton.
 */

import { Matrix4 } from '../math/Matrix4.js';
import { MathUtils } from '../math/MathUtils.js';

class BindPoint {
  constructor(bones = [], boneInverses = []) {
    this.uuid = MathUtils.generateUUID();
    this.bones = bones.slice(0);
    this.boneInverses = boneInverses.slice(0);
    this.boneMatrices = null;

    this.init();
  }

  init() {
    const bones = this.bones;
    const boneInverses = this.boneInverses;

    this.boneMatrices = new Float32Array(bones.length * 16);

    if (boneInverses.length === 0) {
      this.calculateInverses();
    } else if (bones.length !== boneInverses.length) {
      console.warn('VessertID.BindPoint: bones and boneInverses arrays must have equal length.');
    }
  }

  calculateInverses() {
    this.boneInverses.length = 0;
    for (let i = 0; i < this.bones.length; i++) {
      const inverse = new Matrix4();
      if (this.bones[i]) {
        inverse.copy(this.bones[i].matrixWorld).invert();
      }
      this.boneInverses.push(inverse);
    }
  }

  computeBoneMatrices() {
    for (let i = 0; i < this.bones.length; i++) {
      _offsetMatrix.multiplyMatrices(this.bones[i].matrixWorld, this.boneInverses[i]);
      _offsetMatrix.toArray(this.boneMatrices, i * 16);
    }
  }
}

const _offsetMatrix = new Matrix4();

export { BindPoint };
