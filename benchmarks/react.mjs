import { run, bench, group, summary } from 'mitata';
import reactFastCompare from 'react-fast-compare';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals';
import isEqualLodash from 'lodash/isEqual.js';
import { isDeepStrictEqual } from 'node:util';
import { dequal } from 'dequal';
import { isEqual as isEqualEStoolkit } from 'es-toolkit'
import React from 'react';

import { objectEquals } from '../dist/object-equals.node.esm.js';

const sizes = [16, 512, 4096, 16386];

const isNode = typeof process === 'object'
    && typeof process.versions?.node === 'string'
    && typeof Deno === 'undefined'
    && typeof Bun === 'undefined';

const generateReactTree = (size) => 
    React.createElement('ul', { 
        className: 'itemList', 
        children: Array.from({ length: size }, (_, i) => 
            React.createElement('li', { className: 'item' }, `Item ${i}`))
    });

sizes.forEach(size => {
    group(`React elements [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => objectEquals(target, source, { react: true })
            });
            bench('react-fast-compare', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => reactFastCompare(target, source)
            });
            bench('are-deeply-equal', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => areDeeplyEqual(target, source)
            });
            bench('fast-equals', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => fastEquals.deepEqual(target, source)
            });
            bench('dequal', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => dequal(target, source)
            });
            bench('lodash.isEqual', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => isEqualLodash(target, source)
            });
            bench('es-toolkit.isEqual', function* () {
                const target = generateReactTree(size);
                const source = generateReactTree(size);
                yield () => isEqualEStoolkit(target, source)
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = generateReactTree(size);
                    const source = generateReactTree(size);
                    yield () => isDeepStrictEqual(target, source)
                });
            }
        });
    });
});

await run();