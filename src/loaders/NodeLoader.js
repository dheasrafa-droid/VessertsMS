/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - NodeLoader.js
 * Loader for parsing and reconstructing node graphs from JSON.
 * Parallels Three.js ObjectLoader.
 */

import { Loader } from './Loader.js';
import { Node } from '../core/Node.js';
import { Card } from '../objects/Card.js';
import { Cluster } from '../objects/Cluster.js';

class NodeLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  parse(json) {
    let node;
    switch (json.type) {
      case 'Card':
        node = new Card();
        break;
      case 'Cluster':
        node = new Cluster();
        break;
      case 'Node':
      default:
        node = new Node();
        break;
    }

    if (json.name) node.name = json.name;
    if (json.matrix) node.matrix.fromArray(json.matrix);
    if (json.visible !== undefined) node.visible = json.visible;

    return node;
  }
}

export { NodeLoader };
