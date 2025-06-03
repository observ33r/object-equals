import { run, bench, group, summary } from 'mitata';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals';
import { dequal } from 'dequal';
import isEqualLodash from 'lodash/isEqual.js';
import { deepStrictEqual } from 'node:assert';

import { objectGenerator } from '@observ33r/object-generator';
import { objectEquals } from '../dist/object-equals.esm.js';

const nestedSize = 16;
const depth = 2;

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

group('Object with mixed primitivs [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Object with mixed primitivs [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Object with mixed primitivs [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Object with mixed primitivs [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Object with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Object with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Object with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Object with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Array with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Array, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Array with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Array, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Array with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Array, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Array with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Array, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Array with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Array with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Array with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Array with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Array, valueTypes: [String, Number, Boolean, Array] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Map with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Map, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Map with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Map, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Map with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Map, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Map with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Map, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Map with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Map with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Map with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Map with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Map, valueTypes: [String, Number, Boolean, Map] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Set with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Set with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Set with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Set with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Shuffled Set with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'dequal', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Shuffled Set with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'dequal', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Shuffled Set with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'dequal', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Shuffled Set with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ prefix: 'dequal', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'dequal', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, type: Set, valueTypes: [String, Number, Boolean], shuffle: true, seed: 94 });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Set with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Set with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Set with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Nested Set with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                const source = objectGenerator({ prefix: 'node.deepStrictEqual', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set] });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Shuffled nested Set with mixed primitive values [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 16, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
    });
});

group('Shuffled nested Set with mixed primitive values [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 512, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 512, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 512, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 512, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
    });
});

group('Shuffled nested Set with mixed primitive values [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 4096, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 4096, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 4096, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 4096, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
    });
});

group('Shuffled nested Set with mixed primitive values [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'object-equals', size: 16386, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'are-deeply-equal', size: 16386, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'fast-equals', size: 16386, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize, depth, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 42 });
            const source = objectGenerator({ prefix: 'lodash.isEqual', size: 16386, nestedSize: 16, depth: 2, type: Set, valueTypes: [String, Number, Boolean, Set], shuffle: true, seed: 94 });
            yield () => isEqualLodash(target, source);
        });
    });
});

group('Typed Array [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ size: 16, type: Uint8Array });
            const source = objectGenerator({ size: 16, type: Uint8Array });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ size: 16, type: Uint8Array });
            const source = objectGenerator({ size: 16, type: Uint8Array });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ size: 16, type: Uint8Array });
            const source = objectGenerator({ size: 16, type: Uint8Array });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ size: 16, type: Uint8Array });
            const source = objectGenerator({ size: 16, type: Uint8Array });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ size: 16, type: Uint8Array });
            const source = objectGenerator({ size: 16, type: Uint8Array });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ size: 16, type: Uint8Array });
                const source = objectGenerator({ size: 16, type: Uint8Array });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Typed Array [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ size: 512, type: Uint8Array });
            const source = objectGenerator({ size: 512, type: Uint8Array });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ size: 512, type: Uint8Array });
            const source = objectGenerator({ size: 512, type: Uint8Array });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ size: 512, type: Uint8Array });
            const source = objectGenerator({ size: 512, type: Uint8Array });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ size: 512, type: Uint8Array });
            const source = objectGenerator({ size: 512, type: Uint8Array });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ size: 512, type: Uint8Array });
            const source = objectGenerator({ size: 512, type: Uint8Array });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ size: 512, type: Uint8Array });
                const source = objectGenerator({ size: 512, type: Uint8Array });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Typed Array [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ size: 4096, type: Uint8Array });
            const source = objectGenerator({ size: 4096, type: Uint8Array });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ size: 4096, type: Uint8Array });
            const source = objectGenerator({ size: 4096, type: Uint8Array });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ size: 4096, type: Uint8Array });
            const source = objectGenerator({ size: 4096, type: Uint8Array });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ size: 4096, type: Uint8Array });
            const source = objectGenerator({ size: 4096, type: Uint8Array });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ size: 4096, type: Uint8Array });
            const source = objectGenerator({ size: 4096, type: Uint8Array });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ size: 4096, type: Uint8Array });
                const source = objectGenerator({ size: 4096, type: Uint8Array });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Typed Array [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = objectGenerator({ size: 16386, type: Uint8Array });
            const source = objectGenerator({ size: 16386, type: Uint8Array });
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = objectGenerator({ size: 16386, type: Uint8Array });
            const source = objectGenerator({ size: 16386, type: Uint8Array });
            yield () => areDeeplyEqual(target, source);
        });
        bench('fast-equals', function* () {
            const target = objectGenerator({ size: 16386, type: Uint8Array });
            const source = objectGenerator({ size: 16386, type: Uint8Array });
            yield () => fastEquals.deepEqual(target, source);
        });
        bench('dequal', function* () {
            const target = objectGenerator({ size: 16386, type: Uint8Array });
            const source = objectGenerator({ size: 16386, type: Uint8Array });
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = objectGenerator({ size: 16386, type: Uint8Array });
            const source = objectGenerator({ size: 16386, type: Uint8Array });
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = objectGenerator({ size: 16386, type: Uint8Array });
                const source = objectGenerator({ size: 16386, type: Uint8Array });
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Data View [size=16]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            yield () => areDeeplyEqual(target, source);
        });
        bench('dequal', function* () {
            const target = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
                const source = new DataView(objectGenerator({ size: 16, type: Uint8Array }).buffer);
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Data View [size=512]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            yield () => areDeeplyEqual(target, source);
        });
        bench('dequal', function* () {
            const target = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
                const source = new DataView(objectGenerator({ size: 512, type: Uint8Array }).buffer);
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Data View [size=4096]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            yield () => areDeeplyEqual(target, source);
        });
        bench('dequal', function* () {
            const target = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
                const source = new DataView(objectGenerator({ size: 4096, type: Uint8Array }).buffer);
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

group('Data View [size=16386]', () => {
    summary(() => {
        bench('object-equals', function* () {
            const target = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            yield () => objectEquals(target, source);
        });
        bench('are-deeply-equal', function* () {
            const target = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            yield () => areDeeplyEqual(target, source);
        });
        bench('dequal', function* () {
            const target = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            yield () => dequal(target, source);
        });
        bench('lodash.isEqual', function* () {
            const target = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            const source = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
            yield () => isEqualLodash(target, source);
        });
        if (isNode) {
            bench('node.deepStrictEqual', function* () {
                const target = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
                const source = new DataView(objectGenerator({ size: 16386, type: Uint8Array }).buffer);
                yield () => deepStrictEqualWrapper(target, source);
            });
        }
    });
});

await run();