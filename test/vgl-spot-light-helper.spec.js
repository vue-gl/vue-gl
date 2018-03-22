describe('VglSpotLightHelper:', function suite() {
  const { VglSpotLightHelper, VglSpotLight, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light position="3.8 2 0.5" color="#e2f3b4" angle="1.1" distance="22.3" target="-21 -5.8 -3" name="l" /><vgl-spot-light-helper light="l" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglSpotLight, VglSpotLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new THREE.SpotLight(0xe2f3b4, undefined, 22.3, 1.1);
        light.position.set(3.8, 2, 0.5);
        const expected = new THREE.Object3D().copy(new THREE.SpotLightHelper(light));
        expected.updateMatrixWorld();
        actual.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expected.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light position="3.8 2 0.5" color="#e2f3b4" angle="1.1" distance="22.3" target="-21 -5.8 -3" name="l" /><vgl-spot-light-helper light="l" color="#ddf2ee" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglSpotLight, VglSpotLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new THREE.SpotLight(0xe2f3b4, undefined, 22.3, 1.1);
        light.position.set(3.8, 2, 0.5);
        const helper = new THREE.SpotLightHelper(light, 0xddf2ee);
        const expected = new THREE.Object3D().copy(helper);
        expected.updateMatrixWorld();
        actual.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expected.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expect(actual.toJSON().materials).to.deep.equal(expected.toJSON().materials);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light position="3.8 2 0.5" color="#e2f3b4" angle="1.1" distance="22.3" target="-21 -5.8 -3" name="l" /><vgl-spot-light-helper light="l" :color="c" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglSpotLight, VglSpotLightHelper },
      data: { c: '#dd678e' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8e8e25';
      vm.$nextTick(() => {
        // watchers called.
        vm.$refs.o.vglNamespace.update();
        vm.$nextTick(() => {
          try {
            const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
            actual.updateMatrixWorld();
            const light = new THREE.SpotLight(0xe2f3b4, undefined, 22.3, 1.1);
            light.position.set(3.8, 2, 0.5);
            const helper = new THREE.SpotLightHelper(light, 0x8e8e25);
            const expected = new THREE.Object3D().copy(helper);
            expected.updateMatrixWorld();
            actual.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expected.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expect(actual.toJSON()).to.deep.equal(expected.toJSON());
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  it('after the light property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light position="3.5 1 0.25" color="#f2e3a2" angle="1.11" distance="22.32" target="-210 -58 -30" name="l1" /><vgl-spot-light position="3.8 2 0.5" color="#e2f3b4" angle="1.1" distance="22.3" target="-21 -5.8 -3" name="l2" /><vgl-spot-light-helper :light="l" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglSpotLight, VglSpotLightHelper },
      data: { l: 'l1' },
    }).$mount();
    vm.$nextTick(() => {
      vm.l = 'l2';
      vm.$nextTick(() => {
        // watchers called.
        vm.$refs.o.vglNamespace.update();
        vm.$nextTick(() => {
          try {
            const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
            actual.updateMatrixWorld();
            const light = new THREE.SpotLight(0xe2f3b4, undefined, 22.3, 1.1);
            light.position.set(3.8, 2, 0.5);
            const helper = new THREE.SpotLightHelper(light);
            const expected = new THREE.Object3D().copy(helper);
            expected.updateMatrixWorld();
            actual.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expected.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expect(actual.toJSON()).to.deep.equal(expected.toJSON());
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
