/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Vessert.Legacy.js
 * Legacy aliases for backwards compatibility.
 * Parallels Three.js Three.Legacy.js.
 */

import { Node } from './core/Node.js';
import { Card } from './objects/Card.js';
import { Surface } from './surfaces/Surface.js';
import { Lens } from './lenses/Lens.js';
import { Skin } from './skins/Skin.js';
import { Signal } from './signals/Signal.js';

// Transition aliases
export {
  Node as Object3D,
  Card as Mesh,
  Surface as Scene,
  Lens as Camera,
  Skin as Material,
  Signal as Light
};
