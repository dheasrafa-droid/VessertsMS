/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - LoadingManager.js
 * Coordinates asynchronous loading of multiple resources and tracking progress.
 */

class LoadingManager {
  constructor(onLoad, onProgress, onError) {
    this.isLoading = false;
    this.itemsLoaded = 0;
    this.itemsTotal = 0;

    this.onStart = undefined;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;

    this.handlers = [];
  }

  itemStart(url) {
    this.itemsTotal++;
    if (this.isLoading === false) {
      if (this.onStart !== undefined) this.onStart(url, this.itemsLoaded, this.itemsTotal);
    }
    this.isLoading = true;
  }

  itemEnd(url) {
    this.itemsLoaded++;
    if (this.onProgress !== undefined) {
      this.onProgress(url, this.itemsLoaded, this.itemsTotal);
    }
    if (this.itemsLoaded === this.itemsTotal) {
      this.isLoading = false;
      if (this.onLoad !== undefined) this.onLoad();
    }
  }

  itemError(url) {
    if (this.onError !== undefined) {
      this.onError(url);
    }
  }

  resolveURL(url) {
    return url;
  }
}

export const DefaultLoadingManager = new LoadingManager();
export { LoadingManager };
