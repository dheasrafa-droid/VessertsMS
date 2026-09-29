/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SphereLayout.js
 * 3D spherical layout.
 * Parallels Three.js SphereGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class SphereLayout extends Layout {
  constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {
    super();

    this.type = 'SphereLayout';

    widthSegments = Math.max(3, Math.floor(widthSegments));
    heightSegments = Math.max(2, Math.floor(heightSegments));

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    const grid = [];
    const vertex = new Vector3();
    const normal = new Vector3();

    let index = 0;

    for (let iy = 0; iy <= heightSegments; iy++) {
      const verticesRow = [];
      const v = iy / heightSegments;

      for (let ix = 0; ix <= widthSegments; ix++) {
        const u = ix / widthSegments;

        vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
        vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
        vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

        vertices.push(vertex.x, vertex.y, vertex.z);

        normal.copy(vertex).normalize();
        normals.push(normal.x, normal.y, normal.z);

        uvs.push(u, 1 - v);
        verticesRow.push(index++);
      }

      grid.push(verticesRow);
    }

    for (let iy = 0; iy < heightSegments; iy++) {
      for (let ix = 0; ix < widthSegments; ix++) {
        const a = grid[iy][ix + 1];
        const b = grid[iy][ix];
        const c = grid[iy + 1][ix];
        const d = grid[iy + 1][ix + 1];

        if (iy !== 0) indices.push(a, b, d);
        if (iy !== heightSegments - 1) indices.push(b, c, d);
      }
    }

    this.setIndex(indices);
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    this.setAttribute('normal', new LayoutAttribute(new Float32Array(normals), 3));
    this.setAttribute('uv', new LayoutAttribute(new Float32Array(uvs), 2));
  }
}

export { SphereLayout };
