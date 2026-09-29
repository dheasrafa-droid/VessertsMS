/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RawTemplateSkin.js
 * Unpreprocessed template skin bypassing default CSS chunks.
 * Parallels Three.js RawShaderMaterial.
 */

import { TemplateSkin } from './TemplateSkin.js';

class RawTemplateSkin extends TemplateSkin {
  constructor(parameters) {
    super(parameters);

    this.isRawTemplateSkin = true;
    this.type = 'RawTemplateSkin';
  }
}

export { RawTemplateSkin };
