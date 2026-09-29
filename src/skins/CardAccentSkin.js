/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardAccentSkin.js
 * Card skin with specular highlights and accent shine.
 * Parallels Three.js MeshPhongMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class CardAccentSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardAccentSkin = true;
    this.type = 'CardAccentSkin';

    this.color = new Color(0xffffff);
    this.specular = new Color(0x111111);
    this.shininess = 30;

    this.contentMap = null;
    this.specularMap = null;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.specular.copy(source.specular);
    this.shininess = source.shininess;

    return this;
  }
}

export { CardAccentSkin };
