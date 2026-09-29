/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - EchoSkin.js
 * Visual skin for receiving shadow echoes, ambient occlusions, and elevation blurs.
 * Parallels Three.js ShadowMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class EchoSkin extends Skin {
  constructor(parameters) {
    super();

    this.isEchoSkin = true;
    this.type = 'EchoSkin';

    this.color = new Color(0x000000);
    this.transparent = true;

    this.setValues(parameters);
  }
}

export { EchoSkin };
