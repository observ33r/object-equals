import { run } from 'mitata';
import { objectGenerator } from '@observ33r/object-generator';
import { benchSizes } from "./helpers.mjs";

const sizes = [16, 512, 4096, 16386];
const valueTypes = [String, Number, Boolean];
const nestedSize = 16;
const depth = 2;

benchSizes(sizes, `Object with mixed primitive values`,
    ({size}) => objectGenerator({ size, valueTypes }));

benchSizes(sizes, `Nested Object with mixed primitive values`,
    ({size}) => objectGenerator({ size, nestedSize, depth, valueTypes }));

benchSizes(sizes, `Array with mixed primitive values`,
    ({size}) => objectGenerator({ type: Array, size, valueTypes }));

benchSizes(sizes, `Nested Array with mixed primitive values`,
    ({size}) => objectGenerator({ type: Array, size, nestedSize, depth, valueTypes: [...valueTypes, Array] }));

benchSizes(sizes, `Map with mixed primitive values`,
    ({size}) => objectGenerator({ type: Map, size, valueTypes }));

benchSizes(sizes, `Nested Map with mixed primitive values`,
    ({size}) => objectGenerator({ type: Map, size, nestedSize, depth, valueTypes: [...valueTypes, Map] }));

benchSizes(sizes, `Set with mixed primitive values`,
    ({size}) => objectGenerator({ type: Set, size, valueTypes }));

benchSizes(sizes, `Shuffled Set with mixed primitive values`,
    ({size}) => objectGenerator({ type: Set, size, valueTypes, shuffle: true, seed: 42 }));

benchSizes(sizes, `Nested Set with mixed primitive values`,
    ({size}) => objectGenerator({ type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set] }));

benchSizes(sizes, `Shuffled nested Set with mixed primitive values`,
    ({size}) => objectGenerator({ type: Set, size, nestedSize, depth, valueTypes: [...valueTypes, Set], shuffle: true, seed: 42 }));

benchSizes(sizes, `Typed Array`,
    ({size}) => objectGenerator({ type: Uint8Array, size }));

benchSizes(sizes, `Data View`,
    ({size}) => new DataView(objectGenerator({ type: Uint8Array, size }).buffer));

await run();
