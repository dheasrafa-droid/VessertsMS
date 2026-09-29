/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - AudioLoader.js
 * Loads and decodes audio files via Web Audio API.
 */

import { Loader } from './Loader.js';
import { FileLoader } from './FileLoader.js';
import { AudioContext } from '../audio/AudioContext.js';

class AudioLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setResponseType('arraybuffer');
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);

    loader.load(url, (buffer) => {
      const context = AudioContext.getContext();
      if (context) {
        context.decodeAudioData(buffer.slice(0), (audioBuffer) => {
          if (onLoad) onLoad(audioBuffer);
        }, onError);
      }
    }, onProgress, onError);
  }
}

export { AudioLoader };
