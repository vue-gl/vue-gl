import VglNamespace from './vgl-namespace.js';
import { WebGLRenderer } from './three.js';
import { boolean, string } from './validators.js';

export default {
  mixins: [VglNamespace],
  props: {
    precision: string,
    alpha: boolean,
    disablePremultipliedAlpha: boolean,
    antialias: boolean,
    disableStencil: boolean,
    powerPreference: string,
    preserveDrawingBuffer: boolean,
    disableDepth: boolean,
    logarithmicDepthBuffer: boolean,
    camera: string,
    scene: string,
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
    resize() {
      this.inst.setSize(this.$el.clientWidth, this.$el.clientHeight);
      this.vglNamespace.update();
    },
    render() {
      if (this.vglNamespace.scenes[this.scene] && this.vglNamespace.cameras[this.camera]) {
        if (this.vglNamespace.cameras[this.camera].isPerspectiveCamera) {
          const aspect = this.$el.clientWidth / this.$el.clientHeight;
          if (this.vglNamespace.cameras[this.camera].aspect !== aspect) {
            this.vglNamespace.cameras[this.camera].aspect = aspect;
            this.vglNamespace.cameras[this.camera].updateProjectionMatrix();
          }
        } else if (this.vglNamespace.cameras[this.camera].isOrthographicCamera) {
          const width = this.$el.clientWidth / 2;
          const height = this.$el.clientHeight / 2;
          if (this.vglNamespace.cameras[this.camera].left !== -width || this.vglNamespace.cameras[this.camera].top !== height) {
            this.vglNamespace.cameras[this.camera].left = -width;
            this.vglNamespace.cameras[this.camera].right = width;
            this.vglNamespace.cameras[this.camera].top = height;
            this.vglNamespace.cameras[this.camera].bottom = -height;
            this.vglNamespace.cameras[this.camera].updateProjectionMatrix();
          }
        } else {
          throw new TypeError('Unknown camera type.');
        }
        this.inst.render(
          this.vglNamespace.scenes[this.scene],
          this.vglNamespace.cameras[this.camera],
        );
      }
    },
  },
  watch: {
    inst(inst, oldInst) {
      if (this.$el) this.$el.replaceChild(inst.domElement, oldInst.domElement);
      oldInst.dispose();
    },
  },
  created() {
    this.vglNamespace.renderers.push(this);
  },
  mounted() {
    this.$el.insertBefore(this.inst.domElement, this.$el.firstChild);
    this.resize();
  },
  beforeDestroy() {
    this.vglNamespace.renderers.splice(this.vglNamespace.renderers.indexOf(this), 1);
  },
  render(h) {
    return h('div', [h('iframe', {
      style: { visibility: 'hidden', width: '100%', height: '100%' },
      on: {
        load: (evt) => {
          evt.target.contentWindow.addEventListener('resize', this.resize, false);
        },
      },
    }, this.$slots.default)]);
  },
};
