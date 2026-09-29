/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SkinLoader.js
 * Serializer/deserializer for skin definitions and themes.
 * Parallels Three.js MaterialLoader.
 */

import { Loader } from './Loader.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';
import { CardStandardSkin } from '../skins/CardStandardSkin.js';
import { CardPhysicalSkin } from '../skins/CardPhysicalSkin.js';

class SkinLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.textures = {};
  }

  parse(json) {
    let skin;
    switch (json.type) {
      case 'CardBasicSkin':
        skin = new CardBasicSkin();
        break;
      case 'CardPhysicalSkin':
        skin = new CardPhysicalSkin();
        break;
      case 'CardStandardSkin':
      default:
        skin = new CardStandardSkin();
        break;
    }

    if (json.name) skin.name = json.name;
    if (json.color !== undefined) skin.color.setHex(json.color);
    if (json.opacity !== undefined) skin.opacity = json.opacity;
    if (json.transparent !== undefined) skin.transparent = json.transparent;

    return skin;
  }
}

export { SkinLoader };
