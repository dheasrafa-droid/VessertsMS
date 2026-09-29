/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - OctahedronLayout.js
 * 3D octahedron layout.
 * Parallels Three.js OctahedronGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class OctahedronLayout extends Layout {
  constructor(radius = 1) {
    super();

    this.type = 'OctahedronLayout';

    const vertices = [
      1, 0, 0,   -1, 0, 0,   0, 1, 0,
      0, -1, 0,  0, 0, 1,    0, 0, -1
    ];

    const indices = [
      0, 2, 4,  0, 4, 3,  0, 3, 5,  0, 5, 2,
      1, 2, 5,  1, 5, 3,  1, 3, 4,  1, 4, 2
    ];

    this.setIndex(indices);
    this.setAttribute('position', new LayoutAttribute(new Float32Array(vertices), 3));
  }
}

export { OctahedronLayout };
