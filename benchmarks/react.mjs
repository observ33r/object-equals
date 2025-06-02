import { run, bench, summary, group } from 'mitata';
import reactFastCompare from 'react-fast-compare';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals'
import isEqualLodash from 'lodash/isEqual.js';
import { deepStrictEqual } from 'node:assert';
import { dequal } from 'dequal';
import React from 'react';

import { objectEquals } from '../dist/object-equals.esm.js';

const isNode = (typeof process === 'object'
    && process.title === 'node');

const deepStrictEqualWrapper = (target, source) => {
	try {
		return deepStrictEqual(target, source) === undefined;
	} catch {
		return false;
	}
};

const generateReactTree = (size) => 
	React.createElement('ul', { 
		className: 'itemList', 
		children: Array.from({ length: size }, (_, i) => 
			React.createElement('li', { className: 'item' }, `Item ${i}`))
	});

group('React elements [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => objectEquals(target, source, { react: true })
        });
        bench('react-fast-compare', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => reactFastCompare(target, source)
        });
        bench('are-deeply-equal', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => areDeeplyEqual(target, source)
        });
        bench('fast-equals', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => fastEquals.deepEqual(target, source)
        });
        bench('dequal', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => dequal(target, source)
        });
        bench('lodash.isEqual', function* () {
            const target = generateReactTree(16);
            const source = generateReactTree(16);
            yield () => isEqualLodash(target, source)
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = generateReactTree(16);
                const source = generateReactTree(16);
                yield () => deepStrictEqualWrapper(target, source)
            });
        }
    });
});

group('React elements [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => objectEquals(target, source, { react: true })
        });
        bench('react-fast-compare', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => reactFastCompare(target, source)
        });
        bench('are-deeply-equal', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => areDeeplyEqual(target, source)
        });
        bench('fast-equals', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => fastEquals.deepEqual(target, source)
        });
        bench('dequal', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => dequal(target, source)
        });
        bench('lodash.isEqual', function* () {
            const target = generateReactTree(512);
            const source = generateReactTree(512);
            yield () => isEqualLodash(target, source)
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = generateReactTree(512);
                const source = generateReactTree(512);
                yield () => deepStrictEqualWrapper(target, source)
            });
        }
    });
});

group('React elements [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => objectEquals(target, source, { react: true })
        });
        bench('react-fast-compare', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => reactFastCompare(target, source)
        });
        bench('are-deeply-equal', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => areDeeplyEqual(target, source)
        });
        bench('fast-equals', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => fastEquals.deepEqual(target, source)
        });
        bench('dequal', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => dequal(target, source)
        });
        bench('lodash.isEqual', function* () {
            const target = generateReactTree(4096);
            const source = generateReactTree(4096);
            yield () => isEqualLodash(target, source)
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = generateReactTree(4096);
                const source = generateReactTree(4096);
                yield () => deepStrictEqualWrapper(target, source)
            });
        }
    });
});

group('React elements [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => objectEquals(target, source, { react: true })
        });
        bench('react-fast-compare', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => reactFastCompare(target, source)
        });
        bench('are-deeply-equal', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => areDeeplyEqual(target, source)
        });
        bench('fast-equals', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => fastEquals.deepEqual(target, source)
        });
        bench('dequal', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => dequal(target, source)
        });
        bench('lodash.isEqual', function* () {
            const target = generateReactTree(16386);
            const source = generateReactTree(16386);
            yield () => isEqualLodash(target, source)
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = generateReactTree(16386);
                const source = generateReactTree(16386);
                yield () => deepStrictEqualWrapper(target, source)
            });
        }
    });
});

await run();
