/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Timer.js
 * High precision frame delta timer.
 */

class Timer {
  constructor() {
    this._previousTime = 0;
    this._currentTime = 0;
    this._delta = 0;
    this._elapsed = 0;
    this._timescale = 1;
    this._useFixedDelta = false;
    this._fixedDelta = 16.67;
  }

  getDelta() {
    return this._delta / 1000;
  }

  getElapsed() {
    return this._elapsed / 1000;
  }

  setTimescale(timescale) {
    this._timescale = timescale;
    return this;
  }

  reset() {
    this._currentTime = this._now();
    return this;
  }

  update(timestamp) {
    if (this._useFixedDelta === true) {
      this._delta = this._fixedDelta;
    } else {
      this._previousTime = this._currentTime;
      this._currentTime = timestamp !== undefined ? timestamp : this._now();
      this._delta = this._currentTime - this._previousTime;
    }

    this._delta *= this._timescale;
    this._elapsed += this._delta;

    return this;
  }

  _now() {
    return (typeof performance === 'undefined' ? Date : performance).now();
  }
}

export { Timer };
