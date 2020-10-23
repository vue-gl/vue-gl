import Vue from 'vue/dist/vue';
import { Shape, Vector2 } from 'three';
import { VglShape, VglNamespace, VglPath } from '../../src';

describe('VglShape', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Shape', () => {
    expect(new (Vue.extend(VglShape))({ inject }).inst)
      .toBeInstanceOf(Shape);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglPath))({ inject });
    expect(Object.keys(new (Vue.extend(VglShape))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the options of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglShape))({
      inject,
      propsData: {
        path: '350 0, 350 1181, 0 1181, 0 79, 15 79, 15 0',
      },
    });
    const expected = new Shape();
    expected.setFromPoints([
      new Vector2(350, 0),
      new Vector2(350, 1181),
      new Vector2(0, 1181),
      new Vector2(0, 79),
      new Vector2(15, 79),
      new Vector2(15, 0),
    ]);
    delete inst.uuid;
    delete expected.uuid;
    expect(inst).toStrictEqual(expected);
  });
  test('the path prop as an array of Vector2', () => {
    const path = [
      new Vector2(350, 0),
      new Vector2(350, 1181),
      new Vector2(0, 1181),
      new Vector2(0, 79),
      new Vector2(15, 79),
      new Vector2(15, 0),
    ];
    const { inst } = new (Vue.extend(VglShape))({
      inject,
      propsData: { path },
    });
    const expected = new Shape();
    expected.setFromPoints(path);
    delete inst.uuid;
    delete expected.uuid;
    expect(inst).toStrictEqual(expected);
  });
  describe('rendered real DOM', () => {
    test('is nothing when the component has no children', () => {
      const vm = new (Vue.extend(VglShape))({ inject }).$mount();
      expect(vm.$el).toBeInstanceOf(Comment);
    });
    test('is template element when the component has children', () => {
      const vm = new Vue({
        components: { VglShape, VglNamespace },
        render(h) {
          return h('vgl-namespace', [h('vgl-shape', { ref: 'examin' }, ['child text'])]);
        },
      }).$mount();
      expect(vm.$refs.examin.$el.tagName.toLowerCase()).toBe('template');
    });
  });
});
