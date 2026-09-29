/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AnimationLoader.js
 * Serializer/deserializer for animation clips.
 */

import { Loader } from './Loader.js';
import { AnimationClip } from '../animation/AnimationClip.js';
import { FileLoader } from './FileLoader.js';

class AnimationLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('json');

    loader.load(url, function (text) {
      if (onLoad) onLoad(scope.parse(text));
    }, onProgress, onError);
  }

  parse(json) {
    const animations = [];
    for (let i = 0; i < json.length; i++) {
      const clip = new AnimationClip(json[i].name, json[i].duration);
      animations.push(clip);
    }
    return animations;
  }
}

export { AnimationLoader };
