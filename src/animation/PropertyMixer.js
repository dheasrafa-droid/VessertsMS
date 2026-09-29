/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - PropertyMixer.js
 * Buffers and blends multiple animated values targeting the same property.
 */

class PropertyMixer {
  constructor(binding, typeName, valueSize) {
    this.binding = binding;
    this.valueSize = valueSize;

    const bufferType = typeName === 'quaternion' ? Float32Array : Array;
    this.buffer = new bufferType(valueSize * 4);
    this.cumulativeWeight = 0;
    this.useCounters = 0;
  }

  accumulate(accuIndex, weight) {
    const buffer = this.buffer;
    const stride = this.valueSize;
    const offset = accuIndex * stride;

    let currentWeight = this.cumulativeWeight;

    if (currentWeight === 0) {
      for (let i = 0; i !== stride; ++i) {
        buffer[offset + i] = buffer[i];
      }
      this.cumulativeWeight = weight;
    } else {
      currentWeight += weight;
      const s = weight / currentWeight;
      const invs = 1 - s;

      for (let i = 0; i !== stride; ++i) {
        buffer[offset + i] = buffer[offset + i] * invs + buffer[i] * s;
      }
      this.cumulativeWeight = currentWeight;
    }
  }

  apply(accuIndex) {
    const stride = this.valueSize;
    const offset = accuIndex * stride;

    if (this.cumulativeWeight > 0) {
      this.binding.setValue(this.buffer, offset);
      this.cumulativeWeight = 0;
    }
  }
}

export { PropertyMixer };
