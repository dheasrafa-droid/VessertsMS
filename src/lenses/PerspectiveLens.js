/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PerspectiveLens.js
 * Perspective projection lens with foreshortening depth.
 * Parallels Three.js PerspectiveCamera.
 */

import { Lens } from './Lens.js';
import { MathUtils } from '../math/MathUtils.js';

class PerspectiveLens extends Lens {
  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    super();

    this.isPerspectiveLens = true;
    this.type = 'PerspectiveLens';

    this.fov = fov;
    this.zoom = 1;

    this.near = near;
    this.far = far;
    this.focus = 10;

    this.aspect = aspect;
    this.view = null;

    this.updateProjectionMatrix();
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.fov = source.fov;
    this.zoom = source.zoom;
    this.near = source.near;
    this.far = source.far;
    this.focus = source.focus;
    this.aspect = source.aspect;
    this.view = source.view === null ? null : Object.assign({}, source.view);

    return this;
  }

  setFocalLength(focalLength) {
    const vExtentSlope = 0.5 * 24 / focalLength;
    this.fov = MathUtils.RAD2DEG * 2 * Math.atan(vExtentSlope);
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const near = this.near;
    let top = near * Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov) / this.zoom;
    let height = 2 * top;
    let width = this.aspect * height;
    let left = -0.5 * width;

    this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
}

export { PerspectiveLens };
