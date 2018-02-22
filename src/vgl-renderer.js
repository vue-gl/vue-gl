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
