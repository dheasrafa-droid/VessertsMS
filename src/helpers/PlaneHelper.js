/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PlaneHelper.js
 * Visual wireframe helper for infinite 3D planes.
 * Parallels Three.js PlaneHelper.
 */

import { Row } from '../objects/Row.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class PlaneHelper extends Row {
  constructor(plane, size = 1, hex = 0xffff00) {
    const color = hex;

    const positions = [
      1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
      -1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0
    ];

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(positions), 3));

    super(layout, new RowBasicSkin({ color: color, toneMapped: false }));

    this.type = 'PlaneHelper';
    this.plane = plane;
    this.size = size;

    this.matrixAutoUpdate = false;
    this.updateMatrixWorld();
  }

  updateMatrixWorld(force) {
    const scale = -this.plane.constant;
    if (Math.abs(scale) < 1e-8) {
      this.position.set(0, 0, 0);
    } else {
      this.position.copy(this.plane.normal).multiplyScalar(scale);
    }

    this.lookAt(_v1.copy(this.position).sub(this.plane.normal));
    this.scale.set(this.size, this.size, 1);

    super.updateMatrixWorld(force);
  }
}

const _v1 = { x: 0, y: 0, z: 0, copy: function (v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }, sub: function (v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; } };

export { PlaneHelper };
