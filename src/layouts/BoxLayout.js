/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BoxLayout.js
 * 3D cuboid box layout.
 * Parallels Three.js BoxGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class BoxLayout extends Layout {
  constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
    super();

    this.type = 'BoxLayout';

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    let numberOfVertices = 0;
    let groupStart = 0;

    function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
      const segmentWidth = width / gridX;
      const segmentHeight = height / gridY;

      const widthHalf = width / 2;
      const heightHalf = height / 2;
      const depthHalf = depth / 2;

      const gridX1 = gridX + 1;
      const gridY1 = gridY + 1;

      let vertexCounter = 0;
      let groupCount = 0;

      const vector = new Vector3();

      for (let iy = 0; iy < gridY1; iy++) {
        const y = iy * segmentHeight - heightHalf;
        for (let ix = 0; ix < gridX1; ix++) {
          const x = ix * segmentWidth - widthHalf;

          vector[u] = x * udir;
          vector[v] = y * vdir;
          vector[w] = depthHalf;

          vertices.push(vector.x, vector.y, vector.z);

          vector[u] = 0;
          vector[v] = 0;
          vector[w] = depth > 0 ? 1 : -1;

          normals.push(vector.x, vector.y, vector.z);
          uvs.push(ix / gridX, 1 - (iy / gridY));

          vertexCounter += 1;
        }
      }

      for (let iy = 0; iy < gridY; iy++) {
        for (let ix = 0; ix < gridX; ix++) {
          const a = numberOfVertices + ix + gridX1 * iy;
          const b = numberOfVertices + ix + gridX1 * (iy + 1);
          const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
          const d = numberOfVertices + (ix + 1) + gridX1 * iy;

          indices.push(a, b, d);
          indices.push(b, c, d);

          groupCount += 6;
        }
      }

      numberOfVertices += vertexCounter;
      groupStart += groupCount;
    }

    buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
    buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
    buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
    buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
    buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
    buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz

    this.setIndex(indices);
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
    this.setAttribute('normal', new LayoutAttribute(new Float32Array(normals), 3));
    this.setAttribute('uv', new LayoutAttribute(new Float32Array(uvs), 2));
  }
}

export { BoxLayout };
