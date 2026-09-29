/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Badge.js
 * 2D billboard/floating badge node that always faces the active Lens.
 * Parallels Three.js Sprite.
 */

import { Node } from '../core/Node.js';
import { Vector2 } from '../math/Vector2.js';

class Badge extends Node {
  constructor(skin) {
    super();

    this.isBadge = true;
    this.type = 'Badge';

    this.skin = skin !== undefined ? skin : null;
    this.center = new Vector2(0.5, 0.5);
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    if (source.skin !== undefined) this.skin = source.skin;
    this.center.copy(source.center);

    return this;
  }
}

export { Badge };
