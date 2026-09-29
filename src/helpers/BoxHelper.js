/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BoxHelper.js
 * Wireframe bounding box helper for nodes and cards.
 * Parallels Three.js BoxHelper.
 */

import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Box3 } from '../math/Box3.js';

const _box = new Box3();

class BoxHelper extends RowSegments {
  constructor(object, color = 0xffff00) {
    const indices = new Uint16Array([
      0, 1, 1, 2, 2, 3, 3, 0,
      4, 5, 5, 6, 6, 7, 7, 4,
      0, 4, 1, 5, 2, 6, 3, 7
    ]);

    const positions = new Float32Array(8 * 3);

    const layout = new Layout();
    layout.setIndex(new LayoutAttribute(indices, 1));
    layout.setAttribute('position', new LayoutAttribute(positions, 3));

    super(layout, new RowBasicSkin({ color: color, toneMapped: false }));

    this.object = object;
    this.type = 'BoxHelper';

    this.matrixAutoUpdate = false;
    this.update();
  }

  update() {
    if (this.object !== undefined) {
      _box.setFromObject ? _box.setFromObject(this.object) : null;
    }

    if (_box.isEmpty()) return;

    const min = _box.min;
    const max = _box.max;

    const position = this.layout.attributes.position;
    const array = position.array;

    array[0] = max.x; array[1] = max.y; array[2] = max.z;
    array[3] = min.x; array[4] = max.y; array[5] = max.z;
    array[6] = min.x; array[7] = min.y; array[8] = max.z;
    array[9] = max.x; array[10] = min.y; array[11] = max.z;
    array[12] = max.x; array[13] = max.y; array[14] = min.z;
    array[15] = min.x; array[16] = max.y; array[17] = min.z;
    array[18] = min.x; array[19] = min.y; array[20] = min.z;
    array[21] = max.x; array[22] = min.y; array[23] = min.z;

    position.needsUpdate = true;
    this.layout.computeBoundingSphere();
  }
}

export { BoxHelper };
