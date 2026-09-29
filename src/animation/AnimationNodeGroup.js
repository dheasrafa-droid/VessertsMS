/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationNodeGroup.js
 * A container holding nodes that share animated properties.
 */

class AnimationNodeGroup {
  constructor(...nodes) {
    this.nodes = nodes;
  }

  add(...nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (this.nodes.indexOf(nodes[i]) === -1) {
        this.nodes.push(nodes[i]);
      }
    }
    return this;
  }

  remove(...nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const index = this.nodes.indexOf(nodes[i]);
      if (index !== -1) {
        this.nodes.splice(index, 1);
      }
    }
    return this;
  }
}

export { AnimationNodeGroup };
