/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - FileLoader.js
 * Low level fetch loader for text and binary data.
 */

import { Loader } from './Loader.js';
import { Cache } from './Cache.js';

class FileLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.responseType = '';
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const cached = Cache.get(url);

    if (cached !== undefined) {
      scope.manager.itemStart(url);
      setTimeout(() => {
        if (onLoad) onLoad(cached);
        scope.manager.itemEnd(url);
      }, 0);
      return;
    }

    scope.manager.itemStart(url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        if (scope.responseType === 'arraybuffer') return res.arrayBuffer();
        if (scope.responseType === 'json') return res.json();
        return res.text();
      })
      .then((data) => {
        Cache.add(url, data);
        if (onLoad) onLoad(data);
        scope.manager.itemEnd(url);
      })
      .catch((err) => {
        if (onError) onError(err);
        scope.manager.itemError(url);
        scope.manager.itemEnd(url);
      });
  }

  setResponseType(value) {
    this.responseType = value;
    return this;
  }
}

export { FileLoader };
