/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Node.js
 * Base class for all objects in the social graph / scene tree.
 * Parallels Three.js Object3D.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { Vector3 } from '../math/Vector3.js';
import { Euler } from '../math/Euler.js';
import { Quaternion } from '../math/Quaternion.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Layers } from './Layers.js';
import { MathUtils } from '../math/MathUtils.js';

let _nodeId = 0;

const _v1 = new Vector3();
const _q1 = new Quaternion();
const _m1 = new Matrix4();

class Node extends EventDispatcher {
  constructor() {
    super();

    this.isNode = true;
    this.id = _nodeId++;
    this.uuid = MathUtils.generateUUID();

    this.name = '';
    this.type = 'Node';

    this.parent = null;
    this.children = [];

    this.up = Node.DEFAULT_UP.clone();

    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3(1, 1, 1);

    function onRotationChange() {
      quaternion.setFromEuler(rotation, false);
    }

    function onQuaternionChange() {
      rotation.setFromQuaternion(quaternion, undefined, false);
    }

    rotation._onChange(onRotationChange);
    quaternion._onChange(onQuaternionChange);

    this.position = position;
    this.rotation = rotation;
    this.quaternion = quaternion;
    this.scale = scale;

    this.matrix = new Matrix4();
    this.matrixWorld = new Matrix4();

    this.matrixAutoUpdate = Node.DEFAULT_MATRIX_AUTO_UPDATE;
    this.matrixWorldNeedsUpdate = false;

    this.layers = new Layers();
    this.visible = true;

    this.castEcho = false;    // parallels castShadow
    this.receiveEcho = false; // parallels receiveShadow

    this.frustumCulled = true;
    this.renderOrder = 0;

    this.userData = {};
  }

  add(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }
      return this;
    }

    if (object === this) {
      console.error("VessertID.Node.add: object can't be added as a child of itself.", object);
      return this;
    }

    if (object && object.isNode) {
      if (object.parent !== null) {
        object.parent.remove(object);
      }

      object.parent = this;
      this.children.push(object);

      object.dispatchEvent({ type: 'added' });
    } else {
      console.error('VessertID.Node.add: object not an instance of Node.', object);
    }

    return this;
  }

  remove(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }
      return this;
    }

    const index = this.children.indexOf(object);

    if (index !== -1) {
      object.parent = null;
      this.children.splice(index, 1);
      object.dispatchEvent({ type: 'removed' });
    }

    return this;
  }

  removeFromParent() {
    const parent = this.parent;
    if (parent !== null) {
      parent.remove(this);
    }
    return this;
  }

  clear() {
    for (let i = 0; i < this.children.length; i++) {
      const object = this.children[i];
      object.parent = null;
      object.dispatchEvent({ type: 'removed' });
    }
    this.children.length = 0;
    return this;
  }

  traverse(callback) {
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  }

  traverseVisible(callback) {
    if (this.visible === false) return;
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  }

  traverseAncestors(callback) {
    const parent = this.parent;
    if (parent !== null) {
      callback(parent);
      parent.traverseAncestors(callback);
    }
  }

  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  }

  updateMatrixWorld(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();

    if (this.matrixWorldNeedsUpdate || force) {
      if (this.parent === null) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      }

      this.matrixWorldNeedsUpdate = false;
      force = true;
    }

    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld(force);
    }
  }

  clone(recursive) {
    return new this.constructor().copy(this, recursive);
  }

  copy(source, recursive = true) {
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.rotation.order = source.rotation.order;
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.visible = source.visible;
    this.castEcho = source.castEcho;
    this.receiveEcho = source.receiveEcho;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.userData = JSON.parse(JSON.stringify(source.userData));

    if (recursive === true) {
      for (let i = 0; i < source.children.length; i++) {
        const child = source.children[i];
        this.add(child.clone());
      }
    }

    return this;
  }
}

Node.DEFAULT_UP = new Vector3(0, 1, 0);
Node.DEFAULT_MATRIX_AUTO_UPDATE = true;

export { Node };
