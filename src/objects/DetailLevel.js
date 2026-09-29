/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - DetailLevel.js
 * Level of Detail (LOD) node switching representation based on camera distance or viewport density.
 * Parallels Three.js LOD.
 */

import { Node } from '../core/Node.js';
import { Vector3 } from '../math/Vector3.js';

class DetailLevel extends Node {
  constructor() {
    super();

    this.isDetailLevel = true;
    this.type = 'DetailLevel';

    this.levels = [];
    this.autoUpdate = true;
  }

  addLevel(object, distance = 0, hysteresis = 0) {
    distance = Math.abs(distance);
    const levels = this.levels;

    let l;
    for (l = 0; l < levels.length; l++) {
      if (distance < levels[l].distance) break;
    }

    levels.splice(l, 0, { distance, hysteresis, object });
    this.add(object);
    return this;
  }

  getCurrentLevel() {
    return this._currentLevel || 0;
  }

  update(lens) {
    const levels = this.levels;
    if (levels.length > 1) {
      _v1.setFromMatrixPosition(lens.matrixWorld);
      _v2.setFromMatrixPosition(this.matrixWorld);

      const distance = _v1.distanceTo(_v2) / lens.zoom;

      levels[0].object.visible = true;
      let i, l;
      for (i = 1, l = levels.length; i < l; i++) {
        let levelDistance = levels[i].distance;
        if (levels[i].hysteresis) {
          const level = this._currentLevel || 0;
          if (level >= i) {
            levelDistance -= levelDistance * levels[i].hysteresis;
          }
        }
        if (distance >= levelDistance) {
          levels[i - 1].object.visible = false;
          levels[i].object.visible = true;
        } else {
          break;
        }
      }

      this._currentLevel = i - 1;
      for (; i < l; i++) {
        levels[i].object.visible = false;
      }
    }
  }
}

const _v1 = new Vector3();
const _v2 = new Vector3();

export { DetailLevel };
