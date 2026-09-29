/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - VSLNodeLoader.js
 * Loader for node-based shader nodes.
 */

import { Loader } from '../Loader.js';

class VSLNodeLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  parse(json) {
    return json;
  }
}

export { VSLNodeLoader };
