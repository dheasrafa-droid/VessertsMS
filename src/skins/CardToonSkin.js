/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardToonSkin.js
 * Cel-shaded cartoon card styling with stepped discrete ramps.
 * Parallels Three.js MeshToonMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class CardToonSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardToonSkin = true;
    this.type = 'CardToonSkin';

    this.color = new Color(0xffffff);
    this.gradientMap = null;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.gradientMap = source.gradientMap;

    return this;
  }
}

export { CardToonSkin };
