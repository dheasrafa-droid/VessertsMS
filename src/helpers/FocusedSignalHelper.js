/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FocusedSignalHelper.js
 * Cone wireframe helper displaying spotlight focus angle and range.
 * Parallels Three.js SpotLightHelper.
 */

import { Node } from '../core/Node.js';
import { RowSegments } from '../objects/RowSegments.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class FocusedSignalHelper extends Node {
  constructor(signal, color) {
    super();

    this.signal = signal;
    this.color = color;
    this.type = 'FocusedSignalHelper';

    const positions = [
      0, 0, 0, 0, 0, 1,
      0, 0, 0, 1, 0, 1,
      0, 0, 0, -1, 0, 1,
      0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, -1, 1
    ];

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array(positions), 3));

    const skin = new RowBasicSkin({ fog: false, toneMapped: false });
    this.cone = new RowSegments(layout, skin);
    this.add(this.cone);

    this.update();
  }

  update() {
    this.cone.lookAt(this.signal.target.position);
  }
}

export { FocusedSignalHelper };
