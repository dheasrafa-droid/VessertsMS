/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardBasicSkin.js
 * Basic unlit or flat card visual styling.
 * Parallels Three.js MeshBasicMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class CardBasicSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardBasicSkin = true;
    this.type = 'CardBasicSkin';

    this.color = new Color(0xffffff);
    this.contentMap = null; // Parallels map

    this.alphaMap = null;
    this.specularMap = null;
    this.envMap = null;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.color.copy(source.color);
    this.contentMap = source.contentMap;
    this.wireframe = source.wireframe;

    return this;
  }
}

export { CardBasicSkin };
