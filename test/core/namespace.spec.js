import Namespace from '../../src/core/namespace';

describe('Namespace class', () => {
  let ns;
  describe('get method', () => {
    const testValue1 = { a: 1 };
    const testValue2 = { b: 2 };
    const testValue3 = { c: 3 };
    const testValue4 = { d: 4 };
    const testValue5 = { e: 5 };
    const testValue6 = { f: 6 };
    const testValue7 = { g: 7 };
    const testValue8 = { h: 8 };
    const testValue9 = { i: 9 };
    beforeEach(() => {
      const parent = new Namespace();
      ns = parent.fork();
      const child = ns.fork();
      parent.set('testKey1', testValue1);
      parent.set('testKey2', testValue2);
      parent.set('testKey6', testValue7);
      ns.set('testKey1', testValue3);
      ns.set('testKey3', testValue4);
      ns.set('testKey5', testValue5);
      child.set('testKey5', testValue6);
      child.set('testKey6', testValue8);
      child.set('testKey7', testValue9);
    });
    test('should return the object', () => {
      expect(ns.get('testKey3')).toBe(testValue4);
    });
    test('should return the self hosting when parent namespace has same key', () => {
      expect(ns.get('testKey1')).toBe(testValue3);
    });
    test('should return the parent hosting object when only parent namespace has the key', () => {
      expect(ns.get('testKey2')).toBe(testValue2);
    });
    test('should return undefined if the key does not exist', () => {
      expect(ns.get('testKey4')).toBeUndefined();
    });
    test('should return undefined if only child namespace has the key', () => {
      expect(ns.get('testKey7')).toBeUndefined();
    });
    test('should return the self hosting object when child namespace has same key', () => {
      expect(ns.get('testKey5')).toBe(testValue5);
    });
    test('should return the parent hosting object when child and parent has same key', () => {
      expect(ns.get('testKey6')).toBe(testValue7);
    });
  });
  describe('set method', () => {
    let listener1;
    let listener2;
    let listener3;
    let listener4;
    let listener5;
    let listener6;
    let listener7;
    let listener8;
    let listener9;
    let listener10;
    let testValue1;
    let testValue2;
    beforeEach(() => {
      listener1 = jest.fn();
      listener2 = jest.fn();
      listener3 = jest.fn();
      listener4 = jest.fn();
      listener5 = jest.fn();
      listener6 = jest.fn();
      listener7 = jest.fn();
      listener8 = jest.fn();
      listener9 = jest.fn();
      listener10 = jest.fn();
      testValue1 = { j: 10 };
      testValue2 = { k: 11 };
      const parent = new Namespace();
      ns = parent.fork();
      const child = ns.fork();
      parent.listen('testKey1', listener1);
      parent.listen('testKey2', listener2);
      parent.listen('testKey6', listener8);
      ns.listen('testKey3', listener3);
      ns.listen('testKey2', listener4);
      ns.listen('testKey4', listener5);
      child.listen('testKey5', listener6);
      child.listen('testKey4', listener7);
      child.listen('testKey6', listener9);
      child.set('testKey7', testValue2);
      child.listen('testKey7', listener10);
    });
    test('should call the listener with value', () => {
      ns.set('testKey3', testValue1);
      expect(listener3).toHaveBeenCalledWith(testValue1);
    });
    test('should call the self hosting listener even if parent has listener for same key', () => {
      ns.set('testKey2', testValue1);
      expect(listener4).toHaveBeenCalledWith(testValue1);
    });
    test('should not call the parent hosting listener', () => {
      ns.set('testKey1', testValue1);
      expect(listener1).not.toHaveBeenCalled();
    });
    test('should not call the parent hosting listener even if the listener exists', () => {
      ns.set('testKey2', testValue1);
      expect(listener2).not.toHaveBeenCalled();
    });
    test('should call the self hosting listener even if child has listener for same key', () => {
      ns.set('testKey4', testValue1);
      expect(listener5).toHaveBeenCalledWith(testValue1);
    });
    test('should call the child hosting listener if child has listener for the key', () => {
      ns.set('testKey5', testValue1);
      expect(listener6).toHaveBeenCalledWith(testValue1);
    });
    test('should call the child hosting listener even if child has listener for same key', () => {
      ns.set('testKey4', testValue1);
      expect(listener7).toHaveBeenCalledWith(testValue1);
    });
    test('should not call the child hosting listener when child has value for the key', () => {
      ns.set('testKey7', testValue1);
      expect(listener10).not.toHaveBeenCalled();
    });
    test('should call only child hosting listener when child and parent have listners', () => {
      ns.set('testKey6', testValue1);
      expect(listener8).not.toHaveBeenCalled();
      expect(listener9).toHaveBeenCalledWith(testValue1);
    });
  });
  describe('delete method', () => {
    let listener1;
    let listener2;
    let listener3;
    let listener4;
    let listener5;
    let listener6;
    let testValue1;
    let testValue2;
    let testValue3;
    let testValue4;
    let testValue5;
    let testValue6;
    let testValue7;
    let testValue8;
    let testValue9;
    beforeEach(() => {
      listener1 = jest.fn();
      listener2 = jest.fn();
      listener3 = jest.fn();
      listener4 = jest.fn();
      listener5 = jest.fn();
      listener6 = jest.fn();
      testValue1 = { j: 10 };
      testValue2 = { k: 11 };
      testValue3 = { l: 12 };
      testValue4 = { m: 13 };
      testValue5 = { n: 14 };
      testValue6 = { o: 15 };
      testValue7 = { p: 16 };
      testValue8 = { q: 17 };
      testValue9 = { r: 18 };
      const parent = new Namespace();
      ns = parent.fork();
      const child = ns.fork();
      ns.set('testKey1', testValue1);
      ns.set('testKey2', testValue2);
      ns.listen('testKey2', listener1);
      parent.set('testKey3', testValue4);
      ns.set('testKey3', testValue3);
      parent.set('testKey4', testValue6);
      ns.set('testKey4', testValue5);
      parent.listen('testKey4', listener3);
      ns.listen('testKey4', listener2);
      ns.set('testKey5', testValue8);
      child.set('testKey5', testValue7);
      ns.listen('testKey5', listener4);
      child.listen('testKey5', listener5);
      ns.set('testKey6', testValue9);
      child.listen('testKey6', listener6);
    });
    test('should delete the self hosting object', () => {
      ns.delete('testKey1', testValue1);
      expect(ns.get('testKey1')).toBeUndefined();
    });
    test('should not delete if passed value does not match existing one', () => {
      ns.delete('testKey1', { j: 10 });
      expect(ns.get('testKey1')).toBe(testValue1);
    });
    test('should call the hosting listener with undefined', () => {
      ns.delete('testKey2', testValue2);
      expect(listener1).toHaveBeenCalledWith(undefined);
    });
    test('should delete only the self hosting object when parent namespace has same key', () => {
      ns.delete('testKey3', testValue3);
      expect(ns.get('testKey3')).toBe(testValue4);
    });
    test('should call the listener with parent value when parent has same key', () => {
      ns.delete('testKey4', testValue5);
      expect(listener2).toHaveBeenCalledWith(testValue6);
    });
    test('should not call the parent hosting listener', () => {
      ns.delete('testKey4', testValue5);
      expect(listener3).not.toHaveBeenCalled();
    });
    test('should not call the child hosting listener when child has an object for the key', () => {
      ns.delete('testKey5', testValue8);
      expect(listener5).not.toHaveBeenCalled();
    });
    test('should call the self hosting listener even if child has an object for the key', () => {
      ns.delete('testKey5', testValue8);
      expect(listener4).toHaveBeenCalledWith(undefined);
    });
    test('should call the child hosting listener when child has no objects for the key', () => {
      ns.delete('testKey6', testValue9);
      expect(listener6).toHaveBeenCalledWith(undefined);
    });
  });
  describe('listen method', () => {
    let listener1;
    let listener2;
    let listener3;
    let testValue1;
    beforeEach(() => {
      ns = new Namespace();
      listener1 = jest.fn();
      listener2 = jest.fn();
      listener3 = jest.fn();
      testValue1 = { s: 19 };
    });
    test('should register multiple callbacks for same key', () => {
      ns.listen('testKey', listener1);
      ns.listen('testKey', listener2);
      ns.listen('testKey', listener3);
      ns.set('testKey', testValue1);
      expect(listener1).toHaveBeenCalledWith(testValue1);
      expect(listener2).toHaveBeenCalledWith(testValue1);
      expect(listener3).toHaveBeenCalledWith(testValue1);
    });
    test('should not register duplicate callbacks for same key', () => {
      ns.listen('testKey', listener1);
      ns.listen('testKey', listener1);
      ns.set('testKey', testValue1);
      expect(listener1).toHaveBeenNthCalledWith(1, testValue1);
    });
  });
  describe('unlisten method', () => {
    let listener1;
    let listener2;
    let listener3;
    let testValue1;
    beforeEach(() => {
      listener1 = jest.fn();
      listener2 = jest.fn();
      listener3 = jest.fn();
      testValue1 = { t: 20 };
      ns = new Namespace();
      ns.listen('testKey1', listener1);
      ns.listen('testKey1', listener2);
      ns.listen('testKey1', listener3);
    });
    test('should unregister a callback', () => {
      ns.unlisten('testKey1', listener1);
      ns.set('testKey1', testValue1);
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalledWith(testValue1);
      expect(listener3).toHaveBeenCalledWith(testValue1);
    });
    test('should unregister callbacks', () => {
      ns.unlisten('testKey1', listener1);
      ns.unlisten('testKey1', listener2);
      ns.unlisten('testKey1', listener3);
      ns.set('testKey1', testValue1);
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
      expect(listener3).not.toHaveBeenCalled();
    });
  });
  describe('destroy method', () => {
    let child;
    let listener1;
    let testValue1;
    beforeEach(() => {
      listener1 = jest.fn();
      testValue1 = { u: 21 };
      ns = new Namespace();
      child = ns.fork();
      child.listen('testKey1', listener1);
    });
    test('should unlink listeners', () => {
      child.destroy();
      ns.set('testKey1', testValue1);
      expect(listener1).not.toHaveBeenCalled();
    });
  });
  describe('keys method', () => {
    let parent;
    let child;
    beforeEach(() => {
      parent = new Namespace();
      ns = parent.fork();
      child = ns.fork();
    });
    test('should return keys hosted by self and parent namespace', () => {
      parent.set('testKey3', { x: 24 });
      parent.set('testKey4', { y: 25 });
      parent.set('testKey2', { z: 26 });
      ns.set('testKey1', { v: 22 });
      ns.set('testKey2', { w: 23 });
      ns.set('testKey6', { ac: 29 });
      child.set('testKey5', { aa: 27 });
      child.set('testKey1', { ab: 28 });
      expect(ns.keys().sort())
        .toEqual(['testKey1', 'testKey2', 'testKey3', 'testKey4', 'testKey6']);
    });
  });
});
