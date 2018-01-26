describe('VglObject3d:', function component() {
  const { VglObject3d } = VueGL;
  const { assert } = chai;
  describe('Instances should make a correct tree structure', function suite() {
    it('after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d ref="a"><vgl-object3d ref="b"><vgl-object3d ref="e"><vgl-object3d ref="g" /><vgl-object3d ref="h" /></vgl-object3d><vgl-object3d ref="f" /></vgl-object3d><vgl-object3d ref="c" /><vgl-object3d ref="d" /></vgl-object3d>',
        components: { VglObject3d },
      }).$mount();
      vm.$nextTick(() => {
        try {
          const a = vm.$refs.a.inst;
          const b = vm.$refs.b.inst;
          const c = vm.$refs.c.inst;
          const d = vm.$refs.d.inst;
          const e = vm.$refs.e.inst;
          const f = vm.$refs.f.inst;
          const g = vm.$refs.g.inst;
          const h = vm.$refs.h.inst;
          assert.sameMembers(a.children, [b, c, d]);
          assert.sameMembers(b.children, [e, f]);
          assert.isEmpty(c.children);
          assert.isEmpty(d.children);
          assert.sameMembers(e.children, [g, h]);
          assert.isEmpty(f.children);
          assert.isEmpty(g.children);
          assert.isEmpty(h.children);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after instances are replaced', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d :test-meaningless-property-for-replace-instance="a" ref="a"><vgl-object3d ref="b"><vgl-object3d :test-meaningless-property-for-replace-instance="e" ref="e"><vgl-object3d ref="g" /><vgl-object3d ref="h" /></vgl-object3d><vgl-object3d ref="f" /></vgl-object3d><vgl-object3d :test-meaningless-property-for-replace-instance="c" ref="c" /><vgl-object3d ref="d" /></vgl-object3d>',
        components: {
          VglObject3d: {
            mixins: [VglObject3d],
            props: ['testMeaninglessPropertyForReplaceInstance'],
            computed: {
              inst() {
                const obj = new THREE.Object3D();
                obj.meaninglessProperty = this.testMeaninglessPropertyForReplaceInstance;
                return obj;
              },
            },
          },
        },
        data: {
          a: 0,
          c: 0,
          e: 0,
        },
      }).$mount();
      vm.$nextTick(() => {
        vm.a = 1;
        vm.c = 2;
        vm.e = 3;
        vm.$nextTick(() => {
          try {
            const a = vm.$refs.a.inst;
            const b = vm.$refs.b.inst;
            const c = vm.$refs.c.inst;
            const d = vm.$refs.d.inst;
            const e = vm.$refs.e.inst;
            const f = vm.$refs.f.inst;
            const g = vm.$refs.g.inst;
            const h = vm.$refs.h.inst;
            assert.sameMembers(a.children, [b, c, d]);
            assert.sameMembers(b.children, [e, f]);
            assert.isEmpty(c.children);
            assert.isEmpty(d.children);
            assert.sameMembers(e.children, [g, h]);
            assert.isEmpty(f.children);
            assert.isEmpty(g.children);
            assert.isEmpty(h.children);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('when components are created after initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d ref="a"><vgl-object3d ref="b"><vgl-object3d v-if="e" ref="e"><vgl-object3d ref="g" /><vgl-object3d ref="h" /></vgl-object3d><vgl-object3d ref="f" /></vgl-object3d><vgl-object3d v-if="c" ref="c" /><vgl-object3d ref="d" /></vgl-object3d>',
        components: { VglObject3d },
        data: {
          c: false,
          e: false,
        },
      }).$mount();
      vm.$nextTick(() => {
        try {
          const a = vm.$refs.a.inst;
          const b = vm.$refs.b.inst;
          const d = vm.$refs.d.inst;
          const f = vm.$refs.f.inst;
          assert.sameMembers(a.children, [b, d]);
          assert.sameMembers(b.children, [f]);
          assert.isEmpty(d.children);
          assert.isEmpty(f.children);
          assert.isUndefined(vm.$refs.c);
          assert.isUndefined(vm.$refs.e);
          assert.isUndefined(vm.$refs.g);
          assert.isUndefined(vm.$refs.h);
        } catch (e) {
          done(e);
        }
        vm.c = true;
        vm.e = true;
        vm.$nextTick(() => {
          try {
            const a = vm.$refs.a.inst;
            const b = vm.$refs.b.inst;
            const c = vm.$refs.c.inst;
            const d = vm.$refs.d.inst;
            const e = vm.$refs.e.inst;
            const f = vm.$refs.f.inst;
            const g = vm.$refs.g.inst;
            const h = vm.$refs.h.inst;
            assert.sameMembers(a.children, [b, c, d]);
            assert.sameMembers(b.children, [e, f]);
            assert.isEmpty(c.children);
            assert.isEmpty(d.children);
            assert.sameMembers(e.children, [g, h]);
            assert.isEmpty(f.children);
            assert.isEmpty(g.children);
            assert.isEmpty(h.children);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after components are destroyed', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d ref="a"><vgl-object3d ref="b"><vgl-object3d v-if="e" ref="e"><vgl-object3d ref="g" /><vgl-object3d ref="h" /></vgl-object3d><vgl-object3d ref="f" /></vgl-object3d><vgl-object3d v-if="c" ref="c" /><vgl-object3d ref="d" /></vgl-object3d>',
        components: { VglObject3d },
        data: {
          c: true,
          e: true,
        },
      }).$mount();
      vm.$nextTick(() => {
        try {
          const a = vm.$refs.a.inst;
          const b = vm.$refs.b.inst;
          const c = vm.$refs.c.inst;
          const d = vm.$refs.d.inst;
          const e = vm.$refs.e.inst;
          const f = vm.$refs.f.inst;
          const g = vm.$refs.g.inst;
          const h = vm.$refs.h.inst;
          assert.sameMembers(a.children, [b, c, d]);
          assert.sameMembers(b.children, [e, f]);
          assert.isEmpty(c.children);
          assert.isEmpty(d.children);
          assert.sameMembers(e.children, [g, h]);
          assert.isEmpty(f.children);
          assert.isEmpty(g.children);
          assert.isEmpty(h.children);
        } catch (e) {
          done(e);
        }
        vm.c = false;
        vm.e = false;
        vm.$nextTick(() => {
          try {
            const a = vm.$refs.a.inst;
            const b = vm.$refs.b.inst;
            const d = vm.$refs.d.inst;
            const f = vm.$refs.f.inst;
            assert.sameMembers(a.children, [b, d]);
            assert.sameMembers(b.children, [f]);
            assert.isEmpty(d.children);
            assert.isEmpty(f.children);
            assert.isUndefined(vm.$refs.c);
            assert.isUndefined(vm.$refs.e);
            assert.isUndefined(vm.$refs.g);
            assert.isUndefined(vm.$refs.h);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The object\'s position should be appropriate', function suite() {
    it('after initialization when the property is undefined', function test(done) {
      const vm = new Vue(VglObject3d);
      vm.$nextTick(() => {
        try {
          assert(vm.inst.position.equals(new THREE.Vector3()), 'Different position vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is a Vector3 object', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { position: new THREE.Vector3(-1, -5, 6.8) },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.position.equals(new THREE.Vector3(-1, -5, 6.8)), 'Different position vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is a string', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { position: '-1.0 -5e8 6.8' },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.position.equals(new THREE.Vector3(-1, -5e8, 6.8)), 'Different position vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after property is changed', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { position: '2.1 3  5' },
      });
      vm.$nextTick(() => {
        vm.position = ' 1.1  -1.9 8';
        vm.$nextTick(() => {
          try {
            assert(vm.inst.position.equals(new THREE.Vector3(1.1, -1.9, 8)), 'Different position vectors.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after the instance is replaced', function test(done) {
      const vm = new Vue({
        mixins: [VglObject3d],
        computed: {
          inst() {
            const obj = new THREE.Object3D();
            obj.meaninglessProperty = this.testMeaninglessDataForReplaceInstance;
            return obj;
          },
        },
        data: { testMeaninglessDataForReplaceInstance: 0 },
        propsData: { position: '-2.1 3e2  59 ' },
      });
      vm.$nextTick(() => {
        const instBefore = vm.inst;
        try {
          assert(instBefore.position.equals(new THREE.Vector3(-2.1, 3e2, 59)), 'Different position vectors.');
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 1;
        vm.$nextTick(() => {
          const instAfter = vm.inst;
          try {
            assert.notEqual(instBefore, instAfter);
            assert(instAfter.position.equals(new THREE.Vector3(-2.1, 3e2, 59)), 'Different position vectors.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The object\'s rotation should be appropriate', function suite() {
    it('after initialization when the property is undefined', function test(done) {
      const vm = new Vue(VglObject3d);
      vm.$nextTick(() => {
        try {
          assert(vm.inst.quaternion.equals(new THREE.Quaternion()), 'Different quaternions.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is an Euler object', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { rotation: new THREE.Euler(-1, -5, 6.8, 'ZYX') },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(-1, -5, 6.8, 'ZYX'))), 'Different quaternions.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is a string', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { rotation: '-1.0 -5e8 6.8 XZY ' },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(-1, -5e8, 6.8, 'XZY'))), 'Different quaternions.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after property is changed', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { rotation: '2.1 3 5 ZYX' },
      });
      vm.$nextTick(() => {
        vm.rotation = '1.1 -1.9 8  YZX';
        vm.$nextTick(() => {
          try {
            assert(vm.inst.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(1.1, -1.9, 8, 'YZX'))), 'Different quaternions.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after the instance is replaced', function test(done) {
      const vm = new Vue({
        mixins: [VglObject3d],
        computed: {
          inst() {
            const obj = new THREE.Object3D();
            obj.meaninglessProperty = this.testMeaninglessDataForReplaceInstance;
            return obj;
          },
        },
        data: { testMeaninglessDataForReplaceInstance: 0 },
        propsData: { rotation: '-1.1 3.1 5 ZYX ' },
      });
      vm.$nextTick(() => {
        const instBefore = vm.inst;
        try {
          assert(instBefore.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.1, 3.1, 5, 'ZYX'))), 'Different quaternions.');
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 1;
        vm.$nextTick(() => {
          const instAfter = vm.inst;
          try {
            assert.notEqual(instBefore, instAfter);
            assert(instAfter.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.1, 3.1, 5, 'ZYX'))), 'Different quaternions.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The object\'s scale should be appropriate', function suite() {
    it('after initialization when the property is undefined', function test(done) {
      const vm = new Vue(VglObject3d);
      vm.$nextTick(() => {
        try {
          assert(vm.inst.scale.equals(new THREE.Vector3(1, 1, 1)), 'Different scale vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is an Euler object', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { scale: new THREE.Vector3(-1, -5, 6.8) },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.scale.equals(new THREE.Vector3(-1, -5, 6.8)), 'Different scale vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is a string', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { scale: ' -1.0 -5e8 6.8 ' },
      });
      vm.$nextTick(() => {
        try {
          assert(vm.inst.scale.equals(new THREE.Vector3(-1, -5e8, 6.8)), 'Different scale vectors.');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after property is changed', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({
        propsData: { scale: '2.1 3 5' },
      });
      vm.$nextTick(() => {
        vm.scale = '1.1 -1.9 8';
        vm.$nextTick(() => {
          try {
            assert(vm.inst.scale.equals(new THREE.Vector3(1.1, -1.9, 8)), 'Different scale vectors.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after the instance is replaced', function test(done) {
      const vm = new Vue({
        mixins: [VglObject3d],
        computed: {
          inst() {
            const obj = new THREE.Object3D();
            obj.meaninglessProperty = this.testMeaninglessDataForReplaceInstance;
            return obj;
          },
        },
        data: { testMeaninglessDataForReplaceInstance: 0 },
        propsData: { scale: '   2 3.1 -5  ' },
      });
      vm.$nextTick(() => {
        const instBefore = vm.inst;
        try {
          assert(instBefore.scale.equals(new THREE.Vector3(2, 3.1, -5)), 'Different scale vectors.');
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 1;
        vm.$nextTick(() => {
          const instAfter = vm.inst;
          try {
            assert.notEqual(instBefore, instAfter);
            assert(instAfter.scale.equals(new THREE.Vector3(2, 3.1, -5)), 'Different scale vectors.');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The castShadow property should be set correctly', function suite() {
    it('after initialization when the property is false', function test(done) {
      const vm = new Vue(VglObject3d);
      vm.$nextTick(() => {
        try {
          assert.isFalse(vm.inst.castShadow);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is true', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({ propsData: { castShadow: true } });
      vm.$nextTick(() => {
        try {
          assert.isTrue(vm.inst.castShadow);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after property is changed', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({ propsData: { castShadow: true } });
      vm.$nextTick(() => {
        vm.castShadow = false;
        vm.$nextTick(() => {
          try {
            assert.isFalse(vm.inst.castShadow);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after the instance is replaced', function test(done) {
      const vm = new Vue({
        mixins: [VglObject3d],
        computed: {
          inst() {
            const obj = new THREE.Object3D();
            obj.meaninglessProperty = this.testMeaninglessDataForReplaceInstance;
            return obj;
          },
        },
        data: { testMeaninglessDataForReplaceInstance: 0 },
        propsData: { castShadow: true },
      });
      vm.$nextTick(() => {
        const instBefore = vm.inst;
        try {
          assert.isTrue(instBefore.castShadow);
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 1;
        vm.$nextTick(() => {
          const instAfter = vm.inst;
          try {
            assert.notEqual(instBefore, instAfter);
            assert.isTrue(instAfter.castShadow);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('The receiveShadow property should be set correctly', function suite() {
    it('after initialization when the property is false', function test(done) {
      const vm = new Vue(VglObject3d);
      vm.$nextTick(() => {
        try {
          assert.isFalse(vm.inst.receiveShadow);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after initialization when the property is true', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({ propsData: { receiveShadow: true } });
      vm.$nextTick(() => {
        try {
          assert.isTrue(vm.inst.receiveShadow);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('after property is changed', function test(done) {
      const vm = new (Vue.extend(VglObject3d))({ propsData: { receiveShadow: true } });
      vm.$nextTick(() => {
        vm.receiveShadow = false;
        vm.$nextTick(() => {
          try {
            assert.isFalse(vm.inst.receiveShadow);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('after the instance is replaced', function test(done) {
      const vm = new Vue({
        mixins: [VglObject3d],
        computed: {
          inst() {
            const obj = new THREE.Object3D();
            obj.meaninglessProperty = this.testMeaninglessDataForReplaceInstance;
            return obj;
          },
        },
        data: { testMeaninglessDataForReplaceInstance: 0 },
        propsData: { receiveShadow: true },
      });
      vm.$nextTick(() => {
        const instBefore = vm.inst;
        try {
          assert.isTrue(instBefore.receiveShadow);
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 1;
        vm.$nextTick(() => {
          const instAfter = vm.inst;
          try {
            assert.notEqual(instBefore, instAfter);
            assert.isTrue(instAfter.receiveShadow);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Update listeners should be called at appropriate time', function suite() {
    let updatedTimes;
    const UpdateSetter = {
      inject: ['vglObject3d'],
      created() {
        this.vglObject3d.listeners.push(() => { updatedTimes += 1; });
      },
      render() {},
    };
    beforeEach(function hook(done) {
      updatedTimes = 0;
      done();
    });
    it('after the initialization', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d><vgl-object3d position="0 1 2"><vgl-object3d rotation="1 1 1 XYZ" /></vgl-object3d><update-setter /></vgl-object3d>',
        components: { VglObject3d, UpdateSetter },
      }).$mount();
      vm.$nextTick(() => {
        try {
          assert.strictEqual(updatedTimes, 1);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('when some properties are changed', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d><vgl-object3d :position="position" ref="obj1"><vgl-object3d :rotation="rotation" ref="obj2" /></vgl-object3d><update-setter /></vgl-object3d>',
        components: { VglObject3d, UpdateSetter },
        data: { position: '1 -1 2', rotation: '0 0 1 XYZ' },
      }).$mount();
      vm.$nextTick(() => {
        try {
          assert.strictEqual(updatedTimes, 1);
        } catch (e) {
          done(e);
        }
        vm.position = '2.2 1.3 -6e1';
        vm.rotation = '1 2 1 XYZ';
        vm.$nextTick(() => {
          try {
            assert(vm.$refs.obj1.inst.position.equals(new THREE.Vector3(2.2, 1.3, -6e1)), 'Different position vectors.');
          } catch (e) {
            done(e);
          }
          vm.$nextTick(() => {
            try {
              assert.strictEqual(updatedTimes, 2);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('when some instances are replaced', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d><vgl-object3d :test-meaningless-property-for-replace-instance="testMeaninglessDataForReplaceInstance"><vgl-object3d :test-meaningless-property-for-replace-instance="testMeaninglessDataForReplaceInstance" /></vgl-object3d><update-setter /></vgl-object3d>',
        components: {
          VglObject3d: {
            mixins: [VglObject3d],
            props: ['testMeaninglessPropertyForReplaceInstance'],
            computed: {
              inst() {
                const obj = new THREE.Object3D();
                obj.meaninglessProperty = this.testMeaninglessPropertyForReplaceInstance;
                return obj;
              },
            },
          },
          UpdateSetter,
        },
        data: { testMeaninglessDataForReplaceInstance: 1 },
      }).$mount();
      vm.$nextTick(() => {
        try {
          assert.strictEqual(updatedTimes, 1);
        } catch (e) {
          done(e);
        }
        vm.testMeaninglessDataForReplaceInstance = 2;
        vm.$nextTick(() => {
          vm.$nextTick(() => {
            try {
              assert.strictEqual(updatedTimes, 2);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('after some instances are destroyed', function test(done) {
      const vm = new Vue({
        template: '<vgl-object3d><vgl-object3d v-if="exist" /><vgl-object3d v-if="exist"><vgl-object3d /></vgl-object3d><update-setter /></vgl-object3d>',
        components: { VglObject3d, UpdateSetter },
        data: { exist: true },
      }).$mount();
      vm.$nextTick(() => {
        try {
          assert.strictEqual(updatedTimes, 1);
        } catch (e) {
          done(e);
        }
        vm.exist = false;
        vm.$nextTick(() => {
          vm.$nextTick(() => {
            try {
              assert.strictEqual(updatedTimes, 2);
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
