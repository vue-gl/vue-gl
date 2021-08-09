import { Shape } from 'three';
import Vue from 'vue';
import VglShape from '../../src/extras/core/vgl-shape';
import VglPath from '../../src/extras/core/vgl-path';

describe('VglShape', () => {
  describe('computed property', () => {
    describe('inst', () => {
      test('instance of Shape', () => {
        expect(new (Vue.extend(VglShape))().inst).toBeInstanceOf(Shape);
      });
      test('path creating method calls', () => {
        const points = new (Vue.extend(VglShape))({ propsData: { d: 'M0 1V-3.5' } }).inst.getPoints();
        expect(points).toHaveLength(2);
        expect(points[0].x).toBeCloseTo(0);
        expect(points[0].y).toBeCloseTo(1);
        expect(points[1].x).toBeCloseTo(0);
        expect(points[1].y).toBeCloseTo(-3.5);
      });
      test('path creating method calls after d prop changes', async () => {
        const vm = new (Vue.extend(VglShape))({ propsData: { d: 'M0 1V-3.5' } });
        vm.d = 'M10 11V4.2H6v-3';
        await vm.$nextTick();
        const points = vm.inst.getPoints();
        expect(points).toHaveLength(4);
        expect(points[0].x).toBeCloseTo(10);
        expect(points[0].y).toBeCloseTo(11);
        expect(points[1].x).toBeCloseTo(10);
        expect(points[1].y).toBeCloseTo(4.2);
        expect(points[2].x).toBeCloseTo(6);
        expect(points[2].y).toBeCloseTo(4.2);
        expect(points[3].x).toBeCloseTo(6);
        expect(points[3].y).toBeCloseTo(1.2);
      });
      test('holes property', () => {
        const vm = new Vue({
          render: (h) => h(VglShape, { ref: 'shape' }, [
            h('template', { slot: 'holes' }, [
              h(VglPath, { ref: 'path1' }),
              h(VglPath, { ref: 'path2' }),
            ]),
          ]),
        }).$mount();
        expect(vm.$refs.shape.inst.holes).toHaveLength(2);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path1.inst, vm.$refs.path2.inst,
        ]));
      });
      test('holes after d prop changes', async () => {
        const vm = new Vue({
          render: (h) => h(VglShape, { ref: 'shape', props: { d: 'M5 5H-5V-5H5' } }, [
            h('template', { slot: 'holes' }, [
              h(VglPath, { ref: 'path1' }),
              h(VglPath, { ref: 'path2' }),
            ]),
          ]),
        }).$mount();
        vm.d = 'M2.5 2.5H-2.5V-2.5H2.5';
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(2);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path1.inst, vm.$refs.path2.inst,
        ]));
      });
      test('holes after holes slot changes', async () => {
        const vm = new Vue({
          data: () => ({ indices: [0] }),
          render(h) {
            return h(VglShape, { ref: 'shape' }, [
              h('template', { slot: 'holes' }, this.indices.map(
                (index) => h(VglPath, { ref: `path${index}`, key: index }),
              )),
            ]);
          },
        }).$mount();
        // adding
        vm.indices = [0, 1, 2, 3];
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(4);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path0.inst, vm.$refs.path1.inst, vm.$refs.path2.inst, vm.$refs.path3.inst,
        ]));
        // removing
        vm.indices = [0, 2, 3];
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(3);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path0.inst, vm.$refs.path2.inst, vm.$refs.path3.inst,
        ]));
        // replacing
        vm.indices = [0, 4, 3, 5];
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(4);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path0.inst, vm.$refs.path4.inst, vm.$refs.path3.inst, vm.$refs.path5.inst,
        ]));
      });
      test('holes after Path instances in holes slot change', async () => {
        const vm = new Vue({
          data: () => ({ d: ['M1 0Q2 3 2 5T4 5 2 5', 'M0 1Q-1 -2 -5 -9T5 -9'] }),
          render(h) {
            return h(VglShape, { ref: 'shape' }, [
              h('template', { slot: 'holes' }, [
                h(VglPath, { ref: 'path1', d: this.d[0] }),
                h(VglPath, { ref: 'path2', d: this.d[1] }),
              ]),
            ]);
          },
        }).$mount();
        expect(vm.$refs.shape.inst.holes).toHaveLength(2);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path1.inst, vm.$refs.path2.inst,
        ]));
        vm.d = ['M1 1Q2 3 2 5T4 5 2 5', 'M0 1Q-1 -2 -5 -9T5 -9'];
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(2);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path1.inst, vm.$refs.path2.inst,
        ]));
        vm.d = ['M1 1Q2 3 2 5T5 5 2 5', 'M0 1Q-1 2 -5 -9T5 -9'];
        await vm.$nextTick();
        expect(vm.$refs.shape.inst.holes).toHaveLength(2);
        expect(vm.$refs.shape.inst.holes).toEqual(expect.arrayContaining([
          vm.$refs.path1.inst, vm.$refs.path2.inst,
        ]));
      });
    });
  });
});
