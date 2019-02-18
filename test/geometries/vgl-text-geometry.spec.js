import Vue from 'vue/dist/vue';
import { FontLoader, TextBufferGeometry, BufferGeometry } from 'three';
import { readFile } from 'fs';
import { fakeServer } from 'nise';
import { VglTextGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglTextGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  let server;
  beforeEach(async () => {
    server = fakeServer.create();
    await Promise.all([
      new Promise((resolve) => {
        const path = require.resolve('three/examples/fonts/helvetiker_regular.typeface.json');
        readFile(path, 'utf-8', (err, data) => {
          server.respondWith('GET', '/helvetiker.json', data);
          resolve();
        });
      }),
      new Promise((resolve) => {
        const path = require.resolve('three/examples/fonts/optimer_regular.typeface.json');
        readFile(path, 'utf-8', (err, data) => {
          server.respondWith('GET', '/optimer.json', data);
          resolve();
        });
      }),
    ]);
  });
  afterAll(() => {
    server.restore();
  });
  test('the inst property should be an instance of the BufferGeometry before font loaded', () => {
    const { inst } = new (Vue.extend(VglTextGeometry))({ inject });
    expect(inst).toBeInstanceOf(BufferGeometry);
  });
  test('the inst property should be an instance of the TextBufferGeometry after font loaded', () => {
    const vm = new (Vue.extend(VglTextGeometry))({ inject, propsData: { font: '/helvetiker.json' } });
    server.respond();
    expect(vm.inst).toBeInstanceOf(TextBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglTextGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglTextGeometry))({
      inject,
      propsData: {
        font: '/optimer.json',
        size: '120',
        height: '6',
        curveSegments: '8',
        bevelEnabled: true,
        bevelThickness: '3',
        bevelSize: '6',
        bevelSegments: '2',
        text: 'Test text',
      },
    });
    let expected;
    new FontLoader().load('/optimer.json', (font) => {
      expected = new TextBufferGeometry('Test text', {
        font,
        size: 120,
        height: 6,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 6,
        bevelSegments: 2,
      });
    });
    server.respond();
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
  test('the attributes of the instance should be defaults without optional props', () => {
    const vm = new (Vue.extend(VglTextGeometry))({
      inject,
      propsData: {
        font: '/optimer.json',
        text: 'Test text',
      },
    });
    let expected;
    new FontLoader().load('/optimer.json', (font) => {
      expected = new TextBufferGeometry('Test text', { font });
    });
    server.respond();
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
});
