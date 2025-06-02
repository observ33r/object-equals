[![npm](https://img.shields.io/npm/v/@observ33r/object-equals.svg)](https://www.npmjs.com/package/@observ33r/object-equals)
[![Size](https://badgen.net/bundlephobia/minzip/@observ33r/object-equals)](https://bundlephobia.com/package/@observ33r/object-equals)
[![Web-safe](https://img.shields.io/badge/web--safe-available-2ea44f?logo=browser&logoColor=white)](#web-environment-support)
[![License](https://img.shields.io/npm/l/@observ33r/object-equals.svg)](https://github.com/observ33r/object-equals/blob/main/LICENSE)

# object-equals

A fast, flexible and robust utility for deep equality comparison with type-specific logic and engine-aware design.

## Features

- **High Performance**  
  Outperforms popular libraries like `lodash.isEqual`, `fast-equals`, `dequal`, `are-deeply-equal` and `node.deepStrictEqual`.

- **Engine-aware design**  
  Tailored execution paths for V8 and JSC based engines to maximize performance.
  
- **Broad Support**  
  Handles objects, arrays, sets, maps, array buffers, typed arrays, data views, booleans, strings, numbers, bigints, dates, errors, regular expressions and primitives.
  
- **Customizable**  
  Fine-tune behavior with options for handling circular references, cross-realm objects, react elements and more.
  
- **Type-Safe**  
  Fully typed with TypeScript declarations.

## Installation

```bash
npm install @observ33r/object-equals
```
## Usage

### `objectEquals(target, source, [options])`

Compares two values for deep equality.

- **target**: The first value to compare (`any`).
- **source**: The second value to compare (`any`).
- **options**: Optional configuration object (see below).
- **Returns**: `boolean` - `true` if values are deeply equal, `false` otherwise.
- **Throws**: `TypeError` if an unsupported object type is encountered.

#### Options

| Property | Type | Default | Description |
| :---: | :---: | :---: | :--- |
| circular | `boolean` | `false` | Enables circular reference handling using a cache |
| crossrealm | `boolean` | `false` | Enables cross-realm object comparison (e.g., vm contexts) |
| react | `boolean` | `false` | Enables React element comparison (checks `$$typeof`, `type`, `key`, `ref` and `props`) |
| symbols | `boolean` | `false` | Includes symbol-keyed properties in object comparison |
| fallback | `boolean` | `false` | Enables fallback comparison using `valueOf()` or `toString()` |
| cache | `Map \| WeakMap` | `undefined` | Custom cache for circular references (auto-managed if `circular` is `true`) |

or

### `objectEqualsCore(target, source, circular, crossrealm, react, symbols, fallback, cache)`

The core comparison function, exposed for advanced use cases. Takes individual parameters instead of an options object.

## Examples

### Basic

```javascript
import { objectEquals } from '@observ33r/object-equals';

const obj1 = { a: 1, b: [2, 3] };
const obj2 = { a: 1, b: [2, 3] };

console.log(objectEquals(obj1, obj2)); //true
```

### Extended objects

```javascript
import { objectEquals } from '@observ33r/object-equals';

class extendedMap extends Map {}

const map1 = new extendedMap([['key-1', 'value-1']]);
const map2 = new extendedMap([['key-1', 'value-1']]);

console.log(objectEquals(map1, map2)); //true
```

### Circular objects

```javascript
import { objectEquals } from '@observ33r/object-equals';

const obj1 = { a: 1 };
obj1.self = obj1;
const obj2 = { a: 1 };
obj2.self = obj2;

console.log(objectEquals(obj1, obj2, { circular: true })); //true
```

### Cross-Realm objects

```javascript
import vm from 'node:vm';
import { objectEquals } from '@observ33r/object-equals';

class ExtendedArray extends Array {}
const CrossRealmArray = vm.runInContext('Array', vm.createContext());

const array = [1, 2, 3];
const extArr = new ExtendedArray(1, 2, 3);
const realmArr = new CrossRealmArray(1, 2, 3);

//extended
console.log(objectEquals(array, extArr, { crossrealm: true })); //true
//vm context
console.log(objectEquals(array, realmArr, { crossrealm: true })); //true
```

### React elements

```javascript
import { createElement } from 'react';
import { objectEquals } from '@observ33r/object-equals';

const el1 = createElement('a', { onClick: () => { console.log('click'); } }, 'text');
const el2 = createElement('a', { onClick: () => { console.log('click'); } }, 'text');

console.log(objectEquals(el1, el2, { react: true })); //true
```

### Symbol keys

```javascript
import { objectEquals } from '@observ33r/object-equals';

const obj1 = { a: 1, [Symbol('b')]: [2, 3] };
const obj2 = { a: 1, [Symbol('b')]: [2, 3] };

console.log(objectEquals(obj1, obj2, { symbols: true })); //true
```

### Catch unsupported types with fallback option

```javascript
import { objectEquals } from '@observ33r/object-equals';

const params1 = new URLSearchParams('foo=1&bar=2');
const params2 = new URLSearchParams('foo=1&bar=2');

console.log(objectEquals(params1, params2, { fallback: true })); //true
```

## Basic benchmark

### Big JSON Object (~1.2 MiB, deeply nested)

| Library | Time | Relative Speed |
| :--- | :--- | :--- |
| object-equals | 467.05 µs| 1.00x (baseline) |
| fast-equals | 1.16 ms| 2.49x slower |
| dequal | 1.29 ms | 2.77x slower |
| are-deeply-equal | 2.65 ms| 5.68x slower |
| node.deepStrictEqual | 4.15 ms| 8.88x slower |
| lodash.isEqual | 5.24 ms| 11.22x slower |

<details>
<summary>Full benchmark result with hardware counters</summary>

```console
clk: ~3.93 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Big JSON Object (1.2 MiB, deeply nested)
------------------------------------------- -------------------------------
object-equals                467.05 µs/iter 462.43 µs   █                  
                    (440.95 µs … 669.51 µs) 589.70 µs   █▃                 
                    (548.20 kb …   1.51 mb) 968.55 kb ▁███▄▂▁▁▁▁▁▁▁▁▁▁▁▂▂▂▁
                   3.18 ipc ( 86.54% cache)   4.80k branch misses
          1.91M cycles   6.08M instructions 118.03k c-refs  15.89k c-misses

are-deeply-equal               2.65 ms/iter   2.63 ms   █                  
                        (2.56 ms … 3.15 ms)   3.01 ms  ██                  
                    (  1.50 mb …   2.03 mb)   1.80 mb ▄███▃▂▂▁▁▁▂▂▁▁▁▁▁▃▃▂▂
                   2.56 ipc ( 85.07% cache)  27.64k branch misses
         10.37M cycles  26.55M instructions 285.84k c-refs  42.69k c-misses

fast-equals                    1.16 ms/iter   1.16 ms  █                   
                        (1.13 ms … 1.41 ms)   1.34 ms  ██                  
                    (680.04 kb …   1.23 mb) 968.43 kb ▆██▆▂▂▃▃▂▃▂▁▂▂▂▁▁▁▁▁▁
                   2.98 ipc ( 87.05% cache)  13.60k branch misses
          4.78M cycles  14.23M instructions 129.76k c-refs  16.80k c-misses

dequal                         1.29 ms/iter   1.30 ms     █▂               
                        (1.25 ms … 1.47 ms)   1.42 ms    ▂██▃              
                    (165.73 kb … 486.42 kb) 484.49 kb ▃▄▅████▆▄▃▁▂▁▃▂▁▁▁▁▂▁
                   2.73 ipc ( 87.86% cache)  12.05k branch misses
          5.32M cycles  14.51M instructions 112.01k c-refs  13.60k c-misses

lodash.isEqual                 5.24 ms/iter   5.26 ms   ▆█                 
                        (5.16 ms … 5.77 ms)   5.42 ms  ▇██▄▆               
                    (  2.10 mb …   4.02 mb)   2.96 mb ▃█████▆▄▄▁▂▄█▄▂▃▃▃▂▃▂
                   2.63 ipc ( 96.29% cache)  32.15k branch misses
         21.55M cycles  56.78M instructions 850.32k c-refs  31.56k c-misses

node.deepStrictEqual           4.15 ms/iter   4.15 ms  █▆                  
                        (4.08 ms … 5.53 ms)   4.38 ms  ██                  
                    (  1.32 mb …   4.02 mb)   2.07 mb ▄██▇█▃▃▁▁▁▂▄▄▂▁▂▁▁▁▁▁
                   2.41 ipc ( 94.00% cache)  52.35k branch misses
         17.06M cycles  41.09M instructions 464.99k c-refs  27.88k c-misses

summary
  object-equals
   2.49x faster than fast-equals
   2.77x faster than dequal
   5.68x faster than are-deeply-equal
   8.88x faster than node.deepStrictEqual
   11.22x faster than lodash.isEqual
```

</details>

> [!NOTE]
> The object is a deeply nested structure (depth: 17) containing objects, arrays, strings, booleans, numbers and nulls. It has a file size of 1.2 MiB, with a root size of 18 and nested sizes ranging from 0 to 21.

## React and Advanced benchmark

> [!IMPORTANT]
> Times for object sizes: 16, 512, 4096, 16386

### React elements

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 937.12 ns | 28.79 µs | 241.92 µs | 942.20 µs | 1.00x (baseline) |
| react-fast-compare | 5.92 µs | 178.22 µs | 1.41 ms | 5.65 ms | 6.32x–6.00x slower |
| fast-equals| 5.95 µs | 181.09 µs | 1.44 ms | 5.85 ms | 6.35x–6.21x slower |
| dequal | 6.76 µs | 204.58 µs | 1.64 ms | 6.59 ms | 7.21x–6.99x slower |
| are-deeply-equal | 16.54 µs | 505.16 µs | 4.40 ms | 18.78 ms | 17.65x–19.93x slower |
| node.deepStrictEqual | 25.23 µs | 748.79 µs | 5.92 ms | 23.80 ms | 26.92x–25.26x slower |
| lodash.isEqual | 32.92 µs | 990.25 µs | 7.89 ms | 30.93 ms | 35.12x–32.83x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.94 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• React elements [size=16]
------------------------------------------- -------------------------------
object-equals                937.12 ns/iter 946.16 ns        █▇▄           
                      (898.94 ns … 1.02 µs) 993.45 ns    ▂▇▅█████▅▅        
                    (  2.03 kb …   2.17 kb)   2.13 kb ▃▂▇██████████▂▃█▂▁▁▂▂
                   3.78 ipc ( 95.02% cache)    1.12 branch misses
          3.85k cycles  14.54k instructions   92.13 c-refs    4.59 c-misses

react-fast-compare             5.92 µs/iter   5.93 µs      ▂█   ▂          
                        (5.86 µs … 6.02 µs)   6.00 µs  ▅ ▅ ██   █     ▅    
                    (  2.38 kb …   2.39 kb)   2.38 kb ▇█▁█▇██▇▇▇█▇▁▁▇▁█▇▁▁▇
                   3.34 ipc ( 95.31% cache)    2.57 branch misses
         24.32k cycles  81.15k instructions  321.76 c-refs   15.08 c-misses

are-deeply-equal              16.54 µs/iter  16.60 µs     ██       █       
                      (16.35 µs … 16.84 µs)  16.74 µs ▅   ██▅ ▅  ▅ █      ▅
                    (  1.20 kb …   1.20 kb)   1.20 kb █▁▁▁███▁█▁▁█▁█▁▁▁▁▁▁█
                   2.72 ipc ( 95.07% cache)   80.56 branch misses
         67.63k cycles 183.97k instructions  770.33 c-refs   37.98 c-misses

fast-equals                    5.95 µs/iter   5.98 µs   ▂      █           
                        (5.90 µs … 6.03 µs)   6.03 µs ▅ █▅    ▅█  ▅        
                    (  2.38 kb …   2.39 kb)   2.38 kb █▁██▇▇▇▇██▇▁█▁▇▇▇▁▁▁▇
                   3.27 ipc ( 95.67% cache)    2.66 branch misses
         24.40k cycles  79.74k instructions  349.60 c-refs   15.14 c-misses

dequal                         6.76 µs/iter   6.77 µs             █        
                        (6.67 µs … 6.86 µs)   6.84 µs      ▅▅ ▅  ▅█▅       
                    (  3.19 kb …   3.19 kb)   3.19 kb ▇▁▁▇▁██▁█▇▇███▇▁▁▇▁▁▇
                   3.07 ipc ( 95.80% cache)    2.42 branch misses
         27.70k cycles  85.10k instructions  208.38 c-refs    8.76 c-misses

lodash.isEqual                32.92 µs/iter  32.43 µs  █                   
                     (31.59 µs … 217.80 µs)  41.80 µs  █                   
                    (376.00  b … 694.55 kb)  23.72 kb ▂██▂▁▁▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁
                   2.65 ipc ( 98.74% cache)   58.36 branch misses
        137.42k cycles 363.79k instructions   5.74k c-refs   72.48 c-misses

node.deepStrictEqual          25.23 µs/iter  24.93 µs  █                   
                     (24.30 µs … 222.34 µs)  33.28 µs  █                   
                    (792.00  b … 341.28 kb)  13.50 kb ▅█▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.61 ipc ( 98.66% cache)  175.41 branch misses
        105.46k cycles 275.25k instructions   3.66k c-refs   49.08 c-misses

summary
  object-equals
   6.32x faster than react-fast-compare
   6.35x faster than fast-equals
   7.21x faster than dequal
   17.65x faster than are-deeply-equal
   26.92x faster than node.deepStrictEqual
   35.12x faster than lodash.isEqual

• React elements [size=512]
------------------------------------------- -------------------------------
object-equals                 28.79 µs/iter  28.86 µs         █            
                      (28.58 µs … 28.99 µs)  28.96 µs ▅    ▅ ▅█▅ ▅ ▅ ▅  ▅ ▅
                    (144.21  b … 178.19  b) 148.76  b █▁▁▁▁█▁███▁█▁█▁█▁▁█▁█
                   3.70 ipc ( 89.45% cache)    4.27 branch misses
        117.35k cycles 434.73k instructions   9.15k c-refs  965.09 c-misses

react-fast-compare           178.22 µs/iter 178.24 µs  █                   
                    (171.80 µs … 327.17 µs) 282.54 µs ▆█                   
                    ( 79.77 kb … 539.91 kb) 193.37 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.35 ipc ( 70.34% cache)   47.86 branch misses
        730.01k cycles   2.45M instructions  17.29k c-refs   5.13k c-misses

are-deeply-equal             505.16 µs/iter 502.92 µs  █▅                  
                    (485.75 µs … 718.06 µs) 645.37 µs  ██                  
                    (362.58 kb … 475.27 kb) 409.36 kb ▃██▅▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.68 ipc ( 82.10% cache)   2.67k branch misses
          2.07M cycles   5.53M instructions  38.78k c-refs   6.94k c-misses

fast-equals                  181.09 µs/iter 180.31 µs  █                   
                    (172.93 µs … 366.36 µs) 291.34 µs ▃█                   
                    (  8.41 kb … 478.97 kb) 193.46 kb ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.23 ipc ( 72.17% cache)   53.81 branch misses
        742.97k cycles   2.40M instructions  16.47k c-refs   4.58k c-misses

dequal                       204.58 µs/iter 204.89 µs  ▄█                  
                    (194.91 µs … 379.33 µs) 277.81 µs  ██▂                 
                    (  8.57 kb … 602.08 kb)  97.33 kb ▄███▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.05 ipc ( 74.15% cache)   45.92 branch misses
        842.40k cycles   2.57M instructions  13.18k c-refs   3.41k c-misses

lodash.isEqual               990.25 µs/iter 983.24 µs   █                  
                      (954.79 µs … 1.32 ms)   1.14 ms  ▅█▅                 
                    (183.07 kb …   1.25 mb) 666.21 kb ▂███▃▂▂▂▂▂▃▂▁▁▁▁▂▂▂▁▁
                   2.68 ipc ( 94.24% cache)  666.30 branch misses
          4.07M cycles  10.90M instructions 121.72k c-refs   7.01k c-misses

node.deepStrictEqual         748.79 µs/iter 745.24 µs  █▇                  
                    (725.98 µs … 973.47 µs) 892.07 µs  ██                  
                    (379.55 kb … 382.39 kb) 379.70 kb ▅██▆▃▂▂▂▁▁▁▂▁▁▁▁▁▁▁▁▁
                   2.64 ipc ( 89.60% cache)   4.61k branch misses
          3.07M cycles   8.13M instructions  71.36k c-refs   7.42k c-misses

summary
  object-equals
   6.19x faster than react-fast-compare
   6.29x faster than fast-equals
   7.11x faster than dequal
   17.54x faster than are-deeply-equal
   26.01x faster than node.deepStrictEqual
   34.39x faster than lodash.isEqual

• React elements [size=4096]
------------------------------------------- -------------------------------
object-equals                241.92 µs/iter 238.73 µs  █                   
                    (228.94 µs … 500.75 µs) 370.26 µs  █                   
                    ( 92.47 kb … 862.19 kb) 512.80 kb ▇█▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.55 ipc ( 84.83% cache)   76.26 branch misses
        986.34k cycles   3.50M instructions 103.84k c-refs  15.75k c-misses

react-fast-compare             1.41 ms/iter   1.42 ms   █▂                 
                        (1.36 ms … 1.63 ms)   1.57 ms  ▆██                 
                    (  1.50 mb …   1.50 mb)   1.50 mb ▃████▇▇▄▄▂▁▂▁▂▃▂▃▁▂▂▁
                   3.39 ipc ( 94.81% cache)  177.28 branch misses
          5.77M cycles  19.55M instructions 131.41k c-refs   6.83k c-misses

are-deeply-equal               4.40 ms/iter   4.38 ms   █                  
                        (4.25 ms … 4.98 ms)   4.94 ms  ██▅                 
                    (  3.13 mb …   3.23 mb)   3.15 mb ████▅▃▃▂▂▁▁▁▁▁▁▂▄▄▅▂▂
                   2.65 ipc ( 89.99% cache)  20.32k branch misses
         16.70M cycles  44.22M instructions 387.04k c-refs  38.75k c-misses

fast-equals                    1.44 ms/iter   1.44 ms   █▇▅                
                        (1.39 ms … 1.60 ms)   1.58 ms  ▆███▆▂              
                    (  1.50 mb …   1.50 mb)   1.50 mb ▃██████▄▂▁▁▁▁▁▁▁▃▂▄▃▂
                   3.27 ipc ( 92.80% cache)  173.37 branch misses
          5.88M cycles  19.20M instructions 135.33k c-refs   9.74k c-misses

dequal                         1.64 ms/iter   1.65 ms     █▂               
                        (1.59 ms … 1.81 ms)   1.78 ms   ▄███▄              
                    (768.74 kb … 769.80 kb) 768.78 kb ▂▅██████▄▂▁▂▁▁▁▁▁▂▂▁▂
                   3.05 ipc ( 90.71% cache)  113.87 branch misses
          6.72M cycles  20.51M instructions 109.42k c-refs  10.17k c-misses

lodash.isEqual                 7.89 ms/iter   7.94 ms  █ █▃█▃█             
                        (7.71 ms … 8.41 ms)   8.33 ms  ███████ ▅ ▅         
                    (  3.13 mb …   5.58 mb)   5.13 mb ██████████▃█▆▁▃▁▁▁▃▁▃
                   2.61 ipc ( 98.89% cache)  973.21 branch misses
         32.42M cycles  84.56M instructions   2.30M c-refs  25.50k c-misses

node.deepStrictEqual           5.92 ms/iter   5.95 ms  ▆█▇                 
                        (5.82 ms … 6.32 ms)   6.26 ms  ███▆▅               
                    (  2.96 mb …   2.96 mb)   2.96 mb ▂█████▅▄▅█▄▅▃▁▁▂▁▁▁▂▂
                   2.68 ipc ( 97.18% cache)  33.08k branch misses
         24.20M cycles  64.92M instructions 528.62k c-refs  14.92k c-misses

summary
  object-equals
   5.84x faster than react-fast-compare
   5.95x faster than fast-equals
   6.77x faster than dequal
   18.2x faster than are-deeply-equal
   24.48x faster than node.deepStrictEqual
   32.61x faster than lodash.isEqual

• React elements [size=16386]
------------------------------------------- -------------------------------
object-equals                942.20 µs/iter 933.40 µs  ▂█                  
                      (895.09 µs … 1.28 ms)   1.13 ms  ██▆                 
                    (  1.96 mb …   2.04 mb)   2.00 mb ▃███▄▂▂▁▁▁▁▁▁▃▄▄▂▁▁▁▁
                   3.65 ipc ( 93.83% cache)  147.97 branch misses
          3.84M cycles  14.04M instructions 363.98k c-refs  22.44k c-misses

react-fast-compare             5.65 ms/iter   5.73 ms   ▄  ▄  █▂    ▄ ▂    
                        (5.48 ms … 5.86 ms)   5.83 ms   █▆██ ███▃▆  █ █▆▃  
                    (  6.00 mb …   6.00 mb)   6.00 mb ▃▅███████████▇██████▃
                   3.38 ipc ( 94.65% cache)  464.91 branch misses
         23.12M cycles  78.21M instructions 568.89k c-refs  30.43k c-misses

are-deeply-equal              18.78 ms/iter  19.07 ms   █              ▃█  
                      (18.32 ms … 19.26 ms)  19.23 ms ▇▂█▂       ▂   ▂▂██  
                    ( 12.50 mb …  12.61 mb)  12.52 mb ████▆▆▁▁▆▁▁█▆▁▆████▁▆
                   2.51 ipc ( 84.51% cache)  83.05k branch misses
         70.88M cycles 177.98M instructions   1.68M c-refs 260.69k c-misses

fast-equals                    5.85 ms/iter   5.93 ms   █▄      █          
                        (5.71 ms … 6.20 ms)   6.14 ms  ▃██ ▃▅   █▂         
                    (  6.00 mb …   6.00 mb)   6.00 mb ▅██████▆▄▆██▅▅▅▅▁▁▁▁▂
                   3.22 ipc ( 94.13% cache)  730.06 branch misses
         23.88M cycles  76.82M instructions 541.12k c-refs  31.78k c-misses

dequal                         6.59 ms/iter   6.65 ms     ▆ █  ▃           
                        (6.40 ms … 6.89 ms)   6.84 ms     █▃█  █  ▃▃ ▃     
                    (  3.00 mb …   3.00 mb)   3.00 mb ▆▆▄███████████▆█▃▁▆▁▃
                   3.05 ipc ( 92.55% cache)  487.79 branch misses
         26.93M cycles  82.05M instructions 443.86k c-refs  33.07k c-misses

lodash.isEqual                30.93 ms/iter  31.04 ms       █  █       █  █
                      (30.70 ms … 31.11 ms)  31.11 ms ▅▅▅   █▅▅█ ▅ ▅  ▅█▅▅█
                    (  4.63 mb …   4.80 mb)   4.64 mb ███▁▁▁████▁█▁█▁▁█████
                   2.65 ipc ( 98.51% cache)  21.72k branch misses
        127.14M cycles 337.45M instructions   6.69M c-refs  99.56k c-misses

node.deepStrictEqual          23.80 ms/iter  23.87 ms      ▃    █          
                      (23.59 ms … 24.13 ms)  24.03 ms    ▂ █  ▂ █  ▂▂      
                    ( 11.82 mb …  11.82 mb)  11.82 mb ▆▁▁█▆█▆▆█▁█▁▆██▁▆▁▁▆▆
                   2.67 ipc ( 97.18% cache) 130.77k branch misses
         97.35M cycles 259.69M instructions   2.09M c-refs  58.85k c-misses

summary
  object-equals
   6x faster than react-fast-compare
   6.21x faster than fast-equals
   6.99x faster than dequal
   19.93x faster than are-deeply-equal
   25.26x faster than node.deepStrictEqual
   32.83x faster than lodash.isEqual
```

</details>

### Object with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 142.82 ns | 31.21 µs | 664.85 µs | 3.73 ms | 1.00x (baseline) |
| fast-equals | 751.89 ns | 39.61 µs | 739.11 µs | 3.92 ms | 5.26x–1.05x slower |
| dequal | 818.15 ns | 61.22 µs | 903.99 µs | 4.51 ms | 5.73x–1.21x slower |
| are-deeply-equal | 830.47 ns | 36.23 µs | 758.81 µs | 4.18 ms | 5.81x–1.12x slower |
| lodash.isEqual | 1.22 µs | 41.19 µs | 814.89 µs | 4.40 ms | 8.54x–1.18x slower |
| node.deepStrictEqual | 1.55 µs | 50.42 µs | 889.84 µs | 4.73 ms | 10.86x–1.27x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.96 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Object with mixed primitivs [size=16]
------------------------------------------- -------------------------------
object-equals                142.82 ns/iter 139.80 ns  █                   
                    (135.53 ns … 261.97 ns) 201.44 ns ▂█                   
                    (264.97  b … 474.51  b) 352.41  b ██▃▁▁▁▁▂▃▂▁▁▁▁▁▁▁▁▁▁▁
                   4.03 ipc ( 95.65% cache)    0.03 branch misses
         584.68 cycles   2.35k instructions   12.06 c-refs    0.52 c-misses

are-deeply-equal             830.47 ns/iter 842.95 ns   █▂                 
                    (804.59 ns … 897.47 ns) 891.53 ns  ▂██▃                
                    (338.26  b … 853.65  b) 600.57  b ▄████▂▂▂▅▄▁▃▂▂█▄▄▁▁▃▁
                   2.90 ipc ( 96.06% cache)    0.06 branch misses
          3.41k cycles   9.91k instructions   30.89 c-refs    1.22 c-misses

fast-equals                  751.89 ns/iter 762.99 ns    █                 
                    (723.99 ns … 851.10 ns) 834.71 ns  ███▅▂               
                    (185.84  b … 510.30  b) 352.17  b ▄█████▇▆▇▇▆▄▂▄▂▂▁▂▁▁▂
                   3.07 ipc ( 94.42% cache)    0.05 branch misses
          3.10k cycles   9.52k instructions   12.91 c-refs    0.72 c-misses

dequal                       818.15 ns/iter 818.56 ns  ██                  
                    (802.31 ns … 928.58 ns) 870.48 ns  ██▇                 
                    ( 38.09  b … 421.49  b) 177.69  b ▅█████▂▁▂▄▂▂▂▂▁▂▁▃▃▂▂
                   2.86 ipc ( 93.68% cache)    0.04 branch misses
          3.38k cycles   9.67k instructions    6.78 c-refs    0.43 c-misses

lodash.isEqual                 1.22 µs/iter   1.23 µs    ▅█                
                        (1.19 µs … 1.32 µs)   1.29 µs   ▆██▃  ▃            
                    (848.50  b …   1.49 kb)   1.01 kb ▂▅███████▅▂▃▂▃▅▁▄▃▁▁▂
                   2.83 ipc ( 98.15% cache)    0.20 branch misses
          5.04k cycles  14.29k instructions  138.11 c-refs    2.56 c-misses

node.deepStrictEqual           1.55 µs/iter   1.53 µs    ▃█                
                      (1.40 µs … 167.33 µs)   2.05 µs    ██                
                    (528.00  b … 218.57 kb) 599.90  b ▁▂▁██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.30 ipc ( 99.71% cache)   32.35 branch misses
          7.97k cycles  18.30k instructions  768.75 c-refs    2.22 c-misses

summary
  object-equals
   5.26x faster than fast-equals
   5.73x faster than dequal
   5.81x faster than are-deeply-equal
   8.54x faster than lodash.isEqual
   10.86x faster than node.deepStrictEqual

• Object with mixed primitivs [size=512]
------------------------------------------- -------------------------------
object-equals                 31.21 µs/iter  31.17 µs   █                  
                      (31.03 µs … 32.14 µs)  31.41 µs   ██    █            
                    (259.88  b … 261.99  b) 260.09  b ████▁█▁▁█▁▁▁▁▁▁▁▁▁▁▁█
                   3.79 ipc ( 98.94% cache)  221.04 branch misses
        127.90k cycles 484.73k instructions   9.85k c-refs  104.18 c-misses

are-deeply-equal              36.23 µs/iter  36.56 µs █                    
                      (35.84 µs … 36.74 µs)  36.73 µs ██                   
                    (804.42  b … 805.67  b) 805.01  b ██▁▁▁█▁▁▁▁█▁▁█▁▁█▁▁██
                   3.68 ipc ( 98.88% cache)  209.65 branch misses
        148.45k cycles 545.84k instructions  13.10k c-refs  147.26 c-misses

fast-equals                   39.61 µs/iter  39.90 µs █   █           █    
                      (39.07 µs … 40.48 µs)  40.08 µs █ ▅ █    ▅  ▅   █▅  ▅
                    (259.88  b … 260.75  b) 259.98  b █▁█▁█▁▁▁▁█▁▁█▁▁▁██▁▁█
                   3.60 ipc ( 98.88% cache)  220.45 branch misses
        162.14k cycles 583.39k instructions  10.10k c-refs  112.82 c-misses

dequal                        61.22 µs/iter  60.58 µs  █▃                  
                     (57.91 µs … 220.07 µs)  86.81 µs  ██                  
                    (  6.26 kb … 448.87 kb)  16.79 kb ▂██▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.94 ipc ( 98.54% cache)  601.36 branch misses
        255.20k cycles 749.94k instructions  10.18k c-refs  148.36 c-misses

lodash.isEqual                41.19 µs/iter  40.46 µs  █                   
                     (39.01 µs … 217.28 µs)  56.90 µs  █                   
                    (  1.72 kb … 249.52 kb)  25.72 kb ▂█▇▂▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.50 ipc ( 97.63% cache)  345.27 branch misses
        171.47k cycles 600.81k instructions  15.74k c-refs  372.26 c-misses

node.deepStrictEqual          50.42 µs/iter  49.69 µs  █                   
                     (48.53 µs … 205.15 µs)  64.89 µs  █                   
                    (  6.95 kb … 252.95 kb)  25.04 kb ▂█▅▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.43 ipc ( 98.92% cache)  407.16 branch misses
        209.74k cycles 719.72k instructions  16.09k c-refs  174.22 c-misses

summary
  object-equals
   1.16x faster than are-deeply-equal
   1.27x faster than fast-equals
   1.32x faster than lodash.isEqual
   1.62x faster than node.deepStrictEqual
   1.96x faster than dequal

• Object with mixed primitivs [size=4096]
------------------------------------------- -------------------------------
object-equals                664.85 µs/iter 666.34 µs   █▆                 
                    (647.60 µs … 801.14 µs) 754.76 µs  ▃██▂                
                    (111.32 kb … 177.74 kb) 145.58 kb ▂████▄▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   1.65 ipc ( 93.75% cache)  50.89k branch misses
          2.74M cycles   4.51M instructions 232.32k c-refs  14.53k c-misses

are-deeply-equal             758.81 µs/iter 758.98 µs   █                  
                    (740.88 µs … 969.72 µs) 884.13 µs  ▆█                  
                    (192.89 kb … 223.38 kb) 218.80 kb ▃███▃▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.62 ipc ( 89.37% cache)  57.83k branch misses
          3.13M cycles   5.05M instructions 274.66k c-refs  29.20k c-misses

fast-equals                  739.11 µs/iter 734.51 µs  █                   
                    (716.85 µs … 947.87 µs) 939.11 µs  █                   
                    ( 89.82 kb … 198.23 kb) 145.61 kb ▄██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.75 ipc ( 93.31% cache)  52.90k branch misses
          3.02M cycles   5.28M instructions 232.53k c-refs  15.54k c-misses

dequal                       903.99 µs/iter 908.13 µs   ▃█▃                
                      (877.75 µs … 1.12 ms)   1.03 ms   ███                
                    (128.59 kb … 159.35 kb) 145.58 kb ▂▇████▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.77 ipc ( 92.97% cache)  54.94k branch misses
          3.72M cycles   6.58M instructions 230.34k c-refs  16.19k c-misses

lodash.isEqual               814.89 µs/iter 808.97 µs  █                   
                      (790.31 µs … 1.12 ms)   1.02 ms  █                   
                    (104.16 kb … 887.88 kb) 220.80 kb ▃██▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.63 ipc ( 92.50% cache)  62.40k branch misses
          3.35M cycles   5.44M instructions 280.97k c-refs  21.07k c-misses

node.deepStrictEqual         889.84 µs/iter 886.63 µs  █                   
                      (865.54 µs … 1.12 ms)   1.09 ms  ██                  
                    (192.85 kb … 226.09 kb) 218.83 kb ▄██▃▂▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁
                   1.77 ipc ( 91.58% cache)  60.92k branch misses
          3.66M cycles   6.49M instructions 283.03k c-refs  23.82k c-misses

summary
  object-equals
   1.11x faster than fast-equals
   1.14x faster than are-deeply-equal
   1.23x faster than lodash.isEqual
   1.34x faster than node.deepStrictEqual
   1.36x faster than dequal

• Object with mixed primitivs [size=16386]
------------------------------------------- -------------------------------
object-equals                  3.73 ms/iter   3.70 ms  █                   
                        (3.61 ms … 5.85 ms)   5.45 ms ▃█                   
                    (473.88 kb … 552.70 kb) 512.67 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.42 ipc ( 77.21% cache) 257.37k branch misses
         14.17M cycles  20.05M instructions   1.32M c-refs 300.51k c-misses

are-deeply-equal               4.18 ms/iter   4.18 ms ▄█                   
                        (4.00 ms … 6.39 ms)   6.28 ms ██▂                  
                    (768.98 kb … 769.05 kb) 768.98 kb ███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.44 ipc ( 76.65% cache) 282.76k branch misses
         15.44M cycles  22.29M instructions   1.45M c-refs 337.68k c-misses

fast-equals                    3.92 ms/iter   3.91 ms  █                   
                        (3.80 ms … 6.13 ms)   5.25 ms ▇█                   
                    (512.68 kb … 512.77 kb) 512.68 kb ███▃▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.56 ipc ( 78.09% cache) 255.00k branch misses
         15.03M cycles  23.44M instructions   1.36M c-refs 298.82k c-misses

dequal                         4.51 ms/iter   4.51 ms   █                  
                        (4.38 ms … 6.50 ms)   5.02 ms   █▇                 
                    (512.65 kb … 512.72 kb) 512.65 kb ▂███▆▄▃▂▂▄▃▁▁▂▁▁▁▁▁▁▁
                   1.62 ipc ( 77.01% cache) 262.87k branch misses
         17.48M cycles  28.26M instructions   1.35M c-refs 309.77k c-misses

lodash.isEqual                 4.40 ms/iter   4.41 ms ▅█                   
                        (4.22 ms … 6.76 ms)   6.43 ms ██▄                  
                    (397.63 kb …   2.03 mb) 775.62 kb ███▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.45 ipc ( 75.92% cache) 294.95k branch misses
         16.34M cycles  23.69M instructions   1.50M c-refs 360.80k c-misses

node.deepStrictEqual           4.73 ms/iter   4.72 ms  █                   
                        (4.55 ms … 6.85 ms)   6.76 ms ▄█                   
                    (768.95 kb … 769.02 kb) 768.95 kb ██▆▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.57 ipc ( 77.27% cache) 294.71k branch misses
         17.73M cycles  27.82M instructions   1.57M c-refs 357.41k c-misses

summary
  object-equals
   1.05x faster than fast-equals
   1.12x faster than are-deeply-equal
   1.18x faster than lodash.isEqual
   1.21x faster than dequal
   1.27x faster than node.deepStrictEqual
```

</details>

### Nested Object with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 4.14 µs | 173.05 µs | 7.35 ms | 37.24 ms | 1.00x (baseline) |
| fast-equals | 16.90 µs | 576.45 µs | 10.56 ms | 48.45 ms | 4.08x–1.30x slower |
| dequal | 17.36 µs | 903.41 µs | 13.68 ms | 59.39 ms | 4.19x–1.60x slower |
| are-deeply-equal | 19.14 µs | 660.46 µs | 13.08 ms | 62.14 ms | 4.62x–1.67x slower |
| lodash.isEqual | 29.24 µs| 988.83 µs | 15.88 ms | 71.05 ms | 7.06x–1.91x slower |
| node.deepStrictEqual | 37.57 µs | 1.39 ms | 15.65 ms | 66.62 ms | 9.07x–1.79x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.95 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Object with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  4.14 µs/iter   4.07 µs  ▄█                  
                      (3.74 µs … 180.27 µs)   6.40 µs  ██                  
                    (928.00  b … 240.99 kb)   7.32 kb ▁██▇▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.00 ipc ( 98.28% cache)   56.76 branch misses
         18.38k cycles  55.05k instructions   1.42k c-refs   24.38 c-misses

are-deeply-equal              19.14 µs/iter  19.16 µs            ███       
                      (18.97 µs … 19.31 µs)  19.28 µs ▅    ▅▅ ▅  ███      ▅
                    (  2.36 kb …   2.37 kb)   2.37 kb █▁▁▁▁██▁█▁▁███▁▁▁▁▁▁█
                   2.76 ipc ( 97.97% cache)   67.31 branch misses
         78.83k cycles 217.46k instructions   2.62k c-refs   53.09 c-misses

fast-equals                   16.90 µs/iter  16.93 µs      █       █       
                      (16.77 µs … 17.16 µs)  17.02 µs ▅▅▅  █ ▅    ▅█     ▅▅
                    (  3.22 kb …   3.23 kb)   3.22 kb ███▁▁█▁█▁▁▁▁██▁▁▁▁▁██
                   2.91 ipc ( 98.77% cache)   27.32 branch misses
         69.38k cycles 202.11k instructions   2.66k c-refs   32.79 c-misses

dequal                        17.36 µs/iter  17.39 µs   █  █               
                      (17.06 µs … 18.05 µs)  17.79 µs ▅▅█  █▅ ▅▅  ▅       ▅
                    (  3.61 kb …   3.62 kb)   3.61 kb ███▁▁██▁██▁▁█▁▁▁▁▁▁▁█
                   2.89 ipc ( 98.58% cache)   26.00 branch misses
         71.28k cycles 205.81k instructions   1.56k c-refs   22.25 c-misses

lodash.isEqual                29.24 µs/iter  28.76 µs   █                  
                     (27.48 µs … 295.22 µs)  39.41 µs  ▂█                  
                    (728.00  b … 939.83 kb)  14.73 kb ▁██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.72 ipc ( 98.28% cache)   67.24 branch misses
        121.50k cycles 330.41k instructions   6.97k c-refs  119.98 c-misses

node.deepStrictEqual          37.57 µs/iter  37.09 µs  █                   
                     (36.16 µs … 200.13 µs)  50.04 µs  █                   
                    (320.00  b … 356.63 kb)  11.32 kb ▃█▃▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.65 ipc ( 97.59% cache)  418.30 branch misses
        156.17k cycles 414.50k instructions   5.10k c-refs  122.91 c-misses

summary
  object-equals
   4.08x faster than fast-equals
   4.19x faster than dequal
   4.62x faster than are-deeply-equal
   7.06x faster than lodash.isEqual
   9.07x faster than node.deepStrictEqual

• Nested Object with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                173.05 µs/iter 170.84 µs  █                   
                    (164.27 µs … 393.33 µs) 290.70 µs ▃█                   
                    (  3.88 kb … 642.23 kb) 237.41 kb ██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.96 ipc ( 79.82% cache)   1.29k branch misses
        709.32k cycles   2.10M instructions  69.70k c-refs  14.06k c-misses

are-deeply-equal             660.46 µs/iter 659.88 µs   █▃                 
                    (634.83 µs … 994.58 µs) 803.92 µs   ██                 
                    (297.65 kb … 403.67 kb) 342.22 kb ▂▇██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.66 ipc ( 81.06% cache)   2.38k branch misses
          2.72M cycles   7.22M instructions 158.19k c-refs  29.96k c-misses

fast-equals                  576.45 µs/iter 575.73 µs  ▆█                  
                    (559.82 µs … 801.23 µs) 707.68 µs  ██                  
                    (236.62 kb … 256.65 kb) 236.78 kb ▂██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.84 ipc ( 81.60% cache)   1.30k branch misses
          2.37M cycles   6.74M instructions 131.82k c-refs  24.25k c-misses

dequal                       903.41 µs/iter 903.15 µs  █                   
                      (874.79 µs … 1.41 ms)   1.18 ms  █▇                  
                    ( 89.43 kb … 796.11 kb) 128.66 kb ▄██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.54 ipc ( 77.53% cache)   2.81k branch misses
          3.71M cycles   9.44M instructions 108.06k c-refs  24.28k c-misses

lodash.isEqual               988.83 µs/iter 982.64 µs  █                   
                      (962.42 µs … 1.35 ms)   1.19 ms  █                   
                    (118.83 kb …   1.09 mb) 444.85 kb ▄██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.61 ipc ( 86.16% cache)   2.76k branch misses
          4.05M cycles  10.57M instructions 239.73k c-refs  33.18k c-misses

node.deepStrictEqual           1.39 ms/iter   1.38 ms  █                   
                        (1.35 ms … 2.33 ms)   1.66 ms  █                   
                    (330.19 kb …   1.50 mb) 341.70 kb ▇██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.33 ipc ( 80.39% cache)  27.85k branch misses
          5.69M cycles  13.25M instructions 148.05k c-refs  29.03k c-misses

summary
  object-equals
   3.33x faster than fast-equals
   3.82x faster than are-deeply-equal
   5.22x faster than dequal
   5.71x faster than lodash.isEqual
   8.03x faster than node.deepStrictEqual

• Nested Object with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  7.35 ms/iter   7.32 ms  ▇█                  
                        (7.06 ms … 8.38 ms)   8.34 ms  ███▂                
                    (  1.21 mb …   2.34 mb)   2.11 mb █████▅▃▃▁▂▁▃▁▁▁▁▂▄▃▃▃
                   1.56 ipc ( 79.11% cache)  68.19k branch misses
         30.33M cycles  47.23M instructions   1.63M c-refs 341.18k c-misses

are-deeply-equal              13.08 ms/iter  13.22 ms     ▄█               
                      (12.78 ms … 13.65 ms)  13.53 ms     ██               
                    (  3.12 mb …   3.19 mb)   3.18 mb ▅▃▃███▃▃▃▃▇▃▃▅▃▇█▁▃▁▃
                   1.71 ipc ( 84.97% cache) 102.91k branch misses
         53.10M cycles  90.91M instructions   2.89M c-refs 434.43k c-misses

fast-equals                   10.56 ms/iter  10.59 ms     ▅ █              
                      (10.45 ms … 10.78 ms)  10.77 ms ▆ █ █▆█▆  ▃          
                    (  2.11 mb …   2.14 mb)   2.12 mb █▆█▆███████▁▁▄▄▆▄▆▄▄▄
                   1.68 ipc ( 79.08% cache)  69.63k branch misses
         43.50M cycles  72.94M instructions   1.85M c-refs 387.92k c-misses

dequal                        13.68 ms/iter  13.72 ms       ▅  █           
                      (13.53 ms … 13.84 ms)  13.84 ms    ▃█ █▃▃█  ▆ ▃  ▃   
                    (  1.29 mb …   1.31 mb)   1.31 mb ▄▄▁██▄████▁██▄█▁▄██▁▄
                   1.74 ipc ( 78.48% cache)  81.83k branch misses
         56.26M cycles  97.90M instructions   1.90M c-refs 409.89k c-misses

lodash.isEqual                15.88 ms/iter  16.01 ms    █ ▄               
                      (15.61 ms … 16.40 ms)  16.31 ms    ███▅▅▅   ▅        
                    (  3.76 mb …   4.18 mb)   3.98 mb ▅█▅██████▁▅███▅▁▅▅▁▁▅
                   1.82 ipc ( 92.32% cache) 110.48k branch misses
         65.54M cycles 119.18M instructions   6.38M c-refs 490.41k c-misses

node.deepStrictEqual          15.65 ms/iter  15.74 ms   ▂ ▂ ██▂ █  █ ▂     
                      (15.40 ms … 16.00 ms)  15.93 ms   █▅█ ███▅█ ▅█ █     
                    (  2.57 mb …   2.59 mb)   2.58 mb ▇▁███▇█████▇██▁█▇▁▇▇▇
                   1.66 ipc ( 77.82% cache) 274.44k branch misses
         64.15M cycles 106.34M instructions   1.84M c-refs 407.44k c-misses

summary
  object-equals
   1.44x faster than fast-equals
   1.78x faster than are-deeply-equal
   1.86x faster than dequal
   2.13x faster than node.deepStrictEqual
   2.16x faster than lodash.isEqual

• Nested Object with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 37.24 ms/iter  37.43 ms █                    
                      (36.84 ms … 38.32 ms)  37.54 ms █                    
                    (  8.58 mb …   8.58 mb)   8.58 mb ████▁▁▁▁▁█▁██▁█▁▁████
                   1.30 ipc ( 72.33% cache) 320.57k branch misses
        152.29M cycles 198.06M instructions   6.87M c-refs   1.90M c-misses

are-deeply-equal              62.14 ms/iter  62.34 ms           █          
                      (60.96 ms … 64.29 ms)  62.84 ms           █          
                    ( 12.50 mb …  12.60 mb)  12.54 mb █▁▁▁▁██▁▁██▁█▁▁█▁█▁▁█
                   1.46 ipc ( 81.63% cache) 445.25k branch misses
        249.66M cycles 365.28M instructions  12.62M c-refs   2.32M c-misses

fast-equals                   48.45 ms/iter  48.74 ms                     █
                      (48.08 ms … 48.87 ms)  48.75 ms █                   █
                    (  8.58 mb …   8.58 mb)   8.58 mb ██▁▁██▁▁▁▁▁█▁▁▁▁▁▁█▁█
                   1.53 ipc ( 76.13% cache) 323.99k branch misses
        198.52M cycles 304.61M instructions   8.39M c-refs   2.00M c-misses

dequal                        59.39 ms/iter  59.47 ms      █               
                      (58.52 ms … 62.07 ms)  59.85 ms      █               
                    (  5.17 mb …   5.19 mb)   5.19 mb █▁▁▁▁██▁█▁█▁█▁█▁▁▁▁██
                   1.62 ipc ( 75.91% cache) 373.14k branch misses
        242.61M cycles 394.15M instructions   8.32M c-refs   2.00M c-misses

lodash.isEqual                71.05 ms/iter  70.92 ms        █ █           
                      (69.14 ms … 78.44 ms)  71.68 ms ▅    ▅ █▅█▅   ▅   ▅ ▅
                    ( 16.13 mb …  16.33 mb)  16.20 mb █▁▁▁▁█▁████▁▁▁█▁▁▁█▁█
                   1.72 ipc ( 91.33% cache) 506.30k branch misses
        289.04M cycles 496.24M instructions  28.78M c-refs   2.50M c-misses

node.deepStrictEqual          66.62 ms/iter  67.12 ms ██ ███  ███    █  █ █
                      (65.75 ms … 67.85 ms)  67.54 ms ██ ███  ███    █  █ █
                    ( 10.28 mb …  10.29 mb)  10.29 mb ██▁███▁▁███▁▁▁▁█▁▁█▁█
                   1.58 ipc ( 75.16% cache)   1.13M branch misses
        271.02M cycles 427.44M instructions   8.12M c-refs   2.02M c-misses

summary
  object-equals
   1.3x faster than fast-equals
   1.6x faster than dequal
   1.67x faster than are-deeply-equal
   1.79x faster than node.deepStrictEqual
   1.91x faster than lodash.isEqual
```

</details>

### Array with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 87.97 ns| 2.18 µs | 16.99 µs | 68.91 µs| 1.00x (baseline) |
| dequal | 133.51 ns | 3.68 µs | 29.50 µs| 119.92 µs | 1.52x–1.74x slower |
| fast-equals | 144.76 ns | 3.92 µs | 31.27 µs| 125.59 µs | 1.65x–1.82x slower |
| are-deeply-equal | 166.51 ns | 3.74 µs | 29.74 µs | 126.07 µs | 1.89x–1.83x slower |
| lodash.isEqual | 244.82 ns | 3.68 µs | 28.69 µs| 116.09 µs | 2.78x–1.68x slower |
| node.deepStrictEqual | 809.72 ns | 11.03 µs| 85.70 µs | 338.13 µs | 9.20x–4.91x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
nodg benchGenerated.mjs 
clk: ~3.91 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Array with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                 87.97 ns/iter  89.05 ns         ▇█           
                     (79.06 ns … 190.52 ns) 101.26 ns         ██           
                    (  0.11  b …  88.20  b)   0.40  b ▂▄▄▄▂▁▂▄██▇▃▂▁▁▁▁▁▁▁▁
                   3.69 ipc ( 87.34% cache)    1.01 branch misses
         360.65 cycles   1.33k instructions    0.09 c-refs    0.01 c-misses

are-deeply-equal             166.51 ns/iter 166.67 ns   █▂                 
                    (160.24 ns … 219.25 ns) 196.25 ns  ███▂                
                    (  7.67  b … 290.39  b) 184.23  b ▂████▅▂▁▁▂▁▁▁▁▁▂▂▁▁▁▁
                   3.66 ipc ( 94.95% cache)    1.02 branch misses
         682.32 cycles   2.50k instructions    6.49 c-refs    0.33 c-misses

fast-equals                  144.76 ns/iter 145.36 ns     ▃█▂              
                    (141.84 ns … 185.25 ns) 150.67 ns    ▄███▇▄▂           
                    (  0.10  b … 106.34  b)   0.75  b ▂▅█████████▄▃▂▁▂▂▁▁▁▁
                   3.88 ipc ( 90.83% cache)    1.01 branch misses
         592.87 cycles   2.30k instructions    0.10 c-refs    0.01 c-misses

dequal                       133.51 ns/iter 134.34 ns       ▃▂▅█▃          
                    (128.63 ns … 265.26 ns) 140.11 ns       █████▄         
                    (  0.10  b …  99.38  b)   0.50  b ▃▄▅▄▆███████▇▅▃▃▂▁▁▁▁
                   3.91 ipc ( 89.76% cache)    1.01 branch misses
         548.38 cycles   2.14k instructions    0.09 c-refs    0.01 c-misses

lodash.isEqual               244.82 ns/iter 244.21 ns    ▃█                
                    (224.98 ns … 335.81 ns) 297.61 ns    ██                
                    (275.95  b … 820.13  b) 528.49  b ▁▁▂███▂▂▃▂▄▄▂▂▂▁▁▁▁▁▁
                   3.29 ipc ( 95.00% cache)    1.04 branch misses
          1.00k cycles   3.31k instructions   20.87 c-refs    1.04 c-misses

node.deepStrictEqual         809.72 ns/iter 810.00 ns        █             
                     (700.00 ns … 53.95 µs)   1.00 µs       ▂█             
                    (176.00  b … 250.55 kb) 215.39  b ▁▁▁▁▁▄██▄▂▁▁▁▁▁▁▁▁▁▁▁
                   1.89 ipc ( 99.88% cache)   31.08 branch misses
          4.86k cycles   9.19k instructions  587.47 c-refs    0.70 c-misses

summary
  object-equals
   1.52x faster than dequal
   1.65x faster than fast-equals
   1.89x faster than are-deeply-equal
   2.78x faster than lodash.isEqual
   9.2x faster than node.deepStrictEqual

• Array with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  2.18 µs/iter   2.17 µs  █                   
                        (2.14 µs … 2.35 µs)   2.34 µs  █                   
                    (  0.10  b …   0.43  b)   0.12  b ▆█▇▅▃▂▂▁▁▁▁▁▂▁▁▁▁▁▁▄▄
                   4.09 ipc ( 99.97% cache)    1.03 branch misses
          8.97k cycles  36.70k instructions  383.36 c-refs    0.10 c-misses

are-deeply-equal               3.74 µs/iter   3.75 µs    █ ▂▂              
                        (3.71 µs … 3.82 µs)   3.82 µs  ▂ █▅██▅             
                    (175.92  b … 184.46  b) 183.75  b ▄█▇█████▄▁▇▄▇▁▁▁▄▁▁▁▄
                   4.05 ipc ( 99.78% cache)    1.10 branch misses
         15.23k cycles  61.67k instructions  546.49 c-refs    1.18 c-misses

fast-equals                    3.92 µs/iter   3.97 µs  ██                  
                        (3.86 µs … 4.01 µs)   4.00 µs ▂██ ▇▂▇▇  ▂      ▇▇  
                    (  0.01  b …   0.36  b)   0.07  b ███▆████▆▆█▁▆▁▁▆▆██▆▆
                   4.12 ipc ( 99.91% cache)    2.07 branch misses
         15.96k cycles  65.75k instructions  391.67 c-refs    0.34 c-misses

dequal                         3.68 µs/iter   3.69 µs       ▅ █            
                        (3.62 µs … 3.77 µs)   3.77 µs       █ █▃▃          
                    (  0.01  b …   0.40  b)   0.06  b ▆▁█▁█▆█▆███▁▆▆▁▁▁▁▁▁▄
                   4.14 ipc ( 99.83% cache)    1.07 branch misses
         15.00k cycles  62.15k instructions  260.74 c-refs    0.44 c-misses

lodash.isEqual                 3.68 µs/iter   3.71 µs  █       ▃█          
                        (3.60 µs … 3.80 µs)   3.77 µs  █ ▇▂  ▇▂██▇  ▇ ▂▇  ▂
                    (518.91  b … 551.94  b) 528.76  b ▆█▁██▆▁█████▆▆█▆██▁▁█
                   4.13 ipc ( 99.37% cache)    1.16 branch misses
         15.16k cycles  62.60k instructions  584.92 c-refs    3.71 c-misses

node.deepStrictEqual          11.03 µs/iter  11.05 µs  █     █  ██         
                      (10.93 µs … 11.15 µs)  11.14 µs ▅█     █  ██   ▅    ▅
                    (137.69  b … 207.94  b) 150.40  b ██▁▁▁▁▁█▁▁██▁▁▁█▁▁▁▁█
                   3.12 ipc ( 99.73% cache)    4.22 branch misses
         44.91k cycles 140.21k instructions  694.88 c-refs    1.85 c-misses

summary
  object-equals
   1.68x faster than dequal
   1.68x faster than lodash.isEqual
   1.71x faster than are-deeply-equal
   1.79x faster than fast-equals
   5.05x faster than node.deepStrictEqual

• Array with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 16.99 µs/iter  17.04 µs                     █
                      (16.72 µs … 17.29 µs)  17.23 µs ▅▅   ▅ ▅ ▅▅▅▅▅      █
                    (  0.12  b …   0.43  b)   0.17  b ██▁▁▁█▁█▁█████▁▁▁▁▁▁█
                   4.22 ipc ( 98.23% cache)    2.32 branch misses
         69.30k cycles 292.50k instructions   7.00k c-refs  123.72 c-misses

are-deeply-equal              29.74 µs/iter  29.84 µs                █  █  
                      (29.52 µs … 30.04 µs)  29.88 µs ▅▅▅   ▅   ▅    █▅ █ ▅
                    (184.16  b … 184.46  b) 184.23  b ███▁▁▁█▁▁▁█▁▁▁▁██▁█▁█
                   4.04 ipc ( 98.55% cache)    1.71 branch misses
        121.10k cycles 489.45k instructions   6.72k c-refs   97.19 c-misses

fast-equals                   31.27 µs/iter  31.28 µs █                    
                      (31.08 µs … 31.67 µs)  31.51 µs █▅ ▅ ▅▅▅▅▅       ▅  ▅
                    (  0.12  b …   0.36  b)   0.14  b ██▁█▁█████▁▁▁▁▁▁▁█▁▁█
                   4.14 ipc ( 99.12% cache)    2.64 branch misses
        127.00k cycles 526.00k instructions   6.45k c-refs   56.52 c-misses

dequal                        29.50 µs/iter  29.47 µs █                    
                      (29.27 µs … 30.07 µs)  30.06 µs ██                   
                    (  0.12  b …   0.40  b)   0.17  b ██████▁▁▁▁▁▁█▁▁▁▁▁▁▁█
                   4.12 ipc ( 97.35% cache)    1.33 branch misses
        120.24k cycles 495.90k instructions   6.40k c-refs  169.54 c-misses

lodash.isEqual                28.69 µs/iter  28.41 µs  █▆                  
                     (27.52 µs … 142.39 µs)  36.86 µs  ██                  
                    (576.00  b … 227.48 kb) 902.03  b ▂██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.14 ipc ( 98.05% cache)   31.77 branch misses
        118.96k cycles 492.35k instructions   8.05k c-refs  156.98 c-misses

node.deepStrictEqual          85.70 µs/iter  86.80 µs        █             
                     (81.58 µs … 128.63 µs)  96.79 µs  █▄ ▂▂██             
                    (192.00  b … 219.31 kb) 782.90  b ▅████████▃▂▂▂▂▂▂▂▂▂▁▁
                   3.13 ipc ( 95.67% cache)   33.68 branch misses
        352.18k cycles   1.10M instructions  11.25k c-refs  487.76 c-misses

summary
  object-equals
   1.69x faster than lodash.isEqual
   1.74x faster than dequal
   1.75x faster than are-deeply-equal
   1.84x faster than fast-equals
   5.04x faster than node.deepStrictEqual

• Array with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 68.91 µs/iter  69.04 µs  ▅█                  
                     (66.61 µs … 117.46 µs)  81.06 µs  ██▂                 
                    ( 48.00  b … 219.39 kb) 536.24  b ▂███▄▄▄▃▃▂▁▁▁▁▁▁▁▁▁▁▁
                   4.13 ipc ( 94.57% cache)   34.05 branch misses
        283.22k cycles   1.17M instructions  40.45k c-refs   2.20k c-misses

are-deeply-equal             126.07 µs/iter 127.70 µs  █▃                  
                    (120.60 µs … 249.17 µs) 142.87 µs  ██                  
                    (232.00  b … 251.42 kb) 985.99  b ▄██████▅▄▃▃▃▃▃▂▂▂▂▂▁▁
                   3.82 ipc ( 91.01% cache)   43.05 branch misses
        516.81k cycles   1.97M instructions  45.79k c-refs   4.11k c-misses

fast-equals                  125.59 µs/iter 125.14 µs   █                  
                    (123.04 µs … 209.64 µs) 137.74 µs  ▇█▃                 
                    ( 48.00  b … 219.23 kb) 822.01  b ▂███▂▁▂▃▃▂▂▂▂▂▁▁▁▁▁▁▁
                   4.10 ipc ( 97.26% cache)   37.08 branch misses
        513.67k cycles   2.10M instructions  38.77k c-refs   1.06k c-misses

dequal                       119.92 µs/iter 119.94 µs   █                  
                    (117.47 µs … 185.98 µs) 132.12 µs  ▆█                  
                    ( 48.00  b … 278.03 kb) 815.28  b ▄██▇▄▂▂▃▃▂▂▂▁▁▁▁▁▁▁▁▁
                   4.05 ipc ( 91.53% cache)   34.34 branch misses
        490.50k cycles   1.98M instructions  37.57k c-refs   3.18k c-misses

lodash.isEqual               116.09 µs/iter 117.03 µs  █▅                  
                    (111.57 µs … 326.99 µs) 138.43 µs  ██                  
                    (576.00  b … 447.94 kb)   1.57 kb ▃██▄▆▆▅▃▂▂▁▁▁▁▁▁▁▁▁▁▁
                   4.12 ipc ( 96.76% cache)   36.06 branch misses
        475.07k cycles   1.96M instructions  39.91k c-refs   1.29k c-misses

node.deepStrictEqual         338.13 µs/iter 340.71 µs        █ ▆           
                    (322.41 µs … 440.96 µs) 357.53 µs       ▂███▂▅         
                    (192.00  b … 433.16 kb)   1.99 kb ▁▁▁▂▅███████▆▅▄▃▂▁▁▁▁
                   3.18 ipc ( 90.56% cache)   39.60 branch misses
          1.38M cycles   4.40M instructions  45.40k c-refs   4.28k c-misses

summary
  object-equals
   1.68x faster than lodash.isEqual
   1.74x faster than dequal
   1.82x faster than fast-equals
   1.83x faster than are-deeply-equal
   4.91x faster than node.deepStrictEqual
```

</details>

### Nested Array with mixed primitive Values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 2.17 µs | 73.35 µs | 567.88 µs | 4.42 ms | 1.00x (baseline) |
| dequal | 2.69 µs | 97.18 µs | 768.72 µs | 5.90 ms | 1.24x–1.33x slower |
| fast-equals | 3.12 µs | 101.04 µs | 838.75 µs | 6.12 ms | 1.43x–1.38x slower |
| are-deeply-equal | 4.09 µs | 127.52 µs | 1.18 ms | 8.05 ms | 1.88x–1.82x slower |
| lodash.isEqual | 5.09 µs | 162.53 µs | 1.50 ms | 8.86 ms | 2.34x–2.01x slower |
| node.deepStrictEqual | 14.72 µs| 455.67 µs | 3.78 ms | 17.24 ms | 6.78x–3.90x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.94 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Array with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  2.17 µs/iter   2.16 µs    █                 
                       (2.05 µs … 47.48 µs)   2.73 µs   ██                 
                    ( 32.00  b … 251.51 kb)  86.10  b ▁▂██▆▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.25 ipc ( 99.88% cache)   51.10 branch misses
         10.46k cycles  34.03k instructions  740.52 c-refs    0.88 c-misses

are-deeply-equal               4.09 µs/iter   4.11 µs █     █     █  ▂     
                        (4.05 µs … 4.17 µs)   4.14 µs █  ▅▅▅█▅▅ ▅ █ ▅█    ▅
                    (  1.82 kb …   1.83 kb)   1.83 kb █▁▇██████▇█▇█▇██▇▇▁▇█
                   3.21 ipc ( 99.11% cache)   61.18 branch misses
         16.74k cycles  53.75k instructions  801.72 c-refs    7.12 c-misses

fast-equals                    3.12 µs/iter   3.15 µs     █    ▄       █   
                        (3.05 µs … 3.20 µs)   3.18 µs   ▅ ██▅▅▅█   █   █   
                    (  0.10  b …   4.24  b)   0.19  b ▅▁████████▅▁██▅█▁█▅██
                   3.67 ipc ( 99.91% cache)   24.08 branch misses
         12.77k cycles  46.94k instructions  278.52 c-refs    0.26 c-misses

dequal                         2.69 µs/iter   2.70 µs  █                   
                        (2.65 µs … 2.83 µs)   2.82 µs ▂██                  
                    (  0.01  b …   2.24  b)   0.08  b ███▂█▆▄▄▆▁▂▂▁▁▂▂▁▁▁▁▂
                   3.88 ipc ( 99.87% cache)   24.05 branch misses
         11.01k cycles  42.74k instructions  142.85 c-refs    0.18 c-misses

lodash.isEqual                 5.09 µs/iter   5.11 µs  █    █ █            
                        (5.00 µs … 5.24 µs)   5.19 µs  ███  ████    █     █
                    (  1.66 kb …   1.70 kb)   1.67 kb ████████████▁▁██▁▁███
                   3.46 ipc ( 98.05% cache)   22.59 branch misses
         20.97k cycles  72.61k instructions  827.97 c-refs   16.13 c-misses

node.deepStrictEqual          14.72 µs/iter  14.47 µs  █                   
                     (13.88 µs … 225.79 µs)  20.43 µs  █▇                  
                    (  3.21 kb … 194.40 kb)   3.44 kb ▂██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.66 ipc ( 98.20% cache)  102.01 branch misses
         61.96k cycles 164.73k instructions   2.41k c-refs   43.30 c-misses

summary
  object-equals
   1.24x faster than dequal
   1.43x faster than fast-equals
   1.88x faster than are-deeply-equal
   2.34x faster than lodash.isEqual
   6.78x faster than node.deepStrictEqual

• Nested Array with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 73.35 µs/iter  72.92 µs    █▆                
                     (70.31 µs … 303.57 µs)  82.62 µs   ▅██                
                    ( 48.00  b … 219.39 kb) 555.40  b ▁▄███▇▂▁▁▂▂▃▂▁▁▁▁▁▁▁▁
                   3.38 ipc ( 72.43% cache)  777.09 branch misses
        300.73k cycles   1.02M instructions  32.09k c-refs   8.85k c-misses

are-deeply-equal             127.52 µs/iter 126.29 µs  █                   
                    (122.71 µs … 333.64 µs) 190.76 µs ▄█                   
                    ( 46.14 kb … 307.52 kb)  59.71 kb ██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.23 ipc ( 80.81% cache)   1.37k branch misses
        523.89k cycles   1.69M instructions  37.21k c-refs   7.14k c-misses

fast-equals                  101.04 µs/iter 100.64 µs  █                   
                     (97.10 µs … 212.47 µs) 129.63 µs  █▃                  
                    ( 48.00  b … 251.21 kb) 717.63  b ▃██▃▄▂▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.60 ipc ( 77.56% cache)  812.16 branch misses
        415.86k cycles   1.50M instructions  28.33k c-refs   6.36k c-misses

dequal                        97.18 µs/iter  96.63 µs   █▆                 
                     (91.83 µs … 326.91 µs) 125.86 µs  ▇██                 
                    ( 48.00  b … 219.34 kb) 641.48  b ▂███▃▄▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.49 ipc ( 77.77% cache)  807.00 branch misses
        397.03k cycles   1.39M instructions  28.16k c-refs   6.26k c-misses

lodash.isEqual               162.53 µs/iter 162.10 µs  █                   
                    (151.45 µs … 450.29 µs) 274.30 µs  █▅                  
                    ( 12.30 kb …   0.98 mb) 167.18 kb ▇██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.43 ipc ( 94.84% cache)  925.59 branch misses
        666.11k cycles   2.28M instructions  38.70k c-refs   2.00k c-misses

node.deepStrictEqual         455.67 µs/iter 459.04 µs    ▃▆█▅▂             
                    (440.36 µs … 600.00 µs) 493.86 µs   ▅█████▃            
                    ( 47.28 kb …  88.96 kb)  86.09 kb ▃▇████████▅▃▂▂▁▁▁▁▁▁▁
                   2.71 ipc ( 93.37% cache)   2.90k branch misses
          1.87M cycles   5.05M instructions  50.78k c-refs   3.37k c-misses

summary
  object-equals
   1.32x faster than dequal
   1.38x faster than fast-equals
   1.74x faster than are-deeply-equal
   2.22x faster than lodash.isEqual
   6.21x faster than node.deepStrictEqual

• Nested Array with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                567.88 µs/iter 571.44 µs    ▃█▆               
                    (551.95 µs … 632.13 µs) 606.81 µs   █████▄             
                    (504.00  b … 104.98 kb) 591.46  b ▂▅███████▇▅▃▄▃▄▂▂▁▂▁▂
                   3.53 ipc ( 85.50% cache)   5.42k branch misses
          2.32M cycles   8.19M instructions 269.90k c-refs  39.12k c-misses

are-deeply-equal               1.18 ms/iter   1.17 ms █                    
                        (1.13 ms … 2.82 ms)   2.76 ms █                    
                    (448.88 kb … 480.55 kb) 478.95 kb █▇▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.12 ipc ( 84.59% cache)  11.02k branch misses
          4.33M cycles  13.51M instructions 366.18k c-refs  56.44k c-misses

fast-equals                  838.75 µs/iter 862.49 µs    ▄  ▆█             
                    (800.06 µs … 973.67 µs) 892.87 µs    ██▆██▆     ▇▇     
                    (456.00  b …   1.65 kb) 470.60  b ▂▄███████▆▂▃▄▇███▃▄▂▁
                   3.50 ipc ( 84.46% cache)   6.31k branch misses
          3.42M cycles  11.98M instructions 262.67k c-refs  40.82k c-misses

dequal                       768.72 µs/iter 769.00 µs   ▄█                 
                      (749.25 µs … 1.08 ms) 853.63 µs   ██▅                
                    (504.00  b …   1.52 kb) 505.58  b ▂▇███▅▃▂▂▂▁▂▁▁▁▁▁▁▁▁▁
                   3.53 ipc ( 83.64% cache)   6.21k branch misses
          3.14M cycles  11.10M instructions 262.36k c-refs  42.91k c-misses

lodash.isEqual                 1.50 ms/iter   1.49 ms  ▂█                  
                        (1.45 ms … 2.15 ms)   1.68 ms  ██▅                 
                    (940.82 kb …   1.96 mb)   1.29 mb ▄████▅▃▃▂▂▁▁▂▁▂▃▃▂▁▁▂
                   3.12 ipc ( 82.64% cache)   6.35k branch misses
          6.14M cycles  19.18M instructions 342.84k c-refs  59.50k c-misses

node.deepStrictEqual           3.78 ms/iter   3.79 ms       ▇▆█            
                        (3.64 ms … 4.06 ms)   4.00 ms      ▄███            
                    (681.18 kb … 681.77 kb) 681.59 kb ▂▅▃▁▄████▇▅▅▂▃▁▃▃▂▂▂▂
                   2.63 ipc ( 87.17% cache)  21.55k branch misses
         15.40M cycles  40.56M instructions 457.33k c-refs  58.66k c-misses

summary
  object-equals
   1.35x faster than dequal
   1.48x faster than fast-equals
   2.08x faster than are-deeply-equal
   2.63x faster than lodash.isEqual
   6.65x faster than node.deepStrictEqual

• Nested Array with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                  4.42 ms/iter   4.43 ms   █▃▃▆               
                        (4.35 ms … 4.72 ms)   4.68 ms  ▇████               
                    (504.00  b … 576.00  b) 504.45  b ▅██████▆▃▂▂▃▂▁▁▁▁▁▁▁▂
                   1.81 ipc ( 85.21% cache)  21.19k branch misses
         18.16M cycles  32.80M instructions   1.11M c-refs 163.73k c-misses

are-deeply-equal               8.05 ms/iter   7.94 ms  █                   
                        (7.84 ms … 9.74 ms)   9.73 ms ██                   
                    (  1.75 mb …   1.78 mb)   1.77 mb ██▃▂▃▂▁▁▁▁▁▁▁▁▁▂▁▁▁▂▂
                   1.82 ipc ( 79.69% cache)  39.87k branch misses
         29.78M cycles  54.18M instructions   1.51M c-refs 306.30k c-misses

fast-equals                    6.12 ms/iter   6.15 ms  ▂ ▂█▄▂▄ █           
                        (6.03 ms … 6.45 ms)   6.28 ms  █ █████▆██▅         
                    (504.00  b … 592.00  b) 504.76  b ▇█▅█████████▇▃▁▅▅▃▅▃▃
                   1.91 ipc ( 82.72% cache)  25.01k branch misses
         25.19M cycles  48.14M instructions   1.16M c-refs 200.32k c-misses

dequal                         5.90 ms/iter   5.94 ms  ▂▅█                 
                        (5.80 ms … 6.10 ms)   6.09 ms  ███▇█▅▅▂ ▅          
                    (504.00  b … 576.00  b) 504.60  b ▄████████▆██▄▄▃▃▆▃▃▃▇
                   1.83 ipc ( 82.17% cache)  24.74k branch misses
         24.21M cycles  44.40M instructions   1.09M c-refs 194.45k c-misses

lodash.isEqual                 8.86 ms/iter   8.94 ms      █▃              
                        (8.64 ms … 9.18 ms)   9.17 ms    ▅▇██▂▅ █▇▂█       
                    (  5.16 mb …   5.33 mb)   5.16 mb ▃█▃██████▆████▁▃▃▃▃▃▃
                   2.13 ipc ( 82.48% cache)  25.52k branch misses
         36.44M cycles  77.69M instructions   1.37M c-refs 239.15k c-misses

node.deepStrictEqual          17.24 ms/iter  17.37 ms ▂   ▂▂ █  ▂  ▂    █  
                      (16.95 ms … 17.64 ms)  17.61 ms █▅▅▅██ █  █▅▅█    █  
                    (  2.66 mb …   2.66 mb)   2.66 mb ██████▁█▁▁████▇▇▁▁█▁▇
                   2.31 ipc ( 85.38% cache)  86.11k branch misses
         70.41M cycles 162.30M instructions   1.83M c-refs 266.88k c-misses

summary
  object-equals
   1.33x faster than dequal
   1.38x faster than fast-equals
   1.82x faster than are-deeply-equal
   2.01x faster than lodash.isEqual
   3.9x faster than node.deepStrictEqual
```

</details>

### Map with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 361.18 ns | 15.48 µs| 193.27 µs | 718.71 µs | 1.00x (baseline) |
| dequal | 447.77 ns | 17.86 µs | 206.12 µs | 792.13 µs | 1.24x–1.10x slower |
| are-deeply-equal | 476.96 ns | 17.96 µs | 212.47 µs | 720.91 µs | 1.32x–1.00x slower |
| node.deepStrictEqual | 1.13 µs | 20.88 µs | 217.35 µs | 743.54 µs | 3.13x–1.03x slower |
| fast-equals | 1.30 µs | 871.31 µs | 55.19 ms | 900.82 ms | 3.61x–1253.39x slower |
| lodash.isEqual | 11.97 µs| 1.32 ms | 69.69 ms | 1.03 s | 33.13x–1431.19x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.94 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Map with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                361.18 ns/iter 371.26 ns   ▇█▃                
                    (348.66 ns … 516.55 ns) 391.09 ns  ▄███                
                    (786.84  b …   1.82 kb)   1.00 kb ▃████▇▃▂▁▁▁▃▆▆▇▆▄▂▁▁▁
                   3.93 ipc ( 95.74% cache)    0.08 branch misses
          1.48k cycles   5.81k instructions   35.12 c-refs    1.50 c-misses

are-deeply-equal             476.96 ns/iter 486.54 ns      █▂              
                    (453.17 ns … 595.31 ns) 522.60 ns  ▂▄ ▆██    ▂         
                    (898.64  b …   3.19 kb)   1.19 kb ▄████████▇▅███▃▂▃▂▁▁▁
                   3.49 ipc ( 95.30% cache)    2.25 branch misses
          1.95k cycles   6.81k instructions   42.19 c-refs    1.98 c-misses

fast-equals                    1.30 µs/iter   1.29 µs ▂█                   
                        (1.24 µs … 2.02 µs)   1.71 µs ██▃                  
                    (671.51  b …   1.88 kb)   1.66 kb ███▃▃▂▂▃▂▃▂▃▁▂▂▁▁▁▁▁▂
                   3.88 ipc ( 95.68% cache)    6.99 branch misses
          5.35k cycles  20.78k instructions  353.45 c-refs   15.29 c-misses

dequal                       447.77 ns/iter 457.01 ns      █               
                    (412.16 ns … 562.72 ns) 524.97 ns     ▂█▇▃▃            
                    (826.80  b …   1.77 kb)   1.00 kb ▂▇███████▇▆▅▄▁▃▂▂▁▁▁▁
                   3.72 ipc ( 95.37% cache)    1.12 branch misses
          1.83k cycles   6.80k instructions   35.40 c-refs    1.64 c-misses

lodash.isEqual                11.97 µs/iter  11.59 µs  █                   
                     (11.13 µs … 220.80 µs)  17.74 µs  █                   
                    (960.00  b … 629.98 kb)  25.96 kb ▄█▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.41 ipc ( 98.19% cache)   64.83 branch misses
         50.91k cycles 122.77k instructions   6.52k c-refs  118.01 c-misses

node.deepStrictEqual           1.13 µs/iter   1.11 µs   █▅                 
                      (1.05 µs … 181.47 µs)   1.44 µs   ██                 
                    (  1.36 kb … 360.87 kb)   1.41 kb ▁▂██▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.10 ipc ( 99.60% cache)   32.69 branch misses
          6.16k cycles  12.96k instructions  873.08 c-refs    3.52 c-misses

summary
  object-equals
   1.24x faster than dequal
   1.32x faster than are-deeply-equal
   3.13x faster than node.deepStrictEqual
   3.61x faster than fast-equals
   33.13x faster than lodash.isEqual

• Map with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 15.48 µs/iter  15.53 µs       █             █
                      (15.33 µs … 15.71 µs)  15.66 µs ▅▅▅▅  █ ▅▅  ▅       █
                    (  8.18  b …   8.49  b)   8.23  b ████▁▁█▁██▁▁█▁▁▁▁▁▁▁█
                   3.02 ipc ( 98.69% cache)  209.56 branch misses
         63.24k cycles 191.25k instructions   6.57k c-refs   85.97 c-misses

are-deeply-equal              17.96 µs/iter  18.06 µs █ █ ████      ██ █ ██
                      (17.75 µs … 18.21 µs)  18.12 µs █ █ ████      ██ █ ██
                    (192.51  b … 192.79  b) 192.58  b █▁█▁████▁▁▁▁▁▁██▁█▁██
                   2.91 ipc ( 98.49% cache)  278.03 branch misses
         73.40k cycles 213.54k instructions   6.16k c-refs   92.76 c-misses

fast-equals                  871.31 µs/iter 905.90 µs     █     ▂          
                      (745.26 µs … 1.27 ms)   1.07 ms     █    ▆█          
                    (  8.05 mb …   8.05 mb)   8.05 mb ▁▁▁▆█▆▂▁▂██▄▃▂▂▂▂▂▁▁▁
                   3.74 ipc ( 96.25% cache)   1.11k branch misses
          3.55M cycles  13.27M instructions 340.48k c-refs  12.77k c-misses

dequal                        17.86 µs/iter  17.84 µs   █   █ █            
                      (17.54 µs … 18.67 µs)  18.26 µs ▅ █ ▅ █▅█ ▅         ▅
                    (  8.18  b …   8.42  b)   8.22  b █▁█▁█▁███▁█▁▁▁▁▁▁▁▁▁█
                   3.04 ipc ( 98.64% cache)  253.03 branch misses
         72.79k cycles 220.95k instructions   5.98k c-refs   81.45 c-misses

lodash.isEqual                 1.32 ms/iter   1.26 ms █                    
                        (1.22 ms … 2.51 ms)   2.28 ms █                    
                    ( 66.38 kb …   1.74 mb) 770.65 kb █▆▁▁▃▁▁▁▁▁▁▁▁▁▁▁▂▁▁▁▁
                   3.86 ipc ( 95.92% cache)   1.12k branch misses
          5.39M cycles  20.78M instructions 164.48k c-refs   6.72k c-misses

node.deepStrictEqual          20.88 µs/iter  20.95 µs          █           
                      (20.56 µs … 21.08 µs)  21.06 µs ▅        █▅▅ ▅▅▅▅▅  ▅
                    (343.89  b … 407.68  b) 353.51  b █▁▁▁▁▁▁▁▁███▁█████▁▁█
                   2.77 ipc ( 97.76% cache)  339.86 branch misses
         85.03k cycles 235.56k instructions   7.13k c-refs  159.77 c-misses

summary
  object-equals
   1.15x faster than dequal
   1.16x faster than are-deeply-equal
   1.35x faster than node.deepStrictEqual
   56.28x faster than fast-equals
   85.42x faster than lodash.isEqual

• Map with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                193.27 µs/iter 191.97 µs  █                   
                    (183.53 µs … 405.57 µs) 314.15 µs ▄█                   
                    (143.06 kb … 678.30 kb) 257.00 kb ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.92 ipc ( 78.42% cache)   3.98k branch misses
        792.42k cycles   1.52M instructions  94.36k c-refs  20.36k c-misses

are-deeply-equal             212.47 µs/iter 210.81 µs  █                   
                    (201.26 µs … 430.83 µs) 337.09 µs  █                   
                    ( 80.21 kb … 730.16 kb) 257.37 kb ▇█▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.97 ipc ( 80.10% cache)   4.06k branch misses
        868.03k cycles   1.71M instructions  94.61k c-refs  18.83k c-misses

fast-equals                   55.19 ms/iter  55.50 ms    █   █             
                      (54.82 ms … 55.61 ms)  55.59 ms ▅  █   █▅         ▅ ▅
                    (610.11 kb … 611.06 kb) 610.88 kb █▁▁█▁▁▁██▁▁▁▁▁▁▁▁▁█▁█
                   3.73 ipc ( 96.77% cache)  21.68k branch misses
        224.32M cycles 836.79M instructions  25.48M c-refs 821.83k c-misses

dequal                       206.12 µs/iter 205.15 µs  █                   
                    (196.95 µs … 378.30 µs) 320.51 µs  █                   
                    (376.00  b … 480.48 kb) 256.87 kb ▇█▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.08 ipc ( 81.24% cache)   3.96k branch misses
        848.90k cycles   1.76M instructions  85.35k c-refs  16.01k c-misses

lodash.isEqual                69.69 ms/iter  64.66 ms █                    
                     (63.92 ms … 114.56 ms)  76.55 ms █▅                   
                    (  6.00 mb …   6.20 mb)   6.02 mb ██▁▁▁▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▅
                   4.17 ipc ( 98.76% cache)  10.54k branch misses
        283.72M cycles   1.18G instructions   3.68M c-refs  45.51k c-misses

node.deepStrictEqual         217.35 µs/iter 216.75 µs  █                   
                    (208.11 µs … 372.12 µs) 332.90 µs  █                   
                    (155.61 kb … 688.30 kb) 257.53 kb ▇█▆▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.08 ipc ( 84.08% cache)   4.06k branch misses
        891.55k cycles   1.85M instructions  93.73k c-refs  14.92k c-misses

summary
  object-equals
   1.07x faster than dequal
   1.1x faster than are-deeply-equal
   1.12x faster than node.deepStrictEqual
   285.57x faster than fast-equals
   360.58x faster than lodash.isEqual

• Map with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                718.71 µs/iter 711.47 µs  █                   
                    (692.93 µs … 911.23 µs) 858.65 µs  █▅                  
                    (952.69 kb …   1.07 mb)   1.00 mb ▄██▄▂▁▁▁▂▂▂▁▁▁▁▁▂▂▁▁▁
                   1.86 ipc ( 74.97% cache)   9.27k branch misses
          2.97M cycles   5.54M instructions 302.71k c-refs  75.78k c-misses

are-deeply-equal             720.91 µs/iter 712.96 µs  ▇█                  
                      (692.78 µs … 1.01 ms) 865.71 µs  ██                  
                    (  1.00 mb …   1.00 mb)   1.00 mb ▃██▅▂▁▁▁▂▂▂▁▁▁▁▁▁▂▂▁▁
                   1.95 ipc ( 78.07% cache)   9.19k branch misses
          2.97M cycles   5.79M instructions 274.61k c-refs  60.22k c-misses

fast-equals                  900.82 ms/iter 902.39 ms     █  █             
                    (895.87 ms … 910.98 ms) 906.34 ms ▅ ▅ █▅ █ ▅  ▅ ▅     ▅
                    (  5.66 mb …  13.74 mb)   6.67 mb █▁█▁██▁█▁█▁▁█▁█▁▁▁▁▁█
                   3.75 ipc ( 96.62% cache) 213.38k branch misses
          3.67G cycles  13.77G instructions 441.36M c-refs  14.93M c-misses

dequal                       792.13 µs/iter 787.43 µs  ▃█                  
                      (766.51 µs … 1.12 ms) 934.10 µs  ██                  
                    (  1.00 mb …   1.00 mb)   1.00 mb ▂██▇▃▂▂▁▁▁▁▁▁▁▁▁▂▂▂▁▁
                   2.02 ipc ( 75.19% cache)   9.23k branch misses
          3.25M cycles   6.58M instructions 293.54k c-refs  72.84k c-misses

lodash.isEqual                  1.03 s/iter 958.41 ms     █       █        
                       (949.59 ms … 1.83 s) 961.39 ms ▅ ▅ █   ▅   █▅ ▅  ▅ ▅
                    ( 10.16 mb …  10.51 mb)  10.29 mb █▁█▁█▁▁▁█▁▁▁██▁█▁▁█▁█
                   4.42 ipc ( 98.80% cache)  52.59k branch misses
          4.18G cycles  18.49G instructions  56.16M c-refs 671.54k c-misses

node.deepStrictEqual         743.54 µs/iter 738.48 µs  ▅█                  
                      (718.32 µs … 1.00 ms) 882.18 µs  ██                  
                    (986.37 kb …   1.04 mb)   1.00 mb ▄██▇▃▂▁▁▁▁▁▁▁▁▁▁▂▂▂▂▁
                   2.00 ipc ( 77.95% cache)   9.36k branch misses
          3.06M cycles   6.11M instructions 256.17k c-refs  56.50k c-misses

summary
  object-equals
   1x faster than are-deeply-equal
   1.03x faster than node.deepStrictEqual
   1.1x faster than dequal
   1253.39x faster than fast-equals
   1431.19x faster than lodash.isEqual
```

</details>

### Nested Map with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 10.12 µs| 432.68 µs | 6.10 ms | 24.69 ms| 1.00x (baseline) |
| dequal | 10.75 µs| 449.33 µs | 6.45 ms | 25.63 ms| 1.06x–1.04x slower |
| are-deeply-equal | 13.00 µs | 502.71 µs | 7.13 ms | 30.31 ms | 1.28x–1.23x slower |
| node.deepStrictEqual | 22.31 µs | 789.74 µs | 9.27 ms | 37.78 ms | 2.20x–1.53x slower |
| fast-equals| 27.17 µs | 1.82 ms | 65.01 ms | 958.57 ms | 2.69x–38.82x slower |
| lodash.isEqual | 280.45 µs | 9.96 ms | 136.59 ms | 1.39 s| 27.72x–56.10x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.92 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Map with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                 10.12 µs/iter   9.88 µs   █                  
                      (9.17 µs … 219.70 µs)  14.86 µs  ▃█                  
                    (  1.91 kb … 364.15 kb)  21.28 kb ▁███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.98 ipc ( 98.49% cache)  166.04 branch misses
         43.10k cycles 128.61k instructions   2.80k c-refs   42.27 c-misses

are-deeply-equal              13.00 µs/iter  12.70 µs  █▂                  
                     (12.12 µs … 227.37 µs)  17.73 µs  ██                  
                    (  1.55 kb … 192.39 kb)  23.15 kb ▂██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.76 ipc ( 93.94% cache)  214.59 branch misses
         54.80k cycles 151.06k instructions   5.31k c-refs  321.62 c-misses

fast-equals                   27.17 µs/iter  25.40 µs █                    
                     (24.06 µs … 270.67 µs) 120.29 µs █                    
                    ( 16.21 kb … 470.71 kb) 203.67 kb █▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.93 ipc ( 94.35% cache)  192.71 branch misses
        111.69k cycles 438.53k instructions  10.90k c-refs  616.13 c-misses

dequal                        10.75 µs/iter  10.79 µs     █    █           
                      (10.62 µs … 10.99 µs)  10.87 µs ▅ ▅ █  ▅ █ ▅ ▅    ▅ ▅
                    (  1.00 kb …   2.07 kb)   1.09 kb █▁█▁█▁▁█▁█▁█▁█▁▁▁▁█▁█
                   3.24 ipc ( 98.07% cache)  127.39 branch misses
         44.13k cycles 143.01k instructions   2.43k c-refs   46.86 c-misses

lodash.isEqual               280.45 µs/iter 274.87 µs  █                   
                      (261.98 µs … 1.10 ms) 428.86 µs  █                   
                    (  9.95 kb …   2.00 mb) 531.67 kb ▂█▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.48 ipc ( 97.86% cache)   1.01k branch misses
          1.15M cycles   2.86M instructions 142.05k c-refs   3.04k c-misses

node.deepStrictEqual          22.31 µs/iter  21.90 µs  █▇                  
                     (21.11 µs … 233.78 µs)  28.72 µs  ██                  
                    (  2.34 kb … 204.73 kb)  28.56 kb ▂██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.63 ipc ( 97.39% cache)  269.39 branch misses
         92.99k cycles 244.70k instructions   6.04k c-refs  157.64 c-misses

summary
  object-equals
   1.06x faster than dequal
   1.28x faster than are-deeply-equal
   2.2x faster than node.deepStrictEqual
   2.69x faster than fast-equals
   27.72x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                432.68 µs/iter 431.57 µs   █                  
                    (412.03 µs … 618.71 µs) 552.61 µs  ▅█▅                 
                    (223.61 kb … 712.59 kb) 672.29 kb ▂███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▂▂▁
                   2.26 ipc ( 79.04% cache)  12.69k branch misses
          1.78M cycles   4.02M instructions 137.70k c-refs  28.86k c-misses

are-deeply-equal             502.71 µs/iter 493.26 µs  █                   
                    (476.54 µs … 745.84 µs) 701.28 µs  █                   
                    (728.80 kb … 753.23 kb) 730.80 kb ▆█▅▂▂▁▁▁▁▁▁▁▁▂▂▁▁▁▁▁▁
                   2.34 ipc ( 79.82% cache)  11.87k branch misses
          2.05M cycles   4.80M instructions 164.10k c-refs  33.11k c-misses

fast-equals                    1.82 ms/iter   1.83 ms       ▅█             
                        (1.65 ms … 2.21 ms)   2.08 ms       ██▃            
                    ( 14.10 mb …  14.10 mb)  14.10 mb ▂▅▄▂▂▇███▆▄▅▃▂▂▃▂▂▂▂▁
                   3.54 ipc ( 93.79% cache)   6.39k branch misses
          7.40M cycles  26.20M instructions 658.38k c-refs  40.90k c-misses

dequal                       449.33 µs/iter 444.00 µs  █                   
                    (423.83 µs … 769.25 µs) 649.01 µs  █▄                  
                    (633.82 kb … 712.63 kb) 672.56 kb ███▂▂▁▁▁▁▁▁▁▂▂▁▁▁▁▁▁▁
                   2.55 ipc ( 80.38% cache)  11.03k branch misses
          1.82M cycles   4.65M instructions 127.41k c-refs  24.99k c-misses

lodash.isEqual                 9.96 ms/iter  10.03 ms       █              
                       (9.77 ms … 10.30 ms)  10.29 ms   ▂▄ ▇█▂             
                    ( 43.77 kb …   1.69 mb) 620.18 kb ▅▆██████▃▁▆▅▃▆▃▅▃▅▃▁▅
                   2.63 ipc ( 98.24% cache)  26.88k branch misses
         40.92M cycles 107.57M instructions   4.24M c-refs  74.55k c-misses

node.deepStrictEqual         789.74 µs/iter 781.74 µs  █▂                  
                      (757.21 µs … 1.09 ms) 978.25 µs  ██                  
                    (878.21 kb … 884.29 kb) 878.35 kb ▄██▃▃▂▁▁▁▁▁▁▁▁▂▂▂▁▁▁▁
                   2.37 ipc ( 83.09% cache)  13.80k branch misses
          3.21M cycles   7.62M instructions 206.16k c-refs  34.85k c-misses

summary
  object-equals
   1.04x faster than dequal
   1.16x faster than are-deeply-equal
   1.83x faster than node.deepStrictEqual
   4.2x faster than fast-equals
   23.02x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  6.10 ms/iter   6.17 ms    █ ▃  ▃▆▄          
                        (5.85 ms … 6.48 ms)   6.46 ms   ▂█▇█ ▄███  ▂     ▄ 
                    (  5.25 mb …   5.25 mb)   5.25 mb ▃███████████▅█▅▃▁▆▅█▃
                   1.30 ipc ( 77.39% cache)  93.26k branch misses
         24.84M cycles  32.22M instructions   1.18M c-refs 267.12k c-misses

are-deeply-equal               7.13 ms/iter   7.24 ms             █        
                        (6.91 ms … 7.45 ms)   7.45 ms ▃██ ▅▃      █  █     
                    (  5.64 mb …   5.81 mb)   5.71 mb ██████▆▁▃▆███▆▄██▄▁▃▃
                   1.35 ipc ( 76.27% cache)  98.17k branch misses
         28.49M cycles  38.43M instructions   1.34M c-refs 318.76k c-misses

fast-equals                   65.01 ms/iter  65.52 ms ██ ██  ██  ██   █ █ █
                      (64.11 ms … 65.96 ms)  65.92 ms ██ ██  ██  ██   █ █ █
                    (948.66 kb … 951.16 kb) 950.11 kb ██▁██▁▁██▁▁██▁▁▁█▁█▁█
                   3.57 ipc ( 95.66% cache)  64.24k branch misses
        264.19M cycles 943.55M instructions  28.46M c-refs   1.23M c-misses

dequal                         6.45 ms/iter   6.54 ms  █▄▆▆       ▂        
                        (6.27 ms … 6.73 ms)   6.73 ms  █████   ▆▆██        
                    (  5.25 mb …   5.25 mb)   5.25 mb ▇██████▅▅████▃▅▇▅▇▅▇▇
                   1.41 ipc ( 76.52% cache)  93.35k branch misses
         26.36M cycles  37.21M instructions   1.15M c-refs 269.89k c-misses

lodash.isEqual               136.59 ms/iter 135.44 ms         █            
                    (134.54 ms … 151.80 ms) 136.09 ms         █   █        
                    (  5.07 mb …   5.45 mb)   5.19 mb █▁▁▁▁█████▁▁█▁▁▁▁▁▁▁█
                   3.31 ipc ( 98.01% cache) 228.95k branch misses
        554.21M cycles   1.83G instructions  34.81M c-refs 693.93k c-misses

node.deepStrictEqual           9.27 ms/iter   9.34 ms          █           
                        (9.02 ms … 9.60 ms)   9.56 ms   ▅  ▇▅▇██ ▂▅    ▂   
                    (  6.85 mb …   6.85 mb)   6.85 mb ▆▃█▆▃█████████▃▆▆█▃▃▃
                   1.62 ipc ( 82.56% cache) 110.09k branch misses
         37.87M cycles  61.23M instructions   1.84M c-refs 321.34k c-misses

summary
  object-equals
   1.06x faster than dequal
   1.17x faster than are-deeply-equal
   1.52x faster than node.deepStrictEqual
   10.65x faster than fast-equals
   22.38x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 24.69 ms/iter  24.84 ms █        █           
                      (24.43 ms … 25.00 ms)  24.97 ms ██    █  █  █    █  █
                    (  5.01 mb …   5.03 mb)   5.01 mb ██▁██▁████▁▁████▁██▁█
                   1.27 ipc ( 77.69% cache) 354.22k branch misses
        102.25M cycles 129.38M instructions   4.82M c-refs   1.08M c-misses

are-deeply-equal              30.31 ms/iter  30.39 ms   █                  
                      (30.10 ms … 30.58 ms)  30.58 ms   █    █ ██ █        
                    (  6.54 mb …   6.76 mb)   6.64 mb █▁██▁██████▁█▁██▁▁▁▁█
                   1.26 ipc ( 76.11% cache) 394.43k branch misses
        122.77M cycles 155.27M instructions   5.52M c-refs   1.32M c-misses

fast-equals                  958.57 ms/iter 957.98 ms      █  █            
                    (955.46 ms … 973.08 ms) 960.18 ms ▅▅  ▅█  █ ▅▅▅       ▅
                    (  6.97 mb …   9.77 mb)   7.37 mb ██▁▁██▁▁█▁███▁▁▁▁▁▁▁█
                   3.56 ipc ( 95.85% cache) 363.49k branch misses
          3.92G cycles  13.97G instructions 445.75M c-refs  18.52M c-misses

dequal                        25.63 ms/iter  25.74 ms       █ █            
                      (25.41 ms … 26.08 ms)  26.04 ms ███ █ █ █  █  █      
                    (  5.01 mb …   5.01 mb)   5.01 mb █████████▁▁██▁█▁▁▁▁▁█
                   1.40 ipc ( 77.16% cache) 360.70k branch misses
        106.64M cycles 148.85M instructions   4.50M c-refs   1.03M c-misses

lodash.isEqual                  1.39 s/iter    1.32 s          █ █         
                          (1.30 s … 2.14 s)    1.33 s ▅        █ █  ▅▅▅▅ ▅▅
                    (  9.84 mb …  47.74 mb)  18.60 mb █▁▁▁▁▁▁▁▁█▁█▁▁████▁██
                   3.82 ipc ( 97.06% cache) 990.81k branch misses
          5.65G cycles  21.57G instructions 181.11M c-refs   5.33M c-misses

node.deepStrictEqual          37.78 ms/iter  37.95 ms   █   █    █         
                      (37.23 ms … 38.37 ms)  38.29 ms ▅ █   █ ▅▅▅█  ▅  ▅▅ ▅
                    ( 11.41 mb …  11.43 mb)  11.42 mb █▁█▁▁▁█▁████▁▁█▁▁██▁█
                   1.58 ipc ( 82.75% cache) 420.53k branch misses
        155.10M cycles 245.42M instructions   7.27M c-refs   1.25M c-misses

summary
  object-equals
   1.04x faster than dequal
   1.23x faster than are-deeply-equal
   1.53x faster than node.deepStrictEqual
   38.82x faster than fast-equals
   56.1x faster than lodash.isEqual
```

</details>

### Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 131.17 ns | 3.65 µs | 43.09 µs| 245.27 µs | 1.00x (baseline) |
| dequal | 149.45 ns | 4.05 µs | 45.97 µs| 253.62 µs | 1.14x–1.03x slower |
| node.deepStrictEqual | 725.02 ns | 4.28 µs | 46.03 µs | 254.02 µs | 5.53x–1.04x slower |
| are-deeply-equal | 224.33 ns | 5.02 µs | 55.91 µs | 304.30 µs | 1.71x–1.24x slower |
| fast-equals | 500.14 ns | 225.84 µs | 13.77 ms| 219.61 ms | 3.81x–895.37x slower |
| lodash.isEqual | 3.65 µs | 414.45 µs | 25.98 ms| 390.28 ms | 27.81x–1591.23x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.97 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                131.17 ns/iter 131.28 ns   ▄█▄                
                    (127.64 ns … 305.55 ns) 145.31 ns   ███                
                    (  0.11  b … 726.13  b)   2.23  b ▁█████▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.21 ipc ( 91.06% cache)    0.01 branch misses
         539.05 cycles   2.27k instructions    0.21 c-refs    0.02 c-misses

are-deeply-equal             224.33 ns/iter 238.69 ns  █                   
                    (214.41 ns … 290.72 ns) 258.78 ns  ██                  
                    (863.34  b …   2.81 kb)   1.00 kb ▃██▃▂▁▁▁▁▁▁▆█▂▂▁▁▁▁▁▁
                   3.57 ipc ( 96.13% cache)    0.04 branch misses
         921.77 cycles   3.30k instructions   40.66 c-refs    1.57 c-misses

fast-equals                  500.14 ns/iter 501.11 ns ▇█                   
                    (493.93 ns … 596.50 ns) 544.35 ns ██▃▂                 
                    (145.59  b …   2.86 kb) 161.57  b ████▆▄▂▂▂▁▁▂▂▁▁▁▁▁▁▁▁
                   4.86 ipc ( 94.87% cache)    1.07 branch misses
          2.06k cycles  10.00k instructions    5.92 c-refs    0.30 c-misses

dequal                       149.45 ns/iter 150.54 ns       ▄▇█▄           
                    (141.54 ns … 261.07 ns) 161.99 ns       ████           
                    (  0.10  b … 668.47  b)   2.06  b ▃▆▄▄▃▆████▅▃▄▄▃▂▁▁▁▁▂
                   4.01 ipc ( 91.05% cache)    0.01 branch misses
         614.65 cycles   2.47k instructions    0.16 c-refs    0.01 c-misses

lodash.isEqual                 3.65 µs/iter   3.60 µs   ▆█                 
                      (3.41 µs … 180.58 µs)   4.61 µs   ██                 
                    (640.00  b … 594.12 kb)   3.12 kb ▂▄██▆▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.48 ipc ( 98.19% cache)   45.97 branch misses
         16.68k cycles  41.35k instructions   2.26k c-refs   40.89 c-misses

node.deepStrictEqual         725.02 ns/iter 720.00 ns     █                
                    (660.00 ns … 147.61 µs) 910.00 ns    ██▅               
                    (368.00  b … 381.26 kb) 408.03  b ▁▁▅███▅▂▂▂▁▁▁▁▁▁▁▁▁▁▁
                   1.82 ipc ( 99.80% cache)   30.12 branch misses
          4.48k cycles   8.16k instructions  723.16 c-refs    1.47 c-misses

summary
  object-equals
   1.14x faster than dequal
   1.71x faster than are-deeply-equal
   3.81x faster than fast-equals
   5.53x faster than node.deepStrictEqual
   27.81x faster than lodash.isEqual

• Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  3.65 µs/iter   3.66 µs          █▄▄         
                        (3.61 µs … 3.69 µs)   3.69 µs         ▅███  █      
                    (  0.10  b …   0.43  b)   0.13  b ▅▁██▅▅█████████▅█▅▁▁▅
                   3.66 ipc ( 99.96% cache)   30.53 branch misses
         14.98k cycles  54.82k instructions  468.38 c-refs    0.18 c-misses

are-deeply-equal               5.02 µs/iter   5.04 µs     █                
                        (4.96 µs … 5.14 µs)   5.12 µs     █▅  ▅            
                    (  1.67 kb …   1.68 kb)   1.68 kb ▅▅█████▁██▅█▅▅▁▁▁▁▅▅▅
                   3.39 ipc ( 97.50% cache)   34.07 branch misses
         20.57k cycles  69.69k instructions   1.62k c-refs   40.55 c-misses

fast-equals                  225.84 µs/iter 227.19 µs  ▃█                  
                    (222.74 µs … 362.92 µs) 236.21 µs  ██    ▂             
                    (  2.78 kb … 412.14 kb)   4.04 kb ▁███▆▃▄█▃▃▂▂▂▂▂▂▁▁▁▁▁
                   5.13 ipc ( 98.32% cache)  537.08 branch misses
        926.85k cycles   4.76M instructions   1.67k c-refs   27.94 c-misses

dequal                         4.05 µs/iter   4.05 µs       █ █            
                        (4.01 µs … 4.09 µs)   4.09 µs    ▅ ▅█ ██           
                    (  0.01  b …   0.40  b)   0.07  b ▅▅██▅█████▅▁▁▅▅▅█▁▅▁█
                   3.87 ipc ( 99.94% cache)   31.37 branch misses
         16.63k cycles  64.39k instructions  393.07 c-refs    0.26 c-misses

lodash.isEqual               414.45 µs/iter 400.46 µs  █                   
                    (381.85 µs … 892.58 µs) 828.81 µs ██                   
                    (  6.05 kb … 908.28 kb)  38.27 kb ██▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁
                   4.38 ipc ( 88.08% cache)  583.79 branch misses
          1.69M cycles   7.42M instructions   7.40k c-refs  882.22 c-misses

node.deepStrictEqual           4.28 µs/iter   4.34 µs   ██     █           
                        (4.18 µs … 4.43 µs)   4.39 µs █████ ████  █  █ █ █ 
                    (327.62  b … 399.71  b) 338.61  b ██████████████▁██████
                   3.71 ipc ( 99.78% cache)   22.15 branch misses
         17.63k cycles  65.39k instructions  845.63 c-refs    1.82 c-misses

summary
  object-equals
   1.11x faster than dequal
   1.17x faster than node.deepStrictEqual
   1.38x faster than are-deeply-equal
   61.89x faster than fast-equals
   113.57x faster than lodash.isEqual

• Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 43.09 µs/iter  43.19 µs      █               
                      (42.84 µs … 43.47 µs)  43.29 µs      █               
                    (  0.12  b …   0.43  b)   0.15  b █▁▁▁▁█▁█▁█▁█▁█▁█▁█▁▁█
                   2.51 ipc ( 95.87% cache)  997.33 branch misses
        176.74k cycles 442.88k instructions  21.50k c-refs  888.04 c-misses

are-deeply-equal              55.91 µs/iter  53.30 µs █                    
                     (51.05 µs … 310.25 µs) 143.86 µs █                    
                    (  5.55 kb … 390.27 kb) 171.40 kb █▅▂▁▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.41 ipc ( 93.09% cache)   1.16k branch misses
        230.63k cycles 555.46k instructions  30.87k c-refs   2.13k c-misses

fast-equals                   13.77 ms/iter  13.81 ms ██ ▄         █       
                      (13.71 ms … 13.90 ms)  13.88 ms ██▅█▅    █  ██       
                    ( 21.89 kb …  30.63 kb)  22.56 kb █████▁█▁▅█▅▁███▅▅▁▁▅▅
                   5.24 ipc ( 99.87% cache)   4.15k branch misses
         56.38M cycles 295.69M instructions   1.14M c-refs   1.54k c-misses

dequal                        45.97 µs/iter  46.06 µs                   █  
                      (45.41 µs … 46.42 µs)  46.11 µs            █     ██  
                    (  0.12  b …   0.40  b)   0.17  b █▁▁▁▁▁▁▁▁▁▁█▁█▁▁▁████
                   2.71 ipc ( 99.21% cache)   1.12k branch misses
        188.47k cycles 510.57k instructions  19.21k c-refs  151.72 c-misses

lodash.isEqual                25.98 ms/iter  25.78 ms █▂                   
                      (25.68 ms … 28.68 ms)  28.29 ms ██                   
                    (282.05 kb … 309.66 kb) 289.19 kb ██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▃
                   4.36 ipc ( 98.66% cache)   5.13k branch misses
        107.84M cycles 469.84M instructions 561.79k c-refs   7.50k c-misses

node.deepStrictEqual          46.03 µs/iter  46.06 µs   █                  
                      (45.55 µs … 47.09 µs)  46.81 µs   █ █ █              
                    (336.14  b … 400.93  b) 345.80  b █▁█▁█▁█▁█▁▁▁▁▁█▁▁▁▁▁█
                   2.61 ipc ( 95.97% cache)   1.06k branch misses
        189.13k cycles 493.63k instructions  22.21k c-refs  895.51 c-misses

summary
  object-equals
   1.07x faster than dequal
   1.07x faster than node.deepStrictEqual
   1.3x faster than are-deeply-equal
   319.5x faster than fast-equals
   602.81x faster than lodash.isEqual

• Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                245.27 µs/iter 244.80 µs █                    
                    (236.85 µs … 478.65 µs) 442.47 µs █▆                   
                    ( 48.00  b … 408.89 kb)   1.40 kb ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.72 ipc ( 77.68% cache)   8.08k branch misses
          1.00M cycles   1.73M instructions 101.72k c-refs  22.70k c-misses

are-deeply-equal             304.30 µs/iter 299.56 µs ▄█                   
                    (289.18 µs … 557.40 µs) 500.95 µs ██                   
                    (323.45 kb …   1.07 mb) 684.42 kb ██▂▁▁▁▁▁▁▁▁▂▂▁▁▁▁▁▁▁▁
                   1.77 ipc ( 77.07% cache)   8.35k branch misses
          1.24M cycles   2.20M instructions 129.21k c-refs  29.63k c-misses

fast-equals                  219.61 ms/iter 219.71 ms █ █                  
                    (218.37 ms … 222.39 ms) 222.37 ms █▅█▅▅▅ ▅  ▅         ▅
                    ( 85.90 kb … 168.91 kb) 120.46 kb ██████▁█▁▁█▁▁▁▁▁▁▁▁▁█
                   5.25 ipc ( 99.88% cache)  18.54k branch misses
        897.92M cycles   4.72G instructions  23.42M c-refs  27.70k c-misses

dequal                       253.62 µs/iter 255.18 µs  █▅                  
                    (248.59 µs … 447.26 µs) 275.26 µs  ██                  
                    ( 48.00  b … 351.29 kb)   1.49 kb ▂███▄▇▆▄▃▂▂▂▁▁▁▁▁▁▁▁▁
                   1.92 ipc ( 82.89% cache)   8.30k branch misses
          1.04M cycles   2.01M instructions  90.20k c-refs  15.43k c-misses

lodash.isEqual               390.28 ms/iter 390.62 ms █     █              
                    (387.09 ms … 400.25 ms) 393.40 ms █ ▅ ▅▅█  ▅ ▅   ▅    ▅
                    (  1.23 mb …   1.25 mb)   1.25 mb █▁█▁███▁▁█▁█▁▁▁█▁▁▁▁█
                   4.50 ipc ( 99.75% cache)  19.94k branch misses
          1.59G cycles   7.18G instructions  15.69M c-refs  39.77k c-misses

node.deepStrictEqual         254.02 µs/iter 256.15 µs   █▃                 
                    (249.16 µs … 379.30 µs) 267.08 µs   ██▇                
                    (384.00  b … 354.76 kb)   1.93 kb ▁▇███▆▂▂▅▅▅▄▃▂▂▂▂▂▂▁▁
                   1.83 ipc ( 81.99% cache)   8.45k branch misses
          1.05M cycles   1.92M instructions  98.53k c-refs  17.74k c-misses

summary
  object-equals
   1.03x faster than dequal
   1.04x faster than node.deepStrictEqual
   1.24x faster than are-deeply-equal
   895.37x faster than fast-equals
   1591.23x faster than lodash.isEqual
```

</details>

### Shuffled Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 138.97 ns | 3.65 µs | 54.13 µs | 291.07 µs | 1.00x (baseline) |
| dequal | 168.03 ns | 4.15 µs | 58.33 µs| 308.42 µs | 1.21x–1.06x slower |
| are-deeply-equal | 220.49 ns | 5.09 µs | 68.14 µs | 349.94 µs | 1.59x–1.20x slower |
| node.deepStrictEqual | 753.19 ns | 4.08 µs | 54.64 µs | 325.50 µs | 5.42x–1.12x slower |
| fast-equals| 954.15 ns | 582.00 µs | 43.52 ms | 741.70 ms | 6.87x–2548.17x slower |
| lodash.isEqual | 4.00 µs | 943.71 µs | 69.87 ms | 1.10 s | 28.78x–3771.73x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.92 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Shuffled Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                138.97 ns/iter 138.37 ns   ▄█                 
                    (133.46 ns … 288.53 ns) 163.91 ns   ██                 
                    (  0.11  b … 730.22  b)   2.40  b ▁▆██▆▂▁▁▂▂▁▁▁▁▁▁▁▁▁▂▁
                   4.08 ipc ( 89.07% cache)    0.01 branch misses
         571.36 cycles   2.33k instructions    0.20 c-refs    0.02 c-misses

are-deeply-equal             220.49 ns/iter 232.74 ns  ▇█                  
                    (207.24 ns … 272.98 ns) 261.29 ns  ██                  
                    (847.37  b …   2.82 kb)   1.00 kb ▃██▅▃▂▂▂▂▅█▅▃▂▂▂▂▂▁▂▁
                   3.52 ipc ( 95.21% cache)    0.05 branch misses
         903.16 cycles   3.18k instructions   34.95 c-refs    1.67 c-misses

fast-equals                  954.15 ns/iter 977.50 ns   █                  
                      (923.78 ns … 1.02 µs)   1.02 µs  ▅█▅                 
                    (145.57  b …   2.24 kb) 166.30  b ▆███▇▂▃▃▅▇▄▃▇█▅▄▃▁▂▄▂
                   4.33 ipc ( 93.85% cache)    2.07 branch misses
          3.88k cycles  16.81k instructions    6.50 c-refs    0.40 c-misses

dequal                       168.03 ns/iter 172.56 ns  █                   
                    (152.57 ns … 270.77 ns) 223.48 ns  █                   
                    (  0.10  b … 719.28  b)   2.08  b ▃█▅▃▅▃▂▁▂▂▁▅▃▂▂▂▁▁▁▁▁
                   3.75 ipc ( 90.41% cache)    0.01 branch misses
         686.09 cycles   2.57k instructions    0.19 c-refs    0.02 c-misses

lodash.isEqual                 4.00 µs/iter   3.92 µs  █                   
                      (3.76 µs … 204.43 µs)   5.72 µs  █▃                  
                    (640.00  b … 903.42 kb)   3.14 kb ▂██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.56 ipc ( 99.35% cache)   39.83 branch misses
         18.06k cycles  46.25k instructions   2.25k c-refs   14.68 c-misses

node.deepStrictEqual         753.19 ns/iter 740.00 ns    █                 
                    (690.00 ns … 171.29 µs) 980.00 ns    █                 
                    ( 96.00  b … 168.66 kb) 406.77  b ▁▄██▆▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   1.79 ipc ( 99.74% cache)   30.44 branch misses
          4.63k cycles   8.29k instructions  733.89 c-refs    1.91 c-misses

summary
  object-equals
   1.21x faster than dequal
   1.59x faster than are-deeply-equal
   5.42x faster than node.deepStrictEqual
   6.87x faster than fast-equals
   28.78x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  3.65 µs/iter   3.66 µs   █                  
                        (3.61 µs … 3.71 µs)   3.70 µs  ██  █ █▅▅ ▅ █       
                    (  0.10  b …   0.43  b)   0.13  b ███▅▅█████▅███▅▁▁▁▁▁█
                   3.73 ipc ( 99.96% cache)    3.70 branch misses
         14.96k cycles  55.81k instructions   1.01k c-refs    0.40 c-misses

are-deeply-equal               5.09 µs/iter   5.11 µs            ██   ▂   ▂
                        (4.98 µs … 5.27 µs)   5.17 µs      ▅▅▅   ██▅  █   █
                    (  1.52 kb …   1.68 kb)   1.67 kb ▇▇▁▇▁███▁▇▇███▇▁█▁▁▇█
                   3.46 ipc ( 97.99% cache)    6.65 branch misses
         20.75k cycles  71.90k instructions   2.30k c-refs   46.07 c-misses

fast-equals                  582.00 µs/iter 582.21 µs   █▅                 
                    (558.96 µs … 808.18 µs) 718.52 µs  ▂██                 
                    (  3.23 kb …   4.36 kb)   3.24 kb ▁███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.76 ipc ( 98.31% cache)  12.45k branch misses
          2.37M cycles   8.89M instructions   8.15k c-refs  137.96 c-misses

dequal                         4.15 µs/iter   4.22 µs   ▃█▃                
                        (3.99 µs … 4.46 µs)   4.44 µs ▇ ███▇▂▇ ▂ ▇  ▂      
                    (  0.01  b …   0.40  b)   0.07  b █▁██████▆█▆█▆▆█▆▁▁▁▁▆
                   3.81 ipc ( 99.90% cache)   11.19 branch misses
         16.96k cycles  64.64k instructions  380.00 c-refs    0.37 c-misses

lodash.isEqual               943.71 µs/iter 896.43 µs █                    
                      (869.79 µs … 1.77 ms)   1.59 ms ██                   
                    ( 32.58 kb … 753.88 kb)  35.20 kb ██▁▂▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▃▁
                   2.98 ipc ( 90.39% cache)  24.28k branch misses
          3.86M cycles  11.51M instructions  18.10k c-refs   1.74k c-misses

node.deepStrictEqual           4.08 µs/iter   4.11 µs    ██                
                        (4.03 µs … 4.16 µs)   4.16 µs    ██▅       ▅█      
                    (327.62  b … 399.41  b) 338.48  b ██▅████▁█▁▅█▅██▁▅▁▁▁█
                   3.80 ipc ( 99.82% cache)    3.84 branch misses
         16.68k cycles  63.45k instructions   1.13k c-refs    1.98 c-misses

summary
  object-equals
   1.12x faster than node.deepStrictEqual
   1.14x faster than dequal
   1.39x faster than are-deeply-equal
   159.56x faster than fast-equals
   258.72x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 54.13 µs/iter  53.99 µs   █                  
                     (52.22 µs … 107.93 µs)  63.37 µs   █▆                 
                    ( 48.00  b … 155.34 kb) 430.66  b ▁███▅▃▂▂▁▁▂▂▁▁▁▁▁▁▁▁▁
                   1.98 ipc ( 94.52% cache)   2.06k branch misses
        222.94k cycles 441.38k instructions  33.77k c-refs   1.85k c-misses

are-deeply-equal              68.14 µs/iter  66.43 µs █                    
                     (64.04 µs … 225.30 µs) 159.01 µs █                    
                    (  5.55 kb … 390.26 kb) 171.46 kb █▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.98 ipc ( 86.53% cache)   2.17k branch misses
        281.34k cycles 557.78k instructions  41.62k c-refs   5.61k c-misses

fast-equals                   43.52 ms/iter  43.59 ms     █  █    █        
                      (43.27 ms … 43.99 ms)  43.81 ms ▅▅▅ █  █ ▅  █     ▅ ▅
                    ( 21.89 kb …  30.20 kb)  22.38 kb ███▁█▁▁█▁█▁▁█▁▁▁▁▁█▁█
                   3.21 ipc ( 98.61% cache)   1.59M branch misses
        178.45M cycles 572.08M instructions   3.93M c-refs  54.66k c-misses

dequal                        58.33 µs/iter  57.98 µs   █                  
                     (55.71 µs … 134.92 µs)  74.09 µs  ▅█                  
                    ( 48.00  b … 155.30 kb) 418.66  b ▁██▆▂▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.13 ipc ( 97.38% cache)   2.21k branch misses
        240.98k cycles 512.22k instructions  32.06k c-refs  840.92 c-misses

lodash.isEqual                69.87 ms/iter  69.46 ms ██    █              
                      (68.53 ms … 76.49 ms)  71.36 ms ██ ▅ ▅█▅▅           ▅
                    (293.54 kb … 353.44 kb) 304.17 kb ██▁█▁████▁▁▁▁▁▁▁▁▁▁▁█
                   2.82 ipc ( 98.31% cache)   2.14M branch misses
        285.92M cycles 806.65M instructions   4.41M c-refs  74.75k c-misses

node.deepStrictEqual          54.64 µs/iter  54.64 µs   █                  
                     (52.23 µs … 120.91 µs)  66.27 µs   █                  
                    (384.00  b … 160.77 kb) 776.92  b ▁▆██▅▄▂▁▂▂▂▁▁▁▁▁▁▁▁▁▁
                   2.18 ipc ( 96.00% cache)   2.07k branch misses
        225.29k cycles 490.01k instructions  34.47k c-refs   1.38k c-misses

summary
  object-equals
   1.01x faster than node.deepStrictEqual
   1.08x faster than dequal
   1.26x faster than are-deeply-equal
   804.07x faster than fast-equals
   1290.9x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                291.07 µs/iter 292.44 µs   █▂                 
                    (283.06 µs … 505.29 µs) 318.59 µs  ▅██ ▃               
                    ( 48.00  b … 317.93 kb)   1.49 kb ▃██████▅▃▂▂▂▁▁▁▁▁▁▁▁▁
                   1.27 ipc ( 72.82% cache)  14.35k branch misses
          1.20M cycles   1.52M instructions  98.36k c-refs  26.74k c-misses

are-deeply-equal             349.94 µs/iter 347.58 µs  █                   
                    (336.21 µs … 534.63 µs) 471.87 µs  █                   
                    (323.49 kb … 971.64 kb) 683.63 kb ███▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.39 ipc ( 72.74% cache)  14.74k branch misses
          1.43M cycles   1.99M instructions 123.74k c-refs  33.73k c-misses

fast-equals                  741.70 ms/iter 744.72 ms       █              
                    (736.38 ms … 746.86 ms) 745.71 ms       █           █  
                    ( 85.90 kb … 168.91 kb) 120.46 kb █▁▁▁█▁█▁▁▁██▁▁█▁▁▁█▁█
                   3.00 ipc ( 86.56% cache)  32.21M branch misses
          3.03G cycles   9.11G instructions  92.87M c-refs  12.48M c-misses

dequal                       308.42 µs/iter 310.65 µs   ▃█                 
                    (300.72 µs … 415.33 µs) 332.12 µs   ██▅ ▂              
                    ( 48.00  b … 356.30 kb)   1.68 kb ▁▄███▇██▅▃▃▃▂▂▂▁▁▁▁▁▁
                   1.42 ipc ( 75.86% cache)  14.45k branch misses
          1.27M cycles   1.80M instructions  97.78k c-refs  23.61k c-misses

lodash.isEqual                  1.10 s/iter    1.10 s             █        
                          (1.09 s … 1.13 s)    1.10 s             █        
                    (  1.25 mb …   1.29 mb)   1.25 mb ███▁█▁██▁▁▁▁█▁█▁▁▁▁▁█
                   2.77 ipc ( 89.77% cache)  37.51M branch misses
          4.49G cycles  12.43G instructions  81.90M c-refs   8.37M c-misses

node.deepStrictEqual         325.50 µs/iter 328.06 µs   ▅█                 
                    (317.34 µs … 456.40 µs) 350.26 µs   ██▅  ▂             
                    (384.00  b … 353.55 kb)   2.25 kb ▂███████▆▄▄▃▂▂▂▁▁▁▁▁▁
                   1.43 ipc ( 74.76% cache)  14.49k branch misses
          1.34M cycles   1.92M instructions 119.43k c-refs  30.14k c-misses

summary
  object-equals
   1.06x faster than dequal
   1.12x faster than node.deepStrictEqual
   1.2x faster than are-deeply-equal
   2548.17x faster than fast-equals
   3771.73x faster than lodash.isEqual
```

</details>

### Nested Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 5.25 µs | 211.19 µs | 1.78 ms | 10.47 ms | 1.00x (baseline) |
| are-deeply-equal | 8.79 µs | 315.58 µs | 3.30 ms | 17.11 ms | 1.67x–1.63x slower |
| fast-equals| 9.27 µs | 513.77 µs | 16.66 ms| 236.35 ms | 1.77x–22.58x slower |
| node.deepStrictEqual | 14.91 µs | 519.49 µs | 4.73 ms | 25.11 ms | 2.84x–2.40x slower |
| lodash.isEqual | 62.82 µs | 2.43 ms | 48.82 ms | 615.08 ms | 11.96x–58.77x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.94 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  5.25 µs/iter   5.16 µs  █                   
                      (4.90 µs … 172.90 µs)   8.91 µs  █                   
                    (  2.98 kb … 392.13 kb)   3.59 kb ▂█▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.90 ipc ( 99.33% cache)   66.55 branch misses
         23.21k cycles  67.33k instructions   1.22k c-refs    8.21 c-misses

are-deeply-equal               8.79 µs/iter   8.81 µs       ██ █  ██       
                        (8.73 µs … 8.87 µs)   8.86 µs ▅▅ ▅  ██ █  ██    ▅ ▅
                    (  1.51 kb …   3.79 kb)   1.70 kb ██▁█▁▁██▁█▁▁██▁▁▁▁█▁█
                   2.84 ipc ( 97.09% cache)   52.35 branch misses
         36.26k cycles 103.02k instructions   2.15k c-refs   62.49 c-misses

fast-equals                    9.27 µs/iter   9.13 µs  █                   
                      (8.93 µs … 154.20 µs)  13.40 µs ▄█                   
                    (  2.49 kb … 317.13 kb)   2.74 kb ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.48 ipc ( 99.18% cache)   72.31 branch misses
         39.81k cycles 178.32k instructions   1.64k c-refs   13.55 c-misses

lodash.isEqual                62.82 µs/iter  61.11 µs  █                   
                     (58.68 µs … 394.61 µs) 111.78 µs  █                   
                    (408.00  b … 966.99 kb)  57.72 kb ██▂▂▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.64 ipc ( 99.01% cache)  362.48 branch misses
        259.62k cycles 685.83k instructions  33.29k c-refs  330.52 c-misses

node.deepStrictEqual          14.91 µs/iter  14.65 µs  █                   
                     (14.23 µs … 169.05 µs)  20.13 µs  █                   
                    (  1.17 kb … 451.84 kb)  11.70 kb ▃█▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.56 ipc ( 97.58% cache)   97.62 branch misses
         63.10k cycles 161.54k instructions   5.55k c-refs  134.28 c-misses

summary
  object-equals
   1.67x faster than are-deeply-equal
   1.77x faster than fast-equals
   2.84x faster than node.deepStrictEqual
   11.96x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                211.19 µs/iter 212.08 µs   █▃▂                
                    (202.44 µs … 379.76 µs) 247.00 µs  ▃███                
                    ( 20.63 kb … 523.88 kb) 102.79 kb ▂█████▆▃▂▂▁▁▁▁▁▁▁▁▁▁▁
                   2.41 ipc ( 76.95% cache)   5.14k branch misses
        866.87k cycles   2.09M instructions  43.39k c-refs  10.00k c-misses

are-deeply-equal             315.58 µs/iter 312.44 µs  █                   
                    (298.79 µs … 538.88 µs) 439.65 µs  ██                  
                    (300.36 kb …   1.21 mb) 673.62 kb ▂██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁▁
                   2.47 ipc ( 80.87% cache)   4.71k branch misses
          1.29M cycles   3.19M instructions  76.70k c-refs  14.67k c-misses

fast-equals                  513.77 µs/iter 514.13 µs  ▃█                  
                    (503.04 µs … 946.86 µs) 563.83 µs  ███▃                
                    (  7.48 kb … 150.54 kb)  78.54 kb ▅████▆▄▃▂▁▁▁▁▁▁▁▁▁▁▁▁
                   4.84 ipc ( 80.90% cache)   2.10k branch misses
          2.10M cycles  10.19M instructions  43.43k c-refs   8.30k c-misses

lodash.isEqual                 2.43 ms/iter   2.41 ms  █                   
                        (2.37 ms … 4.64 ms)   2.80 ms  █                   
                    (954.02 kb …   2.48 mb)   1.70 mb ▆█▆▂▁▁▂▃▂▂▁▁▁▁▁▁▁▁▁▁▁
                   2.99 ipc ( 98.30% cache)  10.31k branch misses
         10.01M cycles  29.88M instructions 975.59k c-refs  16.55k c-misses

node.deepStrictEqual         519.49 µs/iter 518.11 µs  █▂                  
                    (502.00 µs … 756.18 µs) 661.15 µs  ██                  
                    (261.20 kb …   1.30 mb) 340.44 kb ▅██▄▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.33 ipc ( 91.46% cache)   8.78k branch misses
          2.13M cycles   4.97M instructions 116.59k c-refs   9.96k c-misses

summary
  object-equals
   1.49x faster than are-deeply-equal
   2.43x faster than fast-equals
   2.46x faster than node.deepStrictEqual
   11.51x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  1.78 ms/iter   1.79 ms   █                  
                        (1.73 ms … 2.16 ms)   2.02 ms  ██▆                 
                    (827.45 kb … 842.06 kb) 833.30 kb ▂████▄▃▂▂▁▂▁▂▂▁▂▂▁▂▁▁
                   2.29 ipc ( 85.92% cache)  47.84k branch misses
          7.31M cycles  16.74M instructions 367.89k c-refs  51.81k c-misses

are-deeply-equal               3.30 ms/iter   3.44 ms  █▇▂▃                
                        (3.09 ms … 3.84 ms)   3.62 ms  ████▄▅     ▇▅▆▃▂    
                    (  5.24 mb …   5.34 mb)   5.25 mb ▅███████▅▂▅██████▆▄▂▃
                   1.96 ipc ( 84.23% cache)  44.07k branch misses
         13.00M cycles  25.49M instructions 661.21k c-refs 104.24k c-misses

fast-equals                   16.66 ms/iter  16.75 ms   ███ ▂     ▂█       
                      (16.46 ms … 17.06 ms)  16.94 ms ▅ ███▅█  ▅ ▅██    ▅ ▅
                    (624.59 kb … 644.20 kb) 625.42 kb █▇█████▇▇█▁███▁▇▁▁█▁█
                   5.09 ipc ( 96.03% cache)  16.71k branch misses
         67.95M cycles 345.76M instructions   2.02M c-refs  80.37k c-misses

lodash.isEqual                48.82 ms/iter  48.89 ms     █                
                      (48.56 ms … 49.26 ms)  49.10 ms ▅ ▅ █▅▅    ▅▅  ▅    ▅
                    ( 13.62 mb …  13.76 mb)  13.67 mb █▁█▁███▁▁▁▁██▁▁█▁▁▁▁█
                   3.66 ipc ( 98.11% cache)  85.41k branch misses
        203.03M cycles 743.73M instructions   9.15M c-refs 173.13k c-misses

node.deepStrictEqual           4.73 ms/iter   4.78 ms  █▅▇                 
                        (4.58 ms … 5.37 ms)   5.14 ms  ███▄▄▂              
                    (  2.63 mb …   7.53 mb)   2.67 mb ▆██████▇▅▆▇▃▅▄▄▄▂▂▁▁▂
                   2.14 ipc ( 89.06% cache)  77.91k branch misses
         19.54M cycles  41.72M instructions   1.04M c-refs 113.60k c-misses

summary
  object-equals
   1.85x faster than are-deeply-equal
   2.65x faster than node.deepStrictEqual
   9.34x faster than fast-equals
   27.36x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 10.47 ms/iter  10.53 ms        ▅▅█           
                      (10.26 ms … 10.79 ms)  10.71 ms   ▃▃▆ ▆███▆▆█     ▃  
                    (  3.23 mb …   3.26 mb)   3.24 mb ▄████▄████████▄█▄██▄▄
                   1.56 ipc ( 84.15% cache) 185.65k branch misses
         43.09M cycles  67.21M instructions   1.61M c-refs 254.75k c-misses

are-deeply-equal              17.11 ms/iter  17.14 ms   ▄ ▄█▄              
                      (16.94 ms … 17.43 ms)  17.40 ms   █ ███              
                    (  4.47 mb …   5.30 mb)   4.97 mb ▅██████▅▁█▁▁▁▁█▁▅▅▅▅█
                   1.53 ipc ( 80.98% cache) 175.75k branch misses
         67.26M cycles 103.12M instructions   2.82M c-refs 535.91k c-misses

fast-equals                  236.35 ms/iter 236.74 ms             █        
                    (235.23 ms … 237.44 ms) 237.32 ms ▅▅ ▅ ▅     ▅█▅▅▅    ▅
                    (  2.44 mb …   2.52 mb)   2.50 mb ██▁█▁█▁▁▁▁▁█████▁▁▁▁█
                   5.18 ipc ( 98.72% cache)  67.75k branch misses
        966.14M cycles   5.01G instructions  34.97M c-refs 448.63k c-misses

lodash.isEqual               615.08 ms/iter 587.43 ms    █                 
                    (583.80 ms … 932.17 ms) 588.90 ms ▅ ▅█     ▅ ▅▅▅▅   ▅ ▅
                    (  7.07 mb …   7.26 mb)   7.14 mb █▁██▁▁▁▁▁█▁████▁▁▁█▁█
                   4.04 ipc ( 98.03% cache) 365.55k branch misses
          2.51G cycles  10.12G instructions  58.64M c-refs   1.15M c-misses

node.deepStrictEqual          25.11 ms/iter  25.15 ms       █              
                      (24.88 ms … 25.52 ms)  25.49 ms ▂   ▇ █ ▂▇▂          
                    ( 10.52 mb …  14.94 mb)  10.97 mb █▁▆▆█▆█▁███▁▁▆▁▁▆▁▁▁▆
                   1.87 ipc ( 90.11% cache) 303.78k branch misses
        103.43M cycles 193.35M instructions   6.05M c-refs 597.90k c-misses

summary
  object-equals
   1.63x faster than are-deeply-equal
   2.4x faster than node.deepStrictEqual
   22.58x faster than fast-equals
   58.77x faster than lodash.isEqual
```

</details>

> [!NOTE]
> `dequal` is excluded from the test because it returns an incorrect result. An issue has been opened on the official GitHub repository: [https://github.com/lukeed/dequal/issues/31](https://github.com/lukeed/dequal/issues/31).

### Shuffled nested Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 82.81 ns | 50.54 ns | 22.36 ns | 30.69 ns | 1.00x (baseline) |
| are-deeply-equal | 395.76 ns | 5.55 µs | 63.64 ns| 73.85 ns | 4.78x–2.41x slower |
| fast-equals | 1.28 µs | 161.68 µs | 98.77 µs| 225.48 µs | 15.41x–7346.10x slower |
| lodash.isEqual | 42.29 µs| 2.94 ms | 1.88 ms | 4.07 ms | 510.71x–132455.08x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.92 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Shuffled nested Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                 82.81 ns/iter  83.80 ns    ▇█                
                     (70.33 ns … 253.40 ns) 127.89 ns   ▄███               
                    ( 45.27  b … 545.63  b) 185.08  b ▁▄████▄▁▂▁▂▂▂▂▁▁▁▁▁▁▁
                   3.39 ipc ( 95.44% cache)    0.02 branch misses
         338.51 cycles   1.15k instructions    6.42 c-refs    0.29 c-misses

are-deeply-equal             395.76 ns/iter 400.30 ns   █                  
                    (381.07 ns … 472.69 ns) 448.24 ns  ▂█▅                 
                    (719.55  b …   1.48 kb) 882.46  b ▄███▄▂▂▁▂▅▅▄▂▂▁▁▁▁▁▁▁
                   2.94 ipc ( 94.40% cache)    0.07 branch misses
          1.62k cycles   4.76k instructions   31.72 c-refs    1.78 c-misses

fast-equals                    1.28 µs/iter   1.29 µs   █▃                 
                        (1.26 µs … 1.35 µs)   1.32 µs  ▆██▃ ▆              
                    (753.86  b …   2.33 kb) 776.86  b ███████▄▅▇▆█▄▄▄▃▁▃▁▂▂
                   4.21 ipc ( 94.51% cache)    4.54 branch misses
          5.21k cycles  21.95k instructions   28.73 c-refs    1.58 c-misses

lodash.isEqual                42.29 µs/iter  41.87 µs           █          
                     (31.13 µs … 245.00 µs)  51.04 µs           ██         
                    (  1.20 kb … 662.96 kb)  14.88 kb ▁▁▁▁▁▁▁▁▁▁██▂▂▂▂▂▁▁▁▁
                   2.62 ipc ( 99.34% cache)  184.09 branch misses
        175.47k cycles 459.40k instructions  19.03k c-refs  125.28 c-misses

summary
  object-equals
   4.78x faster than are-deeply-equal
   15.41x faster than fast-equals
   510.71x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 50.54 ns/iter  49.83 ns ▆█                   
                      (47.99 ns … 87.92 ns)  75.47 ns ██                   
                    ( 21.25  b … 264.21  b) 184.11  b ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▁▁
                   4.10 ipc ( 95.69% cache)    0.01 branch misses
         206.18 cycles  844.58 instructions    6.34 c-refs    0.27 c-misses

are-deeply-equal               5.55 µs/iter   5.59 µs    █ ██              
                        (5.48 µs … 5.67 µs)   5.63 µs  █ █ ██   █ █  █ █   
                    (  2.56 kb …   2.57 kb)   2.56 kb ██▁█▁██▁▁▁████████▁██
                   3.34 ipc ( 94.70% cache)   56.27 branch misses
         22.73k cycles  75.99k instructions   1.03k c-refs   54.49 c-misses

fast-equals                  161.68 µs/iter 160.93 µs  █                   
                    (154.85 µs … 363.38 µs) 238.52 µs  █                   
                    ( 10.44 kb … 488.94 kb)  99.04 kb ▆█▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.24 ipc ( 83.57% cache)   4.67k branch misses
        663.14k cycles   2.15M instructions  26.77k c-refs   4.40k c-misses

lodash.isEqual                 2.94 ms/iter   2.95 ms   ▆█                 
                        (2.85 ms … 3.50 ms)   3.28 ms  ▇██▃▂               
                    (629.63 kb …   1.92 mb)   1.25 mb ▃█████▃▂▃▄▃▄▂▃▁▁▁▁▁▁▁
                   2.67 ipc ( 98.93% cache)  15.50k branch misses
         12.00M cycles  32.10M instructions   1.18M c-refs  12.54k c-misses

summary
  object-equals
   109.86x faster than are-deeply-equal
   3198.69x faster than fast-equals
   58179.31x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 22.36 ns/iter  22.04 ns █                    
                      (20.96 ns … 74.44 ns)  47.36 ns █▅                   
                    ( 18.91  b …  93.99  b)  32.18  b ██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.25 ipc ( 95.97% cache)    0.01 branch misses
          91.07 cycles  387.25 instructions    1.15 c-refs    0.05 c-misses

are-deeply-equal              63.64 ns/iter  61.71 ns  █                   
                     (58.65 ns … 143.69 ns)  98.59 ns  █                   
                    ( 20.87  b … 706.15  b) 312.45  b ██▆▂▁▁▁▁▁▁▁▁▁▂▂▂▁▁▁▁▁
                   3.26 ipc ( 95.29% cache)    0.02 branch misses
         258.69 cycles  842.47 instructions   10.78 c-refs    0.51 c-misses

fast-equals                   98.77 µs/iter  97.99 µs  █                   
                     (96.13 µs … 247.89 µs) 116.24 µs  █▂                  
                    ( 16.45 kb … 211.25 kb)  25.73 kb ▂██▂▂▂▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.01 ipc ( 92.57% cache)   3.60k branch misses
        404.15k cycles   1.22M instructions  11.77k c-refs  874.74 c-misses

lodash.isEqual                 1.88 ms/iter   1.89 ms     ▂█▃              
                        (1.82 ms … 2.08 ms)   2.04 ms    ▆███              
                    (183.44 kb … 550.34 kb) 230.80 kb ▃▆██████▃▁▂▂▂▁▁▁▁▁▂▁▁
                   2.76 ipc ( 98.45% cache)   8.95k branch misses
          7.68M cycles  21.19M instructions 502.49k c-refs   7.79k c-misses

summary
  object-equals
   2.85x faster than are-deeply-equal
   4416.41x faster than fast-equals
   83846.6x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 30.69 ns/iter  30.84 ns  ▄█                  
                     (28.67 ns … 102.41 ns)  43.92 ns  ██                  
                    (  8.10  b …  80.13  b)  32.20  b ▂███▆▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.68 ipc ( 96.15% cache)    0.01 branch misses
         125.27 cycles  460.55 instructions    1.16 c-refs    0.04 c-misses

are-deeply-equal              73.85 ns/iter  72.77 ns   █                  
                     (66.37 ns … 134.10 ns) 108.27 ns  ▃█▇                 
                    ( 30.87  b … 408.22  b) 312.01  b ▁███▅▂▁▁▁▁▁▁▁▁▁▂▂▂▂▁▁
                   3.12 ipc ( 94.95% cache)    0.02 branch misses
         301.12 cycles  940.99 instructions   10.92 c-refs    0.55 c-misses

fast-equals                  225.48 µs/iter 226.02 µs  █                   
                    (218.36 µs … 397.15 µs) 284.54 µs  █▂                  
                    (192.00  b … 451.98 kb) 128.16 kb ▃██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.95 ipc ( 79.69% cache)   8.46k branch misses
        920.93k cycles   2.72M instructions  32.29k c-refs   6.56k c-misses

lodash.isEqual                 4.07 ms/iter   4.08 ms    ▇ ▆█              
                        (3.99 ms … 4.44 ms)   4.27 ms  ▂▂████▅             
                    (428.90 kb …   1.20 mb) 635.44 kb ▅████████▅▂▁▂▁▂▁▃▂▁▃▂
                   2.80 ipc ( 99.07% cache)  21.69k branch misses
         16.67M cycles  46.60M instructions   1.14M c-refs  10.64k c-misses

summary
  object-equals
   2.41x faster than are-deeply-equal
   7346.1x faster than fast-equals
   132455.08x faster than lodash.isEqual
```

</details>

> [!NOTE]
> `dequal` is excluded from the test because it returns an incorrect result. An issue has been opened on the official GitHub repository: [https://github.com/lukeed/dequal/issues/31](https://github.com/lukeed/dequal/issues/31).

> [!NOTE]
> `node.deepStrictEqual` is excluded due to excessive memory usage, causing a "JavaScript heap out of memory" crash at size=4096 and beyond. This is likely due to inefficient handling of deeply nested, shuffled structures, leading to unsustainable memory demands (e.g., creating large temporary arrays during comparison). Increasing the heap limit (e.g., `--max-old-space-size=8192`) could mitigate this, but it compromises reproducibility across systems.

### Typed Array

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 17.79 ns| 81.63 ns| 104.31 ns | 288.16 ns | 1.00x (baseline) |
| dequal | 18.19 ns| 360.50 ns | 2.79 µs | 11.06 µs | 1.02x–38.38x slower |
| fast-equals | 21.07 ns| 367.70 ns | 2.78 µs | 11.11 µs | 1.18x–38.55x slower |
| are-deeply-equal | 41.92 ns| 326.14 ns | 2.31 µs | 9.18 µs | 2.36x–31.84x slower |
| node.deepStrictEqual | 845.00 ns | 575.63 ns | 612.29 ns | 828.18 ns | 47.49x–2.87x slower |
| lodash.isEqual | 2.03 µs | 3.07 µs | 14.18 µs | 51.04 µs | 114.25x–177.14x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.90 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Typed Array [size=16]
------------------------------------------- -------------------------------
object-equals                 17.79 ns/iter  17.59 ns ▄█                   
                      (17.42 ns … 89.00 ns)  21.24 ns ██                   
                    (  0.11  b …  57.30  b)   0.20  b ██▄▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.46 ipc ( 94.80% cache)    0.01 branch misses
          73.25 cycles  399.83 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              41.92 ns/iter  40.76 ns  █                   
                     (38.86 ns … 123.26 ns)  67.54 ns  █                   
                    ( 40.45  b … 254.81  b) 184.21  b ▇█▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.07 ipc ( 95.68% cache)    0.01 branch misses
         171.23 cycles  696.60 instructions    6.33 c-refs    0.27 c-misses

fast-equals                   21.07 ns/iter  20.82 ns █                    
                      (20.38 ns … 72.93 ns)  26.41 ns █▄                   
                    (  0.10  b …  64.14  b)   0.22  b ██▆▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.26 ipc ( 96.92% cache)    0.01 branch misses
          85.88 cycles  451.87 instructions    0.05 c-refs    0.00 c-misses

dequal                        18.19 ns/iter  17.80 ns █                    
                      (17.64 ns … 74.44 ns)  23.33 ns ██                   
                    (  0.10  b …  53.73  b)   0.19  b ██▁▂▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.47 ipc ( 97.25% cache)    0.01 branch misses
          74.05 cycles  405.20 instructions    0.04 c-refs    0.00 c-misses

lodash.isEqual                 2.03 µs/iter   2.05 µs              █       
                        (1.85 µs … 2.12 µs)   2.11 µs             ▅█▇      
                    (482.71  b … 992.39  b) 736.88  b ▂▁▁▁▁▁▁▁▁▂▂▂█████▇▂▂▃
                   2.63 ipc ( 99.63% cache)    5.89 branch misses
          8.30k cycles  21.83k instructions  778.37 c-refs    2.87 c-misses

node.deepStrictEqual         845.00 ns/iter 840.00 ns      █               
                    (710.00 ns … 208.55 µs)   1.13 µs      ██              
                    (512.00  b … 240.38 kb) 551.15  b ▁▁▁▁███▄▃▂▂▂▂▁▁▁▁▁▁▁▁
                   1.59 ipc ( 99.73% cache)   30.39 branch misses
          4.97k cycles   7.90k instructions  905.85 c-refs    2.44 c-misses

summary
  object-equals
   1.02x faster than dequal
   1.18x faster than fast-equals
   2.36x faster than are-deeply-equal
   47.49x faster than node.deepStrictEqual
   114.25x faster than lodash.isEqual

• Typed Array [size=512]
------------------------------------------- -------------------------------
object-equals                 81.63 ns/iter  80.30 ns  █                   
                     (76.73 ns … 228.54 ns) 120.73 ns  █                   
                    ( 31.75  b … 310.52  b) 208.11  b ▃██▂▁▁▁▁▁▁▁▁▂▁▁▁▁▁▁▁▁
                   3.23 ipc ( 95.35% cache)    0.02 branch misses
         332.93 cycles   1.08k instructions    7.22 c-refs    0.34 c-misses

are-deeply-equal             326.14 ns/iter 323.01 ns  █                   
                    (315.31 ns … 546.56 ns) 385.10 ns  █                   
                    (118.70  b … 350.28  b) 184.40  b ▂█▇▂▂▂▁▂▂▂▂▁▁▁▁▁▁▁▁▁▁
                   6.11 ipc ( 94.36% cache)    1.03 branch misses
          1.33k cycles   8.14k instructions    6.66 c-refs    0.38 c-misses

fast-equals                  367.70 ns/iter 363.90 ns █                    
                    (358.17 ns … 618.19 ns) 529.10 ns █▇                   
                    (  0.01  b … 156.22  b)   0.75  b ██▃▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.91 ipc ( 85.72% cache)    1.01 branch misses
          1.50k cycles   8.89k instructions    0.21 c-refs    0.03 c-misses

dequal                       360.50 ns/iter 361.46 ns     ▇█▂              
                    (355.69 ns … 394.51 ns) 371.35 ns   █▇███▇▅            
                    (  0.01  b … 210.37  b)   1.04  b ▂▃███████▆▅▃▃▃▂▂▂▃▁▁▁
                   6.01 ipc ( 88.53% cache)    1.01 branch misses
          1.47k cycles   8.84k instructions    0.17 c-refs    0.02 c-misses

lodash.isEqual                 3.07 µs/iter   3.08 µs  ▂█                  
                        (3.01 µs … 3.27 µs)   3.23 µs  ██▃ ▅               
                    (727.86  b … 761.04  b) 736.69  b ▅███▃██▃▇▃▃▅▁▁▁▁▃▃▁▃▃
                   3.51 ipc ( 99.54% cache)    5.73 branch misses
         12.76k cycles  44.81k instructions  810.24 c-refs    3.70 c-misses

node.deepStrictEqual         575.63 ns/iter 578.64 ns      █▅▅             
                    (547.26 ns … 659.99 ns) 630.43 ns    ▅████             
                    ( 79.49  b … 730.54  b) 480.61  b ▂▄██████▇▅▁▄▅▇▄▂▃▁▁▂▁
                   2.50 ipc ( 99.39% cache)    0.13 branch misses
          2.35k cycles   5.86k instructions  188.23 c-refs    1.14 c-misses

summary
  object-equals
   4x faster than are-deeply-equal
   4.42x faster than dequal
   4.5x faster than fast-equals
   7.05x faster than node.deepStrictEqual
   37.58x faster than lodash.isEqual

• Typed Array [size=4096]
------------------------------------------- -------------------------------
object-equals                104.31 ns/iter 103.72 ns  ▅█                  
                    (100.05 ns … 139.11 ns) 130.87 ns  ██                  
                    ( 51.41  b … 296.19  b) 208.08  b ▇███▃▂▁▁▁▁▁▁▁▁▁▁▁▂▂▁▁
                   3.66 ipc ( 95.18% cache)    0.02 branch misses
         425.02 cycles   1.55k instructions    7.54 c-refs    0.36 c-misses

are-deeply-equal               2.31 µs/iter   2.31 µs   █                  
                        (2.29 µs … 2.35 µs)   2.35 µs  ██▃█  ▆▆            
                    (175.70  b … 184.46  b) 183.92  b ▅████▇▅███▁▅▃▃▁▃▅▅▁▃▅
                   6.58 ipc ( 93.39% cache)    1.04 branch misses
          9.41k cycles  61.91k instructions    7.76 c-refs    0.51 c-misses

fast-equals                    2.78 µs/iter   2.79 µs  ██    ▂             
                        (2.77 µs … 2.82 µs)   2.82 µs  ██  ▃ █             
                    (  0.01  b …   0.39  b)   0.05  b ████████▃▁▃▁▁▁▁▁▁▁▁▁▃
                   6.15 ipc ( 84.42% cache)    1.03 branch misses
         11.35k cycles  69.83k instructions    0.74 c-refs    0.11 c-misses

dequal                         2.79 µs/iter   2.80 µs   █                  
                        (2.77 µs … 2.89 µs)   2.83 µs  ▃██                 
                    (  0.01  b …   0.37  b)   0.05  b ██████▅▃▁▇▅▁▅▅▅▇▃▁▁▃▃
                   6.13 ipc ( 79.81% cache)    1.04 branch misses
         11.38k cycles  69.79k instructions    1.21 c-refs    0.24 c-misses

lodash.isEqual                14.18 µs/iter  14.01 µs  █                   
                     (13.71 µs … 173.32 µs)  20.83 µs  █                   
                    (784.00  b … 353.45 kb)   1.02 kb ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.26 ipc ( 98.81% cache)   35.22 branch misses
         59.49k cycles 253.26k instructions   1.80k c-refs   21.38 c-misses

node.deepStrictEqual         612.29 ns/iter 615.73 ns       █▆▆▆           
                    (585.80 ns … 660.12 ns) 650.50 ns     ▃█████           
                    ( 79.49  b … 762.21  b) 480.65  b ▃▁▄▅██████▅▇▃▅▄▄▂▃▄▂▃
                   2.53 ipc ( 99.43% cache)    0.12 branch misses
          2.50k cycles   6.33k instructions  210.05 c-refs    1.19 c-misses

summary
  object-equals
   5.87x faster than node.deepStrictEqual
   22.14x faster than are-deeply-equal
   26.67x faster than fast-equals
   26.74x faster than dequal
   135.91x faster than lodash.isEqual

• Typed Array [size=16386]
------------------------------------------- -------------------------------
object-equals                288.16 ns/iter 286.78 ns ██                   
                    (283.39 ns … 336.05 ns) 321.50 ns ██▂                  
                    ( 48.18  b … 328.44  b) 207.93  b ███▄▂▁▁▂▁▁▁▁▁▁▂▂▁▂▂▁▁
                   2.71 ipc ( 99.91% cache)    1.02 branch misses
          1.17k cycles   3.19k instructions  601.65 c-refs    0.53 c-misses

are-deeply-equal               9.18 µs/iter   9.17 µs      █               
                        (9.11 µs … 9.46 µs)   9.21 µs      █  █  █         
                    (175.70  b … 184.46  b) 183.42  b █▁▁█▁█▁███▁█▁██▁▁▁▁▁█
                   6.56 ipc ( 99.61% cache)    1.13 branch misses
         37.55k cycles 246.32k instructions  392.79 c-refs    1.51 c-misses

fast-equals                   11.11 µs/iter  11.13 µs  █                   
                      (11.08 µs … 11.14 µs)  11.14 µs ▅█▅ ▅     ▅  ▅▅  ▅▅ ▅
                    (  0.12  b …   0.36  b)   0.14  b ███▁█▁▁▁▁▁█▁▁██▁▁██▁█
                   6.15 ipc ( 99.79% cache)    1.12 branch misses
         45.33k cycles 278.83k instructions  351.18 c-refs    0.74 c-misses

dequal                        11.06 µs/iter  11.07 µs █ ██     ███ █ ██ █ █
                      (11.04 µs … 11.08 µs)  11.08 µs █ ██     ███ █ ██ █ █
                    (  0.12  b …   0.40  b)   0.16  b █▁██▁▁▁▁▁███▁█▁██▁█▁█
                   6.16 ipc ( 99.84% cache)    1.09 branch misses
         45.24k cycles 278.78k instructions  301.37 c-refs    0.48 c-misses

lodash.isEqual                51.04 µs/iter  50.01 µs █                    
                     (49.36 µs … 259.94 µs)  77.61 µs █                    
                    (784.00  b … 410.04 kb)   1.46 kb █▄▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.53 ipc ( 98.27% cache)   36.43 branch misses
        210.77k cycles 954.50k instructions   2.52k c-refs   43.49 c-misses

node.deepStrictEqual         828.18 ns/iter 832.96 ns   █                  
                    (808.44 ns … 924.06 ns) 905.19 ns  ▅██                 
                    (242.25  b … 709.56  b) 480.75  b ▄███▅▄▃▃▄▅▄▂▂▁▁▁▁▁▁▁▁
                   2.37 ipc ( 99.80% cache)    1.12 branch misses
          3.37k cycles   7.97k instructions  823.27 c-refs    1.67 c-misses

summary
  object-equals
   2.87x faster than node.deepStrictEqual
   31.84x faster than are-deeply-equal
   38.38x faster than dequal
   38.55x faster than fast-equals
   177.14x faster than lodash.isEqual
```

</details>

### Data View

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 17.62 ns| 71.04 ns| 100.87 ns | 270.32 ns | 1.00x (baseline) |
| dequal | 24.14 ns | 366.01 ns | 2.83 µs | 11.03 µs | 1.37x–40.81x slower |
| are-deeply-equal | 95.93 ns| 379.63 ns | 2.37 µs | 9.18 µs | 5.44x–33.95x slower |
| node.deepStrictEqual | 819.14 ns | 510.33 ns | 544.37 ns | 774.80 ns | 46.48x–2.87x slower |
| lodash.isEqual | 3.82 µs | 4.83 µs | 15.90 µs| 52.12 µs| 216.84x–192.82x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.91 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 23.9.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Data View [size=16]
------------------------------------------- -------------------------------
object-equals                 17.62 ns/iter  17.57 ns     █                
                      (16.76 ns … 68.06 ns)  20.34 ns    ▇█                
                    (  0.05  b …  81.71  b)   0.21  b ▁▁████▂▂▃▂▂▂▁▁▁▁▁▁▁▁▁
                   4.54 ipc ( 94.41% cache)    0.01 branch misses
          72.41 cycles  328.39 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              95.93 ns/iter  93.60 ns  █                   
                     (89.39 ns … 190.12 ns) 133.14 ns  █▃                  
                    (205.74  b … 517.19  b) 392.37  b ▃██▂▁▁▁▁▂▁▁▂▃▂▁▁▁▁▁▁▁
                   3.33 ipc ( 95.43% cache)    0.02 branch misses
         393.65 cycles   1.31k instructions   13.47 c-refs    0.61 c-misses

dequal                        24.14 ns/iter  24.16 ns  █                   
                      (23.13 ns … 77.37 ns)  32.72 ns  █                   
                    (  0.10  b …  52.23  b)   0.21  b ██▇▄▂▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.65 ipc ( 92.80% cache)    0.01 branch misses
          98.61 cycles  458.77 instructions    0.04 c-refs    0.00 c-misses

lodash.isEqual                 3.82 µs/iter   3.84 µs                 █    
                        (3.41 µs … 3.94 µs)   3.93 µs                ██    
                    (  1.23 kb …   1.26 kb)   1.24 kb ▂▁▁▁▁▁▁▁▁▁▂▁▁▁▁███▂▄▄
                   2.52 ipc ( 99.70% cache)   15.11 branch misses
         15.58k cycles  39.24k instructions   1.71k c-refs    5.18 c-misses

node.deepStrictEqual         819.14 ns/iter 800.00 ns      █               
                    (670.00 ns … 211.43 µs)   1.11 µs      █▃              
                    (512.00  b … 474.62 kb) 554.46  b ▁▁▁▁▃██▃▂▂▂▂▁▁▁▁▁▁▁▁▁
                   1.57 ipc ( 99.64% cache)   31.71 branch misses
          4.88k cycles   7.65k instructions  886.84 c-refs    3.22 c-misses

summary
  object-equals
   1.37x faster than dequal
   5.44x faster than are-deeply-equal
   46.48x faster than node.deepStrictEqual
   216.84x faster than lodash.isEqual

• Data View [size=512]
------------------------------------------- -------------------------------
object-equals                 71.04 ns/iter  70.45 ns  ▃█                  
                     (65.81 ns … 220.46 ns)  98.82 ns  ██▄                 
                    ( 38.43  b … 365.96  b) 208.12  b ▂███▄▂▂▁▁▁▁▁▁▁▁▂▂▂▂▂▁
                   3.55 ipc ( 94.77% cache)    0.02 branch misses
         291.13 cycles   1.03k instructions    7.30 c-refs    0.38 c-misses

are-deeply-equal             379.63 ns/iter 378.53 ns  █                   
                    (373.06 ns … 424.29 ns) 412.30 ns  ██                  
                    (247.42  b … 596.66  b) 393.16  b ▇██▇▄▂▁▂▂▁▁▁▁▁▂▃▂▁▁▂▁
                   5.63 ipc ( 94.99% cache)    1.03 branch misses
          1.55k cycles   8.75k instructions   13.76 c-refs    0.69 c-misses

dequal                       366.01 ns/iter 366.73 ns   ▆█▇▄               
                    (361.33 ns … 387.72 ns) 380.31 ns   ████▂▂             
                    (  0.01  b … 166.22  b)   0.54  b ▂▃██████▅▅▂▂▂▁▁▁▁▂▂▂▂
                   5.27 ipc ( 90.70% cache)    1.01 branch misses
          1.50k cycles   7.90k instructions    0.16 c-refs    0.01 c-misses

lodash.isEqual                 4.83 µs/iter   4.85 µs   ▂ █  ▂  █▂         
                        (4.77 µs … 4.93 µs)   4.92 µs   █▅█  █▅ ██       ▅ 
                    (  1.23 kb …   1.27 kb)   1.24 kb ▇▇███▇▇██▁██▁▇▇▁▁▇▁█▇
                   3.12 ipc ( 99.66% cache)   12.86 branch misses
         19.91k cycles  62.18k instructions   1.75k c-refs    5.97 c-misses

node.deepStrictEqual         510.33 ns/iter 512.95 ns       ▃█▄            
                    (486.25 ns … 568.39 ns) 548.01 ns     ▅▅███▅           
                    (111.50  b … 668.13  b) 480.56  b ▂▂▅▆██████▄▃▁▄▂▃▃▃▄▃▂
                   2.67 ipc ( 99.19% cache)    0.11 branch misses
          2.09k cycles   5.58k instructions  125.86 c-refs    1.02 c-misses

summary
  object-equals
   5.15x faster than dequal
   5.34x faster than are-deeply-equal
   7.18x faster than node.deepStrictEqual
   68.06x faster than lodash.isEqual

• Data View [size=4096]
------------------------------------------- -------------------------------
object-equals                100.87 ns/iter 100.79 ns   █▄                 
                     (95.69 ns … 136.44 ns) 127.32 ns  ▄██                 
                    ( 63.17  b … 296.19  b) 208.12  b ▂████▂▂▁▁▁▁▁▁▁▁▁▁▂▂▁▁
                   3.67 ipc ( 95.38% cache)    0.02 branch misses
         411.35 cycles   1.51k instructions    9.83 c-refs    0.45 c-misses

are-deeply-equal               2.37 µs/iter   2.38 µs   █                  
                        (2.35 µs … 2.41 µs)   2.41 µs ▂▄█▇▅    ▂           
                    (383.79  b … 392.51  b) 391.95  b █████▆▅█▅█▃▃▅▁▁▆▁▆▃▃▃
                   6.48 ipc ( 94.27% cache)    1.07 branch misses
          9.65k cycles  62.53k instructions   16.41 c-refs    0.94 c-misses

dequal                         2.83 µs/iter   2.82 µs ▄█                   
                        (2.79 µs … 3.22 µs)   3.18 µs ██▄                  
                    (  0.01  b …   0.40  b)   0.05  b ███▃▅▁▁▁▁▁▁▁▁▂▁▁▁▁▁▁▂
                   5.30 ipc ( 93.83% cache)    1.03 branch misses
         11.64k cycles  61.68k instructions    2.83 c-refs    0.17 c-misses

lodash.isEqual                15.90 µs/iter  15.67 µs  █                   
                     (15.35 µs … 178.71 µs)  24.49 µs ██                   
                    (  1.28 kb … 209.87 kb)   1.49 kb ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.05 ipc ( 99.31% cache)   41.50 branch misses
         66.76k cycles 270.29k instructions   2.82k c-refs   19.41 c-misses

node.deepStrictEqual         544.37 ns/iter 547.62 ns       █▂             
                    (523.66 ns … 598.30 ns) 582.85 ns    █████▆            
                    (256.76  b … 636.12  b) 480.59  b ▃▅███████▆▃▃▄▃▄▄▃▄▃▂▂
                   2.72 ipc ( 99.17% cache)    0.11 branch misses
          2.23k cycles   6.06k instructions  129.65 c-refs    1.08 c-misses

summary
  object-equals
   5.4x faster than node.deepStrictEqual
   23.48x faster than are-deeply-equal
   28.03x faster than dequal
   157.6x faster than lodash.isEqual

• Data View [size=16386]
------------------------------------------- -------------------------------
object-equals                270.32 ns/iter 268.79 ns ▃█                   
                    (264.80 ns … 321.89 ns) 309.73 ns ██▄                  
                    ( 68.04  b … 302.23  b) 207.92  b ███▃▂▁▁▁▁▂▁▁▁▂▂▂▁▁▁▁▁
                   2.85 ipc ( 99.89% cache)    1.02 branch misses
          1.10k cycles   3.14k instructions  634.23 c-refs    0.72 c-misses

are-deeply-equal               9.18 µs/iter   9.19 µs  █                   
                        (9.15 µs … 9.24 µs)   9.21 µs  ██                  
                    (383.74  b … 392.51  b) 391.43  b ███▁██▁█▁▁▁██▁█▁▁▁█▁█
                   6.59 ipc ( 99.62% cache)    1.12 branch misses
         37.45k cycles 246.93k instructions  522.89 c-refs    1.97 c-misses

dequal                        11.03 µs/iter  11.03 µs    █                 
                      (11.01 µs … 11.08 µs)  11.08 µs   ██                 
                    (  0.12  b …   0.40  b)   0.16  b ████▁██▁▁▁█▁▁▁▁▁▁▁▁▁█
                   5.39 ipc ( 99.88% cache)    1.08 branch misses
         45.65k cycles 246.09k instructions  323.08 c-refs    0.38 c-misses

lodash.isEqual                52.12 µs/iter  51.97 µs  █                   
                     (51.09 µs … 180.96 µs)  59.40 µs  █▄                  
                    (  1.28 kb … 263.26 kb)   1.97 kb ▁██▃▁▁▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁
                   4.53 ipc ( 98.84% cache)   42.73 branch misses
        214.61k cycles 971.47k instructions   3.51k c-refs   40.73 c-misses

node.deepStrictEqual         774.80 ns/iter 786.01 ns   ▇▇█                
                    (751.13 ns … 836.99 ns) 822.58 ns  ▃████▆  ▂ ▂         
                    (305.71  b … 646.10  b) 480.74  b ▃██████▆██▇█▅▆█▅▄▂▂▂▃
                   2.43 ipc ( 99.80% cache)    1.12 branch misses
          3.17k cycles   7.69k instructions  780.95 c-refs    1.55 c-misses

summary
  object-equals
   2.87x faster than node.deepStrictEqual
   33.95x faster than are-deeply-equal
   40.81x faster than dequal
   192.82x faster than lodash.isEqual
```

</details>

> [!NOTE]
> `fast-equals` is excluded from the test because it does not natively support DataView and returns misleading results despite executing without errors. This behavior could lead to incorrect conclusions about its performance or correctness.

## Running Benchmarks

All benchmarks use [mitata](https://github.com/evanwashere/mitata) for performance testing with data generated by [`object-generator`](https://github.com/observ33r/object-generator) to reflect realistic and deeply nested object structures. The suite includes both synthetic and real-world data tests, including React specific cases.

```bash
# Big JSON Object (~1.2 MiB, deeply nested)
npm run benchmark

# React elements benchmark
npm run benchmark:react

# Structured, nested and large-scale benchmark with synthetic data
npm run benchmark:advanced 
```

## Web Environment Support

If you're using this package in a browser or client-side environment, you can import the web-only variant:

```js
import { objectEquals } from '@observ33r/object-equals/web';
```

This excludes Node-specific optimizations such as Buffer, deepStrictEqual and runtime detection logic. 
Ideal for client-side apps or SSR targets like Next.js, Astro, etc.

## Testing

Run the included tests with Jest:

```bash
npm test
```

## Contributing

Feel free to open issues or submit pull requests on [GitHub](https://github.com/observ33r/object-equals).

## License

This project is licensed under the [MIT License](LICENSE).