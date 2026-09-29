/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - HemisphereSignalHelper.js
 * Dual wireframe hemisphere helper showing upper and lower ambient signal colors.
 * Parallels Three.js HemisphereLightHelper.
 */

import { Node } from '../core/Node.js';
import { Card } from '../objects/Card.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';
import { OctahedronLayout } from '../layouts/OctahedronLayout.js';

class HemisphereSignalHelper extends Node {
  constructor(signal, size = 1, color) {
    super();

    this.signal = signal;
    this.color = color;
    this.type = 'HemisphereSignalHelper';

    const layout = new OctahedronLayout ? new OctahedronLayout(size) : null;
    const skin = new CardBasicSkin({ wireframe: true, fog: false, toneMapped: false });

    if (layout) {
      this.card = new Card(layout, skin);
      this.add(this.card);
    }

    this.update();
  }

  update() {
    if (this.card) {
      this.card.skin.color.copy(this.signal.color);
    }
  }
}

export { HemisphereSignalHelper };
