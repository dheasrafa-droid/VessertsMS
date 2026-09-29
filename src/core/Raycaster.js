/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Raycaster.js
 * Raycasting and hit-testing for DOM/spatial node picking.
 */

import { Ray } from '../math/Ray.js';
import { Layers } from './Layers.js';

class Raycaster {
  constructor(origin, direction, near = 0, far = Infinity) {
    this.ray = new Ray(origin, direction);
    this.near = near;
    this.far = far;
    this.camera = null;
    this.layers = new Layers();
    this.params = {
      Mesh: {},
      Card: {},
      Line: {},
      Points: {}
    };
  }

  set(origin, direction) {
    this.ray.set(origin, direction);
  }

  setFromCamera(coords, camera) {
    if (camera && camera.isPerspectiveLens) {
      this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
      this.camera = camera;
    } else if (camera && camera.isOrthographicLens) {
      this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
      this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
      this.camera = camera;
    } else {
      console.error('VessertID.Raycaster: Unsupported lens type.');
    }
  }

  intersectObject(object, recursive = true, intersects = []) {
    intersect(object, this, intersects, recursive);
    intersects.sort(ascSort);
    return intersects;
  }

  intersectObjects(objects, recursive = true, intersects = []) {
    for (let i = 0, l = objects.length; i < l; i++) {
      intersect(objects[i], this, intersects, recursive);
    }
    intersects.sort(ascSort);
    return intersects;
  }
}

function ascSort(a, b) {
  return a.distance - b.distance;
}

function intersect(object, raycaster, intersects, recursive) {
  if (object.layers.test(raycaster.layers)) {
    if (object.raycast) {
      object.raycast(raycaster, intersects);
    }
  }

  if (recursive === true) {
    const children = object.children;
    for (let i = 0, l = children.length; i < l; i++) {
      intersect(children[i], raycaster, intersects, true);
    }
  }
}

export { Raycaster };
