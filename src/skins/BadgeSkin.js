/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BadgeSkin.js
 * Visual styling for billboarded badge labels and floating count tags.
 * Parallels Three.js SpriteMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class BadgeSkin extends Skin {
  constructor(parameters) {
    super();

    this.isBadgeSkin = true;
    this.type = 'BadgeSkin';

    this.color = new Color(0xffffff);
    this.contentMap = null;
    this.rotation = 0;
    this.sizeAttenuation = true;

    this.setValues(parameters);
  }
}

export { BadgeSkin };
