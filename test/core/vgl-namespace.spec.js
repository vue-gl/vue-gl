import Vue from 'vue/dist/vue';
import { VglNamespace } from '../../src';

describe('VglNamespace', () => {
  test('renders a element specified by tag prop', () => {
    const vm = new (Vue.extend(VglNamespace))({ propsData: { tag: 'p' } }).$mount();
    expect(vm.$el.tagName.toLowerCase()).toBe('p');
  });
  test('renders a div element by default', () => {
    const vm = new Vue(VglNamespace).$mount();
    expect(vm.$el.tagName.toLowerCase()).toBe('div');
  });
});
