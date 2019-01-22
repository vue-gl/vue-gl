import Vue from 'vue/dist/vue';
import { BufferGeometry, RingBufferGeometry } from 'three';
import { VglRingGeometry, VglNamespace } from '../src';

describe('VglRingGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry ref="g" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new RingBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry ref="g" inner-radius="19.5" outer-radius="63.7" theta-segments="33" phi-segments="11" theta-start="0.5" theta-length="3.6" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new RingBufferGeometry(
          19.5,
          63.7,
          33,
          11,
          0.5,
          3.6,
        )).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry ref="g" inner-radius="19.5" :outer-radius="r" :theta-segments="s" phi-segments="11" theta-start="0.5" theta-length="3.6" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
      data: { r: 22.5, s: 8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 80;
      vm.s = 17;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new RingBufferGeometry(
            19.5,
            80,
            17,
            11,
            0.5,
            3.6,
          )).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
