/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationClip.js
 * Reusable set of keyframe tracks representing an animation sequence.
 */

import { MathUtils } from '../math/MathUtils.js';

class AnimationClip {
  constructor(name = MathUtils.generateUUID(), duration = -1, tracks = [], blendMode = 2500) {
    this.name = name;
    this.tracks = tracks;
    this.duration = duration;
    this.blendMode = blendMode;

    this.uuid = MathUtils.generateUUID();

    if (this.duration < 0) {
      this.resetDuration();
    }
  }

  resetDuration() {
    const tracks = this.tracks;
    let duration = 0;

    for (let i = 0, n = tracks.length; i !== n; ++i) {
      const track = tracks[i];
      const trackDuration = track.times[track.times.length - 1];
      if (trackDuration > duration) {
        duration = trackDuration;
      }
    }

    this.duration = duration;
    return this;
  }

  clone() {
    const tracks = [];
    for (let i = 0; i < this.tracks.length; i++) {
      tracks.push(this.tracks[i].clone ? this.tracks[i].clone() : this.tracks[i]);
    }
    return new AnimationClip(this.name, this.duration, tracks, this.blendMode);
  }
}

export { AnimationClip };
