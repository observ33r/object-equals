import { run, bench, group, summary } from 'mitata';
import areDeeplyEqual from 'are-deeply-equal';
import * as fastEquals from 'fast-equals';
import isEqualLodash from 'lodash/isEqual.js';
import { isDeepStrictEqual } from 'node:util';
import { dequal } from 'dequal';

import { objectGenerator } from '@observ33r/object-generator';
import { objectEquals } from '../dist/object-equals.node.esm.js';
import { objectEquals as objectEqualsWebSafe } from '../dist/object-equals.esm.js';

const sizes = [16, 512, 4096, 16386];

const valueTypes = [String, Number, Boolean];
const nestedSize = 16;
const depth = 2;

const isNode = typeof process === 'object'
    && typeof process.versions?.node === 'string'
    && typeof Deno === 'undefined'
    && typeof Bun === 'undefined';

sizes.forEach(size => {
    group(`Object with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', size, valueTypes });
                const source = objectGenerator({ prefix: 'object-equals', size, valueTypes });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', size, valueTypes });
                const source = objectGenerator({ prefix: 'are-deeply-equal', size, valueTypes });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', size, valueTypes });
                const source = objectGenerator({ prefix: 'fast-equals', size, valueTypes });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', size, valueTypes });
                const source = objectGenerator({ prefix: 'dequal', size, valueTypes });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', size, valueTypes });
                const source = objectGenerator({ prefix: 'lodash', size, valueTypes });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', size, valueTypes });
                    const source = objectGenerator({ prefix: 'node', size, valueTypes });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Nested Object with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', size, nestedSize, depth, valueTypes });
                const source = objectGenerator({ prefix: 'object-equals', size, nestedSize, depth, valueTypes });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', size, nestedSize, depth, valueTypes });
                const source = objectGenerator({ prefix: 'are-deeply-equal', size, nestedSize, depth, valueTypes });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', size, nestedSize, depth, valueTypes });
                const source = objectGenerator({ prefix: 'fast-equals', size, nestedSize, depth, valueTypes });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', size, nestedSize, depth, valueTypes });
                const source = objectGenerator({ prefix: 'dequal', size, nestedSize, depth, valueTypes });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', size, nestedSize, depth, valueTypes });
                const source = objectGenerator({ prefix: 'lodash', size, nestedSize, depth, valueTypes });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', size, nestedSize, depth, valueTypes });
                    const source = objectGenerator({ prefix: 'node', size, nestedSize, depth, valueTypes });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Array with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Array, size, valueTypes });
                const source = objectGenerator({ prefix: 'object-equals', type: Array, size, valueTypes });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Array, size, valueTypes });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Array, size, valueTypes });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Array, size, valueTypes });
                const source = objectGenerator({ prefix: 'fast-equals', type: Array, size, valueTypes });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Array, size, valueTypes });
                const source = objectGenerator({ prefix: 'dequal', type: Array, size, valueTypes });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Array, size, valueTypes });
                const source = objectGenerator({ prefix: 'lodash', type: Array, size, valueTypes });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Array, size, valueTypes });
                    const source = objectGenerator({ prefix: 'node', type: Array, size, valueTypes });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Nested Array with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                const source = objectGenerator({ prefix: 'object-equals', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                const source = objectGenerator({ prefix: 'fast-equals', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                const source = objectGenerator({ prefix: 'dequal', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                const source = objectGenerator({ prefix: 'lodash', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                    const source = objectGenerator({ prefix: 'node', type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Map with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Map, size, valueTypes });
                const source = objectGenerator({ prefix: 'object-equals', type: Map, size, valueTypes });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Map, size, valueTypes });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Map, size, valueTypes });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Map, size, valueTypes });
                const source = objectGenerator({ prefix: 'fast-equals', type: Map, size, valueTypes });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Map, size, valueTypes });
                const source = objectGenerator({ prefix: 'dequal', type: Map, size, valueTypes });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Map, size, valueTypes });
                const source = objectGenerator({ prefix: 'lodash', type: Map, size, valueTypes });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Map, size, valueTypes });
                    const source = objectGenerator({ prefix: 'node', type: Map, size, valueTypes });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Nested Map with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                const source = objectGenerator({ prefix: 'object-equals', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                const source = objectGenerator({ prefix: 'fast-equals', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                const source = objectGenerator({ prefix: 'dequal', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                const source = objectGenerator({ prefix: 'lodash', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                    const source = objectGenerator({ prefix: 'node', type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Set with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Set, size, valueTypes });
                const source = objectGenerator({ prefix: 'object-equals', type: Set, size, valueTypes });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, valueTypes });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, valueTypes });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Set, size, valueTypes });
                const source = objectGenerator({ prefix: 'fast-equals', type: Set, size, valueTypes });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Set, size, valueTypes });
                const source = objectGenerator({ prefix: 'dequal', type: Set, size, valueTypes });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Set, size, valueTypes });
                const source = objectGenerator({ prefix: 'lodash', type: Set, size, valueTypes });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Set, size, valueTypes });
                    const source = objectGenerator({ prefix: 'node', type: Set, size, valueTypes });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Shuffled Set with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'object-equals', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'fast-equals', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ prefix: 'dequal', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'dequal', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'lodash', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Set, size, valueTypes, shuffle: true, seed: 42 });
                    const source = objectGenerator({ prefix: 'node', type: Set, size, valueTypes, shuffle: true, seed: 94 });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Nested Set with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                const source = objectGenerator({ prefix: 'object-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                const source = objectGenerator({ prefix: 'fast-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                const source = objectGenerator({ prefix: 'lodash', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ prefix: 'node', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                    const source = objectGenerator({ prefix: 'node', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Shuffled nested Set with mixed primitive values [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ prefix: 'object-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'object-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 94 });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'are-deeply-equal', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 94 });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ prefix: 'fast-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'fast-equals', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 94 });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ prefix: 'lodash', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 42 });
                const source = objectGenerator({ prefix: 'lodash', type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 94 });
                yield () => isEqualLodash(target, source);
            });
        });
    });
});

sizes.forEach(size => {
    group(`Typed Array [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = objectGenerator({ type: Uint8Array, size });
                    const source = objectGenerator({ type: Uint8Array, size });
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});


sizes.forEach(size => {
    group(`Typed Array (web-safe) [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => objectEqualsWebSafe(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => areDeeplyEqual(target, source);
            });
            bench('fast-equals', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => fastEquals.deepEqual(target, source);
            });
            bench('dequal', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = objectGenerator({ type: Uint8Array, size });
                const source = objectGenerator({ type: Uint8Array, size });
                yield () => isEqualLodash(target, source);
            });

        });
    });
});

sizes.forEach(size => {
    group(`Data View [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => objectEquals(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => areDeeplyEqual(target, source);
            });
            bench('dequal', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => isEqualLodash(target, source);
            });
            if (isNode) {
                bench('node.isDeepStrictEqual', function* () {
                    const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                    const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                    yield () => isDeepStrictEqual(target, source);
                });
            }
        });
    });
});

sizes.forEach(size => {
    group(`Data View (web-safe) [size=${size}]`, () => {
        summary(() => {
            bench('object-equals', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => objectEqualsWebSafe(target, source);
            });
            bench('are-deeply-equal', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => areDeeplyEqual(target, source);
            });
            bench('dequal', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => dequal(target, source);
            });
            bench('lodash.isEqual', function* () {
                const target = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                const source = new DataView(objectGenerator({ type: Uint8Array, size }).buffer);
                yield () => isEqualLodash(target, source);
            });
        });
    });
});

await run();