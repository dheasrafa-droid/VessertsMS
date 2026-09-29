/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - GridHelper.js
 * Visual 2D coordinate grid debug helper.
 * Parallels Three.js GridHelper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Color } from '../math/Color.js';

class GridHelper extends RowSegments {
  constructor(size = 10, divisions = 10, color1 = 0x444444, color2 = 0x888888) {
    color1 = new Color(color1);
    color2 = new Color(color2);

    const center = divisions / 2;
    const step = size / divisions;
    const halfSize = size / 2;

    const vertices = [];
    const colors = [];

    for (let i = 0, k = -halfSize; i <= divisions; i++, k += step) {
      vertices.push(-halfSize, 0, k, halfSize, 0, k);
      vertices.push(k, 0, -halfSize, k, 0, halfSize);

      const color = i === center ? color1 : color2;
      color.toArray(colors, colors.length);
      color.toArray(colors, colors.length);
      color.toArray(colors, colors.length);
      color.toArray(colors, colors.length);
    }

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    layout.setAttribute('color', new LayoutAttribute(new Float32Array(colors), 3));

    const skin = new RowBasicSkin({ vertexColors: true, toneMapped: false });

    super(layout, skin);

    this.type = 'GridHelper';
  }
}

export { GridHelper };
