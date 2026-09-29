/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RankedSignalHelper.js
 * Visual vector arrow and plane grid indicating directional ranking signals.
 * Parallels Three.js DirectionalLightHelper.
 */

import { Node } from '../core/Node.js';
import { Row } from '../objects/Row.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { Vector3 } from '../math/Vector3.js';

class RankedSignalHelper extends Node {
  constructor(signal, size = 1, color) {
    super();

    this.signal = signal;
    this.color = color;
    this.type = 'RankedSignalHelper';

    const layout = new Layout();
    layout.setAttribute('position', new LayoutAttribute(new Float32Array([
      -size, size, 0,  size, size, 0,
      size, size, 0,   size, -size, 0,
      size, -size, 0,  -size, -size, 0,
      -size, -size, 0, -size, size, 0,
      0, 0, 0,         0, 0, 1
    ]), 3));

    const skin = new RowBasicSkin({ fog: false, toneMapped: false });
    this.lightPlane = new Row(layout, skin);
    this.add(this.lightPlane);

    this.update();
  }

  update() {
    this.lightPlane.lookAt(this.signal.target.position);
  }
}

export { RankedSignalHelper };
