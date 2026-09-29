/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - ImageLoader.js
 * HTML image element loader.
 */

import { Loader } from './Loader.js';
import { Cache } from './Cache.js';

class ImageLoader extends Loader {
  constructor(manager) {
    super(manager);
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
      return cached;
    }

    const image = document.createElement('img');
    image.crossOrigin = this.crossOrigin;

    scope.manager.itemStart(url);

    image.onload = () => {
      Cache.add(url, image);
      if (onLoad) onLoad(image);
      scope.manager.itemEnd(url);
    };

    image.onerror = (e) => {
      if (onError) onError(e);
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };

    image.src = url;
    return image;
  }
}

export { ImageLoader };
