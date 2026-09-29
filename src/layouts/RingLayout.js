/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RingLayout.js
 * 2D ring / annulus planar layout.
 * Parallels Three.js RingGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

class RingLayout extends Layout {
  constructor(innerRadius = 0.5, outerRadius = 1, thetaSegments = 32, phiSegments = 1, thetaStart = 0, thetaLength = Math.PI * 2) {
    super();

    this.type = 'RingLayout';

    thetaSegments = Math.max(3, Math.floor(thetaSegments));
    phiSegments = Math.max(1, Math.floor(phiSegments));

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    let radius = innerRadius;
    const radiusStep = (outerRadius - innerRadius) / phiSegments;
    const vertex = new Vector3();
    const uv = new Vector2();

    for (let j = 0; j <= phiSegments; j++) {
      for (let i = 0; i <= thetaSegments; i++) {
        const segment = thetaStart + (i / thetaSegments) * thetaLength;

        vertex.x = radius * Math.cos(segment);
        vertex.y = radius * Math.sin(segment);

        vertices.push(vertex.x, vertex.y, 0);
        normals.push(0, 0, 1);

        uv.x = (vertex.x / outerRadius + 1) / 2;
        uv.y = (vertex.y / outerRadius + 1) / 2;
        uvs.push(uv.x, uv.y);
      }

      radius += radiusStep;
    }

    for (let j = 0; j < phiSegments; j++) {
      const thetaSegmentLevel = j * (thetaSegments + 1);

      for (let i = 0; i < thetaSegments; i++) {
        const segment = i + thetaSegmentLevel;

        const a = segment;
        const b = segment + thetaSegments + 1;
        const c = segment + thetaSegments + 2;
        const d = segment + 1;

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

export { RingLayout };
