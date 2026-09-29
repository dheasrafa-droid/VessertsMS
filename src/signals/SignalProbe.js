/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SignalProbe.js
 * Spherical harmonics probe sampling ambient signal energy across 3D coordinates.
 * Parallels Three.js LightProbe.
 */

import { Signal } from './Signal.js';
import { SphericalHarmonics3 } from '../math/SphericalHarmonics3.js';

class SignalProbe extends Signal {
  constructor(sh = new SphericalHarmonics3(), intensity = 1) {
    super(undefined, intensity);

    this.isSignalProbe = true;
    this.type = 'SignalProbe';

    this.sh = sh;
  }

  copy(source, recursive) {
    super.copy(source, recursive);

    this.sh.copy(source.sh);

    return this;
  }
}

export { SignalProbe };
