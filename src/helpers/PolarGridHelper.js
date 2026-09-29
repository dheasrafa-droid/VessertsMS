/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PolarGridHelper.js
 * Concentric polar ring and radial axis grid helper.
 * Parallels Three.js PolarGridHelper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Color } from '../math/Color.js';

class PolarGridHelper extends RowSegments {
  constructor(radius = 10, sectors = 16, rings = 8, divisions = 64, color1 = 0x444444, color2 = 0x888888) {
    color1 = new Color(color1);
    color2 = new Color(color2);

    const vertices = [];
    const colors = [];

    // Radial lines
    for (let i = 0; i < sectors; i++) {
      const v = (i / sectors) * (Math.PI * 2);
      const x = Math.sin(v) * radius;
      const z = Math.cos(v) * radius;

      vertices.push(0, 0, 0, x, 0, z);
      const color = i & 1 ? color1 : color2;
      color.toArray(colors, colors.length);
      color.toArray(colors, colors.length);
    }

    // Rings
    for (let i = 0; i < rings; i++) {
      const color = i & 1 ? color1 : color2;
      const r = radius - (radius / rings) * i;

      for (let j = 0; j < divisions; j++) {
        let v = (j / divisions) * (Math.PI * 2);
        let x = Math.sin(v) * r;
        let z = Math.cos(v) * r;
        vertices.push(x, 0, z);
        color.toArray(colors, colors.length);

        v = ((j + 1) / divisions) * (Math.PI * 2);
        x = Math.sin(v) * r;
        z = Math.cos(v) * r;
        vertices.push(x, 0, z);
        color.toArray(colors, colors.length);
      }
    }

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    layout.setAttribute('color', new LayoutAttribute(new Float32Array(colors), 3));

    super(layout, new RowBasicSkin({ vertexColors: true, toneMapped: false }));

    this.type = 'PolarGridHelper';
  }
}

export { PolarGridHelper };
