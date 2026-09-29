/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ArrowHelper.js
 * 3D directional arrow helper for vectors and velocities.
 * Parallels Three.js ArrowHelper.
 */

import { Node } from '../core/Node.js';
import { Row } from '../objects/Row.js';
import { Card } from '../objects/Card.js';
import { RowBasicSkin } from '../skins/RowBasicSkin.js';
import { CardBasicSkin } from '../skins/CardBasicSkin.js';
import { Layout } from '../core/Layout.js';
import { LayoutAttribute } from '../core/LayoutAttribute.js';
import { CylinderLayout } from '../layouts/CylinderLayout.js';
import { Vector3 } from '../math/Vector3.js';

class ArrowHelper extends Node {
  constructor(dir = new Vector3(0, 0, 1), origin = new Vector3(0, 0, 0), length = 1, color = 0xffff00, headLength = 0.2 * length, headWidth = 0.2 * headLength) {
    super();

    this.type = 'ArrowHelper';
    this.position.copy(origin);

    const lineLayout = new Layout();
    lineLayout.setAttribute('position', new LayoutAttribute(new Float32Array([0, 0, 0, 0, 1, 0]), 3));

    this.line = new Row(lineLayout, new RowBasicSkin({ color: color, toneMapped: false }));
    this.add(this.line);

    this.setDirection(dir);
    this.setLength(length, headLength, headWidth);
  }

  setDirection(dir) {
    _axis.set(0, 1, 0).cross(dir);
    const radians = Math.acos(new Vector3(0, 1, 0).dot(dir));
    this.quaternion.setFromAxisAngle(_axis.normalize(), radians);
  }

  setLength(length, headLength = 0.2 * length, headWidth = 0.2 * headLength) {
    this.line.scale.set(1, Math.max(0.0001, length - headLength), 1);
    this.line.updateMatrix();
  }
}

const _axis = new Vector3();

export { ArrowHelper };
