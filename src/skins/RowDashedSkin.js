/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RowDashedSkin.js
 * Dashed stroke styling for secondary or ghost thread lines.
 * Parallels Three.js LineDashedMaterial.
 */

import { RowBasicSkin } from './RowBasicSkin.js';

class RowDashedSkin extends RowBasicSkin {
  constructor(parameters) {
    super();

    this.isRowDashedSkin = true;
    this.type = 'RowDashedSkin';

    this.scale = 1;
    this.dashSize = 3;
    this.gapSize = 1;

    this.setValues(parameters);
  }
}

export { RowDashedSkin };
