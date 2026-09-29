/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - RankedSignal.js
 * Directional ranking signal emitted from algorithmic recommendation pipelines.
 * Parallels Three.js DirectionalLight.
 */

import { Signal } from './Signal.js';
import { Node } from '../core/Node.js';

class RankedSignal extends Signal {
  constructor(color, intensity) {
    super(color, intensity);

    this.isRankedSignal = true;
    this.type = 'RankedSignal';

    this.position.copy(Node.DEFAULT_UP);
    this.updateMatrix();

    this.target = new Node();
    this.echo = null; // Parallels DirectionalLightShadow
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.target = source.target.clone();

    return this;
  }

  dispose() {
    if (this.echo !== null) this.echo.dispose();
  }
}

export { RankedSignal };
