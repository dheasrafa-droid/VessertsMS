/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ProjectorSignal.js
 * Texture projector signal casting rich media projections onto cards.
 */

import { FocusedSignal } from '../FocusedSignal.js';

class ProjectorSignal extends FocusedSignal {
  constructor(texture, color, intensity, distance, angle, penumbra, decay) {
    super(color, intensity, distance, angle, penumbra, decay);

    this.isProjectorSignal = true;
    this.projectorMap = texture;
  }
}

export { ProjectorSignal };
