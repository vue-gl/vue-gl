import { WebGLRenderer } from 'three';
import VglNamespace from '../core/vgl-namespace';
import { boolean, string, name } from '../types';
import { validateName } from '../validators';
import { setCameraSize } from './utilities';

/**
 * This component creates a canvas that have WebGL context.
 * Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).
 *
 * Properties of [VglNamespace](../core/vgl-namespace) are also available as mixin.
 */

export default {
  mixins: [VglNamespace],
  props: {
    /** Name of the using camera. */
    camera: { type: name, required: true, validator: validateName },
    /** Name of the target scene. */
    scene: { type: name, required: true, validator: validateName },
    /** Whether the canvas contains an alpha (transparency) buffer or not. */
    alpha: boolean,
    /** Whether the renderer will assume that colors have premultiplied alpha. */
    disablePremultipliedAlpha: boolean,
    /** Whether to perform antialiasing. */
    antialias: boolean,
    /** Whether the drawing buffer has a stencil buffer of at least 8 bits. */
    disableStencil: boolean,
    /** Whether to preserve the buffers until manually cleared or overwritten. */
    preserveDrawingBuffer: boolean,
    /** Whether the drawing buffer has a depth buffer of at least 16 bits. */
    disableDepth: boolean,
    /** Whether to use a logarithmic depth buffer. */
    logarithmicDepthBuffer: boolean,
    /** If set, use shadow maps in the scene. */
    shadowMapEnabled: boolean,
    /** Shader precision. Can be "highp", "mediump" or "lowp". */
    precision: {
      type: string,
      validator: (v) => /^(highp|mediump|lowp)$/.test(v),
    },
    /**
     * A hint to the user agent indicating what configuration of GPU is suitable
     * for this WebGL context. Can be "high-performance", "low-power" or "default".
     */
    powerPreference: {
      type: string,
      validator: (v) => /^(high-performance|low-power|default)$/.test(v),
    },
  },
  computed: {
    /** The THREE.WebGLRenderer instance. */
    inst() {
      const inst = new WebGLRenderer({
        precision: this.precision,
        alpha: this.alpha,
        premultipliedAlpha: !this.disablePremultipliedAlpha,
        antialias: this.antialias,
        stencil: !this.disableStencil,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        depth: !this.disableDepth,
        logarithmicDepthBuffer: this.logarithmicDepthBuffer,
        powerPreference: this.powerPreference,
      });
      inst.shadowMap.enabled = this.shadowMapEnabled;
      return inst;
    },
  },
  methods: {
    /**
     * Set camera for rendering the scene. If canvas is already mounted, also calculates view size
     * or aspect ratio.
    */
    setCameraRef(camera) {
      this.cameraRef = camera;
      if (this.$el) {
        if (camera) setCameraSize(camera, this.$el.clientWidth, this.$el.clientHeight);
        this.requestRender(camera && this.sceneRef);
      }
    },
    /** Set scene to be rendered. */
    setSceneRef(scene) {
      this.sceneRef = scene;
      if (this.$el) this.requestRender(scene && this.cameraRef);
    },
    /** Set camera for rendering the scene when `camera` prop is undefined. */
    setFallbackCamera(cameras) {
      const keys = cameras.keys();
      this.setCameraRef(keys.length === 1 ? cameras.get(keys[0]) : undefined);
    },
    /** Set scene to be rendered when `scene` prop is undefined. */
    setFallbackScene(scenes) {
      const keys = scenes.keys();
      this.setSceneRef(keys.length === 1 ? scenes.get(keys[0]) : undefined);
    },
    /**
     * Call render function at next tick. Even if this method was called multiple times, it will be
     * render just once.
     */
    requestRender(...args) {
      if (!this.reservation) {
        this.$nextTick(() => {
          if (this.reservation > 0) {
            this.inst.render(this.sceneRef, this.cameraRef);
          } else if (!this.cameraRef && this.vglNamespace.cameras.keys().length) {
            if (this.camera === undefined) {
              const { length } = this.vglNamespace.cameras.keys();
              throw new ReferenceError(
                `Cannot identify the camera. Multiple(${length}) cameras are defined but camera prop is not given.`,
              );
            } else {
              throw new ReferenceError(
                `Cannot identify the camera. The camera named ${this.camera} is not defined.`,
              );
            }
          } else if (!this.sceneRef && this.vglNamespace.scenes.keys().length) {
            if (this.scene === undefined) {
              const { length } = this.vglNamespace.cameras.keys();
              throw new ReferenceError(
                `Cannot identify the scene. Multiple(${length}) scenes are defined but scene prop is not given.`,
              );
            } else {
              throw new ReferenceError(
                `Cannot identify the scene. The scene named ${this.scene} is not defined.`,
              );
            }
          }
          this.reservation = 0;
        });
      }
      this.reservation = !args.length || args[0] ? 1 : -1;
    },
  },
  mounted() {
    this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
    this.$el.appendChild(this.inst.domElement);
    if (this.cameraRef) setCameraSize(this.cameraRef, this.$el.clientWidth, this.$el.clientHeight);
    this.requestRender(this.cameraRef && this.sceneRef);
  },
  beforeDestroy() {
    if (this.camera === undefined) {
      this.vglNamespace.cameras.unlisten(this.setFallbackCamera);
    } else {
      this.vglNamespace.cameras.unlisten(this.camera, this.setCameraRef);
    }
    if (this.scene === undefined) {
      this.vglNamespace.scenes.unlisten(this.setFallbackScene);
    } else {
      this.vglNamespace.scenes.unlisten(this.scene, this.setSceneRef);
    }
    this.inst.dispose();
  },
  watch: {
    inst(inst, oldInst) {
      if (this.$el) {
        inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
        this.$el.replaceChild(inst.domElement, oldInst.domElement);
        if (this.cameraRef && this.sceneRef) this.requestRender();
      }
      oldInst.dispose();
    },
    camera: {
      handler(camera, oldCamera) {
        if (oldCamera === undefined) {
          this.vglNamespace.cameras.unlisten(this.setFallbackCamera);
        } else {
          this.vglNamespace.cameras.unlisten(oldCamera, this.setCameraRef);
        }
        if (camera === undefined) {
          this.vglNamespace.cameras.listen(this.setFallbackCamera);
          this.setFallbackCamera(this.vglNamespace.cameras);
        } else {
          this.vglNamespace.cameras.listen(camera, this.setCameraRef);
          this.setCameraRef(this.vglNamespace.cameras.get(camera));
        }
      },
      immediate: true,
    },
    scene: {
      handler(scene, oldScene) {
        if (oldScene === undefined) {
          this.vglNamespace.scenes.unlisten(this.setFallbackScene);
        } else {
          this.vglNamespace.scenes.unlisten(oldScene, this.setSceneRef);
        }
        if (scene === undefined) {
          this.vglNamespace.scenes.listen(this.setFallbackScene);
          this.setFallbackScene(this.vglNamespace.scenes);
        } else {
          this.vglNamespace.scenes.listen(scene, this.setSceneRef);
          this.setSceneRef(this.vglNamespace.scenes.get(scene));
        }
      },
      immediate: true,
    },
  },
  render(h) {
    return h('div', [h('iframe', {
      style: {
        visibility: 'hidden',
        width: '100%',
        height: '100%',
        marginRight: '-100%',
        border: 'none',
      },
      on: {
        load: (event) => {
          event.target.contentWindow.addEventListener('resize', () => {
            this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
            if (this.cameraRef) {
              setCameraSize(this.cameraRef, this.$el.clientWidth, this.$el.clientHeight);
              if (this.sceneRef) this.requestRender();
            }
          }, false);
        },
      },
    }, this.$slots.default)]);
  },
};
