/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FilterGroup.js
 * Group node applying clipping masks and visibility filter boundaries to children.
 * Parallels Three.js ClippingGroup.
 */

import { Cluster } from './Cluster.js';

class FilterGroup extends Cluster {
  constructor() {
    super();

    this.isFilterGroup = true;
    this.type = 'FilterGroup';

    this.filterPlanes = [];
    this.filterIntersection = false;
  }
}

export { FilterGroup };
