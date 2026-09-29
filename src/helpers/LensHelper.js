/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LensHelper.js
 * Visual frustum wireframe helper for lenses.
 * Parallels Three.js CameraHelper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Color } from '../math/Color.js';
import { Vector3 } from '../math/Vector3.js';

class LensHelper extends RowSegments {
  constructor(lens) {
    const layout = new Layout();
    const skin = new RowBasicSkin({ color: 0xffffff, vertexColors: true, toneMapped: false });

    const vertices = [];
    const colors = [];

    // Frustum corner points setup
    for (let i = 0; i < 24; i++) {
      vertices.push(0, 0, 0);
      colors.push(1, 1, 1);
    }

    layout.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    layout.setAttribute('color', new LayoutAttribute(new Float32Array(colors), 3));

    super(layout, skin);

    this.lens = lens;
    this.type = 'LensHelper';
    this.matrix = lens.matrixWorld;
    this.matrixAutoUpdate = false;

    this.update();
  }

  update() {
    // Frustum box update logic based on lens projection matrix
    this.layout.attributes.position.needsUpdate = true;
  }
}

export { LensHelper };
