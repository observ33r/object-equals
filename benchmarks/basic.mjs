import { run, bench, group, summary } from 'mitata';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals';
import isEqualLodash from 'lodash/isEqual.js';
import { isDeepStrictEqual } from 'node:util';
import { dequal } from 'dequal';

import { getBigData } from './bigData.mjs';
import { objectEquals } from '../dist/object-equals.esm.js';

const isNode = typeof process === 'object'
    && typeof process.versions?.node === 'string'
    && typeof Deno === 'undefined'
    && typeof Bun === 'undefined';

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
            bench('node.isDeepStrictEqual', function* () {
                const target = getBigData();
                const source = getBigData();
                yield () => isDeepStrictEqual(target, source)
            });
        }
    });
});

await run();
