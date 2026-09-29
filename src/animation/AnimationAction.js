/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationAction.js
 * Controls playback state, weight, timeScale, and blending of an AnimationClip.
 */

import { LoopRepeat } from '../constants.js';

class AnimationAction {
  constructor(mixer, clip, localRoot = null) {
    this._mixer = mixer;
    this._clip = clip;
    this._localRoot = localRoot;

    this.loop = LoopRepeat;
    this._repetitions = Infinity;

    this.time = 0;
    this.timeScale = 1;
    this.weight = 1;

    this.paused = false;
    this.enabled = true;
  }

  play() {
    this._mixer._activateAction(this);
    return this;
  }

  stop() {
    this._mixer._deactivateAction(this);
    this.reset();
    return this;
  }

  reset() {
    this.paused = false;
    this.enabled = true;
    this.time = 0;
    return this;
  }

  setEffectiveWeight(weight) {
    this.weight = weight;
    return this;
  }

  setEffectiveTimeScale(timeScale) {
    this.timeScale = timeScale;
    return this;
  }
}

export { AnimationAction };
