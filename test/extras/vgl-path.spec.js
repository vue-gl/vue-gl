import { Path } from 'three';
import Vue from 'vue';
import VglPath from '../../src/extras/core/vgl-path';

describe('VglPath', () => {
  describe('prop validation', () => {
    describe('d', () => {
      test('accepts valid path commands', () => {
        // Standard minimum syntax
        expect(VglPath.props.d.validator('M11.2 8.3')).toBeTruthy();
        // Leading and trailing spaces around the command
        expect(VglPath.props.d.validator(' m11.2 8.3')).toBeTruthy();
        expect(VglPath.props.d.validator('  L11.2 8.3')).toBeTruthy();
        expect(VglPath.props.d.validator('l11.2 8.3 ')).toBeTruthy();
        expect(VglPath.props.d.validator('T11.2 8.3  ')).toBeTruthy();
        expect(VglPath.props.d.validator(' t11.2 8.3  ')).toBeTruthy();
        // Comma separators instead of spaces
        expect(VglPath.props.d.validator('Q11.2,8.3,-4.2,-6.1')).toBeTruthy();
        expect(VglPath.props.d.validator('Q11.2 8.3, -4.2 ,-6.1')).toBeTruthy();
        expect(VglPath.props.d.validator('  Q11.2 , 8.3  , -4.2 ,  -6.1 ')).toBeTruthy();
        // Multiple commands
        expect(VglPath.props.d.validator(' M1 -8 ,2 -1  Q4.8 .3 -.002, 5t-3 4H3.3v-9   ')).toBeTruthy();
      });
      test('rejects invalid path commands', () => {
        // Invalid comma positions
        expect(VglPath.props.d.validator('M,1 8')).toBeFalsy();
        expect(VglPath.props.d.validator('M ,1 8')).toBeFalsy();
        expect(VglPath.props.d.validator('M, 1 8')).toBeFalsy();
        expect(VglPath.props.d.validator(',M1 8')).toBeFalsy();
        expect(VglPath.props.d.validator(' ,M1 8')).toBeFalsy();
        expect(VglPath.props.d.validator(', M1 8')).toBeFalsy();
        expect(VglPath.props.d.validator('M1 8,')).toBeFalsy();
        expect(VglPath.props.d.validator('M1 8 ,')).toBeFalsy();
        expect(VglPath.props.d.validator('M1 8, ')).toBeFalsy();
        // Wrong parameter counts
        expect(VglPath.props.d.validator('M1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('M1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('M')).toBeFalsy();
        expect(VglPath.props.d.validator('m1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('m1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('m')).toBeFalsy();
        expect(VglPath.props.d.validator('L1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('L1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('L')).toBeFalsy();
        expect(VglPath.props.d.validator('l1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('l1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('l')).toBeFalsy();
        expect(VglPath.props.d.validator('T1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('T1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('T')).toBeFalsy();
        expect(VglPath.props.d.validator('t1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('t1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('t')).toBeFalsy();
        expect(VglPath.props.d.validator('Q1.3 -8 3 -5.2 1')).toBeFalsy();
        expect(VglPath.props.d.validator('Q1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('Q1.3 -8')).toBeFalsy();
        expect(VglPath.props.d.validator('Q1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('Q')).toBeFalsy();
        expect(VglPath.props.d.validator('q1.3 -8 3 -5.2 1')).toBeFalsy();
        expect(VglPath.props.d.validator('q1.3 -8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('q1.3 -8')).toBeFalsy();
        expect(VglPath.props.d.validator('q1.3')).toBeFalsy();
        expect(VglPath.props.d.validator('q')).toBeFalsy();
        expect(VglPath.props.d.validator('H')).toBeFalsy();
        expect(VglPath.props.d.validator('h')).toBeFalsy();
        expect(VglPath.props.d.validator('V')).toBeFalsy();
        expect(VglPath.props.d.validator('v')).toBeFalsy();
        // Starts without command charactor
        expect(VglPath.props.d.validator('1M8 3')).toBeFalsy();
        expect(VglPath.props.d.validator('-M8 3')).toBeFalsy();
        // Invalid command parameters
        expect(VglPath.props.d.validator('M/8 3')).toBeFalsy();
      });
    });
  });
  describe('computed property', () => {
    describe('path', () => {
      let inst;
      let moveTo;
      let lineTo;
      let quadraticCurveTo;
      beforeEach(() => {
        inst = new Path();
        inst.moveTo(-12.3, 24.5);
        moveTo = jest.spyOn(inst, 'moveTo');
        lineTo = jest.spyOn(inst, 'lineTo');
        quadraticCurveTo = jest.spyOn(inst, 'quadraticCurveTo');
      });
      test('with M (moveTo) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'M1.1 -5 -.3 .8' } }).path(inst);
        expect(moveTo).toHaveBeenCalledTimes(1);
        expect(moveTo.mock.calls[0][0]).toBeCloseTo(-0.3);
        expect(moveTo.mock.calls[0][1]).toBeCloseTo(0.8);
      });
      test('with m (moveTo relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'm1.1 -5 -.3 .8' } }).path(inst);
        expect(moveTo).toHaveBeenCalledTimes(1);
        expect(moveTo.mock.calls[0][0]).toBeCloseTo(-11.5);
        expect(moveTo.mock.calls[0][1]).toBeCloseTo(20.3);
      });
      test('with L (lineTo) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'L1.1 -5 -.3 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(2);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(1.1);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(-5);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-0.3);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(0.8);
      });
      test('with l (lineTo relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'l1.1 -5 -.3 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(2);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(-11.2);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(19.5);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-11.5);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(20.3);
      });
      test('with H (lineTo horizontal) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'H1.1 -5 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(3);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(1.1);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(24.5);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-5);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(24.5);
        expect(lineTo.mock.calls[2][0]).toBeCloseTo(0.8);
        expect(lineTo.mock.calls[2][1]).toBeCloseTo(24.5);
      });
      test('with h (lineTo horizontal relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'h1.1 -5 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(3);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(-11.2);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(24.5);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-16.2);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(24.5);
        expect(lineTo.mock.calls[2][0]).toBeCloseTo(-15.4);
        expect(lineTo.mock.calls[2][1]).toBeCloseTo(24.5);
      });
      test('with V (lineTo vertical) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'V1.1 -5 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(3);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(1.1);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(-5);
        expect(lineTo.mock.calls[2][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[2][1]).toBeCloseTo(0.8);
      });
      test('with v (lineTo vertical relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'v1.1 -5 .8' } }).path(inst);
        expect(lineTo).toHaveBeenCalledTimes(3);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(25.6);
        expect(lineTo.mock.calls[1][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[1][1]).toBeCloseTo(20.6);
        expect(lineTo.mock.calls[2][0]).toBeCloseTo(-12.3);
        expect(lineTo.mock.calls[2][1]).toBeCloseTo(21.4);
      });
      test('with Q (quadraticCurveTo) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'Q1.1 -5 -.3 .8 -1.4 10.84 -9 -8.8' } }).path(inst);
        expect(quadraticCurveTo).toHaveBeenCalledTimes(2);
        expect(quadraticCurveTo.mock.calls[0][0]).toBeCloseTo(1.1);
        expect(quadraticCurveTo.mock.calls[0][1]).toBeCloseTo(-5);
        expect(quadraticCurveTo.mock.calls[0][2]).toBeCloseTo(-0.3);
        expect(quadraticCurveTo.mock.calls[0][3]).toBeCloseTo(0.8);
        expect(quadraticCurveTo.mock.calls[1][0]).toBeCloseTo(-1.4);
        expect(quadraticCurveTo.mock.calls[1][1]).toBeCloseTo(10.84);
        expect(quadraticCurveTo.mock.calls[1][2]).toBeCloseTo(-9);
        expect(quadraticCurveTo.mock.calls[1][3]).toBeCloseTo(-8.8);
      });
      test('with q (quadraticCurveTo relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'q1.1 -5 -.3 .8 -1.4 10.84 -9 -8.8' } }).path(inst);
        expect(quadraticCurveTo).toHaveBeenCalledTimes(2);
        expect(quadraticCurveTo.mock.calls[0][0]).toBeCloseTo(-11.2);
        expect(quadraticCurveTo.mock.calls[0][1]).toBeCloseTo(19.5);
        expect(quadraticCurveTo.mock.calls[0][2]).toBeCloseTo(-12.6);
        expect(quadraticCurveTo.mock.calls[0][3]).toBeCloseTo(25.3);
        expect(quadraticCurveTo.mock.calls[1][0]).toBeCloseTo(-14);
        expect(quadraticCurveTo.mock.calls[1][1]).toBeCloseTo(36.14);
        expect(quadraticCurveTo.mock.calls[1][2]).toBeCloseTo(-21.6);
        expect(quadraticCurveTo.mock.calls[1][3]).toBeCloseTo(16.5);
      });
      test('with T (quadraticCurveTo omitted) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'T1.1 -5 -.3 .8 -1.4 10.84 -9 -8.8' } }).path(inst);
        expect(quadraticCurveTo).toHaveBeenCalledTimes(4);
        expect(quadraticCurveTo.mock.calls[0][0]).toBeCloseTo(-12.3);
        expect(quadraticCurveTo.mock.calls[0][1]).toBeCloseTo(24.5);
        expect(quadraticCurveTo.mock.calls[0][2]).toBeCloseTo(1.1);
        expect(quadraticCurveTo.mock.calls[0][3]).toBeCloseTo(-5);
        expect(quadraticCurveTo.mock.calls[1][0]).toBeCloseTo(14.5);
        expect(quadraticCurveTo.mock.calls[1][1]).toBeCloseTo(-34.5);
        expect(quadraticCurveTo.mock.calls[1][2]).toBeCloseTo(-0.3);
        expect(quadraticCurveTo.mock.calls[1][3]).toBeCloseTo(0.8);
        expect(quadraticCurveTo.mock.calls[2][0]).toBeCloseTo(-15.1);
        expect(quadraticCurveTo.mock.calls[2][1]).toBeCloseTo(36.1);
        expect(quadraticCurveTo.mock.calls[2][2]).toBeCloseTo(-1.4);
        expect(quadraticCurveTo.mock.calls[2][3]).toBeCloseTo(10.84);
        expect(quadraticCurveTo.mock.calls[3][0]).toBeCloseTo(12.3);
        expect(quadraticCurveTo.mock.calls[3][1]).toBeCloseTo(-14.42);
        expect(quadraticCurveTo.mock.calls[3][2]).toBeCloseTo(-9);
        expect(quadraticCurveTo.mock.calls[3][3]).toBeCloseTo(-8.8);
      });
      test('with t (quadraticCurveTo omitted relatively) command', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 't1.1 -5 -.3 .8 -1.4 10.84 -9 -8.8' } }).path(inst);
        expect(quadraticCurveTo).toHaveBeenCalledTimes(4);
        expect(quadraticCurveTo.mock.calls[0][0]).toBeCloseTo(-12.3);
        expect(quadraticCurveTo.mock.calls[0][1]).toBeCloseTo(24.5);
        expect(quadraticCurveTo.mock.calls[0][2]).toBeCloseTo(-11.2);
        expect(quadraticCurveTo.mock.calls[0][3]).toBeCloseTo(19.5);
        expect(quadraticCurveTo.mock.calls[1][0]).toBeCloseTo(-10.1);
        expect(quadraticCurveTo.mock.calls[1][1]).toBeCloseTo(14.5);
        expect(quadraticCurveTo.mock.calls[1][2]).toBeCloseTo(-11.5);
        expect(quadraticCurveTo.mock.calls[1][3]).toBeCloseTo(20.3);
        expect(quadraticCurveTo.mock.calls[2][0]).toBeCloseTo(-12.9);
        expect(quadraticCurveTo.mock.calls[2][1]).toBeCloseTo(26.1);
        expect(quadraticCurveTo.mock.calls[2][2]).toBeCloseTo(-12.9);
        expect(quadraticCurveTo.mock.calls[2][3]).toBeCloseTo(31.14);
        expect(quadraticCurveTo.mock.calls[3][0]).toBeCloseTo(-12.9);
        expect(quadraticCurveTo.mock.calls[3][1]).toBeCloseTo(36.18);
        expect(quadraticCurveTo.mock.calls[3][2]).toBeCloseTo(-21.9);
        expect(quadraticCurveTo.mock.calls[3][3]).toBeCloseTo(22.34);
      });
      test('with multiple commands', () => {
        new (Vue.extend(VglPath))({ propsData: { d: 'm3 2.1q4 5 6 7T1.1 -5h-20' } }).path(inst);
        expect(moveTo).toHaveBeenCalledTimes(1);
        expect(quadraticCurveTo).toHaveBeenCalledTimes(2);
        expect(lineTo).toHaveBeenCalledTimes(1);
        expect(moveTo.mock.calls[0][0]).toBeCloseTo(-9.3);
        expect(moveTo.mock.calls[0][1]).toBeCloseTo(26.6);
        expect(quadraticCurveTo.mock.calls[0][0]).toBeCloseTo(-5.3);
        expect(quadraticCurveTo.mock.calls[0][1]).toBeCloseTo(31.6);
        expect(quadraticCurveTo.mock.calls[0][2]).toBeCloseTo(-3.3);
        expect(quadraticCurveTo.mock.calls[0][3]).toBeCloseTo(33.6);
        expect(quadraticCurveTo.mock.calls[1][0]).toBeCloseTo(-1.3);
        expect(quadraticCurveTo.mock.calls[1][1]).toBeCloseTo(35.6);
        expect(quadraticCurveTo.mock.calls[1][2]).toBeCloseTo(1.1);
        expect(quadraticCurveTo.mock.calls[1][3]).toBeCloseTo(-5);
        expect(lineTo.mock.calls[0][0]).toBeCloseTo(-18.9);
        expect(lineTo.mock.calls[0][1]).toBeCloseTo(-5);
      });
    });
    describe('inst', () => {
      test('instance of Path', () => {
        expect(new (Vue.extend(VglPath))().inst).toBeInstanceOf(Path);
      });
      test('autoClose property after d prop changes', async () => {
        const vm = new (Vue.extend(VglPath))({ propsData: { d: 'M0 0V-4.5', autoClose: true } });
        vm.d = 'M0 1V-3.5';
        await vm.$nextTick();
        expect(vm.inst.autoClose).toBe(true);
      });
      test('path creating method calls', () => {
        const points = new (Vue.extend(VglPath))({ propsData: { d: 'M0 1V-3.5' } }).inst.getPoints();
        expect(points).toHaveLength(2);
        expect(points[0].x).toBeCloseTo(0);
        expect(points[0].y).toBeCloseTo(1);
        expect(points[1].x).toBeCloseTo(0);
        expect(points[1].y).toBeCloseTo(-3.5);
      });
      test('path creating method calls after d prop changes', async () => {
        const vm = new (Vue.extend(VglPath))({ propsData: { d: 'M0 1V-3.5' } });
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
    });
  });
});
