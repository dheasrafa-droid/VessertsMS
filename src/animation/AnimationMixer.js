/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationMixer.js
 * Player and blender for animations on graph nodes and card clusters.
 */

import { AnimationAction } from './AnimationAction.js';
import { EventDispatcher } from '../core/EventDispatcher.js';

class AnimationMixer extends EventDispatcher {
  constructor(root) {
    super();

    this._root = root;
    this._actions = [];
    this._actionsByClip = new Map();
    this.time = 0;
    this.timeScale = 1;
  }

  clipAction(clip, optionalRoot) {
    const root = optionalRoot || this._root;
    let action = this._actionsByClip.get(clip);
    if (!action) {
      action = new AnimationAction(this, clip, root);
      this._actionsByClip.set(clip, action);
    }
    return action;
  }

  _activateAction(action) {
    if (this._actions.indexOf(action) === -1) {
      this._actions.push(action);
    }
  }

  _deactivateAction(action) {
    const index = this._actions.indexOf(action);
    if (index !== -1) {
      this._actions.splice(index, 1);
    }
  }

  update(deltaTime) {
    deltaTime *= this.timeScale;
    this.time += deltaTime;

    for (let i = 0; i < this._actions.length; i++) {
      const action = this._actions[i];
      if (action.enabled && !action.paused) {
        action.time += deltaTime * action.timeScale;
      }
    }

    return this;
  }

  stopAllAction() {
    for (let i = 0; i < this._actions.length; i++) {
      this._actions[i].stop();
    }
    this._actions.length = 0;
    return this;
  }

  getRoot() {
    return this._root;
  }
}

export { AnimationMixer };
