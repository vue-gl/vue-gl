import VglNamespace from './vgl-namespace.js';
import { WebGLRenderer } from './three.js';
import { string, boolean } from './constructor-arrays.js';

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
    powerPreference: string,
    camera: string,
    scene: string,
    shadowMapEnabled: boolean,
  },
  data() {
    return {
      el: false,
    };
  },
  computed: {
    renderer() {
      const renderer = new WebGLRenderer({
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
      renderer.shadowMap.enabled = this.shadowMapEnabled;
      return renderer;
    },
    cameraObject() {
      return this.vglNamespace.cameras[this.camera];
    },
    sceneObject() {
      return this.vglNamespace.scenes[this.scene];
    },
    state() {
      return [this.renderer, this.cameraObject, this.sceneObject, this.el];
    },
  },
  watch: {
    state(after, before) {
      const [prevRenderer, prevCamera, prevScene, prevEl] = before;
      const [currRenderer, currCamera, currScene, currEl] = after;
      if (!prevEl && currEl) {
        this.$el.insertBefore(this.renderer.domElement, this.$el.firstChild);
        this.resizeRenderer();
        if (currCamera && currScene) {
          this.resizeCamera();
          currCamera.addEventListener('update', this.render);
          currScene.addEventListener('update', this.render);
          this.render();
        }
      } else if (currEl) {
        if (prevRenderer !== currRenderer) {
          this.resizeRenderer();
          this.$el.replaceChild(currRenderer.domElement, prevRenderer.domElement);
          prevRenderer.dispose();
        }
        if (prevCamera && prevScene && currCamera && currScene) {
          if (prevCamera !== currCamera) {
            this.resizeCamera();
            prevCamera.removeEventListener('update', this.render);
            currCamera.addEventListener('update', this.render);
          }
          if (prevScene !== currScene) {
            prevScene.removeEventListener('update', this.render);
            currScene.addEventListener('update', this.render);
          }
        } else if (prevCamera && prevScene) {
          prevCamera.removeEventListener('update', this.render);
          prevScene.removeEventListener('update', this.render);
        } else if (currCamera && currScene) {
          this.resizeCamera();
          currCamera.addEventListener('update', this.render);
          currScene.addEventListener('update', this.render);
        }
        if (currCamera && currScene) {
          this.render();
        }
      }
    },
  },
  beforeDestroy() {
    if (this.el && this.cameraObject && this.sceneObject) {
      this.cameraObject.removeEventListener('update', this.render);
      this.sceneObject.removeEventListener('update', this.render);
    }
    this.renderer.dispose();
  },
  methods: {
    resizeRenderer() {
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
    },
    resizeCamera() {
      if (this.cameraObject.isPerspectiveCamera) {
        Object.assign(this.cameraObject, {
          aspect: this.$el.clientWidth / this.$el.clientHeight,
        });
      } else if (this.cameraObject.isOrthographicCamera) {
        Object.assign(this.cameraObject, {
          left: this.$el.clientWidth / -2,
          right: this.$el.clientWidth / 2,
          top: this.$el.clientHeight / 2,
          bottom: this.$el.clientHeight / -2,
        });
      } else {
        throw new TypeError('Unexpected camera type.');
      }
      this.cameraObject.updateProjectionMatrix();
    },
    render() {
      this.renderer.render(this.sceneObject, this.cameraObject);
    },
  },
  mounted() {
    this.el = true;
  },
  render(h) {
    return h('div', [
      h('iframe', {
        style: { visibility: 'hidden', width: '100%', height: '100%' },
        on: {
          load: (event) => {
            event.target.contentWindow.addEventListener('resize', () => {
              this.resizeRenderer();
              if (this.cameraObject && this.sceneObject) {
                this.resizeCamera();
                this.render();
              }
            }, false);
          },
        },
      }, this.$slots.default),
    ]);
  },
};
