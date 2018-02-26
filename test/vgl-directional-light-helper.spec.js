describe('VglDirectionalLightHelper:', function suite() {
  const { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4"><vgl-directional-light-helper ref="o" /></vgl-directional-light></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
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
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4"><vgl-directional-light-helper color="#ddf2ee" size="8.8" ref="o" /></vgl-directional-light></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
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
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light position="3.8 2 0.5" color="#e2f3b4"><vgl-directional-light-helper :color="c" :size="s" ref="o" /></vgl-directional-light></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight, VglDirectionalLightHelper },
      data: { c: '#dd678e', s: 7.6 },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8e8e25';
      vm.s = 8.7;
      vm.$nextTick(() => {
        try {
          const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
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
          expect(actual.toJSON().materials).to.deep.equal(expected.toJSON().materials);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
