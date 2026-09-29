/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - VessertID.js
 * The master rendering orchestrator for the VessertID social graph engine.
 * Parallels Three.js WebGLRenderer.
 */

import { Frustum } from '../math/Frustum.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Vector4 } from '../math/Vector4.js';
import { Color } from '../math/Color.js';
import { createElementNS } from '../utils.js';

const _projScreenMatrix = new Matrix4();
const _frustum = new Frustum();

class VessertID {
  constructor(parameters = {}) {
    this.isVessertID = true;

    const _canvas = parameters.canvas !== undefined ? parameters.canvas : createElementNS('canvas');
    this.domElement = _canvas;

    this.autoClear = true;
    this.autoClearColor = true;
    this.autoClearLayering = true;
    this.autoClearStencil = true;

    this.sortNodes = true;

    this._width = _canvas.width;
    this._height = _canvas.height;
    this._pixelRatio = 1;

    this._viewport = new Vector4(0, 0, this._width, this._height);
    this._scissor = new Vector4(0, 0, this._width, this._height);
    this._scissorTest = false;

    this._clearColor = new Color(0x000000);
    this._clearAlpha = 0;

    // Subsystems
    this.info = {
      render: {
        calls: 0,
        frame: 0,
        nodes: 0,
        cards: 0,
        signals: 0,
        culled: 0
      },
      memory: {
        layouts: 0,
        skins: 0,
        media: 0
      }
    };

    this.initRenderContext();
  }

  initRenderContext() {
    // Initializes subsystems in strict deterministic order
    this._renderList = [];
    this._signalList = [];
  }

  getContext() {
    return this.domElement.getContext ? this.domElement.getContext('2d') : null;
  }

  getPixelRatio() {
    return this._pixelRatio;
  }

  setPixelRatio(value) {
    if (value === undefined) return;
    this._pixelRatio = value;
    this.setSize(this._width, this._height, false);
  }

  getSize(target) {
    return target.set(this._width, this._height);
  }

  setSize(width, height, updateStyle = true) {
    this._width = width;
    this._height = height;

    this.domElement.width = Math.floor(width * this._pixelRatio);
    this.domElement.height = Math.floor(height * this._pixelRatio);

    if (updateStyle !== false) {
      this.domElement.style.width = width + 'px';
      this.domElement.style.height = height + 'px';
    }

    this.setViewport(0, 0, width, height);
  }

  setViewport(x, y, width, height) {
    this._viewport.set(x, y, width, height);
  }

  setScissor(x, y, width, height) {
    this._scissor.set(x, y, width, height);
  }

  setScissorTest(boolean) {
    this._scissorTest = boolean;
  }

  getClearColor(target) {
    return target.copy(this._clearColor);
  }

  setClearColor(color, alpha = 1) {
    this._clearColor.set(color);
    this._clearAlpha = alpha;
  }

  clear(color = true, layering = true, stencil = true) {
    // Base clear operation
  }

  render(surface, lens) {
    if (lens === undefined) {
      console.error('VessertID.render: lens is not defined.');
      return;
    }

    if (surface.matrixWorldAutoUpdate === true) surface.updateMatrixWorld();

    if (lens.parent === null && lens.matrixWorldAutoUpdate === true) lens.updateMatrixWorld();

    _projScreenMatrix.multiplyMatrices(lens.projectionMatrix, lens.matrixWorldInverse);
    _frustum.setFromProjectionMatrix(_projScreenMatrix);

    this.info.render.frame++;
    this.info.render.calls = 0;
    this.info.render.nodes = 0;
    this.info.render.cards = 0;
    this.info.render.signals = 0;
    this.info.render.culled = 0;

    this._renderList = [];
    this._signalList = [];

    this.projectNode(surface, lens, 0);

    if (this.sortNodes === true) {
      this._renderList.sort((a, b) => a.renderOrder - b.renderOrder);
    }

    // Execute render passes
    this.renderNodes(this._renderList, surface, lens);
  }

  projectNode(node, lens, sortOrder) {
    if (node.visible === false) return;

    const visible = node.layers.test(lens.layers);

    if (visible) {
      if (node.isSignal) {
        this._signalList.push(node);
        this.info.render.signals++;
      } else if (node.isCard) {
        if (node.frustumCulled === false || _frustum.intersectsBox(node.layout.boundingBox || _defaultBox)) {
          this._renderList.push(node);
          this.info.render.cards++;
        } else {
          this.info.render.culled++;
        }
      }

      this.info.render.nodes++;
    }

    const children = node.children;
    for (let i = 0, l = children.length; i < l; i++) {
      this.projectNode(children[i], lens, sortOrder);
    }
  }

  renderNodes(renderList, surface, lens) {
    for (let i = 0, l = renderList.length; i < l; i++) {
      const card = renderList[i];
      this.renderCard(card, surface, lens);
      this.info.render.calls++;
    }
  }

  renderCard(card, surface, lens) {
    // Output draw call to target surface
  }

  dispose() {
    this._renderList = [];
    this._signalList = [];
  }
}

const _defaultBox = {
  min: { x: -Infinity, y: -Infinity, z: -Infinity },
  max: { x: Infinity, y: Infinity, z: Infinity },
  intersectsBox: () => true
};

export { VessertID };
