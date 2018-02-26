describe('VglArrowHelper:', function suite() {
  const { VglArrowHelper, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-arrow-helper ref="o" /></vgl-namespace>',
      components: { VglArrowHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
        actual.updateMatrixWorld();
        const expected = new THREE.Object3D().copy(new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0).normalize(),
          new THREE.Vector3(0, 0, 0),
        ));
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
      template: '<vgl-namespace><vgl-arrow-helper ref="o" dir="1.1 2.3 -5.9" length="8.8" color="#9992fc" head-length="2.1" head-width="1.31" position="3 3.5 0.2" /></vgl-namespace>',
      components: { VglNamespace, VglArrowHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
        actual.updateMatrixWorld();
        const expected = new THREE.Object3D().copy(new THREE.ArrowHelper(
          new THREE.Vector3(1.1, 2.3, -5.9).normalize(),
          new THREE.Vector3(3, 3.5, 0.2),
          8.8,
          0x9992fc,
          2.1,
          1.31,
        ));
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
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-arrow-helper ref="o" :dir="dir" :length="length" :color="color" :head-length="headLength" :head-width="headWidth" :position="position" /></vgl-namespace>',
      components: { VglArrowHelper, VglNamespace },
      data: {
        dir: '1.1 2.3 -5.9',
        length: '8.8',
        color: '#9992fc',
        headLength: '2.1',
        headWidth: '1.31',
        position: '8 9 3.7',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.dir = '12 23 -30';
      vm.length = '6.7';
      vm.color = '#87fa60';
      vm.headLength = '3.1';
      vm.headWidth = '1.11';
      vm.position = '8 8 3.6';
      vm.$nextTick(() => {
        try {
          const actual = new THREE.Object3D().copy(vm.$refs.o.inst);
          actual.updateMatrixWorld();
          const expected = new THREE.Object3D().copy(new THREE.ArrowHelper(
            new THREE.Vector3(12, 23, -30).normalize(),
            new THREE.Vector3(8, 8, 3.6),
            6.7,
            0x87fa60,
            3.1,
            1.11,
          ));
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
