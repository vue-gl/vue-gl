import VglNamespace from '../core/vgl-namespace.js';
import { WebGLRenderer } from '../three.js';
import { boolean, string } from '../validators.js';

/**
 * This component creates a canvas that have WebGL context.
 * Options are corresponding [THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/core/Object3D).
 *
 * Properties of [VglNamespace](vgl-namespace) are also available as mixin.
 */

export default {
  mixins: [VglNamespace],
  props: {
    /** Shader precision. Can be "highp", "mediump" or "lowp". */
    precision: string,
    /** Whether the canvas contains an alpha (transparency) buffer or not. */
    alpha: boolean,
    /** Whether the renderer will assume that colors have premultiplied alpha. */
    disablePremultipliedAlpha: boolean,
    /** Whether to perform antialiasing. */
    antialias: boolean,
    /** Whether the drawing buffer has a stencil buffer of at least 8 bits. */
    disableStencil: boolean,
    /**
     * A hint to the user agent indicating what configuration of GPU is suitable
     * for this WebGL context. Can be "high-performance", "low-power" or "default".
     */
    powerPreference: string,
    /** Whether to preserve the buffers until manually cleared or overwritten. */
    preserveDrawingBuffer: boolean,
    /** Whether the drawing buffer has a depth buffer of at least 16 bits. */
    disableDepth: boolean,
    /** Whether to use a logarithmic depth buffer. */
    logarithmicDepthBuffer: boolean,
    /** Name of the using camera. */
    camera: string,
    /** Name of the target scene. */
    scene: string,
    /** If set, use shadow maps in the scene. */
    shadowMapEnabled: boolean,
  },
  computed: {
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
    render() {
      const scene = this.vglNamespace.scenes[this.scene];
      const camera = this.vglNamespace.cameras[this.camera];
      if (scene && camera) {
        if (camera.isPerspectiveCamera) {
          const aspect = this.$el.clientWidth / this.$el.clientHeight;
          if (camera.aspect !== aspect) {
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
          }
        } else if (camera.isOrthographicCamera) {
          const width = this.$el.clientWidth / 2;
          const height = this.$el.clientHeight / 2;
          if (camera.right !== width || camera.top !== height) {
            camera.left = -width;
            camera.right = width;
            camera.top = height;
            camera.bottom = -height;
            camera.updateProjectionMatrix();
          }
        } else {
          throw new TypeError('Unknown camera type.');
        }
        this.inst.render(scene, camera);
      }
    },
  },
  watch: {
    inst(inst, oldInst) {
      if (this.$el) {
        inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
        this.$el.replaceChild(inst.domElement, oldInst.domElement);
        this.vglNamespace.update();
      }
      oldInst.dispose();
    },
  },
  created() {
    this.vglNamespace.renderers.push(this);
  },
  mounted() {
    this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
    this.$el.insertBefore(this.inst.domElement, this.$el.firstChild);
    this.vglNamespace.update();
  },
  beforeDestroy() {
    this.vglNamespace.renderers.splice(this.vglNamespace.renderers.indexOf(this), 1);
    this.inst.dispose();
  },
  render(h) {
    return h('div', [h('iframe', {
      style: { visibility: 'hidden', width: '100%', height: '100%' },
      on: {
        load: (event) => {
          event.target.contentWindow.addEventListener('resize', () => {
            this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
            this.vglNamespace.update();
          }, false);
        },
      },
    }, this.$slots.default)]);
  },
};
