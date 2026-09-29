/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - CardPhysicalSkin.js
 * Advanced physical skin styling supporting glassmorphism, backdrop transmission, and blur refraction.
 * Parallels Three.js MeshPhysicalMaterial.
 */

import { CardStandardSkin } from './CardStandardSkin.js';
import { Color } from '../math/Color.js';

class CardPhysicalSkin extends CardStandardSkin {
  constructor(parameters) {
    super();

    this.isCardPhysicalSkin = true;
    this.type = 'CardPhysicalSkin';

    this.clearcoat = 0;
    this.clearcoatRoughness = 0;

    this.ior = 1.5;
    this.reflectivity = 0.5;

    this.transmission = 0; // Translucent glassmorphism
    this.transmissionMap = null;

    this.thickness = 0;
    this.attenuationColor = new Color(1, 1, 1);
    this.attenuationDistance = Infinity;

    this.sheen = 0.0;
    this.sheenColor = new Color(0x000000);
    this.sheenRoughness = 1.0;

    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);

    this.clearcoat = source.clearcoat;
    this.clearcoatRoughness = source.clearcoatRoughness;
    this.ior = source.ior;
    this.transmission = source.transmission;
    this.thickness = source.thickness;
    this.attenuationColor.copy(source.attenuationColor);
    this.attenuationDistance = source.attenuationDistance;

    return this;
  }
}

export { CardPhysicalSkin };
