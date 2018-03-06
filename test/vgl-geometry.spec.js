describe('VglGeometry:', function suite() {
  const { VglGeometry, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.BufferGeometry();
        expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry position-attribute="3, 1, 2, 2, -5, 6.3" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.BufferGeometry();
        expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3));
        expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3]), 3));
          expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after attribute lengths are extended', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1]), 3));
          expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after attribute lengths are shortened', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3]), 3));
          expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
