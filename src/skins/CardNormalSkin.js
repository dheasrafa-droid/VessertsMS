/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardNormalSkin.js
 * Visualizes card surface normal vectors directly as RGB colors.
 * Parallels Three.js MeshNormalMaterial.
 */

import { Skin } from './Skin.js';

class CardNormalSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardNormalSkin = true;
    this.type = 'CardNormalSkin';

    this.bumpMap = null;
    this.normalMap = null;

    this.setValues(parameters);
  }
}

export { CardNormalSkin };
