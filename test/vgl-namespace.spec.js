describe('VglNamespace:', function component() {
  const { VglNamespace } = VueGL;
  const { assert } = chai;
  const NsSetter = {
    inject: ['vglNamespace'],
    props: ['namespace', 'name', 'value'],
    created() {
      this.$set(this.vglNamespace[this.namespace], this.name, this.value);
    },
    beforeDestroy() {
      this.$delete(this.vglNamespace[this.namespace], this.name);
    },
    render() {},
  };
  const NsGetter = {
    inject: ['vglNamespace'],
    props: ['namespace', 'name'],
    computed: {
      value() {
        return this.vglNamespace[this.namespace][this.name];
      },
    },
    render() {},
  };
  describe('Cameras', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter is a sibling of and after the setter.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="cameras" name="deni93g5" :value="value" /><ns-getter namespace="cameras" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is a sibling of and before the setter.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="deni93g5" ref="getter" /><ns-setter namespace="cameras" name="deni93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is under the setter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="cameras" name="dei93g5" :value="value" /><vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="cameras" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="cameras" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsGetter },
          data: { value: new THREE.Camera() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="cameras" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="cameras" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Camera(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Scenes', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter is a sibling of and after the setter.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="scenes" name="deni93g5" :value="value" /><ns-getter namespace="scenes" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is a sibling of and before the setter.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="deni93g5" ref="getter" /><ns-setter namespace="scenes" name="deni93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="scenes" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="scenes" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="scenes" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="scenes" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Scene(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Geometries', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter and the setter is sibling.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="geometries" name="deni93g5" :value="value" /><ns-getter namespace="geometries" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is under the setter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="geometries" name="dei93g5" :value="value" /><vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="geometries" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="geometries" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="geometries" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsGetter },
          data: { value: new THREE.Geometry() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="geometries" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="geometries" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Geometry(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Materials', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter and the setter is sibling.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="materials" name="deni93g5" :value="value" /><ns-getter namespace="materials" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is under the setter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="materials" name="dei93g5" :value="value" /><vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="materials" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="materials" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="materials" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="materials" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="materials" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="materials" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsGetter },
          data: { value: new THREE.Material() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="materials" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="materials" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="materials" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="materials" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Material(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Textures', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter and the setter is sibling.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="textures" name="deni93g5" :value="value" /><ns-getter namespace="textures" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is under the setter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="textures" name="dei93g5" :value="value" /><vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="textures" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="textures" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="textures" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="textures" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="textures" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="textures" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsGetter },
          data: { value: new THREE.Texture() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="textures" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="textures" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="textures" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="textures" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Texture(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Fonts', function suite() {
    describe('should be accessible', function pos() {
      it('when the getter and the setter is sibling.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="fonts" name="deni93g5" :value="value" /><ns-getter namespace="fonts" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter is under the setter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-setter namespace="fonts" name="dei93g5" :value="value" /><vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is a sibling of the getter and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.getter.value, vm.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    describe('should not be accessible', function neg() {
      it('when the setter is under the getter\'s namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the getter and the setter have different root namespaces.', function test(done) {
        const vm = new Vue({
          template: '<div><vgl-namespace><ns-setter namespace="fonts" name="deni93g5" :value="value" /></vgl-namespace><vgl-namespace><ns-getter namespace="fonts" name="deni93g5" ref="getter" /></vgl-namespace></div>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter does not exist.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="fonts" name="deni93g5" ref="getter" /></vgl-namespace>',
          components: { VglNamespace, NsGetter },
          data: { value: new THREE.Font() },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('when the setter is under the getter\'s namespace and created after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /><vgl-namespace><ns-setter v-if="exist" namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font(), exist: false },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.getter.value);
          } catch (e) {
            done(e);
          }
          vm.exist = true;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is a sibling of the getter and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /><ns-setter v-if="exist" namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
      it('when the setter is over the getter\'s namespace and destroyed after the initialization.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-namespace><ns-getter namespace="fonts" name="dei93g5" ref="getter" /></vgl-namespace><ns-setter v-if="exist" namespace="fonts" name="dei93g5" :value="value" /></vgl-namespace>',
          components: { VglNamespace, NsSetter, NsGetter },
          data: { value: new THREE.Font(), exist: true },
        }).$mount();
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.getter.value, vm.value);
          } catch (e) {
            done(e);
          }
          vm.exist = false;
          vm.$nextTick(() => {
            try {
              assert.isUndefined(vm.$refs.getter.value);
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
