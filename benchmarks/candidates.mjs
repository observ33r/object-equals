import { deepStrictEqual } from "node:assert";
import { isDeepStrictEqual } from "node:util";
import areDeeplyEqual from "are-deeply-equal";
import * as fastEquals from "fast-equals";
import { dequal } from "dequal";
import isEqualLodash from "lodash/isEqual.js";
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

export default [
  {
    label: 'object-equals',
    create: (target, source, options) => () => objectEquals(target, source, options),
  },
  {
    label: 'are-deeply-equal',
    create: (target, source) => () => areDeeplyEqual(target, source)
  },
  {
    label: 'fast-equals',
    create: (target, source) => () => fastEquals.deepEqual(target, source)
  },
  {
    label: 'dequal',
    create: (target, source) => () => dequal(target, source)
  },
  {
    label: 'lodash.isEqual',
    create: (target, source) => () => isEqualLodash(target, source)
  },
  {
    label: 'node.deepStrictEqual',
    enabled: isNode,
    create: (target, source) => () => deepStrictEqualWrapper(target, source)
  },
  {
    label: 'node.isDeepStrictEqual',
    enabled: isNode,
    create: (target, source) => () => isDeepStrictEqual(target, source)
  }
];
