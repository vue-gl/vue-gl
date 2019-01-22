import Vue from 'vue/dist/vue';
import { BufferGeometry, OctahedronBufferGeometry } from 'three';
import { VglOctahedronGeometry, VglNamespace } from '../src';

describe('VglOctahedronGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new OctahedronBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" radius="72.3" detail="2" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new OctahedronBufferGeometry(72.3, 2)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" :radius="r" :detail="d" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
      data: { r: 10.8, d: 2 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 12.5;
      vm.d = 1;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new OctahedronBufferGeometry(12.5, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
