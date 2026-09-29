/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Ray.js
 * Ray for hit-testing / raycasting against Nodes and Cards.
 */

import { Vector3 } from './Vector3.js';

class Ray {
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
    this.origin = origin;
    this.direction = direction;
  }

  set(origin, direction) {
    this.origin.copy(origin);
    this.direction.copy(direction);
    return this;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  copy(ray) {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);
    return this;
  }

  at(t, target) {
    return target.copy(this.origin).addScaledVector(this.direction, t);
  }

  recast(t) {
    this.origin.copy(this.at(t, _vector));
    return this;
  }

  closestPointToPoint(point, target) {
    target.subVectors(point, this.origin);
    const directionDistance = target.dot(this.direction);
    if (directionDistance < 0) {
      return target.copy(this.origin);
    }
    return target.copy(this.origin).addScaledVector(this.direction, directionDistance);
  }

  distanceToPoint(point) {
    return Math.sqrt(this.distanceSqToPoint(point));
  }

  distanceSqToPoint(point) {
    const directionDistance = _vector.subVectors(point, this.origin).dot(this.direction);
    if (directionDistance < 0) {
      return this.origin.distanceToSquared(point);
    }
    _vector.copy(this.origin).addScaledVector(this.direction, directionDistance);
    return _vector.distanceToSquared(point);
  }

  intersectsSphere(sphere) {
    return this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
  }

  intersectSphere(sphere, target) {
    _vector.subVectors(sphere.center, this.origin);
    const tca = _vector.dot(this.direction);
    const d2 = _vector.dot(_vector) - tca * tca;
    const radius2 = sphere.radius * sphere.radius;

    if (d2 > radius2) return null;

    const thc = Math.sqrt(radius2 - d2);
    const t0 = tca - thc;
    const t1 = tca + thc;

    if (t0 < 0 && t1 < 0) return null;
    if (t0 < 0) return this.at(t1, target);

    return this.at(t0, target);
  }

  intersectsBox(box) {
    return this.intersectBox(box, _vector) !== null;
  }

  intersectBox(box, target) {
    let tmin, tmax, tymin, tymax, tzmin, tzmax;

    const invdirx = 1 / this.direction.x,
      invdiry = 1 / this.direction.y,
      invdirz = 1 / this.direction.z;

    const origin = this.origin;

    if (invdirx >= 0) {
      tmin = (box.min.x - origin.x) * invdirx;
      tmax = (box.max.x - origin.x) * invdirx;
    } else {
      tmin = (box.max.x - origin.x) * invdirx;
      tmax = (box.min.x - origin.x) * invdirx;
    }

    if (invdiry >= 0) {
      tymin = (box.min.y - origin.y) * invdiry;
      tymax = (box.max.y - origin.y) * invdiry;
    } else {
      tymin = (box.max.y - origin.y) * invdiry;
      tymax = (box.min.y - origin.y) * invdiry;
    }

    if (tmin > tymax || tymin > tmax) return null;
    if (tymin > tmin || isNaN(tmin)) tmin = tymin;
    if (tymax < tmax || isNaN(tmax)) tmax = tymax;

    if (invdirz >= 0) {
      tzmin = (box.min.z - origin.z) * invdirz;
      tzmax = (box.max.z - origin.z) * invdirz;
    } else {
      tzmin = (box.max.z - origin.z) * invdirz;
      tzmax = (box.min.z - origin.z) * invdirz;
    }

    if (tmin > tzmax || tzmin > tmax) return null;
    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
    if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

    if (tmax < 0) return null;

    return this.at(tmin >= 0 ? tmin : tmax, target);
  }
}

const _vector = new Vector3();

export { Ray };
