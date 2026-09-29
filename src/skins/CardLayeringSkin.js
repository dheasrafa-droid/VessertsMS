/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardLayeringSkin.js
 * Visualizes stack layering depth.
 * Parallels Three.js MeshDepthMaterial.
 */

import { Skin } from './Skin.js';

class CardLayeringSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardLayeringSkin = true;
    this.type = 'CardLayeringSkin';

    this.contentMap = null;
    this.alphaMap = null;

    this.setValues(parameters);
  }
}

export { CardLayeringSkin };
