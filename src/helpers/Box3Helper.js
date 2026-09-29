/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Box3Helper.js
 * Wireframe box helper for Box3 instances.
 * Parallels Three.js Box3Helper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class Box3Helper extends RowSegments {
  constructor(box, color = 0xffff00) {
    const indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
    const positions = [
      1, 1, 1,  -1, 1, 1,  -1, -1, 1,  1, -1, 1,
      1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1
    ];

    const layout = new Layout();
    layout.setIndex(new LayoutAttribute(indices, 1));
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(positions), 3));

    super(layout, new RowBasicSkin({ color: color, toneMapped: false }));

    this.box = box;
    this.type = 'Box3Helper';
  }

  updateMatrixWorld(force) {
    const box = this.box;
    if (box.isEmpty()) return;

    box.getCenter(this.position);
    box.getSize(this.scale);
    this.scale.multiplyScalar(0.5);

    super.updateMatrixWorld(force);
  }
}

export { Box3Helper };
