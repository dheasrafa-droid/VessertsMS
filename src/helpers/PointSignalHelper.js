/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PointSignalHelper.js
 * Wireframe sphere debug indicator for point signals.
 * Parallels Three.js PointLightHelper.
 */

import { Card } from '../objects/Card.js';
import { SphereLayout } from '../layouts/SphereLayout.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';

class PointSignalHelper extends Card {
  constructor(signal, sphereSize = 1, color) {
    const layout = new SphereLayout(sphereSize, 4, 2);
    const skin = new CardBasicSkin({ wireframe: true, fog: false, toneMapped: false });

    super(layout, skin);

    this.signal = signal;
    this.color = color;
    this.type = 'PointSignalHelper';

    this.matrix = this.signal.matrixWorld;
    this.matrixAutoUpdate = false;

    this.update();
  }

  update() {
    if (this.color !== undefined) {
      this.skin.color.set(this.color);
    } else {
      this.skin.color.copy(this.signal.color);
    }
  }
}

export { PointSignalHelper };
