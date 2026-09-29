/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardDistanceSkin.js
 * Point signal distance skin for omnidirectional shadow/echo calculations.
 * Parallels Three.js MeshDistanceMaterial.
 */

import { Skin } from './Skin.js';
import { Vector3 } from '../math/Vector3.js';

class CardDistanceSkin extends Skin {
  constructor(parameters) {
    super();

    this.isCardDistanceSkin = true;
    this.type = 'CardDistanceSkin';

    this.referencePosition = new Vector3();
    this.nearDistance = 1;
    this.farDistance = 1000;

    this.contentMap = null;
    this.alphaMap = null;

    this.setValues(parameters);
  }
}

export { CardDistanceSkin };
