/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - MediaLoader.js
 * High-level loader creating Media instances from image URLs.
 * Parallels Three.js TextureLoader.
 */

import { Loader } from './Loader.js';
import { ImageLoader } from './ImageLoader.js';
import { Media } from '../media/Media.js';

class MediaLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const media = new Media();
    const loader = new ImageLoader(this.manager);
    loader.setCrossOrigin(this.crossOrigin);
    loader.setPath(this.path);

    loader.load(url, function (image) {
      media.image = image;
      media.needsUpdate = true;
      if (onLoad) onLoad(media);
    }, onProgress, onError);

    return media;
  }
}

export { MediaLoader };
