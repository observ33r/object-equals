import { objectEquals } from '../src/objectEquals.mjs';

/**
 *   Lodash parity tests (ported from QUnit to Vitest)
 * 
 *   These tests are adapted from lodash.isEqual QUnit suite:
 *   https://github.com/lodash/lodash/blob/main/test/test.js#L9530-L10364
 * 
 *   Notes:
 *   - All Object-wrapped primitives (Object(1), etc.) are unwrapped
 *     due to `objectEquals` strict type comparison strategy.
 *   - All lodash-specific chaining and DOM/realm-related tests are omitted.
 */

describe('objectEquals', () => {

    const symbol1 = Symbol('a');
    const symbol2 = Symbol('b');
  
    test('should compare primitives', () => {

        // Numbers
        expect(objectEquals(1, 1)).toBe(true);
        expect(objectEquals(1, '1')).toBe(false);
        expect(objectEquals(1, 2)).toBe(false);
      
        // Zeros
        expect(objectEquals(-0, 0)).toBe(true);
        expect(objectEquals(0, 0)).toBe(true);
        expect(objectEquals(0, '0')).toBe(false);
        expect(objectEquals(0, null)).toBe(false);
      
        // NaN
        expect(objectEquals(NaN, NaN)).toBe(true);
        expect(objectEquals(NaN, 'a')).toBe(false);
        expect(objectEquals(NaN, Infinity)).toBe(false);
      
        // Strings
        expect(objectEquals('a', 'a')).toBe(true);
        expect(objectEquals('a', 'b')).toBe(false);
        expect(objectEquals('a', ['a'])).toBe(false);
      
        // Booleans
        expect(objectEquals(true, true)).toBe(true);
        expect(objectEquals(true, 1)).toBe(false);
        expect(objectEquals(true, 'a')).toBe(false);
        expect(objectEquals(false, false)).toBe(true);
        expect(objectEquals(false, 0)).toBe(false);
        expect(objectEquals(false, '')).toBe(false);
      
        // Symbols
        expect(objectEquals(symbol1, symbol1)).toBe(true);
        expect(objectEquals(symbol1, symbol2)).toBe(false);
      
        // Null and Undefined
        expect(objectEquals(null, null)).toBe(true);
        expect(objectEquals(null, undefined)).toBe(false);
        expect(objectEquals(null, {})).toBe(false);
        expect(objectEquals(null, '')).toBe(false);
        expect(objectEquals(undefined, undefined)).toBe(true);
        expect(objectEquals(undefined, null)).toBe(false);
        expect(objectEquals(undefined, '')).toBe(false);

    });

    test('should compare arrays', () => {

        let array1 = [true, null, 1, 'a', undefined];
        let array2 = [true, null, 1, 'a', undefined];

        expect(objectEquals(array1, array2)).toBe(true);
    
        array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];
        array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];

        expect(objectEquals(array1, array2)).toBe(true);
    
        array1 = [1];
        array1[2] = 3;
        array2 = [1];
        array2[1] = undefined;
        array2[2] = 3;

        expect(objectEquals(array1, array2)).toBe(true);
    
        array1 = [1, 2, 3];
        array2 = [3, 2, 1];

        expect(objectEquals(array1, array2)).toBe(false);
    
        array1 = [1, 2];
        array2 = [1, 2, 3];

        expect(objectEquals(array1, array2)).toBe(false);

    });

    test('should treat arrays with identical values but different non-index properties as equal', () => {

        let array1 = [1, 2, 3];
        let array2 = [1, 2, 3];
    
        array1.every = array1.filter = array1.forEach =
        array1.indexOf = array1.lastIndexOf = array1.map =
        array1.some = array1.reduce = array1.reduceRight = null;
    
        array2.concat = array2.join = array2.pop =
        array2.reverse = array2.shift = array2.slice =
        array2.sort = array2.splice = array2.unshift = null;
    
        expect(objectEquals(array1, array2)).toBe(true);
    
        array1 = [1, 2, 3];
        array1.a = 1;
        array2 = [1, 2, 3];
        array2.b = 2;

        expect(objectEquals(array1, array2)).toBe(true);
    
        array1 = /c/.exec('abcde');
        array2 = ['c'];

        expect(objectEquals(array1, array2)).toBe(true);

    });

    test('should compare sparse arrays', () => {

        const array = Array(1);

        expect(objectEquals(array, Array(1))).toBe(true);
        expect(objectEquals(array, [undefined])).toBe(true);
        expect(objectEquals(array, Array(2))).toBe(false);

    });
    
    test('should compare plain objects', () => {

      let object1 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };
      let object2 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };

      expect(objectEquals(object1, object2)).toBe(true);
    
      object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
      object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };

      expect(objectEquals(object1, object2)).toBe(true);
    
      object1 = { 'a': 1, 'b': 2, 'c': 3 };
      object2 = { 'a': 3, 'b': 2, 'c': 1 };

      expect(objectEquals(object1, object2)).toBe(false);
    
      object1 = { 'a': 1, 'b': 2, 'c': 3 };
      object2 = { 'd': 1, 'e': 2, 'f': 3 };

      expect(objectEquals(object1, object2)).toBe(false);
    
      object1 = { 'a': 1, 'b': 2 };
      object2 = { 'a': 1, 'b': 2, 'c': 3 };

      expect(objectEquals(object1, object2)).toBe(false);

    });
    
    test('should compare objects regardless of key order', () => {

        const object1 = { 'a': 1, 'b': 2, 'c': 3 };
        const object2 = { 'c': 3, 'a': 1, 'b': 2 };

        expect(objectEquals(object1, object2)).toBe(true);

    });
    
    test('should compare nested objects', () => {

        const noop = () => {};

        const object1 = {
            'a': [1, 2, 3],
            'b': true,
            'c': 1,
            'd': 'a',
            'e': {
                'f': ['a', 'b', 'c'],
                'g': false,
                'h': new Date(2012, 4, 23),
                'i': noop,
                'j': 'a'
            }
        };
    
        const object2 = {
            'a': [1, 2, 3],
            'b': true,
            'c': 1,
            'd': 'a',
            'e': {
                'f': ['a', 'b', 'c'],
                'g': false,
                'h': new Date(2012, 4, 23),
                'i': noop,
                'j': 'a'
            }
        };
    
        expect(objectEquals(object1, object2)).toBe(true);

    });
    
    test('should compare object instances', () => {

        function Foo() { this.a = 1; }
        Foo.prototype.a = 1;
    
        function Bar() { this.a = 1; }
        Bar.prototype.a = 2;
    
        expect(objectEquals(new Foo(), new Foo())).toBe(true);
        expect(objectEquals(new Foo(), new Bar())).toBe(false);
        expect(objectEquals({ 'a': 1 }, new Foo())).toBe(false);
        expect(objectEquals({ 'a': 2 }, new Bar())).toBe(false);

    });


    test('should compare objects with constructor properties', () => {

        expect(objectEquals({ 'constructor': 1 }, { 'constructor': 1 })).toBe(true);
        expect(objectEquals({ 'constructor': 1 }, { 'constructor': '1' })).toBe(false);
        expect(objectEquals({ 'constructor': [1] }, { 'constructor': [1] })).toBe(true);
        expect(objectEquals({ 'constructor': [1] }, { 'constructor': [2] })).toBe(false);
        expect(objectEquals({ 'constructor': [1] }, { 'constructor': ['1'] })).toBe(false);
        expect(objectEquals({ 'constructor': Object }, {})).toBe(false);

    });
    
    test('should compare arrays with circular references', () => {

        let array1 = [];
        let array2 = [];
        
        array1.push(array1);
        array2.push(array2);

        expect(objectEquals(array1, array2, { circular: true })).toBe(true);
    
        array1.push('b');
        array2.push('b');

        expect(objectEquals(array1, array2, { circular: true })).toBe(true);
    
        array1.push('c');
        array2.push('d');

        expect(objectEquals(array1, array2, { circular: true })).toBe(false);
    
        array1 = ['a', 'b', 'c'];
        array1[1] = array1;
        array2 = ['a', ['a', 'b', 'c'], 'c'];

        expect(objectEquals(array1, array2, { circular: true })).toBe(false);
    
        array1 = [[[]]];
        array1[0][0][0] = array1;
        array2 = [];
        array2[0] = array2;

        expect(objectEquals(array1, array2, { circular: true })).toBe(false);
        expect(objectEquals(array2, array1, { circular: true })).toBe(false);

    });
    
    test('should have transitive equivalence for circular references of arrays', () => {

        const array1 = [];
        const array2 = [array1];
        const array3 = [array2];
    
        array1[0] = array1;

        expect(objectEquals(array1, array2)).toBe(true);
        expect(objectEquals(array2, array3)).toBe(true);
        expect(objectEquals(array1, array3)).toBe(true);

    });
    
    test('should compare objects with circular references', () => {

        let object1 = {};
        let object2 = {};
    
        object1.a = object1;
        object2.a = object2;

        expect(objectEquals(object1, object2, { circular: true })).toBe(true);
    
        object1.b = 0;
        object2.b = 0;

        expect(objectEquals(object1, object2, { circular: true })).toBe(true);
    
        object1.c = 1;
        object2.c = 2;

        expect(objectEquals(object1, object2, { circular: true })).toBe(false);
    
        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object1.b = object1;
        object2 = { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 3 }, 'c': 3 };

        expect(objectEquals(object1, object2, { circular: true })).toBe(false);

    });
    
    test('should compare objects with shared property values', () => {

        const object1 = {
            'a': [1, 2],
        };
    
        const object2 = {
            'a': [1, 2],
            'b': [1, 2]
        };
    
        object1.b = object1.a;

        expect(objectEquals(object1, object2)).toBe(true);

    });

    test('should treat objects created by `Object.create(null)` like plain objects', () => {

        function Foo() {
            this.a = 1;
        }

        Foo.prototype.constructor = null;
    
        let object1 = Object.create(null);
        object1.a = 1;
    
        const object2 = { 'a': 1 };

        expect(objectEquals(object1, object2, { crossrealm: true })).toBe(true);
        expect(objectEquals(new Foo, object2)).toBe(false);

    });
    
    test('should avoid common type coercions', () => {

        expect(objectEquals(true, false)).toBe(false);
        expect(objectEquals(false, 0)).toBe(false);
        expect(objectEquals(false, '')).toBe(false);
        expect(objectEquals(36, '36')).toBe(false);
        expect(objectEquals(0, '')).toBe(false);
        expect(objectEquals(1, true)).toBe(false);
        expect(objectEquals(1337756400000, new Date(2012, 4, 23))).toBe(false);
        expect(objectEquals('36', 36)).toBe(false);
        expect(objectEquals(36, '36')).toBe(false);

    });
    
    test('should compare arguments objects', () => {

        function getArgs(...args) { return args; }
        
        const args1 = getArgs();
        const args2 = getArgs();
        const args3 = getArgs(1, 2);
        
        expect(objectEquals(args1, args2)).toBe(true);
        expect(objectEquals(args1, args3)).toBe(false);

    });
    
    test('should compare objects with complex circular references', () => {

        const object1 = {
          'foo': { 'b': { 'c': { 'd': {} } } },
          'bar': { 'a': 2 }
        };
    
        const object2 = {
          'foo': { 'b': { 'c': { 'd': {} } } },
          'bar': { 'a': 2 }
        };
    
        object1.foo.b.c.d = object1;
        object1.bar.b = object1.foo.b;
    
        object2.foo.b.c.d = object2;
        object2.bar.b = object2.foo.b;
    
        expect(objectEquals(object1, object2, { circular: true })).toBe(true);

    });

    test('should compare array buffers', () => {

        const buffer = new Int8Array([-1]).buffer;

        expect(objectEquals(buffer, new Uint8Array([255]).buffer)).toBe(true);
        expect(objectEquals(buffer, new ArrayBuffer(1))).toBe(false);

    });
    
    test('should compare array views', () => {

        const int8Array1 = new Int8Array([1, 2]);
        const int8Array2 = new Int8Array([1, 2]);

        expect(objectEquals(int8Array1, int8Array2)).toBe(true);
    
        const uint8Array = new Uint8Array([1, 2]);
        
        expect(objectEquals(int8Array1, uint8Array)).toBe(false);
    
        const int8Array3 = new Int8Array(16);

        expect(objectEquals(int8Array1, int8Array3)).toBe(false);

    });
       
    test('should compare date objects', () => {

        const date = new Date(2012, 4, 23);

        expect(objectEquals(date, new Date(2012, 4, 23))).toBe(true);
        expect(objectEquals(new Date('a'), new Date('b'))).toBe(true);
        expect(objectEquals(date, new Date(2013, 3, 25))).toBe(false);
        expect(objectEquals(date, { getTime: () => +date })).toBe(false);

    });
    
    test('should compare error objects', () => {

        const error1 = new Error('a');
        const error2 = new Error('a');
        
        expect(objectEquals(error1, error2)).toBe(true);

    });
    
    test('should compare functions', () => {

        function a() { return 1 + 2; }
        function b() { return 1 + 2; }
        
        expect(objectEquals(a, a)).toBe(true);
        expect(objectEquals(a, b)).toBe(false);

    });
    
    test('should compare maps', () => {

        const map1 = new Map();
        const map2 = new Map();
          
        map1.set('a', 1);
        map2.set('b', 2);

        expect(objectEquals(map1, map2)).toBe(false);
    
        map1.set('b', 2);
        map2.set('a', 1);

        expect(objectEquals(map1, map2)).toBe(true);
    
        map1.delete('a');
        map1.set('a', 1);

        expect(objectEquals(map1, map2)).toBe(true);
    
        map2.delete('a');

        expect(objectEquals(map1, map2)).toBe(false);
    });
    
    test('should compare maps with circular references', () => {

        const map1 = new Map();
        const map2 = new Map();
          
        map1.set('a', map1);
        map2.set('a', map2);

        expect(objectEquals(map1, map2, { circular: true })).toBe(true);
    
        map1.set('b', 1);
        map2.set('b', 2);

        expect(objectEquals(map1, map2, { circular: true })).toBe(false);

    });
    
    test('should compare regexes', () => {

        expect(objectEquals(/x/gim, /x/gim)).toBe(true);
        expect(objectEquals(/x/gim, /x/mgi)).toBe(true);
        expect(objectEquals(/x/gi, /x/g)).toBe(false);
        expect(objectEquals(/x/, /y/)).toBe(false);
        expect(objectEquals(/x/g, {
            global: true,
            ignoreCase: false,
            multiline: false,
            source: 'x'
        })).toBe(false);

    });
    
    test('should compare sets', () => {

        const set1 = new Set();
        const set2 = new Set();
          
        set1.add(1);
        set2.add(2);

        expect(objectEquals(set1, set2)).toBe(false);
    
        set1.add(2);
        set2.add(1);

        expect(objectEquals(set1, set2)).toBe(true);
    
        set1.delete(1);
        set1.add(1);

        expect(objectEquals(set1, set2)).toBe(true);
    
        set2.delete(1);

        expect(objectEquals(set1, set2)).toBe(false);
    });
    
    test('should compare sets with circular references', () => {

        const set1 = new Set();
        const set2 = new Set();
          
        set1.add(set1);
        set2.add(set2);

        expect(objectEquals(set1, set2, { circular: true })).toBe(true);
    
        set1.add(1);
        set2.add(2);

        expect(objectEquals(set1, set2, { circular: true })).toBe(false);

    });
    
    test('should compare symbol properties', () => {
      
        const object1 = { a: 1, [symbol1]: { b: 2 } };
        const object2 = { a: 1, [symbol1]: { b: 2 } };

        expect(objectEquals(object1, object2, { symbols: true })).toBe(true);
    
        object2[symbol1] = { b: 1 };

        expect(objectEquals(object1, object2, { symbols: true })).toBe(false);
    
        delete object2[symbol1];
        object2[Symbol('a')] = { b: 2 };

        expect(objectEquals(object1, object2, { symbols: true })).toBe(false);

    });
    
    test('should return false for objects with custom toString methods', () => {

        const primitiveValues = [true, null, 1, 'a', undefined];
        const object = {
            toString() { return this.value; },
            value: null
        };
    
        primitiveValues.forEach(value => {

            object.value = value;

            expect(objectEquals(object, value, { fallback: true })).toBe(false);

        });
    });

});