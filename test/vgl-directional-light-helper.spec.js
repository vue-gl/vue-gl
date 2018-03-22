describe('VglDirectionalLightHelper:', function suite() {
  const { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-directional-light-helper light="l" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new THREE.DirectionalLight(0xe2f3b4);
        light.position.set(3.8, 2, 0.5);
        const expected = new THREE.Object3D().copy(new THREE.DirectionalLightHelper(light));
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
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-directional-light-helper light="l" color="#ddf2ee" size="8.8" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new THREE.DirectionalLight(0xe2f3b4);
        light.position.set(3.8, 2, 0.5);
        const helper = new THREE.DirectionalLightHelper(light, 8.8, 0xddf2ee);
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
  it('after properties (including the size property) are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-directional-light-helper light="l" :color="c" :size="s" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
      data: { c: '#dd678e', s: 7.6 },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8e8e25';
      vm.s = 8.7;
      vm.$nextTick(() => {
        // watchers called.
        vm.$refs.o.vglNamespace.update();
        vm.$nextTick(() => {
          try {
            const actual = new THREE.Object3D().copy(vm.$refs.o.inst.children[0]);
            actual.updateMatrixWorld();
            const light = new THREE.DirectionalLight(0xe2f3b4);
            light.position.set(3.8, 2, 0.5);
            const helper = new THREE.DirectionalLightHelper(light, 8.7, 0x8e8e25);
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
  it('after properties (except the size property) are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-directional-light-helper light="l" :color="c" size="8.7" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
      data: { c: '#dd678e' },
    }).$mount();
    vm.$nextTick(() => {
      const previousHelper = vm.$refs.o.inst.children[0];
      vm.c = '#8e8e25';
      vm.$nextTick(() => {
        // watchers called.
        vm.$refs.o.vglNamespace.update();
        vm.$nextTick(() => {
          try {
            const currentHelper = vm.$refs.o.inst.children[0];
            expect(currentHelper).to.equal(previousHelper);
            const actual = new THREE.Object3D().copy(currentHelper);
            actual.updateMatrixWorld();
            const light = new THREE.DirectionalLight(0xe2f3b4);
            light.position.set(3.8, 2, 0.5);
            const helper = new THREE.DirectionalLightHelper(light, 8.7, 0x8e8e25);
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
