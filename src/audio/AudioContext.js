/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AudioContext.js
 * Universal Web Audio context wrapper.
 */

let _context;

export const AudioContext = {
  getContext: function () {
    if (_context === undefined) {
      const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
      if (AudioCtx) {
        _context = new AudioCtx();
      }
    }
    return _context;
  },

  setContext: function (value) {
    _context = value;
  }
};
