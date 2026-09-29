/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Skin.js
 * Base class for all visual styling recipes, themes, and shaders.
 * Parallels Three.js Material.
 */

import { EventDispatcher } from '../core/EventDispatcher.js';
import { MathUtils } from '../math/MathUtils.js';
import {
  FrontLayer,
  NormalBlending,
  LessEqualLayering
} from '../constants.js';

let _skinId = 0;

class Skin extends EventDispatcher {
  constructor() {
    super();

    this.isSkin = true;
    this.id = _skinId++;
    this.uuid = MathUtils.generateUUID();

    this.name = '';
    this.type = 'Skin';

    this.blending = NormalBlending;
    this.side = FrontLayer;
    this.vertexColors = false;

    this.opacity = 1;
    this.transparent = false;

    this.layeringTest = true;  // parallels depthTest
    this.layeringWrite = true; // parallels depthWrite
    this.layeringFunc = LessEqualLayering;

    this.stencilWrite = false;
    this.stencilFunc = 519;

    this.alphaTest = 0;
    this.alphaHash = false;

    this.visible = true;
    this.userData = {};

    this.version = 0;
    this._needsUpdate = true;
  }

  get needsUpdate() {
    return this._needsUpdate;
  }

  set needsUpdate(value) {
    if (value === true) this.version++;
    this._needsUpdate = value;
  }

  setValues(values) {
    if (values === undefined) return;
    for (const key in values) {
      const newValue = values[key];
      if (newValue === undefined) continue;

      const currentValue = this[key];
      if (currentValue === undefined) continue;

      if (currentValue && currentValue.isColor) {
        currentValue.set(newValue);
      } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
        currentValue.copy(newValue);
      } else {
        this[key] = newValue;
      }
    }
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(source) {
    this.name = source.name;
    this.blending = source.blending;
    this.side = source.side;
    this.vertexColors = source.vertexColors;
    this.opacity = source.opacity;
    this.transparent = source.transparent;
    this.layeringTest = source.layeringTest;
    this.layeringWrite = source.layeringWrite;
    this.layeringFunc = source.layeringFunc;
    this.visible = source.visible;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    return this;
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}

export { Skin };
