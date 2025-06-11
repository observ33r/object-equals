import { createElement } from 'react';
import { createContext, runInContext } from 'node:vm';
import { objectEquals } from '../src/objectEquals.mjs';

describe('objectEquals', () => {

    test('Basic Object comparison', () => {

        const obj1 = { a: 1, b: [2, 3] };
        const obj2 = { a: 1, b: [2, 3] };

        expect(objectEquals(obj1, obj2)).toBe(true);

    });

    test('Extended Object comparison', () => {

        class ExtendedMap extends Map {}

        const map1 = new ExtendedMap([['key-1', 'value-1']]);
        const map2 = new ExtendedMap([['key-1', 'value-1']]);

        expect(objectEquals(map1, map2)).toBe(true);

    });

    test('Circular Object comparison with circular option', () => {

        const obj1 = { a: 1 };
        obj1.self = obj1;

        const obj2 = { a: 1 };
        obj2.self = obj2;

        expect(objectEquals(obj1, obj2, { circular: true })).toBe(true);
    });

    test('Cross-realm Array comparison with crossrealm option', () => {

        class ExtendedArray extends Array {};
        const CrossRealmArray = runInContext('Array', createContext());

        const array = [1, 2, 3];
        const extArr = new ExtendedArray(1, 2, 3);
        const realmArr = new CrossRealmArray(1, 2, 3);

        expect(objectEquals(array, extArr, { crossrealm: true })).toBe(true);
        expect(objectEquals(array, realmArr, { crossrealm: true })).toBe(true);

    });

    test('React element comparison with react option', () => {

        const el1 = createElement('a', { onClick: () => { console.log('click'); } }, 'text');
        const el2 = createElement('a', { onClick: () => { console.log('click'); } }, 'text');

        expect(objectEquals(el1, el2, { react: true })).toBe(true);

    });

    test('Object comparison with symbol keys using symbols option', () => {

        const symbol = Symbol('b');

        const obj1 = { a: 1, [symbol]: [2, 3] };
        const obj2 = { a: 1, [symbol]: [2, 3] };

        expect(objectEquals(obj1, obj2, { symbols: true })).toBe(true);

    });

    test('TypedArray comparison', () => {

        const typedArr1 = new Uint8Array([1, 2, 3]);
        const typedArr2 = new Uint8Array([1, 2, 3]);

        expect(objectEquals(typedArr1, typedArr2)).toBe(true);

    });
    
    test('DataView comparison', () => {

        const dataView1 = new DataView(new ArrayBuffer(4)).setInt32(0, 42);
        const dataView2 = new DataView(new ArrayBuffer(4)).setInt32(0, 42);

        expect(objectEquals(dataView1, dataView2)).toBe(true);

    });
    
    test('Date comparison', () => {

        const date1 = new Date('2020-01-01');
        const date2 = new Date('2020-01-01');

        expect(objectEquals(date1, date2)).toBe(true);

    });

    test('Invalid Date comparison', () => {

        const d1 = new Date('invalid');
        const d2 = new Date('invalid');

        expect(objectEquals(d1, d2)).toBe(true);

    });
    
    test('RegExp comparison', () => {

        const regexp1 = /abc/g;
        regexp1.lastIndex = 2;

        const regexp2 = /abc/g;
        regexp2.lastIndex = 2;

        expect(objectEquals(regexp1, regexp2)).toBe(true);

    });
    
    test('BigInt comparison', () => {

        const bigInt1 = BigInt(42);
        const bigInt2 = BigInt(42);

        expect(objectEquals(bigInt1, bigInt2)).toBe(true);

    });
    
    test('NaN comparison', () => {

        expect(objectEquals(NaN, NaN)).toBe(true);

    });

    test('URLSearchParams comparison with fallback option', () => {

        const params1 = new URLSearchParams('foo=1&bar=2');
        const params2 = new URLSearchParams('foo=1&bar=2');

        expect(objectEquals(params1, params2, { fallback: true })).toBe(true);

    });

    test('Throws TypeError with fallback option for Object with unusable valueOf/toString', () => {

        const obj1 = { a: 1 };
        obj1.valueOf = obj1;
        obj1.toString = obj1;
        obj1[Symbol.toStringTag] = 'custom';

        const obj2 = { a: 1 };
        obj2.valueOf = obj2;
        obj2.toString = obj2;
        obj2[Symbol.toStringTag] = 'custom';

        expect(() => objectEquals(obj1, obj2, { fallback: true })).toThrow();

    });

    test('Basic Object comparison with difference', () => {

        const obj1 = { a: 1, b: [2, 3] };
        const obj2 = { a: 1, b: [2, 4] };

        expect(objectEquals(obj1, obj2)).toBe(false);

    });

    test('Nested Set comparison with difference', () => {

        const set1 = new Set([
            new Set([1, 2]),
            new Set([1, 2]),
        ]);

        const set2 = new Set([
            new Set([1, 2]),
            new Set([1, 4]),
        ]);

        expect(objectEquals(set1, set2)).toBe(false);

    });

    test('Null vs Object edge case', () => {

        expect(objectEquals({}, null)).toBe(false);
        expect(objectEquals(null, {})).toBe(false);
        expect(objectEquals(null, null)).toBe(true);

    });

});