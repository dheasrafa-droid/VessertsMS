/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FocusedSignal.js
 * Conical spotlight focused onto a specific node or thread anchor.
 * Parallels Three.js SpotLight.
 */

import { Signal } from './Signal.js';
import { Node } from '../core/Node.js';
import { FocusedSignalEcho } from './FocusedSignalEcho.js';

class FocusedSignal extends Signal {
  constructor(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 2) {
    super(color, intensity);

    this.isFocusedSignal = true;
    this.type = 'FocusedSignal';

    this.position.copy(Node.DEFAULT_UP);
    this.updateMatrix();

    this.target = new Node();

    this.distance = distance;
    this.angle = angle;
    this.penumbra = penumbra;
    this.decay = decay;

    this.echo = new FocusedSignalEcho();
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.distance = source.distance;
    this.angle = source.angle;
    this.penumbra = source.penumbra;
    this.decay = source.decay;
    this.target = source.target.clone();
    this.echo = source.echo.clone();

    return this;
  }

  dispose() {
    this.echo.dispose();
  }
}

export { FocusedSignal };
