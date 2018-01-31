describe('Tests for performance:', function target() {
  const { expect } = chai;
  const {
    VglRenderer,
    VglScene,
    VglBoxGeometry,
    VglMeshStandardMaterial,
    VglMesh,
    VglPerspectiveCamera,
  } = VueGL;
  describe('Rendering the canvas should be triggered less times as possible', function suite() {
    function after10ticks(vm, callback, count = 10) {
      vm.$nextTick(count > 0 ? () => { after10ticks(vm, callback, count - 1); } : callback);
    }
    let renderedHistory;
    before(function hook(done) {
      this.WebGLRenderer = THREE.WebGLRenderer;
      THREE.WebGLRenderer = class {
        constructor() {
          this.shadowMap = {};
          this.domElement = document.createElement('canvas');
          this.setSize = () => {};
          this.render = (scene, camera) => {
            renderedHistory.push(scene.clone(), camera.clone());
          };
        }
      };
      done();
    });
    after(function hook(done) {
      THREE.WebGLRenderer = this.WebGLRenderer;
      done();
    });
    beforeEach(function hook(done) {
      renderedHistory = [];
      done();
    });
    it('before mounted (0 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
      });
      after10ticks(vm, () => {
        try {
          expect(renderedHistory).to.have.lengthOf(0);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after just mounted (1 time)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
      }).$mount();
      after10ticks(vm, () => {
        try {
          expect(renderedHistory).to.have.lengthOf(1);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when some object\'s properties changed before mounted (0 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s" :position="scenePosition"><vgl-box-geometry name="box" :width="geometryWidth" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { scenePosition: '0 0 0', geometryWidth: 8.3 },
      });
      vm.$nextTick(() => {
        vm.scenePosition = '0 1 0';
        vm.geometryWidth = 4.6;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(0);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when some object\'s properties changed after mounted (2 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s" :position="scenePosition"><vgl-box-geometry name="box" :width="geometryWidth" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /></vgl-scene><vgl-perspective-camera name="c" :fov="cameraFov" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { scenePosition: '0 0 0', geometryWidth: 8.3, cameraFov: 50 },
      }).$mount();
      vm.$nextTick(() => {
        vm.scenePosition = '0 1 0';
        vm.geometryWidth = 4.6;
        vm.cameraFov = 44;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when some objects are added before mounted (0 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /><vgl-mesh position="1 1 1" geometry="box" material="std" v-if="meshExists" /><vgl-mesh position="2 2 2" geometry="box" material="std" v-if="meshExists" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { meshExists: false },
      });
      vm.$nextTick(() => {
        vm.meshExists = true;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when some objects are added after mounted (2 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /><vgl-mesh position="1 1 1" geometry="box" material="std" v-if="meshExists" /><vgl-mesh position="2 2 2" geometry="box" material="std" v-if="meshExists" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { meshExists: false },
      }).$mount();
      vm.$nextTick(() => {
        vm.meshExists = true;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when some objects are removed before mounted (0 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /><vgl-mesh position="1 1 1" geometry="box" material="std" v-if="meshExists" /><vgl-mesh position="2 2 2" geometry="box" material="std" v-if="meshExists" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { meshExists: true },
      });
      vm.$nextTick(() => {
        vm.meshExists = false;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(0);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when some objects are removed after mounted (2 times)', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c"><vgl-scene name="s"><vgl-box-geometry name="box" /><vgl-mesh-standard-material name="std" /><vgl-mesh geometry="box" material="std" /><vgl-mesh position="1 1 1" geometry="box" material="std" v-if="meshExists" /><vgl-mesh position="2 2 2" geometry="box" material="std" v-if="meshExists" /></vgl-scene><vgl-perspective-camera name="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglBoxGeometry,
          VglMeshStandardMaterial,
          VglMesh,
          VglPerspectiveCamera,
        },
        data: { meshExists: true },
      }).$mount();
      vm.$nextTick(() => {
        vm.meshExists = false;
        after10ticks(vm, () => {
          try {
            expect(renderedHistory).to.have.lengthOf(2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
