import Vue from 'vue/dist/vue';
import { DodecahedronBufferGeometry } from 'three';
import { VglDodecahedronGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglDodecahedronGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the DodecahedronBufferGeometry', () => {
    expect(new (Vue.extend(VglDodecahedronGeometry))({ inject }).inst)
      .toBeInstanceOf(DodecahedronBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglDodecahedronGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglDodecahedronGeometry))({ inject, propsData: { radius: '103.2', detail: '2' } });
    const { index, attributes } = new DodecahedronBufferGeometry(103.2, 2);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglDodecahedronGeometry))({ inject });
    const { index, attributes } = new DodecahedronBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
