/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - IESFocusedSignal.js
 * Photometric IES profile focused spotlight.
 */

import { FocusedSignal } from '../FocusedSignal.js';

class IESFocusedSignal extends FocusedSignal {
  constructor(color, intensity, distance, angle, penumbra, decay) {
    super(color, intensity, distance, angle, penumbra, decay);

    this.isIESFocusedSignal = true;
    this.iesMap = null;
  }
}

export { IESFocusedSignal };
