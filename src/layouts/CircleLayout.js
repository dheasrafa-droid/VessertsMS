/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CircleLayout.js
 * 2D circular planar layout.
 * Parallels Three.js CircleGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

class CircleLayout extends Layout {
  constructor(radius = 1, segments = 32, thetaStart = 0, thetaLength = Math.PI * 2) {
    super();

    this.type = 'CircleLayout';

    segments = Math.max(3, segments);

    const indices = [];
    const positions = [];
    const normals = [];
    const uvs = [];

    // Center vertex
    positions.push(0, 0, 0);
    normals.push(0, 0, 1);
    uvs.push(0.5, 0.5);

    for (let s = 0, i = 3; s <= segments; s++, i += 3) {
      const segment = thetaStart + (s / segments) * thetaLength;

      const x = radius * Math.cos(segment);
      const y = radius * Math.sin(segment);

      positions.push(x, y, 0);
      normals.push(0, 0, 1);
      uvs.push((x / radius + 1) / 2, (y / radius + 1) / 2);
    }

    for (let i = 1; i <= segments; i++) {
      indices.push(i, i + 1, 0);
    }

    this.setIndex(indices);
    this.setAttribute('position', new LayoutAttribute(new Float32Array(positions), 3));
    this.setAttribute('normal', new LayoutAttribute(new Float32Array(normals), 3));
    this.setAttribute('uv', new LayoutAttribute(new Float32Array(uvs), 2));
  }
}

export { CircleLayout };
