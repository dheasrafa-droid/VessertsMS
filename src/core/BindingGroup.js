/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - BindingGroup.js
 * Group of uniform data bindings.
 * Parallels Three.js UniformsGroup.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { MathUtils } from '../math/MathUtils.js';

let _bindingGroupId = 0;

class BindingGroup extends EventDispatcher {
  constructor(name = '') {
    super();

    this.isBindingGroup = true;
    this.id = _bindingGroupId++;
    this.name = name;
    this.bindings = [];
  }

  add(binding) {
    this.bindings.push(binding);
    return this;
  }

  remove(binding) {
    const index = this.bindings.indexOf(binding);
    if (index !== -1) {
      this.bindings.splice(index, 1);
    }
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}

export { BindingGroup };
