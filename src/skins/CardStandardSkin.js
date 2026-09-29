/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardStandardSkin.js
 * Standard PBR-style card visual styling reacting to signals and ambient illumination.
 * Parallels Three.js MeshStandardMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';
import { Vector2 } from '../math/Vector2.js';

class CardStandardSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardStandardSkin = true;
    this.type = 'CardStandardSkin';

    this.color = new Color(0xffffff);
    this.roughness = 1.0;
    this.metalness = 0.0;

    this.contentMap = null;
    this.roughnessMap = null;
    this.metalnessMap = null;

    this.emissive = new Color(0x000000);
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.normalMap = null;
    this.normalScale = new Vector2(1, 1);

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.roughness = source.roughness;
    this.metalness = source.metalness;
    this.emissive.copy(source.emissive);

    return this;
  }
}

export { CardStandardSkin };
