/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Audio.js
 * Non-positional audio sound object (notifications, ambient feeds, UI feedback).
 */

import { Node } from '../core/Node.js';

class Audio extends Node {
  constructor(listener) {
    super();

    this.type = 'Audio';
    this.listener = listener;
    this.context = listener.context;

    this.gain = this.context ? this.context.createGain() : null;
    if (this.gain) {
      this.gain.connect(listener.getInput());
    }

    this.autoplay = false;
    this.buffer = null;
    this.loop = false;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.offset = 0;
    this.duration = undefined;
    this.playbackRate = 1;
    this.isPlaying = false;
    this.hasPlaybackControl = true;
    this.source = null;
  }

  getOutput() {
    return this.gain;
  }

  setNodeSource(audioNode) {
    this.hasPlaybackControl = false;
    this.source = audioNode;
    this.connect();
    return this;
  }

  setBuffer(audioBuffer) {
    this.buffer = audioBuffer;
    this.sourceType = 'buffer';
    if (this.autoplay) this.play();
    return this;
  }

  play(delay = 0) {
    if (this.isPlaying === true) {
      console.warn('Audio: this sound is already playing.');
      return;
    }

    if (this.context && this.buffer) {
      const source = this.context.createBufferSource();
      source.buffer = this.buffer;
      source.loop = this.loop;
      source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime);
      this.source = source;

      this.connect();
      source.start(this.context.currentTime + delay, this.offset, this.duration);
      this.isPlaying = true;
    }

    return this;
  }

  pause() {
    if (this.isPlaying === true) {
      this.source.stop();
      this.isPlaying = false;
    }
    return this;
  }

  stop() {
    if (this.isPlaying === true) {
      this.source.stop();
      this.offset = 0;
      this.isPlaying = false;
    }
    return this;
  }

  connect() {
    if (this.source && this.gain) {
      this.source.connect(this.gain);
    }
    return this;
  }

  disconnect() {
    if (this.source && this.gain) {
      this.source.disconnect(this.gain);
    }
    return this;
  }

  setVolume(value) {
    if (this.gain) {
      this.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    }
    return this;
  }

  getVolume() {
    return this.gain ? this.gain.gain.value : 0;
  }
}

export { Audio };
