/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LayoutLoader.js
 * Serializer/deserializer for geometry layouts.
 * Parallels Three.js BufferGeometryLoader.
 */

import { Loader } from './Loader.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';

class LayoutLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  parse(json) {
    const layout = new Layout();

    const index = json.data.index;
    if (index !== undefined) {
      layout.setIndex(new LayoutAttribute(new Uint16Array(index.array), 1));
    }

    const attributes = json.data.attributes;
    for (const key in attributes) {
      const attr = attributes[key];
      layout.setAttribute(key, new LayoutAttribute(new Float32Array(attr.array), attr.itemSize));
    }

    return layout;
  }
}

export { LayoutLoader };
