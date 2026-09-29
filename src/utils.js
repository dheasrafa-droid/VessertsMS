/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - utils.js
 * Universal utility functions for the VessertID library.
 */

import {
  ByteType,
  FloatType,
  HalfFloatType,
  IntType,
  ShortType,
  UnsignedByteType,
  UnsignedIntType,
  UnsignedShortType,
  NeverLayering,
  AlwaysLayering,
  LessLayering,
  LessEqualLayering,
  EqualLayering,
  GreaterEqualLayering,
  GreaterLayering,
  NotEqualLayering
} from './constants.js';

const _warnedOnce = new Set();
let _consoleFunction = console;

export function setConsoleFunction(fn) {
  _consoleFunction = fn;
}

export function getConsoleFunction() {
  return _consoleFunction;
}

export function log(...args) {
  _consoleFunction.log('VESSERT:', ...args);
}

export function warn(...args) {
  _consoleFunction.warn('VESSERT:', ...args);
}

export function error(...args) {
  _consoleFunction.error('VESSERT:', ...args);
}

export function warnOnce(message) {
  if (_warnedOnce.has(message)) return;
  _warnedOnce.add(message);
  warn(message);
}

export function arrayMin(array) {
  if (array.length === 0) return Infinity;
  let min = array[0];
  for (let i = 1, l = array.length; i < l; ++i) {
    if (array[i] < min) min = array[i];
  }
  return min;
}

export function arrayMax(array) {
  if (array.length === 0) return -Infinity;
  let max = array[0];
  for (let i = 1, l = array.length; i < l; ++i) {
    if (array[i] > max) max = array[i];
  }
  return max;
}

const TYPED_ARRAYS = {
  [Int8Array.name]: Int8Array,
  [Uint8Array.name]: Uint8Array,
  [Uint8ClampedArray.name]: Uint8ClampedArray,
  [Int16Array.name]: Int16Array,
  [Uint16Array.name]: Uint16Array,
  [Int32Array.name]: Int32Array,
  [Uint32Array.name]: Uint32Array,
  [Float32Array.name]: Float32Array,
  [Float64Array.name]: Float64Array
};

export function getTypedArray(type, buffer) {
  return new TYPED_ARRAYS[type](buffer);
}

export function isTypedArray(object) {
  return ArrayBuffer.isView(object) && !(object instanceof DataView);
}

export function createElementNS(name) {
  return document.createElementNS('http://www.w3.org/1999/xhtml', name);
}

export function createRootElement(name = 'div') {
  return document.createElement(name);
}

export function yieldToMain() {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
}

export async function probeAsync(syncFn) {
  await yieldToMain();
  return syncFn();
}

export function toNormalizedProjectionMatrix(projectionMatrix) {
  const m = projectionMatrix.elements;
  // Transforms z from [-1, 1] to [0, 1]
  m[2] = 0.5 * (m[2] + m[3]);
  m[6] = 0.5 * (m[6] + m[7]);
  m[10] = 0.5 * (m[10] + m[11]);
  m[14] = 0.5 * (m[14] + m[15]);
  return projectionMatrix;
}

export function toReversedProjectionMatrix(projectionMatrix) {
  const m = projectionMatrix.elements;
  // Invert z range for reverse-z buffering
  m[10] = -m[10];
  m[14] = -m[14];
  return projectionMatrix;
}

export const ReversedLayeringFuncs = {
  [NeverLayering]: AlwaysLayering,
  [LessLayering]: GreaterLayering,
  [EqualLayering]: EqualLayering,
  [LessEqualLayering]: GreaterEqualLayering,
  [GreaterLayering]: LessLayering,
  [NotEqualLayering]: NotEqualLayering,
  [GreaterEqualLayering]: LessEqualLayering,
  [AlwaysLayering]: NeverLayering
};
