import Vue from 'vue/dist/vue';
import {
  BoxHelper, SphereBufferGeometry, Mesh, LineSegments,
} from 'three';
import {
  VglBoxHelper, VglSphereGeometry, VglMesh, VglNamespace,
} from '../src';

describe('VglBoxHelper:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g" name="o" /><vgl-box-helper object="o" ref="o" /></test-object></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new LineSegments();
        mediator.copy(vm.$refs.o.inst);
        mediator.geometry = vm.$refs.o.inst.geometry;
        mediator.material = vm.$refs.o.inst.material;
        mediator.updateMatrixWorld();
        const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
        const actual = mediator.toJSON();
        const mesh = new Mesh(new SphereBufferGeometry(5, 32, 30));
        const expectedHelper = new BoxHelper(mesh);
        mediator.copy(expectedHelper);
        mediator.geometry = expectedHelper.geometry;
        mediator.material = expectedHelper.material;
        mediator.updateMatrixWorld();
        mediator.geometry.uuid = uuids.geometry;
        mediator.material.uuid = uuids.material;
        expect(actual).toEqual(mediator.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g" name="o" /><vgl-box-helper object="o" ref="o" color="#842f71" /></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new LineSegments();
        mediator.copy(vm.$refs.o.inst);
        mediator.geometry = vm.$refs.o.inst.geometry;
        mediator.material = vm.$refs.o.inst.material;
        mediator.updateMatrixWorld();
        const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
        const actual = mediator.toJSON();
        const mesh = new Mesh(new SphereBufferGeometry(5, 32, 30));
        const expectedHelper = new BoxHelper(mesh, 0x842f71);
        mediator.copy(expectedHelper);
        mediator.geometry = expectedHelper.geometry;
        mediator.material = expectedHelper.material;
        mediator.updateMatrixWorld();
        mediator.geometry.uuid = uuids.geometry;
        mediator.material.uuid = uuids.material;
        expect(actual).toEqual(mediator.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g" name="o" /><vgl-box-helper object="o" ref="o" :color="c" /></test-object></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
      data: { c: '#44da2f' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#2222ed';
      vm.$nextTick(() => {
        try {
          const mediator = new LineSegments();
          mediator.copy(vm.$refs.o.inst);
          mediator.geometry = vm.$refs.o.inst.geometry;
          mediator.material = vm.$refs.o.inst.material;
          mediator.updateMatrixWorld();
          const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
          const actual = mediator.toJSON();
          const mesh = new Mesh(new SphereBufferGeometry(5, 32, 30));
          const expectedHelper = new BoxHelper(mesh, 0x2222ed);
          mediator.copy(expectedHelper);
          mediator.geometry = expectedHelper.geometry;
          mediator.material = expectedHelper.material;
          mediator.updateMatrixWorld();
          mediator.geometry.uuid = uuids.geometry;
          mediator.material.uuid = uuids.material;
          expect(actual).toEqual(mediator.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
