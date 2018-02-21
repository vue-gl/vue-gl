import VglNamespace from './vgl-namespace.js';
import { WebGLRenderer } from './three.js';
import { boolean, string } from './validators.js';
import { cameras, scenes } from './object-stores.js';

function resizeCamera(camera, domElement) {
  const width = domElement.clientWidth;
  const height = domElement.clientHeight;
  if (camera.isPerspectiveCamera) {
    Object.assign(camera, { aspect: width / height });
  } else { // isOrthographicCamera
    Object.assign(camera, {
      left: width / -2,
      right: width / 2,
      top: height / 2,
      bottom: height / -2,
    });
  }
  camera.updateProjectionMatrix();
}

function resizeRenderer(renderer, domElement) {
  renderer.setSize(domElement.clientWidth, domElement.clientHeight, false);
}

export default {
  mixins: [VglNamespace],
  props: {
    precision: string,
    alpha: boolean,
    disablePremultipliedAlpha: boolean,
    antialias: boolean,
    disableStencil: boolean,
    preserveDrawingBuffer: boolean,
    disableDepth: boolean,
    logarithmicDepthBuffer: boolean,
    camera: string,
    scene: string,
    shadowMapEnabled: boolean,
  },
  provide() {
    return {
      vglUpdate: this.render,
    };
  },
  data() {
    return {
      key: 0,
      req: true,
    };
  },
  computed: {
    opt() {
      return {
        precision: this.precision,
        alpha: this.alpha,
        premultipliedAlpha: !this.disablePremultipliedAlpha,
        antialias: this.antialias,
        stencil: !this.disableStencil,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        depth: !this.disableDepth,
        logarithmicDepthBuffer: this.logarithmicDepthBuffer,
      };
    },
    inst() {
      return new WebGLRenderer(Object.assign({
        canvas: this.$refs.rdr,
      }, this.opt));
    },
    cmr() {
      return cameras[this.vglCameras.forGet[this.camera]];
    },
    scn() {
      return scenes[this.vglScenes.forGet[this.scene]];
    },
  },
  methods: {
    resize() {
      resizeRenderer(this.inst, this.$el);
      if (this.cmr) {
        resizeCamera(this.cmr, this.$el);
        if (this.scn) this.render();
      }
    },
    render() {
      if (this.req) {
        this.$nextTick(() => {
          if (this.scn && this.cmr) {
            this.inst.render(this.scn, this.cmr);
          }
          this.req = true;
        });
        this.req = false;
      }
    },
    init() {
      this.resize();
      this.inst.shadowMap.enabled = this.shadowMapEnabled;
    },
  },
  watch: {
    opt() {
      this.key += 1;
      this.$nextTick(this.init);
    },
    scn(scn, oldScn) {
      if (oldScn) oldScn.removeEventListener('update', this.render);
      if (scn) {
        scn.addEventListener('update', this.render);
        this.render();
      }
    },
    cmr(cmr, oldCmr) {
      if (oldCmr) oldCmr.removeEventListener('update', this.render);
      if (cmr) {
        cmr.addEventListener('update', this.render);
        resizeCamera(cmr, this.$el);
        this.render();
      }
    },
    shadowMapEnabled(enabled) {
      this.inst.shadowMap.enabled = enabled;
    },
  },
  created() {
    if (this.scn) this.scn.addEventListener('update', this.render);
    if (this.cmr) this.cmr.addEventListener('update', this.render);
  },
  mounted() {
    this.init();
  },
  render(h) {
    return h('div', [
      h('canvas', {
        ref: 'rdr',
        key: this.key,
      }, this.$slots.default),
      h('iframe', {
        ref: 'frm',
        style: {
          visibility: 'hidden',
          width: '100%',
          height: '100%',
        },
        on: {
          load: (evt) => {
            evt.target.contentWindow.addEventListener('resize', this.resize, false);
          },
        },
      }),
    ]);
  },
};
