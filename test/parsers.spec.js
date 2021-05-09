/* global describe, test, expect */
import {
  Color, Vector2, Vector3, Euler, Quaternion, Spherical,
} from 'three';
import {
  parseNames, parseColor, parseVector2, parseVector3, parseEuler, parseQuaternion, parseSpherical,
  parseVector2Array, parseIntArray, parseFloatArray,
} from '../src/parsers';

describe('Parser functions', () => {
  describe('parseNames()', () => {
    test('should parse a space separated string', () => {
      expect(parseNames('abc123 bcd!"#')).toEqual(['abc123', 'bcd!"#']);
    });
    test('should parse a string separated by multi spaces', () => {
      expect(parseNames('abc123    bcd!"#')).toEqual(['abc123', 'bcd!"#']);
    });
    test('should parse a string with leading and trailing spaces', () => {
      expect(parseNames('  abc123 bcd!"# ')).toEqual(['abc123', 'bcd!"#']);
    });
    test('should return original array', () => {
      const names = ['abc123', 'bcd!"#'];
      expect(parseNames(names)).toBe(names);
    });
  });
  describe('parseColor()', () => {
    test('should parse a CSS style color', () => {
      const parsed = parseColor('#4f3ed5');
      expect(parsed).toBeInstanceOf(Color);
      expect(parsed.getHex()).toBe(0x4f3ed5);
    });
    test('should parse a hexadecimal color', () => {
      const parsed = parseColor(0x4f3ed5);
      expect(parsed).toBeInstanceOf(Color);
      expect(parsed.getHex()).toBe(0x4f3ed5);
    });
    test('should return original Color instance', () => {
      const color = new Color(0x4f3ed5);
      expect(parseColor(color)).toBe(color);
    });
  });
  describe('parseVector2()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseVector2('12.3 23.4');
      expect(parsed).toBeInstanceOf(Vector2);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseVector2(' 12.3 23.4   ');
      expect(parsed).toBeInstanceOf(Vector2);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseVector2(['12.3', '23.4']);
      expect(parsed).toBeInstanceOf(Vector2);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseVector2([12.3, 23.4]);
      expect(parsed).toBeInstanceOf(Vector2);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
    });
    test('should return original Vector2 instance', () => {
      const vector = new Vector2(12.3, 23.4);
      expect(parseVector2(vector)).toBe(vector);
    });
  });
  describe('parseVector3()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseVector3('12.3 23.4 45.6');
      expect(parsed).toBeInstanceOf(Vector3);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseVector3(' 12.3 23.4  45.6  ');
      expect(parsed).toBeInstanceOf(Vector3);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseVector3(['12.3', '23.4', '45.6']);
      expect(parsed).toBeInstanceOf(Vector3);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseVector3([12.3, 23.4, 45.6]);
      expect(parsed).toBeInstanceOf(Vector3);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
    });
    test('should return original Vector3 instance', () => {
      const vector = new Vector3(12.3, 23.4, 45.6);
      expect(parseVector3(vector)).toBe(vector);
    });
  });
  describe('parseEuler()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseEuler('12.3 23.4 45.6 YXZ');
      expect(parsed).toBeInstanceOf(Euler);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
      expect(parsed).toHaveProperty('order', 'YXZ');
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseEuler(' 12.3 23.4  45.6  YXZ   ');
      expect(parsed).toBeInstanceOf(Euler);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
      expect(parsed).toHaveProperty('order', 'YXZ');
    });
    test('should parse an array contains strings', () => {
      const parsed = parseEuler(['12.3', '23.4', '45.6', 'YXZ']);
      expect(parsed).toBeInstanceOf(Euler);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
      expect(parsed).toHaveProperty('order', 'YXZ');
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseEuler([12.3, 23.4, 45.6, 'YXZ']);
      expect(parsed).toBeInstanceOf(Euler);
      expect(parsed).toHaveProperty('x', 12.3);
      expect(parsed).toHaveProperty('y', 23.4);
      expect(parsed).toHaveProperty('z', 45.6);
      expect(parsed).toHaveProperty('order', 'YXZ');
    });
    test('should return original Euler instance', () => {
      const euler = new Euler(12.3, 23.4, 45.6, 'YXZ');
      expect(parseEuler(euler)).toBe(euler);
    });
  });
  describe('parseQuaternion()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseQuaternion('0.312 0.903 0.296 0.32');
      expect(parsed).toBeInstanceOf(Quaternion);
      expect(parsed).toHaveProperty('x', 0.312);
      expect(parsed).toHaveProperty('y', 0.903);
      expect(parsed).toHaveProperty('z', 0.296);
      expect(parsed).toHaveProperty('w', 0.32);
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseQuaternion(' 0.312  0.903 0.296   0.32   ');
      expect(parsed).toBeInstanceOf(Quaternion);
      expect(parsed).toHaveProperty('x', 0.312);
      expect(parsed).toHaveProperty('y', 0.903);
      expect(parsed).toHaveProperty('z', 0.296);
      expect(parsed).toHaveProperty('w', 0.32);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseQuaternion(['0.312', '0.903', '0.296', '0.32']);
      expect(parsed).toBeInstanceOf(Quaternion);
      expect(parsed).toHaveProperty('x', 0.312);
      expect(parsed).toHaveProperty('y', 0.903);
      expect(parsed).toHaveProperty('z', 0.296);
      expect(parsed).toHaveProperty('w', 0.32);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseQuaternion([0.312, 0.903, 0.296, 0.32]);
      expect(parsed).toBeInstanceOf(Quaternion);
      expect(parsed).toHaveProperty('x', 0.312);
      expect(parsed).toHaveProperty('y', 0.903);
      expect(parsed).toHaveProperty('z', 0.296);
      expect(parsed).toHaveProperty('w', 0.32);
    });
    test('should return original Quaternion instance', () => {
      const quaternion = new Quaternion(0.312, 0.903, 0.296, 0.32);
      expect(parseQuaternion(quaternion)).toBe(quaternion);
    });
  });
  describe('parseSpherical()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseSpherical('31.2 0.903 0.296');
      expect(parsed).toBeInstanceOf(Spherical);
      expect(parsed).toHaveProperty('radius', 31.2);
      expect(parsed).toHaveProperty('phi', 0.903);
      expect(parsed).toHaveProperty('theta', 0.296);
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseSpherical(' 31.2  0.903 0.296   ');
      expect(parsed).toBeInstanceOf(Spherical);
      expect(parsed).toHaveProperty('radius', 31.2);
      expect(parsed).toHaveProperty('phi', 0.903);
      expect(parsed).toHaveProperty('theta', 0.296);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseSpherical(['31.2', '0.903', '0.296']);
      expect(parsed).toBeInstanceOf(Spherical);
      expect(parsed).toHaveProperty('radius', 31.2);
      expect(parsed).toHaveProperty('phi', 0.903);
      expect(parsed).toHaveProperty('theta', 0.296);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseSpherical([31.2, 0.903, 0.296]);
      expect(parsed).toBeInstanceOf(Spherical);
      expect(parsed).toHaveProperty('radius', 31.2);
      expect(parsed).toHaveProperty('phi', 0.903);
      expect(parsed).toHaveProperty('theta', 0.296);
    });
    test('should return original Spherical instance', () => {
      const spherical = new Spherical(31.2, 0.903, 0.296);
      expect(parseSpherical(spherical)).toBe(spherical);
    });
  });
  describe('parseVector2Array()', () => {
    test('should parse a space separated string', () => {
      const parsed = parseVector2Array('31.2 45.6, 12.3 67.8');
      expect(parsed).toEqual([expect.any(Vector2), expect.any(Vector2)]);
      expect(parsed[0]).toHaveProperty('x', 31.2);
      expect(parsed[0]).toHaveProperty('y', 45.6);
      expect(parsed[1]).toHaveProperty('x', 12.3);
      expect(parsed[1]).toHaveProperty('y', 67.8);
    });
    test('should parse a space separated string with leading and trailing spaces', () => {
      const parsed = parseVector2Array(' 31.2  45.6 ,12.3   67.8   ');
      expect(parsed).toEqual([expect.any(Vector2), expect.any(Vector2)]);
      expect(parsed[0]).toHaveProperty('x', 31.2);
      expect(parsed[0]).toHaveProperty('y', 45.6);
      expect(parsed[1]).toHaveProperty('x', 12.3);
      expect(parsed[1]).toHaveProperty('y', 67.8);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseVector2Array(['31.2 45.6', '12.3 67.8']);
      expect(parsed).toEqual([expect.any(Vector2), expect.any(Vector2)]);
      expect(parsed[0]).toHaveProperty('x', 31.2);
      expect(parsed[0]).toHaveProperty('y', 45.6);
      expect(parsed[1]).toHaveProperty('x', 12.3);
      expect(parsed[1]).toHaveProperty('y', 67.8);
    });
    test('should parse an array contains string arrays', () => {
      const parsed = parseVector2Array([['31.2', '45.6'], ['12.3', '67.8']]);
      expect(parsed).toEqual([expect.any(Vector2), expect.any(Vector2)]);
      expect(parsed[0]).toHaveProperty('x', 31.2);
      expect(parsed[0]).toHaveProperty('y', 45.6);
      expect(parsed[1]).toHaveProperty('x', 12.3);
      expect(parsed[1]).toHaveProperty('y', 67.8);
    });
    test('should parse an array contains number arrays', () => {
      const parsed = parseVector2Array([[31.2, 45.6], [12.3, 67.8]]);
      expect(parsed).toEqual([expect.any(Vector2), expect.any(Vector2)]);
      expect(parsed[0]).toHaveProperty('x', 31.2);
      expect(parsed[0]).toHaveProperty('y', 45.6);
      expect(parsed[1]).toHaveProperty('x', 12.3);
      expect(parsed[1]).toHaveProperty('y', 67.8);
    });
    test('should return original array of Vector2 instances', () => {
      const array = [new Vector2(31.2, 45.6), new Vector2(12.3, 67.8)];
      expect(parseVector2Array(array)).toBe(array);
    });
  });
  describe('parseIntArray()', () => {
    test('should parse a comma separated string', () => {
      const parsed = parseIntArray('31, 45, 12, 67');
      expect(parsed).toEqual([31, 45, 12, 67]);
    });
    test('should parse a comma separated string with leading and trailing spaces', () => {
      const parsed = parseIntArray(' 31 , 45 ,12 ,  67   ');
      expect(parsed).toEqual([31, 45, 12, 67]);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseIntArray(['31', '45', '12', '67']);
      expect(parsed).toEqual([31, 45, 12, 67]);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseIntArray([31, 45, 12, 67]);
      expect(parsed).toEqual([31, 45, 12, 67]);
    });
  });
  describe('parseFloatArray()', () => {
    test('should parse a comma separated string', () => {
      const parsed = parseFloatArray('31.2, 45.6, 12.3, 67.8');
      expect(parsed).toEqual([31.2, 45.6, 12.3, 67.8]);
    });
    test('should parse a comma separated string with leading and trailing spaces', () => {
      const parsed = parseFloatArray(' 31.2 , 45.6 ,12.3 ,  67.8   ');
      expect(parsed).toEqual([31.2, 45.6, 12.3, 67.8]);
    });
    test('should parse an array contains strings', () => {
      const parsed = parseFloatArray(['31.2', '45.6', '12.3', '67.8']);
      expect(parsed).toEqual([31.2, 45.6, 12.3, 67.8]);
    });
    test('should parse an array contains numbers', () => {
      const parsed = parseFloatArray([31.2, 45.6, 12.3, 67.8]);
      expect(parsed).toEqual([31.2, 45.6, 12.3, 67.8]);
    });
  });
});
