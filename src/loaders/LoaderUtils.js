/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LoaderUtils.js
 * Utility methods for resource loaders.
 */

export const LoaderUtils = {
  decodeText: function (array) {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder().decode(array);
    }
    let s = '';
    for (let i = 0, il = array.length; i < il; i++) {
      s += String.fromCharCode(array[i]);
    }
    return decodeURIComponent(escape(s));
  },

  extractUrlBase: function (url) {
    const index = url.lastIndexOf('/');
    if (index === -1) return './';
    return url.slice(0, index + 1);
  },

  resolveURL: function (url, path) {
    if (typeof url !== 'string' || url === '') return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (/^\//.test(url)) return url;
    return path + url;
  }
};
