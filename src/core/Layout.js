/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Layout.js
 * Structural layout definition holding layout attributes, bounding volumes, and draw ranges.
 * Parallels Three.js BufferGeometry.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { Vector3 } from '../math/Vector3.js';
import { Box3 } from '../math/Box3.js';
import { Sphere } from '../math/Sphere.js';
import { MathUtils } from '../math/MathUtils.js';

let _layoutId = 0;

class Layout extends EventDispatcher {
  constructor() {
    super();
    this.isLayout = true;
    this.id = _layoutId++;
    this.uuid = MathUtils.generateUUID();
    this.name = '';
    this.type = 'Layout';

    this.index = null;
    this.attributes = {};

    this.drawRange = { start: 0, count: Infinity };
    this.groups = [];

    this.boundingBox = null;
    this.boundingSphere = null;

    this.userData = {};
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    if (Array.isArray(index)) {
      this.index = new LayoutAttribute(new Uint16Array(index), 1);
    } else {
      this.index = index;
    }
    return this;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  setAttribute(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  }

  deleteAttribute(name) {
    delete this.attributes[name];
    return this;
  }

  addGroup(start, count, materialIndex = 0) {
    this.groups.push({
      start: start,
      count: count,
      materialIndex: materialIndex
    });
  }

  clearGroups() {
    this.groups = [];
  }

  setDrawRange(start, count) {
    this.drawRange.start = start;
    this.drawRange.count = count;
  }

  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }

    const position = this.attributes.position;
    if (position !== undefined) {
      this.boundingBox.makeEmpty();
      const vector = new Vector3();
      for (let i = 0, il = position.count; i < il; i++) {
        vector.fromArray(position.array, i * position.itemSize);
        this.boundingBox.expandByPoint(vector);
      }
    } else {
      this.boundingBox.makeEmpty();
    }
  }

  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }

    const position = this.attributes.position;
    if (position !== undefined) {
      const center = this.boundingSphere.center;
      const box = _box;
      box.makeEmpty();

      const vector = new Vector3();
      for (let i = 0, il = position.count; i < il; i++) {
        vector.fromArray(position.array, i * position.itemSize);
        box.expandByPoint(vector);
      }

      box.getCenter(center);
      let maxRadiusSq = 0;
      for (let i = 0, il = position.count; i < il; i++) {
        vector.fromArray(position.array, i * position.itemSize);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
      }

      this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
    }
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(source) {
    this.name = source.name;
    this.index = source.index;
    this.attributes = Object.assign({}, source.attributes);
    this.groups = [...source.groups];
    this.drawRange.start = source.drawRange.start;
    this.drawRange.count = source.drawRange.count;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    return this;
  }

  dispose() {
    this.dispatchEvent({ type: 'dispose' });
  }
}

const _box = new Box3();

export { Layout };
