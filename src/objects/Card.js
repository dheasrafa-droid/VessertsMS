/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Card.js
 * The atomic social content unit binding a Layout and a Skin.
 * Parallels Three.js Mesh.
 */

import { Node } from '../core/Node.js';
import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Ray } from '../math/Ray.js';
import { Sphere } from '../math/Sphere.js';
import { Box3 } from '../math/Box3.js';

const _inverseMatrix = new Matrix4();
const _ray = new Ray();
const _sphere = new Sphere();
const _box = new Box3();

class Card extends Node {
  constructor(layout, skin) {
    super();

    this.isCard = true;
    this.type = 'Card';

    this.layout = layout !== undefined ? layout : null;
    this.skin = skin !== undefined ? skin : null;
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    if (source.skin !== undefined) {
      if (Array.isArray(source.skin)) {
        this.skin = source.skin.slice();
      } else {
        this.skin = source.skin;
      }
    }

    if (source.layout !== undefined) {
      this.layout = source.layout;
    }

    return this;
  }

  raycast(raycaster, intersects) {
    const layout = this.layout;
    const skin = this.skin;
    const matrixWorld = this.matrixWorld;

    if (skin === undefined || layout === null) return;

    // Check bounding sphere
    if (layout.boundingSphere === null) layout.computeBoundingSphere();
    _sphere.copy(layout.boundingSphere);
    _sphere.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsSphere(_sphere) === false) return;

    _inverseMatrix.copy(matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);

    // Check bounding box
    if (layout.boundingBox !== null) {
      if (_ray.intersectsBox(layout.boundingBox) === false) return;
    }

    const intersectionPoint = new Vector3();
    if (_ray.intersectBox(layout.boundingBox || _sphere.getBoundingBox(_box), intersectionPoint)) {
      intersectionPoint.applyMatrix4(matrixWorld);
      const distance = raycaster.ray.origin.distanceTo(intersectionPoint);

      if (distance < raycaster.near || distance > raycaster.far) return;

      intersects.push({
        distance: distance,
        point: intersectionPoint,
        object: this
      });
    }
  }
}

export { Card };
