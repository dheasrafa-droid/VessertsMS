/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - TemplateSkin.js
 * Custom programmable template skin compiling custom CSS/GLSL rules.
 * Parallels Three.js ShaderMaterial.
 */

import { Skin } from './Skin.js';

class TemplateSkin extends Skin {
  constructor(parameters = {}) {
    super();

    this.isTemplateSkin = true;
    this.type = 'TemplateSkin';

    this.bindings = parameters.bindings !== undefined ? parameters.bindings : {};
    this.templateRule = parameters.templateRule !== undefined ? parameters.templateRule : '';
    this.templateElement = parameters.templateElement !== undefined ? parameters.templateElement : '';

    this.setValues(parameters);
  }
}

export { TemplateSkin };
