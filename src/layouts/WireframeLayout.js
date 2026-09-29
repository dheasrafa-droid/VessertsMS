/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - WireframeLayout.js
 * Wireframe geometry representation of a layout.
 * Parallels Three.js WireframeGeometry.
 */

import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class WireframeLayout extends Layout {
  constructor(layout) {
    super();

    this.type = 'WireframeLayout';

    if (layout) {
      const edgeData = [];
      const position = layout.attributes.position;

      if (position) {
        for (let i = 0; i < position.count; i += 3) {
          _v0.fromArray(position.array, i * 3);
          _v1.fromArray(position.array, (i + 1) * 3);
          _v2.fromArray(position.array, (i + 2) * 3);

          edgeData.push(_v0.x, _v0.y, _v0.z, _v1.x, _v1.y, _v1.z);
          edgeData.push(_v1.x, _v1.y, _v1.z, _v2.x, _v2.y, _v2.z);
          edgeData.push(_v2.x, _v2.y, _v2.z, _v0.x, _v0.y, _v0.z);
        }

        this.setAttribute('position', new LayoutAttribute(new Float32Array(edgeData), 3));
      }
    }
  }
}

const _v0 = new Vector3();
const _v1 = new Vector3();
const _v2 = new Vector3();

export { WireframeLayout };
