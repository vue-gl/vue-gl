import Vue from 'vue/dist/vue';
import { SphereBufferGeometry } from 'three';
import { VglSphereGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglSphereGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the SphereBufferGeometry', () => {
    expect(new (Vue.extend(VglSphereGeometry))({ inject }).inst)
      .toBeInstanceOf(SphereBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglSphereGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglSphereGeometry))({
      inject,
      propsData: {
        radius: '82.8',
        widthSegments: '31',
        heightSegments: '13',
        phiStart: '0.2',
        phiLength: '1.2',
        thetaStart: '0.3',
        thetaLength: '3.8',
      },
    });
    const { index, attributes } = new SphereBufferGeometry(82.8, 31, 13, 0.2, 1.2, 0.3, 3.8);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglSphereGeometry))({ inject });
    const { index, attributes } = new SphereBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
