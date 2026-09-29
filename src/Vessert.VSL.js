/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Vessert.VSL.js
 * Vessert Style Language (VSL) entry barrel.
 * Parallels Three.js Three.TSL.js.
 */

export const VSL_VERSION = '1.0.0';

export function css(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

export function uniform(name, value) {
  return { name, value, isUniformNode: true };
}

export function attribute(name, type) {
  return { name, type, isAttributeNode: true };
}
