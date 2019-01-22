import Vue from 'vue/dist/vue';
import { BufferGeometry, DodecahedronBufferGeometry } from 'three';
import { VglDodecahedronGeometry, VglNamespace } from '../src';

describe('VglDodecahedronGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new DodecahedronBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" radius="72.3" detail="2" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new DodecahedronBufferGeometry(72.3, 2)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" :radius="r" :detail="d" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
      data: { r: 10.8, d: 2 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 12.5;
      vm.d = 1;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new DodecahedronBufferGeometry(12.5, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
