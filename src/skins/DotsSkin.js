/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - DotsSkin.js
 * Particle-like point styling for reaction dots and notifications.
 * Parallels Three.js PointsMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class DotsSkin extends Skin {
  constructor(parameters) {
    super();

    this.isDotsSkin = true;
    this.type = 'DotsSkin';

    this.color = new Color(0xffffff);
    this.contentMap = null;
    this.size = 1;
    this.sizeAttenuation = true;

    this.setValues(parameters);
  }
}

export { DotsSkin };
