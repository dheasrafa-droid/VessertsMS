/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Cluster.js
 * Grouping node for social components, thread branches, and nested elements.
 * Parallels Three.js Group.
 */

import { Node } from '../core/Node.js';

class Cluster extends Node {
  constructor() {
    super();

    this.isCluster = true;
    this.type = 'Cluster';
  }
}

export { Cluster };
