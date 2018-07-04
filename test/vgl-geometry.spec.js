describe('VglGeometry:', function suite() {
  const { VglGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-geometry position-attribute="3, 1, 2, 2, -5, 6.3" color-attribute="0.8, 0.7, 0.9, 1, 0.1, 0.2" normal-attribute="2, 0, 0, -3, 4, 3" draw-range-start="1" draw-range-count="3" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.BufferGeometry();
        expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3));
        expected.addAttribute('color', new THREE.BufferAttribute(new Float32Array([0.8, 0.7, 0.9, 1, 0.1, 0.2]), 3));
        expected.addAttribute('normal', new THREE.BufferAttribute(new Float32Array([2, 0, 0, -3, 4, 3]), 3));
        expected.setDrawRange(1, 3);
        expect(expected.drawRange).to.deep.equal(vm.$refs.g.inst.drawRange);
        expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" :draw-range-start="rangeStart" :draw-range-count="rangeCount" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2, 0, 0, -3, 4, 3',
        rangeStart: 1,
        rangeCount: 2,
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3';
      vm.colorAttribute = '0.85, 0.7, 0.9, 0.99, 0.11, 0.25';
      vm.normalAttribute = '2.2, 0, -10, 3, 4.8, 3';
      vm.rangeStart = 2;
      vm.rangeCount = 4;
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3]), 3));
          expected.addAttribute('color', new THREE.BufferAttribute(new Float32Array([0.85, 0.7, 0.9, 0.99, 0.11, 0.25]), 3));
          expected.addAttribute('normal', new THREE.BufferAttribute(new Float32Array([2.2, 0, -10, 3, 4.8, 3]), 3));
          expected.setDrawRange(2, 4);
          expect(expected.drawRange).to.deep.equal(vm.$refs.g.inst.drawRange);
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
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2.2, 0, -10, 3, 4.8, 3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1';
      vm.colorAttribute = '0.85, 0.7, 0.9, 0.99, 0.11, 0.25, 0.1, 0.99, 0.5';
      vm.normalAttribute = '-2.2, 0, -10, 3, 4.8, 3, 4, 4, 4';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1]), 3));
          expected.addAttribute('color', new THREE.BufferAttribute(new Float32Array([0.85, 0.7, 0.9, 0.99, 0.11, 0.25, 0.1, 0.99, 0.5]), 3));
          expected.addAttribute('normal', new THREE.BufferAttribute(new Float32Array([-2.2, 0, -10, 3, 4.8, 3, 4, 4, 4]), 3));
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
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2.2, 0, -10, 3, 4.8, 3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3';
      vm.colorAttribute = '0.85, 0.7, 0.95';
      vm.normalAttribute = '-2, -1.1, 5';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.BufferGeometry();
          expected.addAttribute('position', new THREE.BufferAttribute(new Float32Array([3.21, -1, 2.3]), 3));
          expected.addAttribute('color', new THREE.BufferAttribute(new Float32Array([0.85, 0.7, 0.95]), 3));
          expected.addAttribute('normal', new THREE.BufferAttribute(new Float32Array([-2, -1.1, 5]), 3));
          expect(expected.toJSON()).to.deep.equal(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
