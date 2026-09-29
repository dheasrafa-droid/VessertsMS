/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardMatcapSkin.js
 * Card skin lit by an encoded spherical material capture texture (matcap).
 * Parallels Three.js MeshMatcapMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class CardMatcapSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardMatcapSkin = true;
    this.type = 'CardMatcapSkin';

    this.color = new Color(0xffffff);
    this.matcap = null;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.matcap = source.matcap;

    return this;
  }
}

export { CardMatcapSkin };
