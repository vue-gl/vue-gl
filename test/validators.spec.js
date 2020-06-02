import {
  Vector3, Vector2, Euler, Quaternion, Spherical,
} from 'three';
import {
  validateName, validateNames, validateVector3, validateVector2, validateEuler, validateQuaternion,
  validateSpherical, validateFloatArray, validateVector2Array,
} from '../src/validators';

describe('Validator functions', () => {
  describe('validateName()', () => {
    test('should return true for valid name', () => {
      expect(validateName('Valid_name')).toBe(true);
    });
    test('should return true for valid name with leading and trailing spaces', () => {
      expect(validateName('   valid-name ')).toBe(true);
    });
    test('should return false for name including spaces', () => {
      expect(validateName('invalid name')).toBe(false);
    });
    test('should return false for name including spaces wirh leading and trailing spaces', () => {
      expect(validateName(' invalid name   ')).toBe(false);
    });
    test('should return false for an empty name', () => {
      expect(validateName('')).toBe(false);
    });
    test('should return false for space only string', () => {
      expect(validateName('   ')).toBe(false);
    });
  });
  describe('validateNames()', () => {
    test('should return true for space separated names', () => {
      expect(validateNames('valid_name1 valid_name2  valid-name-3 ')).toBe(true);
    });
    test('should return true for a name without spaces', () => {
      expect(validateNames('valid_name')).toBe(true);
    });
    test('should return true for an array of valid names', () => {
      expect(validateNames(['valid_name1', 'valid_name2', 'valid-name-3'])).toBe(true);
    });
    test('should return false for an empty string', () => {
      expect(validateNames('')).toBe(false);
    });
    test('should return false for space only string', () => {
      expect(validateNames('   ')).toBe(false);
    });
    test('should return false for an array containing invalid names', () => {
      expect(validateNames(['invalid name1', 'valid_name2', 'valid-name-3'])).toBe(false);
    });
  });
  describe('validateVector2()', () => {
    test('should return true for space separated coodinates', () => {
      expect(validateVector2('1.1 2.1')).toBe(true);
    });
    test('should return true for space separated coodinates with leading/trailing spaces', () => {
      expect(validateVector2('  1.1  2.1  ')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateVector2(['1.1', '2.1'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateVector2([1.1, 2.1])).toBe(true);
    });
    test('should return true for a Vector2 instance', () => {
      expect(validateVector2(new Vector2(1.1, 2.1))).toBe(true);
    });
    test('should return false for a string contains too many coodinates', () => {
      expect(validateVector2('1.1 2.1 3.1')).toBe(false);
    });
    test('should return false for a string contains too less coodinates', () => {
      expect(validateVector2('1.1')).toBe(false);
    });
    test('should return false for an array contains too many coodinate string', () => {
      expect(validateVector2(['1.1', '2.1', '3.1'])).toBe(false);
    });
    test('should return false for an array contains too many coodinate number', () => {
      expect(validateVector2([1.1, 2.1, 3.1])).toBe(false);
    });
    test('should return false for an array contains too less coodinate string', () => {
      expect(validateVector2(['1.1'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate number', () => {
      expect(validateVector2([1.1])).toBe(false);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateVector2('1.1 abc')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateVector2(['1.1', 'abc'])).toBe(false);
    });
  });
  describe('validateVector3()', () => {
    test('should return true for space separated coodinates', () => {
      expect(validateVector3('1.1 2.1 3.1')).toBe(true);
    });
    test('should return true for space separated coodinates with leading/trailing spaces', () => {
      expect(validateVector3('  1.1  2.1 3.1 ')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateVector3(['1.1', '2.1', '3.1'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateVector3([1.1, 2.1, 3.1])).toBe(true);
    });
    test('should return true for a Vector3 instance', () => {
      expect(validateVector3(new Vector3(1.1, 2.1, 3.1))).toBe(true);
    });
    test('should return false for a string contains too many coodinates', () => {
      expect(validateVector3('1.1 2.1 3.1 4.1')).toBe(false);
    });
    test('should return false for a string contains too less coodinates', () => {
      expect(validateVector3('1.1 2.1')).toBe(false);
    });
    test('should return false for an array contains too many coodinate string', () => {
      expect(validateVector3(['1.1', '2.1', '3.1', '4.1'])).toBe(false);
    });
    test('should return false for an array contains too many coodinate number', () => {
      expect(validateVector3([1.1, 2.1, 3.1, 4.1])).toBe(false);
    });
    test('should return false for an array contains too less coodinate string', () => {
      expect(validateVector3(['1.1', '2.1'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate number', () => {
      expect(validateVector3([1.1, 2.1])).toBe(false);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateVector3('1.1 abc 4.1')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateVector3(['1.1', 'abc', '4.1'])).toBe(false);
    });
  });
  describe('validateEuler()', () => {
    test('should return true for space separated coodinates', () => {
      expect(validateEuler('1.1 2.1 3.1 YXZ')).toBe(true);
    });
    test('should return true for space separated coodinates with leading/trailing spaces', () => {
      expect(validateEuler('  1.1  2.1 3.1  YXZ ')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateEuler(['1.1', '2.1', '3.1', 'YXZ'])).toBe(true);
    });
    test('should return true for an array of numbers and order string', () => {
      expect(validateEuler([1.1, 2.1, 3.1, 'YXZ'])).toBe(true);
    });
    test('should return true for a Euler instance', () => {
      expect(validateEuler(new Euler(1.1, 2.1, 3.1, 'YXZ'))).toBe(true);
    });
    test('should return false for a string contains too many coodinates', () => {
      expect(validateEuler('1.1 2.1 3.1 4.1 YXZ')).toBe(false);
    });
    test('should return false for a string contains too less coodinates', () => {
      expect(validateEuler('1.1 2.1 YXZ')).toBe(false);
    });
    test('should return false for an array contains too many coodinate string', () => {
      expect(validateEuler(['1.1', '2.1', '3.1', '4.1', 'YXZ'])).toBe(false);
    });
    test('should return false for an array contains too many coodinate number', () => {
      expect(validateEuler([1.1, 2.1, 3.1, 4.1, 'YXZ'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate string', () => {
      expect(validateEuler(['1.1', '2.1', 'YXZ'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate number', () => {
      expect(validateEuler([1.1, 2.1, 'YXZ'])).toBe(false);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateEuler('1.1 abc 4.1 YXZ')).toBe(false);
    });
    test('should return false for a string with invalid order string', () => {
      expect(validateEuler('1.1 2.1 4.1 YXA')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateEuler(['1.1', 'abc', '4.1', 'YXZ'])).toBe(false);
    });
    test('should return false for an array with invalid order string', () => {
      expect(validateEuler('1.1', '2.1', '4.1', 'YXA')).toBe(false);
    });
  });
  describe('validateQuaternion()', () => {
    test('should return true for space separated coodinates', () => {
      expect(validateQuaternion('0.5 0.5 0.71 0.35')).toBe(true);
    });
    test('should return true for space separated coodinates with leading/trailing spaces', () => {
      expect(validateQuaternion('  0.5  0.5 0.71 0.35 ')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateQuaternion(['0.5', '0.5', '0.71', '0.35'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateQuaternion([0.5, 0.5, 0.71, 0.35])).toBe(true);
    });
    test('should return true for a Quaternion instance', () => {
      expect(validateQuaternion(new Quaternion(0.5, 0.5, 0.71, 0.35))).toBe(true);
    });
    test('should return false for a string contains too many coodinates', () => {
      expect(validateQuaternion('0.5 0.5 0.71 0.35 0.24')).toBe(false);
    });
    test('should return false for a string contains too less coodinates', () => {
      expect(validateQuaternion('0.5 0.5 0.71')).toBe(false);
    });
    test('should return false for an array contains too many coodinate string', () => {
      expect(validateQuaternion(['0.5', '0.5', '0.71', '0.35', '0.24'])).toBe(false);
    });
    test('should return false for an array contains too many coodinate number', () => {
      expect(validateQuaternion([0.5, 0.5, 0.71, 0.35, 0.24])).toBe(false);
    });
    test('should return false for an array contains too less coodinate string', () => {
      expect(validateQuaternion(['0.5', '0.5', '0.71'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate number', () => {
      expect(validateQuaternion([0.5, 0.5, 0.71])).toBe(false);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateQuaternion('0.5 0.5 abc 0.35')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateQuaternion(['0.5', '0.5', 'abc', '0.35'])).toBe(false);
    });
  });
  describe('validateSpherical()', () => {
    test('should return true for space separated coodinates', () => {
      expect(validateSpherical('1.1 2.1 3.1')).toBe(true);
    });
    test('should return true for space separated coodinates with leading/trailing spaces', () => {
      expect(validateSpherical('  1.1  2.1 3.1 ')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateSpherical(['1.1', '2.1', '3.1'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateSpherical([1.1, 2.1, 3.1])).toBe(true);
    });
    test('should return true for a Spherical instance', () => {
      expect(validateSpherical(new Spherical(1.1, 2.1, 3.1))).toBe(true);
    });
    test('should return false for a string contains too many coodinates', () => {
      expect(validateSpherical('1.1 2.1 3.1 4.1')).toBe(false);
    });
    test('should return false for a string contains too less coodinates', () => {
      expect(validateSpherical('1.1 2.1')).toBe(false);
    });
    test('should return false for an array contains too many coodinate string', () => {
      expect(validateSpherical(['1.1', '2.1', '3.1', '4.1'])).toBe(false);
    });
    test('should return false for an array contains too many coodinate number', () => {
      expect(validateSpherical([1.1, 2.1, 3.1, 4.1])).toBe(false);
    });
    test('should return false for an array contains too less coodinate string', () => {
      expect(validateSpherical(['1.1', '2.1'])).toBe(false);
    });
    test('should return false for an array contains too less coodinate number', () => {
      expect(validateSpherical([1.1, 2.1])).toBe(false);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateSpherical('1.1 abc 4.1')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateSpherical(['1.1', 'abc', '4.1'])).toBe(false);
    });
  });
  describe('validateIntArray()', () => {
    test('should return true for comma separated numbers string', () => {
      expect(validateFloatArray('1, 2, 3, 4')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateFloatArray(['1', '2', '3', '4'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateFloatArray([1, 2, 3, 4])).toBe(true);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateFloatArray('1, abc, 3, 4')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateFloatArray(['1', 'abc', '3', '4'])).toBe(false);
    });
  });
  describe('validateFloatArray()', () => {
    test('should return true for comma separated numbers string', () => {
      expect(validateFloatArray('1.1, 2.1, 3.1, 4.1')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateFloatArray(['1.1', '2.2', '3.3', '4.4'])).toBe(true);
    });
    test('should return true for an array of numbers', () => {
      expect(validateFloatArray([1.1, 2.2, 3.3, 4.4])).toBe(true);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateFloatArray('1.1, abc, 3.1, 4.1')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateFloatArray(['1.1', 'abc', '3.1', '4.1'])).toBe(false);
    });
  });
  describe('validateVector2Array()', () => {
    test('should return true for comma and space separated numbers string', () => {
      expect(validateVector2Array('1.1 2.1, 3.1 4.1')).toBe(true);
    });
    test('should return true for an array of parsable strings', () => {
      expect(validateVector2Array(['1.1 2.2', '3.3 4.4'])).toBe(true);
    });
    test('should return true for an array of arrays of strings', () => {
      expect(validateVector2Array([['1.1', '2.2'], ['3.3', '4.4']])).toBe(true);
    });
    test('should return true for an array of arrays of numbers', () => {
      expect(validateVector2Array([[1.1, 2.2], [3.3, 4.4]])).toBe(true);
    });
    test('should return true for an array of Vector2s', () => {
      expect(validateVector2Array([new Vector2(1.1, 2.2), new Vector2(3.3, 4.4)])).toBe(true);
    });
    test('should return false for a string contains non-parsable coodinates', () => {
      expect(validateVector2Array('1.1 abc, 3.1 4.1')).toBe(false);
    });
    test('should return false for an array contains non-parsable coodinate string', () => {
      expect(validateVector2Array(['1.1 abc', '3.1 4.1'])).toBe(false);
    });
  });
});
