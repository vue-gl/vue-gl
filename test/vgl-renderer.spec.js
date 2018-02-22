describe('VglRenderer:', function suite() {
  const { VglRenderer, VglPerspectiveCamera, VglScene } = VueGL;
  const { expect } = chai;
  before(function hook(done) {
    this.WebGLRenderer = THREE.WebGLRenderer;
    THREE.WebGLRenderer = function WebGLRenderer(parameters = {}) {
      this.domElement = parameters.canvas || document.createElement('canvas');
      this.shadowMap = {};
      this.setSize = (width, height, updateStyle) => {};
      this.dispose = () => {};
      this.parameters = parameters;
      this.render = (scene, camera, renderTarget, forceClear) => {};
    };
    done();
  });
  after(function hook(done) {
    THREE.WebGLRenderer = this.WebGLRenderer;
    done();
  });
  it('mounted element should have a canvas', function test(done) {
    const vm = new Vue({
      template: '<vgl-renderer />',
      components: { VglRenderer },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const canvases = vm.$el.querySelectorAll('canvas');
        expect(canvases).to.have.lengthOf(1);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('canvas should be replaced when renderer is replaced', function test(done) {
    const vm = new Vue({
      template: '<vgl-renderer :antialias="antialias" />',
      components: { VglRenderer },
      data: { antialias: true },
    }).$mount();
    vm.$nextTick(() => {
      const previousCanvas = vm.$el.querySelector('canvas');
      vm.antialias = false;
      vm.$nextTick(() => {
        try {
          const canvases = vm.$el.querySelectorAll('canvas');
          expect(canvases).to.have.lengthOf(1);
          expect(canvases[0]).to.not.equal(previousCanvas);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after created without properties', function test(done) {
    const defaultParameters = {
      context: null,
      precision: 'highp',
      alpha: false,
      premultipliedAlpha: true,
      antialias: false,
      stencil: true,
      preserveDrawingBuffer: false,
      powerPreference: 'default',
      depth: true,
      logarithmicDepthBuffer: false,
    };
    const vm = new Vue(VglRenderer);
    vm.$nextTick(() => {
      try {
        Object.keys(defaultParameters).forEach((key) => {
          if (vm.inst.parameters[key] !== undefined) {
            expect(vm.inst.parameters).to.have.property(key, defaultParameters[key]);
          }
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after created with properties', function test(done) {
    const expectedParameters = {
      precision: 'mediump',
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
      depth: false,
      logarithmicDepthBuffer: true,
    };
    const vm = new (Vue.extend(VglRenderer))({
      propsData: {
        precision: 'mediump',
        alpha: true,
        disablePremultipliedAlpha: true,
        antialias: true,
        disableStencil: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        disableDepth: true,
        logarithmicDepthBuffer: true,
      },
    });
    vm.$nextTick(() => {
      try {
        expect(vm.inst.parameters).to.include(expectedParameters);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
