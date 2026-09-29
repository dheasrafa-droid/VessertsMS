/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PlaneLayout.js
 * Flat planar layout with vertices, normals, and UV texture coordinates.
 * Parallels Three.js PlaneGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class PlaneLayout extends Layout {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super();

    this.type = 'PlaneLayout';

    const width_half = width / 2;
    const height_half = height / 2;

    const gridX = Math.floor(widthSegments);
    const gridY = Math.floor(heightSegments);

    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;

    const segment_width = width / gridX;
    const segment_height = height / gridY;

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segment_height - height_half;
      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segment_width - width_half;

        vertices.push(x, -y, 0);
        normals.push(0, 0, 1);
        uvs.push(ix / gridX, 1 - (iy / gridY));
      }
    }

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy;
        const b = ix + gridX1 * (iy + 1);
        const c = (ix + 1) + gridX1 * (iy + 1);
        const d = (ix + 1) + gridX1 * iy;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.setIndex(indices);
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    this.setAttribute('normal', new LayoutAttribute(new Float32Array(normals), 3));
    this.setAttribute('uv', new LayoutAttribute(new Float32Array(uvs), 2));
  }
}

export { PlaneLayout };
