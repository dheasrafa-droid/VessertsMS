/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CylinderLayout.js
 * 3D cylindrical column layout.
 * Parallels Three.js CylinderGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class CylinderLayout extends Layout {
  constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 32, heightSegments = 1) {
    super();

    this.type = 'CylinderLayout';

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // Cylindrical vertex generation
    const halfHeight = height / 2;

    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments;
      const radius = v * (radiusBottom - radiusTop) + radiusTop;
      const posY = -v * height + halfHeight;

      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;

        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        vertices.push(radius * sinTheta, posY, radius * cosTheta);
        normals.push(sinTheta, 0, cosTheta);
        uvs.push(u, 1 - v);
      }
    }

    for (let y = 0; y < heightSegments; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const a = y * (radialSegments + 1) + x;
        const b = (y + 1) * (radialSegments + 1) + x;
        const c = (y + 1) * (radialSegments + 1) + (x + 1);
        const d = y * (radialSegments + 1) + (x + 1);

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

export { CylinderLayout };
