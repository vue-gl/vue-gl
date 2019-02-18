import Vue from 'vue/dist/vue';
import { RingBufferGeometry } from 'three';
import { VglRingGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglRingGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the RingBufferGeometry', () => {
    expect(new (Vue.extend(VglRingGeometry))({ inject }).inst).toBeInstanceOf(RingBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglRingGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglRingGeometry))({
      inject,
      propsData: {
        innerRadius: '19.5',
        outerRadius: '63.7',
        thetaSegments: '33',
        phiSegments: '11',
        thetaStart: '0.5',
        thetaLength: '3.6',
      },
    });
    const { index, attributes } = new RingBufferGeometry(19.5, 63.7, 33, 11, 0.5, 3.6);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglRingGeometry))({ inject });
    const { index, attributes } = new RingBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
