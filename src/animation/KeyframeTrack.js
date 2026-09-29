/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - KeyframeTrack.js
 * Timed sequence of keyframes for a specific property path.
 */

import { InterpolateLinear, InterpolateDiscrete, InterpolateSmooth } from '../constants.js';
import { LinearInterpolant } from '../math/interpolants/LinearInterpolant.js';
import { DiscreteInterpolant } from '../math/interpolants/DiscreteInterpolant.js';
import { CubicInterpolant } from '../math/interpolants/CubicInterpolant.js';
import { AnimationUtils } from './AnimationUtils.js';

class KeyframeTrack {
  constructor(name, times, values, interpolation = KeyframeTrack.DefaultInterpolation) {
    if (name === undefined) throw new Error('KeyframeTrack: no name given');
    if (times === undefined || times.length === 0) throw new Error('KeyframeTrack: no times given');
    if (values === undefined || values.length === 0) throw new Error('KeyframeTrack: no values given');

    this.name = name;
    this.times = AnimationUtils.convertArray(times, Float32Array);
    this.values = AnimationUtils.convertArray(values, Array);

    this.setInterpolation(interpolation);
  }

  InterpolantFactoryMethodLinear(result) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }

  InterpolantFactoryMethodDiscrete(result) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
  }

  InterpolantFactoryMethodSmooth(result) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
  }

  setInterpolation(interpolation) {
    let factoryMethod;

    switch (interpolation) {
      case InterpolateDiscrete:
        factoryMethod = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        factoryMethod = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        factoryMethod = this.InterpolantFactoryMethodSmooth;
        break;
    }

    if (factoryMethod === undefined) {
      const message = 'unsupported interpolation for ' + this.ValueTypeName + ': ' + interpolation;
      throw new Error(message);
    }

    this.createInterpolant = factoryMethod;
    return this;
  }

  getValueSize() {
    return this.values.length / this.times.length;
  }
}

KeyframeTrack.DefaultInterpolation = InterpolateLinear;

export { KeyframeTrack };
