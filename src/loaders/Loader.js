/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - Loader.js
 * Base class for all resource loaders.
 */

import { DefaultLoadingManager } from './LoadingManager.js';

class Loader {
  constructor(manager = DefaultLoadingManager) {
    this.manager = manager;
    this.crossOrigin = 'anonymous';
    this.withCredentials = false;
    this.path = '';
    this.resourcePath = '';
    this.requestHeader = {};
  }

  load() {}

  loadAsync(url, onProgress) {
    const scope = this;
    return new Promise(function (resolve, reject) {
      scope.load(url, resolve, onProgress, reject);
    });
  }

  setRequestHeader(requestHeader) {
    this.requestHeader = requestHeader;
    return this;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setResourcePath(resourcePath) {
    this.resourcePath = resourcePath;
    return this;
  }

  setCrossOrigin(crossOrigin) {
    this.crossOrigin = crossOrigin;
    return this;
  }
}

export { Loader };
