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
      });
      inst.shadowMap.enabled = this.shadowMapEnabled;
      return inst;
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
    render: (() => {
      let req = true;
      return function render() {
        if (req) {
          this.$nextTick(() => {
            if (this.scn && this.cmr) {
              this.inst.render(this.scn, this.cmr);
            }
            req = true;
          });
          req = false;
        }
      };
    })(),
  },
  watch: {
    inst(inst, oldInst) {
      if (this.$el) this.$el.replaceChild(inst.domElement, oldInst.domElement);
      oldInst.dispose();
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
  },
  created() {
    if (this.scn) this.scn.addEventListener('update', this.render);
    if (this.cmr) this.cmr.addEventListener('update', this.render);
  },
  mounted() {
    this.$el.insertBefore(this.inst.domElement, this.$el.firstChild);
    this.resize();
  },
  render(h) {
    return h('div', [
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
      }, this.$slots.default),
    ]);
  },
};
