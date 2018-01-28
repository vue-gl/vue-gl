describe('VglRenderer:', function component() {
  const { VglRenderer, VglPerspectiveCamera, VglScene } = VueGL;
  const { expect } = chai;
  function after10ticks(vm, callback, count = 10) {
    vm.$nextTick(count > 0 ? () => { after10ticks(vm, callback, count - 1); } : callback);
  }
  describe('The renderer should be constructed with passed properties', function suite() {
    let constructorOptionsHistory;
    let optionSetHistory;
    before(function hook(done) {
      this.WebGLRenderer = THREE.WebGLRenderer;
      THREE.WebGLRenderer = class {
        constructor(...params) {
          constructorOptionsHistory.push(params);
          this.shadowMap = {
            set enabled(val) { optionSetHistory.push({ 'shadowMap.enabled': val }); },
          };
          this.domElement = document.createElement('canvas');
          this.setSize = () => {};
          this.dispose = () => {};
        }
      };
      done();
    });
    after(function hook(done) {
      THREE.WebGLRenderer = this.WebGLRenderer;
      done();
    });
    beforeEach(function hook(done) {
      constructorOptionsHistory = [];
      optionSetHistory = [];
      done();
    });
    it('without properties', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer />',
        components: { VglRenderer },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(constructorOptionsHistory).to.have.lengthOf(1);
          expect(constructorOptionsHistory[0]).to.have.lengthOf.at.most(1);
          if (constructorOptionsHistory[0].length === 1) {
            const [actualOptions] = constructorOptionsHistory[0];
            expect(actualOptions).not.to.have.property('canvas');
            expect(actualOptions).not.to.have.property('context');
            if ('precision' in actualOptions) {
              expect(actualOptions.precision).to.be.oneOf(['highp', undefined]);
            }
            if ('alpha' in actualOptions) {
              expect(actualOptions.alpha).to.be.oneOf([false, undefined]);
            }
            if ('antialias' in actualOptions) {
              expect(actualOptions.antialias).to.be.oneOf([false, undefined]);
            }
            if ('premultipliedAlpha' in actualOptions) {
              expect(actualOptions.premultipliedAlpha).to.be.oneOf([true, undefined]);
            }
            if ('stencil' in actualOptions) {
              expect(actualOptions.stencil).to.be.oneOf([true, undefined]);
            }
            if ('preserveDrawingBuffer' in actualOptions) {
              expect(actualOptions.preserveDrawingBuffer).to.be.oneOf([false, undefined]);
            }
            if ('powerPreference' in actualOptions) {
              expect(actualOptions.powerPreference).to.be.oneOf(['default', undefined]);
            }
            if ('depth' in actualOptions) {
              expect(actualOptions.depth).to.be.oneOf([true, undefined]);
            }
            if ('logarithmicDepthBuffer' in actualOptions) {
              expect(actualOptions.logarithmicDepthBuffer).to.be.oneOf([false, undefined]);
            }
          }
          expect(optionSetHistory).to.have.lengthOf.at.most(1);
          if (optionSetHistory.length === 1) {
            expect(optionSetHistory[0]).to.deep.equal({ 'shadowMap.enabled': false });
          }
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('with properties', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer precision="mediump" alpha antialias disable-premultiplied-alpha disable-stencil preserve-drawing-buffer power-preference="low-power" disable-depth logarithmic-depth-buffer shadow-map-enabled />',
        components: { VglRenderer },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(constructorOptionsHistory).to.have.lengthOf(1);
          expect(constructorOptionsHistory[0]).to.have.lengthOf(1);
          const [actualOptions] = constructorOptionsHistory[0];
          expect(actualOptions).not.to.have.property('canvas');
          expect(actualOptions).not.to.have.property('context');
          expect(actualOptions).to.have.property('precision', 'mediump');
          expect(actualOptions).to.have.property('alpha', true);
          expect(actualOptions).to.have.property('antialias', true);
          expect(actualOptions).to.have.property('premultipliedAlpha', false);
          expect(actualOptions).to.have.property('stencil', false);
          expect(actualOptions).to.have.property('preserveDrawingBuffer', true);
          expect(actualOptions).to.have.property('powerPreference', 'low-power');
          expect(actualOptions).to.have.property('depth', false);
          expect(actualOptions).to.have.property('logarithmicDepthBuffer', true);
          expect(optionSetHistory).to.have.lengthOf(1);
          expect(optionSetHistory[0]).to.deep.equal({ 'shadowMap.enabled': true });
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after properties are changed', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :antialias="aa" :power-preference="pp" :shadow-map-enabled="sme" />',
        components: { VglRenderer },
        data: { aa: false, pp: 'default', sme: false },
      }).$mount();
      vm.$nextTick(() => {
        vm.aa = true;
        vm.pp = 'high-performance';
        vm.sme = true;
        after10ticks(vm, () => {
          try {
            expect(constructorOptionsHistory).to.have.lengthOf(2);
            expect(constructorOptionsHistory[0]).to.have.lengthOf(1);
            const [actualOptions1] = constructorOptionsHistory[0];
            expect(actualOptions1).not.to.have.property('canvas');
            expect(actualOptions1).not.to.have.property('context');
            expect(actualOptions1).to.have.property('antialias', false);
            expect(actualOptions1).to.have.property('powerPreference', 'default');
            if ('precision' in actualOptions1) {
              expect(actualOptions1.precision).to.be.oneOf(['highp', undefined]);
            }
            if ('alpha' in actualOptions1) {
              expect(actualOptions1.alpha).to.be.oneOf([false, undefined]);
            }
            if ('premultipliedAlpha' in actualOptions1) {
              expect(actualOptions1.premultipliedAlpha).to.be.oneOf([true, undefined]);
            }
            if ('stencil' in actualOptions1) {
              expect(actualOptions1.stencil).to.be.oneOf([true, undefined]);
            }
            if ('preserveDrawingBuffer' in actualOptions1) {
              expect(actualOptions1.preserveDrawingBuffer).to.be.oneOf([false, undefined]);
            }
            if ('depth' in actualOptions1) {
              expect(actualOptions1.depth).to.be.oneOf([true, undefined]);
            }
            if ('logarithmicDepthBuffer' in actualOptions1) {
              expect(actualOptions1.logarithmicDepthBuffer).to.be.oneOf([false, undefined]);
            }

            const [actualOptions2] = constructorOptionsHistory[1];
            expect(actualOptions2).not.to.have.property('canvas');
            expect(actualOptions2).not.to.have.property('context');
            expect(actualOptions2).to.have.property('antialias', true);
            expect(actualOptions2).to.have.property('powerPreference', 'high-performance');
            if ('precision' in actualOptions2) {
              expect(actualOptions2.precision).to.be.oneOf(['highp', undefined]);
            }
            if ('alpha' in actualOptions2) {
              expect(actualOptions2.alpha).to.be.oneOf([false, undefined]);
            }
            if ('premultipliedAlpha' in actualOptions2) {
              expect(actualOptions2.premultipliedAlpha).to.be.oneOf([true, undefined]);
            }
            if ('stencil' in actualOptions2) {
              expect(actualOptions2.stencil).to.be.oneOf([true, undefined]);
            }
            if ('preserveDrawingBuffer' in actualOptions2) {
              expect(actualOptions2.preserveDrawingBuffer).to.be.oneOf([false, undefined]);
            }
            if ('depth' in actualOptions2) {
              expect(actualOptions2.depth).to.be.oneOf([true, undefined]);
            }
            if ('logarithmicDepthBuffer' in actualOptions2) {
              expect(actualOptions2.logarithmicDepthBuffer).to.be.oneOf([false, undefined]);
            }
            expect(optionSetHistory).to.have.lengthOf(2);
            expect(optionSetHistory[0]).to.deep.equal({ 'shadowMap.enabled': false });
            expect(optionSetHistory[1]).to.deep.equal({ 'shadowMap.enabled': true });
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Canvas element should be added or replaced', function suite() {
    let historicalCanvases;
    before(function hook(done) {
      this.WebGLRenderer = THREE.WebGLRenderer;
      THREE.WebGLRenderer = class {
        constructor() {
          this.shadowMap = {};
          this.setSize = () => {};
          this.dispose = () => {};
          this.domElement = document.createElement('canvas');
          historicalCanvases.push(this.domElement);
        }
      };
      done();
    });
    after(function hook(done) {
      THREE.WebGLRenderer = this.WebGLRenderer;
      done();
    });
    beforeEach(function hook(done) {
      historicalCanvases = [];
      done();
    });
    it('after mounted', function test(done) {
      const vm = new Vue(VglRenderer).$mount();
      after10ticks(vm, () => {
        try {
          expect(historicalCanvases).to.have.lengthOf(1);
          expect(vm.$el.querySelector('canvas')).to.equal(historicalCanvases[0]);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after some properties are changed', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :antialias="aa" :power-preference="pp" />',
        components: { VglRenderer },
        data: { aa: true, pp: 'high-performance' },
      }).$mount();
      vm.$nextTick(() => {
        vm.aa = false;
        vm.pp = 'low-power';
        after10ticks(vm, () => {
          try {
            expect(historicalCanvases).to.have.lengthOf(2);
            expect(historicalCanvases[0]).not.to.equal(historicalCanvases[1]);
            expect(vm.$el.querySelector('canvas')).to.equal(historicalCanvases[1]);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The render function should be called appropriate times', function suite() {
    let renderHistory;
    before(function hook(done) {
      this.renderer = THREE.WebGLRenderer;
      THREE.WebGLRenderer = class {
        constructor() {
          this.shadowMap = {};
          this.domElement = document.createElement('canvas');
          this.setSize = () => {};
          this.dispose = () => {};
          this.render = (scene, camera) => { renderHistory.push({ scene, camera }); };
        }
      };
      done();
    });
    after(function hook(done) {
      THREE.WebGLRenderer = this.renderer;
      done();
    });
    beforeEach(function hook(done) {
      renderHistory = [];
      done();
    });
    it('when scene and camera do not exist', function test(done) {
      const vm = new Vue(VglRenderer).$mount();
      after10ticks(vm, () => {
        try {
          expect(renderHistory).to.have.lengthOf(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when scene does not exist', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer camera="c"><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: { VglRenderer, VglPerspectiveCamera },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(renderHistory).to.have.lengthOf(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when camera does not exist', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s"><vgl-scene name="s" /></vgl-renderer>',
        components: { VglRenderer, VglScene },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(renderHistory).to.have.lengthOf(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after mounted', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s" ref="s" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(renderHistory).to.have.lengthOf(1);
          expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
          expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after some properties are changed', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :antialias="aa" :pricision="pc" scene="s" camera="c"><vgl-scene name="s" ref="s" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { aa: false, pc: 'mediump' },
      }).$mount();
      vm.$nextTick(() => {
        vm.aa = true;
        vm.pc = 'highp';
        after10ticks(vm, () => {
          try {
            expect(renderHistory).to.have.lengthOf(2);
            expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
            expect(renderHistory[1]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after scene is replaced', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :scene="s" camera="c"><vgl-scene name="s1" ref="s1" /><vgl-scene name="s2" ref="s2" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { s: 's1' },
      }).$mount();
      vm.$nextTick(() => {
        vm.s = 's2';
        after10ticks(vm, () => {
          try {
            expect(renderHistory).to.have.lengthOf(2);
            expect(renderHistory[0]).to.have.property('scene', vm.$refs.s1.inst);
            expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
            expect(renderHistory[1]).to.have.property('scene', vm.$refs.s2.inst);
            expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after scene and camera are replaced', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :scene="s" :camera="c"><vgl-scene name="s1" ref="s1" /><vgl-scene name="s2" ref="s2" /><vgl-perspective-camera name="c1" ref="c1" /><vgl-perspective-camera name="c2" ref="c2" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { c: 'c1', s: 's1' },
      }).$mount();
      vm.$nextTick(() => {
        vm.c = 'c2';
        vm.s = 's2';
        after10ticks(vm, () => {
          try {
            expect(renderHistory).to.have.lengthOf(2);
            expect(renderHistory[0]).to.have.property('scene', vm.$refs.s1.inst);
            expect(renderHistory[0]).to.have.property('camera', vm.$refs.c1.inst);
            expect(renderHistory[1]).to.have.property('scene', vm.$refs.s2.inst);
            expect(renderHistory[1]).to.have.property('camera', vm.$refs.c2.inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after scene emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s" ref="s" :position="position" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { position: '0 0 0' },
      }).$mount();
      vm.$nextTick(() => {
        vm.position = '1 1 1';
        after10ticks(vm, () => {
          try {
            expect(renderHistory).to.have.lengthOf(2);
            expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
            expect(renderHistory[1]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after camera emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s" ref="s" /><vgl-perspective-camera name="c" ref="c" :fov="fov" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { fov: 30 },
      }).$mount();
      vm.$nextTick(() => {
        vm.fov = 40;
        after10ticks(vm, () => {
          try {
            expect(renderHistory).to.have.lengthOf(2);
            expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
            expect(renderHistory[1]).to.have.property('scene', vm.$refs.s.inst);
            expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after scene is replaced then new scene emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :scene="s" camera="c"><vgl-scene name="s1" ref="s1" /><vgl-scene name="s2" ref="s2" :position="position" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { s: 's1', position: '0 0 0' },
      }).$mount();
      vm.$nextTick(() => {
        vm.s = 's2';
        vm.$nextTick(() => {
          vm.position = '1 1 1';
          after10ticks(vm, () => {
            try {
              expect(renderHistory).to.have.lengthOf(3);
              expect(renderHistory[0]).to.have.property('scene', vm.$refs.s1.inst);
              expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
              expect(renderHistory[1]).to.have.property('scene', vm.$refs.s2.inst);
              expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
              expect(renderHistory[2]).to.have.property('scene', vm.$refs.s2.inst);
              expect(renderHistory[2]).to.have.property('camera', vm.$refs.c.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('after camera is replaced then new camera emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" :camera="c"><vgl-scene name="s" ref="s" /><vgl-perspective-camera name="c1" ref="c1" /><vgl-perspective-camera name="c2" ref="c2" :fov="fov" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { c: 'c1', fov: 35 },
      }).$mount();
      vm.$nextTick(() => {
        vm.c = 'c2';
        vm.$nextTick(() => {
          vm.fov = 45;
          after10ticks(vm, () => {
            try {
              expect(renderHistory).to.have.lengthOf(3);
              expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
              expect(renderHistory[0]).to.have.property('camera', vm.$refs.c1.inst);
              expect(renderHistory[1]).to.have.property('scene', vm.$refs.s.inst);
              expect(renderHistory[1]).to.have.property('camera', vm.$refs.c2.inst);
              expect(renderHistory[2]).to.have.property('scene', vm.$refs.s.inst);
              expect(renderHistory[2]).to.have.property('camera', vm.$refs.c2.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('after scene is replaced then old scene emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer :scene="s" camera="c"><vgl-scene name="s1" ref="s1" /><vgl-scene name="s2" ref="s2" :position="position" /><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { s: 's2', position: '0 0 0' },
      }).$mount();
      vm.$nextTick(() => {
        vm.s = 's1';
        vm.$nextTick(() => {
          vm.position = '1 1 1';
          after10ticks(vm, () => {
            try {
              expect(renderHistory).to.have.lengthOf(2);
              expect(renderHistory[0]).to.have.property('scene', vm.$refs.s2.inst);
              expect(renderHistory[0]).to.have.property('camera', vm.$refs.c.inst);
              expect(renderHistory[1]).to.have.property('scene', vm.$refs.s1.inst);
              expect(renderHistory[1]).to.have.property('camera', vm.$refs.c.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('after camera is replaced then old camera emits an update event', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" :camera="c"><vgl-scene name="s" ref="s" /><vgl-perspective-camera name="c1" ref="c1" /><vgl-perspective-camera name="c2" ref="c2" :fov="fov" /></vgl-renderer>',
        components: { VglRenderer, VglScene, VglPerspectiveCamera },
        data: { c: 'c2', fov: 40 },
      }).$mount();
      vm.$nextTick(() => {
        vm.c = 'c1';
        vm.$nextTick(() => {
          vm.fov = 50;
          after10ticks(vm, () => {
            try {
              expect(renderHistory).to.have.lengthOf(2);
              expect(renderHistory[0]).to.have.property('scene', vm.$refs.s.inst);
              expect(renderHistory[0]).to.have.property('camera', vm.$refs.c2.inst);
              expect(renderHistory[1]).to.have.property('scene', vm.$refs.s.inst);
              expect(renderHistory[1]).to.have.property('camera', vm.$refs.c1.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
});
