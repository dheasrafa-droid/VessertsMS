/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RowBasicSkin.js
 * Basic line/row styling.
 * Parallels Three.js LineBasicMaterial.
 */

import { Skin } from './Skin.js';
import { Color } from '../math/Color.js';

class RowBasicSkin extends Skin {
  constructor(parameters) {
    super();

    this.isRowBasicSkin = true;
    this.type = 'RowBasicSkin';

    this.color = new Color(0xffffff);
    this.linewidth = 1;
    this.linecap = 'round';
    this.linejoin = 'round';

    this.setValues(parameters);
  }
}

export { RowBasicSkin };
