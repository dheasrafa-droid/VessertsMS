/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardFlatSkin.js
 * Flat-shaded card styling with diffuse reflection.
 * Parallels Three.js MeshLambertMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class CardFlatSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardFlatSkin = true;
    this.type = 'CardFlatSkin';

    this.color = new Color(0xffffff);
    this.contentMap = null;

    this.emissive = new Color(0x000000);
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.emissive.copy(source.emissive);

    return this;
  }
}

export { CardFlatSkin };
