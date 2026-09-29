/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AxesHelper.js
 * Visual 3-axis debug helper (X = Red, Y = Green, Z = Blue).
 * Parallels Three.js AxesHelper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class AxesHelper extends RowSegments {
  constructor(size = 1) {
    const vertices = [
      0, 0, 0,  size, 0, 0,
      0, 0, 0,  0, size, 0,
      0, 0, 0,  0, 0, size
    ];

    const colors = [
      1, 0, 0,  1, 0.6, 0,
      0, 1, 0,  0.6, 1, 0,
      0, 0, 1,  0, 0.6, 1
    ];

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    layout.setAttribute('color', new LayoutAttribute(new Float32Array(colors), 3));

    const skin = new RowBasicSkin({ vertexColors: true, toneMapped: false });

    super(layout, skin);

    this.type = 'AxesHelper';
  }
}

export { AxesHelper };
