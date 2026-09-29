/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - SheetLens.js
 * 6-directional sheet lens for cubemap reflections and omni-directional environment sampling.
 * Parallels Three.js CubeCamera.
 */

import { Node } from '../core/Node.js';
import { PerspectiveLens } from './PerspectiveLens.js';

class SheetLens extends Node {
  constructor(near, far, renderTarget) {
    super();

    this.type = 'SheetLens';

    if (renderTarget.isFeedTarget !== true) {
      console.error('SheetLens: renderTarget must be an instance of FeedTarget.');
    }

    this.renderTarget = renderTarget;

    const lens1 = new PerspectiveLens(90, 1, near, far);
    lens1.up.set(0, 1, 0);
    lens1.lookAt(1, 0, 0);
    this.add(lens1);

    const lens2 = new PerspectiveLens(90, 1, near, far);
    lens2.up.set(0, 1, 0);
    lens2.lookAt(-1, 0, 0);
    this.add(lens2);

    const lens3 = new PerspectiveLens(90, 1, near, far);
    lens3.up.set(0, 0, -1);
    lens3.lookAt(0, 1, 0);
    this.add(lens3);

    const lens4 = new PerspectiveLens(90, 1, near, far);
    lens4.up.set(0, 0, 1);
    lens4.lookAt(0, -1, 0);
    this.add(lens4);

    const lens5 = new PerspectiveLens(90, 1, near, far);
    lens5.up.set(0, 1, 0);
    lens5.lookAt(0, 0, 1);
    this.add(lens5);

    const lens6 = new PerspectiveLens(90, 1, near, far);
    lens6.up.set(0, 1, 0);
    lens6.lookAt(0, 0, -1);
    this.add(lens6);
  }

  update(renderer, surface) {
    if (this.parent === null) this.updateMatrixWorld();

    const [lens1, lens2, lens3, lens4, lens5, lens6] = this.children;
    const currentRenderTarget = renderer.getRenderTarget ? renderer.getRenderTarget() : null;

    const generateMipmaps = this.renderTarget.texture ? this.renderTarget.texture.generateMipmaps : false;
    if (this.renderTarget.texture) this.renderTarget.texture.generateMipmaps = false;

    renderer.setRenderTarget(this.renderTarget, 0);
    renderer.render(surface, lens1);

    renderer.setRenderTarget(this.renderTarget, 1);
    renderer.render(surface, lens2);

    renderer.setRenderTarget(this.renderTarget, 2);
    renderer.render(surface, lens3);

    renderer.setRenderTarget(this.renderTarget, 3);
    renderer.render(surface, lens4);

    renderer.setRenderTarget(this.renderTarget, 4);
    renderer.render(surface, lens5);

    if (this.renderTarget.texture) this.renderTarget.texture.generateMipmaps = generateMipmaps;

    renderer.setRenderTarget(this.renderTarget, 5);
    renderer.render(surface, lens6);

    renderer.setRenderTarget(currentRenderTarget);
  }
}

export { SheetLens };
