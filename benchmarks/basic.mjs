import { run, bench, group, summary } from 'mitata';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals';
import isEqualLodash from 'lodash/isEqual.js';
import { deepStrictEqual } from 'node:assert';
import { dequal } from 'dequal';

import { getBigData } from './bigData.mjs';
import { objectEquals } from '../dist/object-equals.esm.js';

const isNode = typeof process === 'object'
    && process.versions?.v8 !== undefined
    && typeof Deno === 'undefined'
    && typeof Bun === 'undefined';

const deepStrictEqualWrapper = (target, source) => {
    try {
        return deepStrictEqual(target, source) === undefined;
    } catch {
        return false;
    }
};

group('Big JSON Object', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = getBigData();
            const source = getBigData();
            yield () => objectEquals(target, source)
        });
        bench('are-deeply-equal', function* () {
            const target = getBigData();
            const source = getBigData();
            yield () => areDeeplyEqual(target, source)
        });
        bench('fast-equals', function* () {
            const target = getBigData();
            const source = getBigData();
            yield () => fastEquals.deepEqual(target, source)
        });
        bench('dequal', function* () {
            const target = getBigData();
            const source = getBigData();
            yield () => dequal(target, source)
        });
        bench('lodash.isEqual', function* () {
            const target = getBigData();
            const source = getBigData();
            yield () => isEqualLodash(target, source)
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = getBigData();
                const source = getBigData();
                yield () => deepStrictEqualWrapper(target, source)
            });
        }
    });
});

await run();
