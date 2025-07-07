[![npm](https://img.shields.io/npm/v/@observ33r/object-equals.svg)](https://www.npmjs.com/package/@observ33r/object-equals)
[![Size](https://badgen.net/bundlephobia/minzip/@observ33r/object-equals)](https://bundlephobia.com/package/@observ33r/object-equals)
[![License](https://img.shields.io/npm/l/@observ33r/object-equals.svg)](https://github.com/observ33r/object-equals/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/Donate-PayPal-ff69b4.svg)](https://www.paypal.com/donate/?hosted_button_id=PPPN7F3VXXE8W)

# object-equals

A fast, flexible and robust utility for deep equality comparison with type-specific logic and engine-aware design.

## Features

- **High Performance**  
  Outperforms popular libraries like `lodash.isEqual`, `fast-equals`, `dequal`, `are-deeply-equal` and `node.isDeepStrictEqual`.

- **Engine-Aware Design**  
  Tailored execution paths for V8 and JSC based engines to maximize performance.

- **Web-First Architecture**  
  Uses a lightweight, browser-safe implementation by default with full compatibility across all modern browsers and runtimes.
  
- **Broad Support**  
  Handles objects, arrays, sets, maps, array buffers, typed arrays, data views, booleans, strings, numbers, bigints, dates, errors, regular expressions and primitives.
  
- **Customizable**  
  Fine-tune behavior with options for handling circular references, cross-realm objects, react elements and more.

- **Fully Tested**  
  Includes over 40 unit tests with complete parity against `lodash.isEqual` and edge case coverage.
  
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

class ExtendedMap extends Map {}

const map1 = new ExtendedMap([['key-1', 'value-1']]);
const map2 = new ExtendedMap([['key-1', 'value-1']]);

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
| object-equals | 483.52 µs | 1.00x (baseline) |
| fast-equals | 1.37 ms | 2.83x slower |
| dequal | 1.44 ms | 2.98x slower |
| node.isDeepStrictEqual | 2.43 ms | 5.02x slower |
| are-deeply-equal | 2.76 ms | 5.70x slower |
| lodash.isEqual | 5.23 ms | 10.81x slower |

<details>
<summary>Full benchmark result with hardware counters</summary>

```console
clk: ~3.70 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Big JSON Object (~1.2 MiB, deeply nested)
------------------------------------------- -------------------------------
object-equals                483.52 µs/iter 484.03 µs  █                   
                    (466.96 µs … 704.74 µs) 664.33 µs  █▅                  
                    (340.07 kb …   1.44 mb) 968.34 kb ▃██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.12 ipc ( 87.00% cache)   4.94k branch misses
          1.98M cycles   6.17M instructions 114.31k c-refs  14.86k c-misses

are-deeply-equal               2.76 ms/iter   2.79 ms  █                   
                        (2.58 ms … 3.84 ms)   3.60 ms  █ ▄                 
                    (920.88 kb …   2.17 mb)   1.78 mb ▄█▃██▃▂▃▄▃▂▁▁▂▁▁▁▁▁▁▁
                   2.51 ipc ( 88.60% cache)  26.89k branch misses
         10.31M cycles  25.86M instructions 357.36k c-refs  40.75k c-misses

fast-equals                    1.37 ms/iter   1.37 ms  █▃                  
                        (1.33 ms … 1.71 ms)   1.60 ms  ██                  
                    (806.30 kb …   1.15 mb) 968.52 kb ▅███▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.73 ipc ( 87.44% cache)  12.87k branch misses
          5.26M cycles  14.35M instructions 124.59k c-refs  15.65k c-misses

dequal                         1.44 ms/iter   1.49 ms  ▂█                  
                        (1.38 ms … 1.66 ms)   1.55 ms  ██▃         ▂▂      
                    (484.92 kb … 776.80 kb) 485.59 kb ▃████▄▅▂▃▄▃▄███▅▃▂▂▂▁
                   2.56 ipc ( 90.46% cache)  11.93k branch misses
          5.77M cycles  14.77M instructions 121.39k c-refs  11.59k c-misses

lodash.isEqual                 5.23 ms/iter   5.23 ms  █▄                  
                        (5.14 ms … 5.98 ms)   5.65 ms  ███▃                
                    (  2.31 mb …   4.32 mb)   2.97 mb ▅████▂▄▃▂▂▂▂▁▂▂▁▁▁▁▁▂
                   2.57 ipc ( 96.64% cache)  37.07k branch misses
         21.43M cycles  55.03M instructions 822.59k c-refs  27.62k c-misses

node.isDeepStrictEqual         2.43 ms/iter   2.43 ms   █                  
                        (2.38 ms … 2.95 ms)   2.74 ms  ▇█▄                 
                    (280.57 kb …   2.07 mb)   1.36 mb ▆███▄▂▁▁▁▁▁▁▁▂▂▁▁▁▁▁▁
                   2.62 ipc ( 92.07% cache)  16.58k branch misses
          9.92M cycles  26.02M instructions 189.42k c-refs  15.03k c-misses

summary
  object-equals
   2.83x faster than fast-equals
   2.98x faster than dequal
   5.02x faster than node.isDeepStrictEqual
   5.7x faster than are-deeply-equal
   10.81x faster than lodash.isEqual
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
| object-equals | 996.75 ns | 30.33 µs | 267.94 µs | 1.07 ms | 1.00x (baseline) |
| react-fast-compare | 6.87 µs | 210.55 µs | 1.63 ms | 6.66 ms | 6.89x-6.22x slower |
| fast-equals | 7.02 µs | 208.94 µs | 1.58 ms | 6.83 ms | 7.05x-6.38x slower |
| dequal | 7.96 µs | 240.44 µs | 1.96 ms | 7.70 ms | 7.99x-7.19x slower |
| are-deeply-equal | 16.93 µs | 510.79 µs | 4.27 ms | 19.10 ms | 16.99x-17.84x slower |
| node.isDeepStrictEqual | 17.01 µs | 473.63 µs | 4.01 ms | 15.77 ms | 17.06x-14.73x slower |
| lodash.isEqual | 34.82 µs | 1.03 ms | 8.01 ms | 31.12 ms | 34.93x-29.07x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.79 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• React elements [size=16]
------------------------------------------- -------------------------------
object-equals                996.75 ns/iter   1.02 µs   █                  
                      (928.56 ns … 1.20 µs)   1.19 µs ▃▂█▃                 
                    (  1.87 kb …   2.44 kb)   2.13 kb ██████▆▅▂▄▃▃▃▃▂▂▃▄▂▂▂
                   3.87 ipc ( 96.36% cache)    1.10 branch misses
          3.91k cycles  15.13k instructions   91.50 c-refs    3.33 c-misses

react-fast-compare             6.87 µs/iter   6.91 µs █         █          
                        (6.77 µs … 7.02 µs)   6.96 µs █   █     █         █
                    (  6.37 kb …   6.38 kb)   6.38 kb █▁▁████▁█▁███▁██▁▁███
                   3.09 ipc ( 96.77% cache)    2.53 branch misses
         26.41k cycles  81.69k instructions  398.22 c-refs   12.86 c-misses

are-deeply-equal              16.93 µs/iter  17.20 µs                     █
                      (16.58 µs … 17.23 µs)  17.22 µs          █          █
                    ( 13.20 kb …  13.20 kb)  13.20 kb █▁█▁▁██▁██▁▁█▁▁▁▁▁▁▁█
                   2.74 ipc ( 95.85% cache)   61.43 branch misses
         64.91k cycles 178.00k instructions  836.31 c-refs   34.69 c-misses

fast-equals                    7.02 µs/iter   7.13 µs      ▂     █         
                        (6.75 µs … 7.24 µs)   7.21 µs      █     █ ▅  ▅   ▅
                    (  6.37 kb …   6.38 kb)   6.38 kb ▇▁▁▁▁█▁▇▁▇▇█▇█▁▁█▇▇▁█
                   2.98 ipc ( 95.84% cache)    2.72 branch misses
         26.95k cycles  80.19k instructions  336.77 c-refs   14.01 c-misses

dequal                         7.96 µs/iter   7.98 µs  ██   █              
                        (7.90 µs … 8.16 µs)   8.04 µs ▅██▅▅ █▅▅ ▅▅ ▅ ▅   ▅▅
                    (  3.17 kb …   3.20 kb)   3.19 kb █████▁███▁██▁█▁█▁▁▁██
                   2.82 ipc ( 96.04% cache)    2.45 branch misses
         30.68k cycles  86.39k instructions  207.30 c-refs    8.22 c-misses

lodash.isEqual                34.82 µs/iter  34.22 µs  █                   
                     (33.14 µs … 301.34 µs)  47.00 µs  █                   
                    (520.00  b … 903.28 kb)  23.84 kb ▁█▇▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.56 ipc ( 99.03% cache)   42.48 branch misses
        135.39k cycles 346.90k instructions   6.80k c-refs   65.59 c-misses

node.isDeepStrictEqual        17.01 µs/iter  16.68 µs  █                   
                     (16.33 µs … 224.45 µs)  23.24 µs ▇█                   
                    (  2.02 kb … 267.35 kb)  10.23 kb ██▃▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.68 ipc ( 98.52% cache)   51.84 branch misses
         66.51k cycles 178.50k instructions   1.38k c-refs   20.41 c-misses

summary
  object-equals
   6.89x faster than react-fast-compare
   7.05x faster than fast-equals
   7.99x faster than dequal
   16.99x faster than are-deeply-equal
   17.06x faster than node.isDeepStrictEqual
   34.93x faster than lodash.isEqual

• React elements [size=512]
------------------------------------------- -------------------------------
object-equals                 30.33 µs/iter  30.67 µs  █                   
                      (29.65 µs … 31.49 µs)  31.41 µs  █  █                
                    (144.19  b … 149.53  b) 144.64  b ██▁██▁▁▁▁▁█▁█▁▁▁█▁▁▁█
                   3.73 ipc ( 90.22% cache)    5.06 branch misses
        121.14k cycles 452.06k instructions   9.09k c-refs  888.87 c-misses

react-fast-compare           210.55 µs/iter 210.22 µs   ▃█                 
                    (198.47 µs … 437.07 µs) 254.83 µs   ██▃                
                    ( 78.10 kb … 562.63 kb) 193.32 kb ▁████▇▄▂▂▁▁▁▁▁▂▂▂▁▁▁▁
                   3.06 ipc ( 75.89% cache)   43.86 branch misses
        803.58k cycles   2.46M instructions  18.31k c-refs   4.41k c-misses

are-deeply-equal             510.79 µs/iter 512.35 µs    █                 
                    (485.49 µs … 743.90 µs) 637.30 µs   ▆█▃                
                    (297.80 kb … 590.24 kb) 409.69 kb ▁▃███▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.72 ipc ( 84.37% cache)   2.06k branch misses
          1.97M cycles   5.35M instructions  37.94k c-refs   5.93k c-misses

fast-equals                  208.94 µs/iter 209.11 µs    █▆                
                    (189.51 µs … 533.05 µs) 281.53 µs   ▇██                
                    ( 49.34 kb … 416.51 kb) 193.08 kb ▂▄████▄▂▁▁▁▂▂▂▁▁▁▁▁▁▁
                   3.02 ipc ( 74.06% cache)   45.21 branch misses
        799.09k cycles   2.41M instructions  15.51k c-refs   4.02k c-misses

dequal                       240.44 µs/iter 240.90 µs    █▆                
                    (218.76 µs … 473.41 µs) 313.99 µs    ██                
                    ( 76.81 kb … 313.82 kb)  96.95 kb ▃▅▆███▅▂▂▁▃▂▂▂▂▁▁▁▁▁▁
                   2.82 ipc ( 73.38% cache)   43.71 branch misses
        924.49k cycles   2.60M instructions  12.90k c-refs   3.44k c-misses

lodash.isEqual                 1.03 ms/iter   1.02 ms   █                  
                      (972.24 µs … 2.94 ms)   1.31 ms   █                  
                    (308.13 kb …   1.23 mb) 665.75 kb ▁██▇▄▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.60 ipc ( 95.26% cache)  170.73 branch misses
          3.96M cycles  10.31M instructions 144.13k c-refs   6.83k c-misses

node.isDeepStrictEqual       473.63 µs/iter 474.91 µs   █▃                 
                    (455.86 µs … 708.57 µs) 568.64 µs  ▅██                 
                    (241.80 kb … 337.87 kb) 288.69 kb ▂████▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.74 ipc ( 75.65% cache)  687.57 branch misses
          1.93M cycles   5.28M instructions  22.09k c-refs   5.38k c-misses

summary
  object-equals
   6.89x faster than fast-equals
   6.94x faster than react-fast-compare
   7.93x faster than dequal
   15.62x faster than node.isDeepStrictEqual
   16.84x faster than are-deeply-equal
   33.93x faster than lodash.isEqual

• React elements [size=4096]
------------------------------------------- -------------------------------
object-equals                267.94 µs/iter 265.96 µs  █                   
                    (248.63 µs … 518.86 µs) 443.63 µs ▅█                   
                    ( 84.75 kb … 832.33 kb) 512.48 kb ██▇▃▃▃▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.60 ipc ( 86.60% cache)  182.06 branch misses
          1.01M cycles   3.64M instructions  99.87k c-refs  13.38k c-misses

react-fast-compare             1.63 ms/iter   1.65 ms     ▃█▅              
                        (1.52 ms … 1.97 ms)   1.88 ms     ███▇             
                    (  1.50 mb …   1.50 mb)   1.50 mb ▂▅▂█████▇▅▅▃▂▂▁▂▂▂▂▁▁
                   3.13 ipc ( 95.93% cache)  133.97 branch misses
          6.28M cycles  19.68M instructions 147.83k c-refs   6.02k c-misses

are-deeply-equal               4.27 ms/iter   4.27 ms  █                   
                        (4.12 ms … 5.97 ms)   5.94 ms ▇█▂                  
                    (  2.66 mb …   3.22 mb)   3.15 mb ███▄▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.69 ipc ( 91.36% cache)  15.95k branch misses
         15.89M cycles  42.74M instructions 403.17k c-refs  34.85k c-misses

fast-equals                    1.58 ms/iter   1.59 ms    █▂                
                        (1.51 ms … 1.80 ms)   1.77 ms   ▅███▂              
                    (  1.50 mb …   1.50 mb)   1.50 mb ▂▅█████▆▃▃▃▄▃▁▂▁▁▁▂▂▁
                   3.01 ipc ( 93.59% cache)  134.86 branch misses
          6.42M cycles  19.30M instructions 134.11k c-refs   8.60k c-misses

dequal                         1.96 ms/iter   1.96 ms  █▇                  
                        (1.86 ms … 2.48 ms)   2.34 ms  ██▃                 
                    (768.33 kb … 769.59 kb) 768.36 kb ▇███▆▃▂▄▃▃▃▃▂▁▁▂▂▂▁▁▁
                   2.82 ipc ( 91.61% cache)  120.87 branch misses
          7.38M cycles  20.81M instructions 108.17k c-refs   9.08k c-misses

lodash.isEqual                 8.01 ms/iter   8.08 ms   █▂                 
                        (7.87 ms … 8.50 ms)   8.34 ms  ▅██▇ ▄     ▄        
                    (  4.39 mb …   5.96 mb)   5.15 mb ▇██████▄▃▃▃▄█▃▃▆▃▄▁▃▃
                   2.65 ipc ( 98.46% cache)  918.98 branch misses
         30.85M cycles  81.87M instructions   1.18M c-refs  18.19k c-misses

node.isDeepStrictEqual         4.01 ms/iter   4.02 ms    ▂█▆               
                        (3.92 ms … 4.31 ms)   4.26 ms  ▆▃███▇              
                    (  2.25 mb …   2.25 mb)   2.25 mb ▅███████▅▂▂▂▁▂▂▂▁▂▂▂▂
                   2.74 ipc ( 95.03% cache)   5.27k branch misses
         15.40M cycles  42.14M instructions 181.32k c-refs   9.01k c-misses

summary
  object-equals
   5.89x faster than fast-equals
   6.09x faster than react-fast-compare
   7.3x faster than dequal
   14.95x faster than node.isDeepStrictEqual
   15.93x faster than are-deeply-equal
   29.9x faster than lodash.isEqual

• React elements [size=16386]
------------------------------------------- -------------------------------
object-equals                  1.07 ms/iter   1.08 ms  █▇                  
                      (990.79 µs … 1.47 ms)   1.40 ms  ██▆                 
                    (  1.89 mb …   2.11 mb)   2.00 mb ▄████▅▄▄▄▃▂▄▂▁▂▁▁▁▁▁▁
                   3.56 ipc ( 94.14% cache)   1.17k branch misses
          4.10M cycles  14.59M instructions 432.17k c-refs  25.33k c-misses

react-fast-compare             6.66 ms/iter   6.71 ms  █ ▆ █▃              
                        (6.49 ms … 7.15 ms)   7.05 ms  █▅█▅██▄▇   ▂        
                    (  6.00 mb …   6.00 mb)   6.00 mb █████████▆█▅█▁▁▃█▁▁▁▃
                   3.08 ipc ( 95.26% cache)  398.43 branch misses
         25.58M cycles  78.71M instructions 637.63k c-refs  30.24k c-misses

are-deeply-equal              19.10 ms/iter  19.02 ms  █                   
                      (18.64 ms … 21.26 ms)  21.16 ms  ██▃                 
                    ( 12.50 mb …  12.58 mb)  12.53 mb ▇███▇▁▁▃▁▁▁▁▁▁▁▁▁▁▁▁▅
                   2.55 ipc ( 86.82% cache)  64.57k branch misses
         67.04M cycles 171.26M instructions   1.77M c-refs 233.77k c-misses

fast-equals                    6.83 ms/iter   6.96 ms    ▅▃█▃██            
                        (6.56 ms … 7.25 ms)   7.21 ms   ▃██████▃ ▆▆▃▆ ▃▃   
                    (  6.00 mb …   6.00 mb)   6.00 mb ▆█████████████████▄▄▆
                   2.95 ipc ( 94.28% cache)  469.05 branch misses
         26.19M cycles  77.22M instructions 534.64k c-refs  30.56k c-misses

dequal                         7.70 ms/iter   7.75 ms   █▅▃                
                        (7.50 ms … 8.26 ms)   8.20 ms  ▅███▄▂              
                    (  3.00 mb …   3.00 mb)   3.00 mb ▆██████▆▆▆▁▁▄▄▃▃▃▇▁▄▃
                   2.81 ipc ( 93.81% cache)  332.51 branch misses
         29.62M cycles  83.26M instructions 437.01k c-refs  27.03k c-misses

lodash.isEqual                31.12 ms/iter  31.27 ms      █ █   █   █ █   
                      (30.74 ms … 31.55 ms)  31.45 ms ▅▅ ▅ █▅█▅  █  ▅█▅█  ▅
                    ( 20.63 mb …  20.93 mb)  20.65 mb ██▁█▁████▁▁█▁▁████▁▁█
                   2.58 ipc ( 98.47% cache)   5.71k branch misses
        127.70M cycles 329.50M instructions   5.62M c-refs  85.88k c-misses

node.isDeepStrictEqual        15.77 ms/iter  16.24 ms ▅█▂                  
                      (14.98 ms … 17.70 ms)  17.61 ms ███▅             ▂   
                    (  9.00 mb …   9.00 mb)   9.00 mb ████▇▁▄▁▄▄▄▁▁▇▁▄▁█▁▄▇
                   2.73 ipc ( 95.00% cache)  19.27k branch misses
         61.85M cycles 168.58M instructions 733.94k c-refs  36.68k c-misses

summary
  object-equals
   6.22x faster than react-fast-compare
   6.38x faster than fast-equals
   7.19x faster than dequal
   14.73x faster than node.isDeepStrictEqual
   17.84x faster than are-deeply-equal
   29.07x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> The `react` option is designed to support React elements comparison, including props that contain inline functions (e.g. `onClick: () => ...`). Most libraries fail such comparisons due to referential inequality. For benchmarking fairness, all comparisons use structurally equivalent trees without inline functions.

### Object with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 142.36 ns | 31.99 µs | 694.95 µs | 3.91 ms | 1.00x (baseline) |
| fast-equals | 873.33 ns | 38.59 µs | 792.80 µs | 4.12 ms | 6.13x-1.06x slower |
| are-deeply-equal | 899.22 ns | 37.54 µs | 780.04 µs | 4.39 ms | 6.32x-1.12x slower |
| dequal | 929.12 ns | 63.33 µs | 946.56 µs | 4.77 ms | 6.53x-1.22x slower |
| node.isDeepStrictEqual | 937.36 ns | 37.97 µs | 747.63 µs | 4.32 ms | 6.58x-1.11x slower |
| lodash.isEqual | 1.29 µs | 43.88 µs | 842.46 µs | 4.48 ms | 9.08x-1.15x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.91 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Object with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                142.36 ns/iter 142.02 ns  █                   
                    (136.68 ns … 223.73 ns) 188.70 ns  █▅                  
                    (197.47  b … 456.27  b) 352.22  b ▅██▅▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁
                   4.03 ipc ( 96.60% cache)    0.03 branch misses
         578.44 cycles   2.33k instructions   11.72 c-refs    0.40 c-misses

are-deeply-equal             899.22 ns/iter 916.66 ns  █                   
                      (847.15 ns … 1.10 µs)   1.06 µs  █▄                  
                    (430.28  b … 761.70  b) 600.25  b ███▅▆▃▄▃▃▃▂▃▃▂▂▂▂▂▃▃▁
                   2.80 ipc ( 95.75% cache)    0.06 branch misses
          3.54k cycles   9.90k instructions   25.78 c-refs    1.10 c-misses

fast-equals                  873.33 ns/iter 892.94 ns  ▆▅ ▆█▆▂             
                      (807.30 ns … 1.12 µs)   1.03 µs ▂██ █████▄           
                    ( 16.11  b … 557.93  b) 352.14  b ██████████▃▄▄▄▆▃▃▁▁▃▃
                   2.83 ipc ( 94.86% cache)    0.05 branch misses
          3.40k cycles   9.64k instructions   12.67 c-refs    0.65 c-misses

dequal                       929.12 ns/iter 935.21 ns  ▂█                  
                      (903.99 ns … 1.04 µs)   1.03 µs  ██▅                 
                    (170.30  b … 404.96  b) 177.39  b ▅███▇▅▅▅▃▄▂▂▂▁▁▁▁▁▁▁▂
                   2.75 ipc ( 93.86% cache)    0.04 branch misses
          3.57k cycles   9.82k instructions    6.64 c-refs    0.41 c-misses

lodash.isEqual                 1.29 µs/iter   1.31 µs           █          
                        (1.22 µs … 1.50 µs)   1.39 µs          ██          
                    (687.52  b …   1.33 kb) 933.00  b ▆▇▄▃▂▄▂▅▆██▃▁▂▁▃▂▃▁▃▂
                   2.72 ipc ( 96.96% cache)    0.10 branch misses
          5.07k cycles  13.78k instructions   85.48 c-refs    2.60 c-misses

node.isDeepStrictEqual       937.36 ns/iter 940.00 ns  █                   
                    (850.00 ns … 194.47 µs)   1.33 µs  █ ▆█                
                    (792.00  b … 411.47 kb) 813.54  b ▂████▄▂▂▂▁▂▁▁▁▁▁▁▁▁▁▁
                   2.11 ipc ( 99.63% cache)   30.08 branch misses
          5.07k cycles  10.69k instructions  449.28 c-refs    1.68 c-misses

summary
  object-equals
   6.13x faster than fast-equals
   6.32x faster than are-deeply-equal
   6.53x faster than dequal
   6.58x faster than node.isDeepStrictEqual
   9.08x faster than lodash.isEqual

• Object with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 31.99 µs/iter  32.04 µs        █             
                      (30.57 µs … 33.99 µs)  33.78 µs   █    █            █
                    (259.87  b … 261.79  b) 260.07  b █▁██▁▁▁███▁▁▁▁▁▁▁▁▁▁█
                   3.60 ipc ( 98.97% cache)  186.76 branch misses
        124.97k cycles 449.46k instructions  10.39k c-refs  106.56 c-misses

are-deeply-equal              37.54 µs/iter  38.29 µs   █                  
                      (36.45 µs … 39.97 µs)  39.51 µs ▅ █                  
                    (  8.78 kb …   8.78 kb)   8.78 kb █▇█▁▇▁▁▁▁▁▁▁▇▁▁▁▇▁▁▁▇
                   3.48 ipc ( 98.95% cache)  183.79 branch misses
        149.81k cycles 521.40k instructions  12.67k c-refs  133.02 c-misses

fast-equals                   38.59 µs/iter  38.62 µs          █           
                      (38.20 µs … 39.12 µs)  39.09 µs          █           
                    (259.87  b … 260.79  b) 259.95  b ▇▇▇▇▁▁▁▇▁█▁▁▁▇▁▁▁▁▁▁▇
                   3.53 ipc ( 98.98% cache)  233.07 branch misses
        156.17k cycles 551.76k instructions  10.13k c-refs  103.53 c-misses

dequal                        63.33 µs/iter  63.42 µs  █                   
                     (56.82 µs … 227.68 µs) 100.35 µs  █                   
                    (416.00  b … 202.04 kb)  17.11 kb ▂█▅▅▂▂▁▃▃▂▁▁▁▁▁▁▁▁▁▁▁
                   2.92 ipc ( 97.68% cache)  628.84 branch misses
        248.85k cycles 726.95k instructions  10.27k c-refs  238.13 c-misses

lodash.isEqual                43.88 µs/iter  43.65 µs  █                   
                     (40.66 µs … 254.68 µs)  63.63 µs  █▇                  
                    (840.00  b … 223.34 kb)  25.82 kb ▃███▂▂▂▂▂▁▁▂▁▁▁▁▁▁▁▁▁
                   3.36 ipc ( 97.79% cache)  383.74 branch misses
        168.88k cycles 567.55k instructions  14.22k c-refs  314.29 c-misses

node.isDeepStrictEqual        37.97 µs/iter  38.11 µs     █                
                      (37.18 µs … 39.98 µs)  38.98 µs     █ █              
                    (  8.38 kb …   8.38 kb)   8.38 kb █▁▁████▁▁▁█▁█▁▁▁▁▁▁▁█
                   3.56 ipc ( 98.64% cache)  218.61 branch misses
        145.86k cycles 519.58k instructions  11.91k c-refs  161.49 c-misses

summary
  object-equals
   1.17x faster than are-deeply-equal
   1.19x faster than node.isDeepStrictEqual
   1.21x faster than fast-equals
   1.37x faster than lodash.isEqual
   1.98x faster than dequal

• Object with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                694.95 µs/iter 697.87 µs  █                   
                    (668.01 µs … 965.24 µs) 875.89 µs  █                   
                    (128.17 kb … 472.88 kb) 146.34 kb ██▅▄▃▄▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.53 ipc ( 93.01% cache)  53.78k branch misses
          2.78M cycles   4.26M instructions 238.90k c-refs  16.70k c-misses

are-deeply-equal             780.04 µs/iter 771.63 µs  █                   
                      (744.29 µs … 1.09 ms) 984.91 µs  █                   
                    (192.45 kb … 225.16 kb) 219.22 kb ▅██▃▁▂▃▂▁▁▁▁▁▁▁▁▁▂▁▁▁
                   1.51 ipc ( 93.07% cache)  59.82k branch misses
          3.12M cycles   4.69M instructions 270.51k c-refs  18.75k c-misses

fast-equals                  792.80 µs/iter 786.30 µs  █                   
                      (765.39 µs … 1.06 ms) 966.10 µs  █▅                  
                    (128.17 kb … 161.13 kb) 146.09 kb ▃██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.65 ipc ( 93.61% cache)  54.22k branch misses
          3.02M cycles   4.98M instructions 228.87k c-refs  14.62k c-misses

dequal                       946.56 µs/iter 966.24 µs            ▄█▄       
                      (893.81 µs … 1.09 ms)   1.01 ms   ▄▆     ▂▅███       
                    (128.14 kb … 161.02 kb) 146.09 kb ▃████▅▆▅▅██████▂▂▂▂▂▂
                   1.71 ipc ( 93.57% cache)  56.42k branch misses
          3.72M cycles   6.36M instructions 253.60k c-refs  16.31k c-misses

lodash.isEqual               842.46 µs/iter 849.78 µs  ▃  █                
                      (792.04 µs … 1.47 ms)   1.08 ms  █  █                
                    (122.71 kb … 877.27 kb) 221.88 kb ▇████▃▂▂▁▁▂▂▁▁▁▁▂▁▁▁▁
                   1.60 ipc ( 93.82% cache)  61.95k branch misses
          3.29M cycles   5.26M instructions 283.99k c-refs  17.55k c-misses

node.isDeepStrictEqual       747.63 µs/iter 747.81 µs   █▃                 
                    (730.85 µs … 954.62 µs) 834.74 µs  ▆██                 
                    ( 31.64 kb … 419.14 kb) 219.24 kb ▄████▃▂▂▂▂▁▁▁▁▁▂▁▁▁▁▁
                   1.56 ipc ( 93.31% cache)  58.20k branch misses
          3.04M cycles   4.75M instructions 259.66k c-refs  17.36k c-misses

summary
  object-equals
   1.08x faster than node.isDeepStrictEqual
   1.12x faster than are-deeply-equal
   1.14x faster than fast-equals
   1.21x faster than lodash.isEqual
   1.36x faster than dequal

• Object with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                  3.91 ms/iter   3.92 ms  █                   
                        (3.76 ms … 4.64 ms)   4.60 ms ▄█                   
                    (512.23 kb … 513.94 kb) 512.24 kb ███▅▅▃▂▂▃▁▂▂▁▃▁▂▁▁▁▂▁
                   1.35 ipc ( 77.60% cache) 259.96k branch misses
         13.65M cycles  18.49M instructions   1.30M c-refs 290.68k c-misses

are-deeply-equal               4.39 ms/iter   4.40 ms   █                  
                        (4.26 ms … 5.19 ms)   4.97 ms  ▅█▇                 
                    (768.54 kb … 769.88 kb) 768.55 kb ▂████▇▂▂▁▃▂▁▂▂▁▁▁▁▁▁▁
                   1.36 ipc ( 77.82% cache) 290.04k branch misses
         15.28M cycles  20.78M instructions   1.49M c-refs 331.41k c-misses

fast-equals                    4.12 ms/iter   4.11 ms  █                   
                        (3.99 ms … 5.11 ms)   5.00 ms  █▂                  
                    (512.23 kb … 513.62 kb) 512.24 kb ▅██▄▄▂▁▂▁▁▁▁▂▁▁▂▁▁▁▁▁
                   1.51 ipc ( 77.98% cache) 254.54k branch misses
         14.62M cycles  22.15M instructions   1.32M c-refs 289.71k c-misses

dequal                         4.77 ms/iter   4.82 ms       █▆▅            
                        (4.45 ms … 5.60 ms)   5.35 ms       ███▂           
                    (466.64 kb … 560.23 kb) 512.23 kb ▄▂▄▂▃▇████▃▄▁▃▁▁▁▁▁▁▂
                   1.58 ipc ( 77.95% cache) 266.50k branch misses
         17.32M cycles  27.39M instructions   1.36M c-refs 300.32k c-misses

lodash.isEqual                 4.48 ms/iter   4.58 ms  █                   
                        (4.20 ms … 5.44 ms)   5.30 ms ██   ▇▂              
                    (634.64 kb …   1.94 mb) 779.98 kb ██▆▆▄██▆▄▂▃▃▄▄▂▂▂▂▃▁▂
                   1.41 ipc ( 77.74% cache) 292.93k branch misses
         15.96M cycles  22.47M instructions   1.55M c-refs 345.63k c-misses

node.isDeepStrictEqual         4.32 ms/iter   4.33 ms  █▂                  
                        (4.26 ms … 4.97 ms)   4.70 ms  ██▃                 
                    (768.36 kb … 771.55 kb) 768.38 kb ▇███▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.34 ipc ( 76.76% cache) 289.44k branch misses
         15.16M cycles  20.24M instructions   1.42M c-refs 329.65k c-misses

summary
  object-equals
   1.06x faster than fast-equals
   1.11x faster than node.isDeepStrictEqual
   1.12x faster than are-deeply-equal
   1.15x faster than lodash.isEqual
   1.22x faster than dequal
```

</details>

### Nested Object with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 3.99 µs | 180.93 µs | 8.53 ms | 36.73 ms | 1.00x (baseline) |
| fast-equals | 18.66 µs | 659.85 µs | 11.73 ms | 51.14 ms | 4.68x-1.39x slower |
| dequal | 19.09 µs | 1.01 ms | 13.57 ms | 61.98 ms | 4.79x-1.69x slower |
| node.isDeepStrictEqual | 19.45 µs | 608.04 µs | 11.21 ms | 51.27 ms | 4.88x-1.40x slower |
| are-deeply-equal | 20.47 µs | 677.69 µs | 13.38 ms | 61.65 ms | 5.13x-1.68x slower |
| lodash.isEqual | 29.15 µs | 1.04 ms | 16.18 ms | 71.95 ms | 7.31x-1.96x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.82 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Object with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  3.99 µs/iter   4.03 µs  ▄  █                
                        (3.91 µs … 4.12 µs)   4.10 µs  █ ▅█▅   ▅▅     ▅    
                    (  7.22 kb …   7.23 kb)   7.22 kb ██▅███▅▅▅██▁▅▅▁▅█▁▅█▅
                   3.24 ipc ( 97.94% cache)   26.27 branch misses
         16.30k cycles  52.82k instructions  982.95 c-refs   20.25 c-misses

are-deeply-equal              20.47 µs/iter  20.37 µs █                    
                      (20.02 µs … 21.59 µs)  21.45 µs ███                  
                    ( 10.36 kb …  10.37 kb)  10.37 kb ████▁█▁▁▁▁▁▁▁▁▁▁▁▁▁██
                   2.79 ipc ( 98.30% cache)   66.78 branch misses
         77.81k cycles 216.94k instructions   1.95k c-refs   33.17 c-misses

fast-equals                   18.66 µs/iter  19.00 µs   ▇  █               
                     (17.12 µs … 200.50 µs)  23.56 µs  ▇█▅ █▇▂             
                    (  4.59 kb … 252.41 kb)   7.74 kb ▁███████▅▂▁▁▁▁▁▁▁▁▁▁▁
                   2.73 ipc ( 98.48% cache)   56.79 branch misses
         75.22k cycles 205.56k instructions   1.97k c-refs   29.99 c-misses

dequal                        19.09 µs/iter  19.11 µs        █  █          
                      (18.69 µs … 19.89 µs)  19.54 µs ▅▅  ▅▅ █ ▅█ ▅       ▅
                    (  3.61 kb …   3.62 kb)   3.61 kb ██▁▁██▁█▁██▁█▁▁▁▁▁▁▁█
                   2.68 ipc ( 99.00% cache)   26.64 branch misses
         78.03k cycles 208.85k instructions   1.49k c-refs   14.96 c-misses

lodash.isEqual                29.15 µs/iter  28.89 µs   █                  
                     (27.93 µs … 252.78 µs)  35.56 µs  ▇█                  
                    (  2.03 kb … 612.27 kb)  14.95 kb ▁██▇▂▁▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.66 ipc ( 97.83% cache)   63.46 branch misses
        121.31k cycles 322.50k instructions   5.77k c-refs  125.45 c-misses

node.isDeepStrictEqual        19.45 µs/iter  19.27 µs     █                
                     (17.27 µs … 237.33 µs)  26.13 µs     █                
                    (912.00  b … 273.44 kb)   9.12 kb ▁▁▁██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.72 ipc ( 98.67% cache)   56.87 branch misses
         76.01k cycles 206.97k instructions   2.51k c-refs   33.23 c-misses

summary
  object-equals
   4.68x faster than fast-equals
   4.79x faster than dequal
   4.88x faster than node.isDeepStrictEqual
   5.13x faster than are-deeply-equal
   7.31x faster than lodash.isEqual

• Nested Object with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                180.93 µs/iter 180.51 µs   █                  
                    (174.24 µs … 434.02 µs) 213.86 µs  ▄█                  
                    (232.00  b … 643.56 kb) 237.28 kb ▁██▇▆▅▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.96 ipc ( 80.12% cache)  911.68 branch misses
        699.13k cycles   2.07M instructions  68.75k c-refs  13.67k c-misses

are-deeply-equal             677.69 µs/iter 688.34 µs      ██              
                    (636.52 µs … 991.67 µs) 819.38 µs  ▅▅  ██              
                    (338.62 kb … 384.68 kb) 341.70 kb ▃██▇▆██▃▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.69 ipc ( 79.63% cache)   2.30k branch misses
          2.67M cycles   7.16M instructions 152.67k c-refs  31.11k c-misses

fast-equals                  659.85 µs/iter 649.81 µs   █                  
                      (609.59 µs … 1.07 ms) 847.68 µs   █                  
                    (236.17 kb … 256.20 kb) 236.40 kb ▁▅██▃▁▁▁▁▂▁▂▂▄▃▁▁▁▁▁▁
                   2.76 ipc ( 79.59% cache)   1.27k branch misses
          2.46M cycles   6.78M instructions 109.44k c-refs  22.33k c-misses

dequal                         1.01 ms/iter   1.01 ms     █                
                      (973.07 µs … 1.25 ms)   1.13 ms    ▄█▅               
                    (126.14 kb … 324.13 kb) 128.48 kb ▃█▇███▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.49 ipc ( 75.68% cache)   2.88k branch misses
          3.86M cycles   9.61M instructions 114.36k c-refs  27.81k c-misses

lodash.isEqual                 1.04 ms/iter   1.04 ms     █▂               
                      (987.58 µs … 1.32 ms)   1.19 ms     ██               
                    (232.80 kb …   1.11 mb) 443.21 kb ▂▂▄▄██▆▃▂▁▂▂▁▁▁▁▁▁▁▁▁
                   2.59 ipc ( 87.38% cache)   6.13k branch misses
          4.03M cycles  10.44M instructions 257.68k c-refs  32.53k c-misses

node.isDeepStrictEqual       608.04 µs/iter 610.65 µs    █                 
                    (585.32 µs … 873.17 µs) 718.15 µs  ▄██▇                
                    (237.37 kb … 333.46 kb) 284.31 kb ▃████▇▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.73 ipc ( 76.99% cache)   1.21k branch misses
          2.49M cycles   6.77M instructions 112.22k c-refs  25.82k c-misses

summary
  object-equals
   3.36x faster than node.isDeepStrictEqual
   3.65x faster than fast-equals
   3.75x faster than are-deeply-equal
   5.56x faster than dequal
   5.74x faster than lodash.isEqual

• Nested Object with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  8.53 ms/iter   8.55 ms █▃                   
                        (8.06 ms … 9.91 ms)   9.84 ms ███                  
                    (  2.13 mb …   2.16 mb)   2.14 mb ███▃▇▄▁▁▂▁▁▂▄▁▁▃▁▂▇▄▄
                   1.50 ipc ( 80.90% cache)  71.66k branch misses
         32.60M cycles  48.79M instructions   1.92M c-refs 366.23k c-misses

are-deeply-equal              13.38 ms/iter  13.32 ms  ▆█                  
                      (12.94 ms … 15.53 ms)  15.48 ms ▅██                  
                    (  2.27 mb …   3.17 mb)   3.14 mb ████▄▄▃▁▄▁▁▁▁▁▁▁▁▁▁▁▆
                   1.75 ipc ( 86.71% cache) 101.11k branch misses
         51.17M cycles  89.53M instructions   3.17M c-refs 421.32k c-misses

fast-equals                   11.73 ms/iter  11.80 ms  ▄█ ▄      █         
                      (11.60 ms … 12.06 ms)  11.96 ms  █████ ▅▅  ██ █      
                    (  2.13 mb …   2.16 mb)   2.14 mb ██████████▅██▁█▁█▁▅▁█
                   1.64 ipc ( 76.24% cache)  72.18k branch misses
         45.14M cycles  74.07M instructions   1.66M c-refs 394.89k c-misses

dequal                        13.57 ms/iter  13.79 ms                █     
                      (13.17 ms … 13.89 ms)  13.89 ms  ▆▆▃ ▆  ▃      █▃▃▆▆▃
                    (  1.28 mb …   1.29 mb)   1.29 mb ▄███▄█▁▄█▄▁▄▁▄▁██████
                   1.80 ipc ( 82.98% cache)  84.35k branch misses
         53.82M cycles  96.98M instructions   2.06M c-refs 350.62k c-misses

lodash.isEqual                16.18 ms/iter  16.47 ms   █                  
                      (15.81 ms … 16.82 ms)  16.80 ms   █▃                 
                    (  4.01 mb …   4.46 mb)   4.02 mb ▃▇██▅▁▅▁▁▃▅▃▃▃▅▁█▁▃▃▃
                   1.81 ipc ( 93.16% cache) 112.62k branch misses
         65.35M cycles 118.22M instructions   6.91M c-refs 472.58k c-misses

node.isDeepStrictEqual        11.21 ms/iter  11.25 ms    ▂█▂  █            
                      (11.06 ms … 11.57 ms)  11.46 ms   ▅███▇▂█▇▂          
                    (  2.51 mb …   2.54 mb)   2.54 mb ▄▄█████████▄▁▄▄▄▇▄▁▁▄
                   1.63 ipc ( 86.14% cache)  78.78k branch misses
         45.80M cycles  74.53M instructions   2.79M c-refs 386.88k c-misses

summary
  object-equals
   1.31x faster than node.isDeepStrictEqual
   1.38x faster than fast-equals
   1.57x faster than are-deeply-equal
   1.59x faster than dequal
   1.9x faster than lodash.isEqual

• Nested Object with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 36.73 ms/iter  36.77 ms   █                  
                      (36.36 ms … 37.72 ms)  37.60 ms ▂ █ ▇  ▂             
                    (  8.60 mb …   8.60 mb)   8.60 mb █▁█▆█▁▁█▁▁▁▁▁▁▁▆▁▁▁▁▆
                   1.32 ipc ( 74.96% cache) 327.27k branch misses
        148.62M cycles 195.86M instructions   7.08M c-refs   1.77M c-misses

are-deeply-equal              61.65 ms/iter  61.46 ms       █              
                      (60.66 ms … 65.22 ms)  63.17 ms  ██   █              
                    ( 12.50 mb …  12.56 mb)  12.53 mb ███▁▁██▁█▁▁▁▁▁▁▁▁▁▁▁█
                   1.46 ipc ( 81.40% cache) 443.13k branch misses
        246.26M cycles 358.88M instructions  12.60M c-refs   2.34M c-misses

fast-equals                   51.14 ms/iter  51.15 ms  ██                  
                      (50.93 ms … 51.50 ms)  51.47 ms ▅██▅    ▅          ▅▅
                    (  8.58 mb …   8.58 mb)   8.58 mb ████▁▁▁▁█▁▁▁▁▁▁▁▁▁▁██
                   1.45 ipc ( 74.16% cache) 324.73k branch misses
        208.75M cycles 303.38M instructions   7.99M c-refs   2.07M c-misses

dequal                        61.98 ms/iter  62.01 ms      ██ █   █        
                      (61.29 ms … 64.30 ms)  62.51 ms ▅   ▅██ █   █       ▅
                    (  5.17 mb …   5.19 mb)   5.19 mb █▁▁▁███▁█▁▁▁█▁▁▁▁▁▁▁█
                   1.57 ipc ( 79.06% cache) 389.79k branch misses
        252.13M cycles 396.10M instructions   9.83M c-refs   2.06M c-misses

lodash.isEqual                71.95 ms/iter  72.71 ms █                    
                      (69.40 ms … 79.58 ms)  74.03 ms █             █      
                    ( 16.13 mb …  16.21 mb)  16.14 mb ██▁█▁▁▁▁▁██▁▁▁█▁█▁▁▁█
                   1.70 ipc ( 91.63% cache) 493.84k branch misses
        283.53M cycles 482.36M instructions  29.31M c-refs   2.45M c-misses

node.isDeepStrictEqual        51.27 ms/iter  51.36 ms █ █   ██ ██    █ █  █
                      (51.03 ms … 51.56 ms)  51.48 ms █ █   ██ ██    █ █  █
                    ( 10.10 mb …  10.13 mb)  10.13 mb █▁█▁▁▁██▁██▁▁▁▁█▁█▁▁█
                   1.47 ipc ( 83.72% cache) 354.52k branch misses
        208.80M cycles 306.59M instructions  12.95M c-refs   2.11M c-misses

summary
  object-equals
   1.39x faster than fast-equals
   1.4x faster than node.isDeepStrictEqual
   1.68x faster than are-deeply-equal
   1.69x faster than dequal
   1.96x faster than lodash.isEqual
```

</details>

### Array with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 82.33 ns | 2.39 µs | 17.81 µs | 72.42 µs | 1.00x (baseline) |
| dequal | 148.52 ns | 4.06 µs | 32.60 µs | 134.75 µs | 1.80x-1.86x slower |
| fast-equals | 161.44 ns | 4.32 µs | 33.20 µs | 137.47 µs | 1.96x-1.90x slower |
| are-deeply-equal | 203.61 ns | 4.05 µs | 32.62 µs | 136.20 µs | 2.47x-1.88x slower |
| lodash.isEqual | 230.45 ns | 3.75 µs | 27.93 µs | 109.87 µs | 2.80x-1.52x slower |
| node.isDeepStrictEqual | 462.38 ns | 4.31 µs | 30.62 µs | 121.78 µs | 5.62x-1.68x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.70 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Array with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                 82.33 ns/iter  82.15 ns  █▅                  
                     (78.53 ns … 173.76 ns) 113.85 ns  ██                  
                    (  0.10  b … 104.21  b)   0.41  b ▆██▆▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.03 ipc ( 86.99% cache)    0.01 branch misses
         334.20 cycles   1.35k instructions    0.09 c-refs    0.01 c-misses

are-deeply-equal             203.61 ns/iter 206.48 ns  █                   
                    (191.05 ns … 272.43 ns) 250.34 ns  █▆  █               
                    ( 23.86  b … 328.23  b) 184.24  b ▃██▆▅█▇▃▂▁▁▁▂▁▁▂▂▂▂▁▁
                   3.14 ipc ( 95.95% cache)    1.02 branch misses
         808.21 cycles   2.54k instructions    6.29 c-refs    0.25 c-misses

fast-equals                  161.44 ns/iter 163.63 ns   █                  
                    (156.54 ns … 238.54 ns) 176.34 ns  ████   █            
                    (  0.09  b … 144.15  b)   0.68  b ▅█████▄██▇▃▂▂▁▁▁▁▁▁▁▁
                   3.71 ipc ( 99.96% cache)    1.01 branch misses
         622.41 cycles   2.31k instructions   28.00 c-refs    0.01 c-misses

dequal                       148.52 ns/iter 151.87 ns        █▅            
                    (137.42 ns … 198.44 ns) 166.51 ns     ▂▂▇██   ▇▄       
                    (  0.09  b … 130.16  b)   0.54  b ▂▇█▇██████▃▃██▄▂▁▁▁▁▁
                   3.70 ipc ( 90.00% cache)    1.01 branch misses
         581.78 cycles   2.15k instructions    0.09 c-refs    0.01 c-misses

lodash.isEqual               230.45 ns/iter 230.05 ns   █                  
                    (221.05 ns … 347.38 ns) 279.52 ns  ▂█▇                 
                    (220.38  b … 762.50  b) 528.25  b ▃███▆▃▂▁▁▁▁▁▁▁▁▁▁▁▂▂▁
                   3.37 ipc ( 95.93% cache)    1.03 branch misses
         946.63 cycles   3.19k instructions   18.02 c-refs    0.73 c-misses

node.isDeepStrictEqual       462.38 ns/iter 460.00 ns    █                 
                     (420.00 ns … 44.22 µs) 660.00 ns   ▃█                 
                    (440.00  b … 465.69 kb) 453.76  b ▁▂██▂▂▃▃▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.61 ipc ( 99.76% cache)   31.05 branch misses
          3.26k cycles   5.27k instructions  379.29 c-refs    0.91 c-misses

summary
  object-equals
   1.8x faster than dequal
   1.96x faster than fast-equals
   2.47x faster than are-deeply-equal
   2.8x faster than lodash.isEqual
   5.62x faster than node.isDeepStrictEqual

• Array with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  2.39 µs/iter   2.43 µs     ▂ ▂ █▂▅          
                        (2.18 µs … 2.76 µs)   2.68 µs  ▅▂▅█▂█▅███  ▂ ▂ ▂   
                    (  0.10  b …   0.53  b)   0.11  b ▄██████████▇▁█▁█▄█▄▇▄
                   3.73 ipc ( 99.96% cache)    1.04 branch misses
          9.77k cycles  36.41k instructions   1.02k c-refs    0.43 c-misses

are-deeply-equal               4.05 µs/iter   4.13 µs              █       
                        (3.84 µs … 4.57 µs)   4.27 µs ▃▃█         ██▃▃▃    
                    ( 48.96  b … 184.50  b) 180.71  b ███▄▄▁█▁▁▄▁▁█████▁▁▁▄
                   3.84 ipc ( 99.73% cache)    1.10 branch misses
         16.24k cycles  62.38k instructions  499.13 c-refs    1.35 c-misses

fast-equals                    4.32 µs/iter   4.35 µs █                    
                        (4.19 µs … 4.89 µs)   4.81 µs █ ▃▃                 
                    (  0.09  b …   0.45  b)   0.10  b █▇██▅▅▃▃▁▁▅▁▁▃▁▁▁▃▁▁▃
                   4.00 ipc ( 99.86% cache)    2.10 branch misses
         16.48k cycles  65.94k instructions  415.35 c-refs    0.57 c-misses

dequal                         4.06 µs/iter   4.09 µs   █▃                 
                        (3.98 µs … 4.28 µs)   4.25 µs   ██▃                
                    (  0.09  b …   0.41  b)   0.10  b ▆████▄▁▆█▄▁▁▁▁▁▆▁▄▄▁▆
                   3.97 ipc ( 99.89% cache)    1.06 branch misses
         15.71k cycles  62.33k instructions  270.23 c-refs    0.31 c-misses

lodash.isEqual                 3.75 µs/iter   3.75 µs ▃█                   
                        (3.66 µs … 4.66 µs)   4.06 µs ██ █▇                
                    (519.58  b … 551.58  b) 528.92  b ██▆██▆▁▃▆▃▁▁▃▁▁▁▁▁▁▁▃
                   4.15 ipc ( 99.27% cache)    1.18 branch misses
         14.62k cycles  60.69k instructions  487.42 c-refs    3.54 c-misses

node.isDeepStrictEqual         4.31 µs/iter   4.34 µs ▃    █  ▃█           
                        (4.18 µs … 4.52 µs)   4.47 µs █    █  ██▂▂▂▂      ▇
                    ( 55.97  b …  64.90  b)  63.83  b █▆▁▆▆█▆▆██████▁▁▁▁▁▆█
                   3.57 ipc ( 99.86% cache)    2.10 branch misses
         16.67k cycles  59.43k instructions  512.23 c-refs    0.72 c-misses

summary
  object-equals
   1.57x faster than lodash.isEqual
   1.69x faster than are-deeply-equal
   1.7x faster than dequal
   1.8x faster than node.isDeepStrictEqual
   1.81x faster than fast-equals

• Array with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 17.81 µs/iter  17.80 µs        █ █           
                      (17.11 µs … 18.89 µs)  18.65 µs        █ █           
                    (  0.10  b …   0.53  b)   0.14  b ██▁▁█▁▁█▁█▁▁▁█▁▁▁▁▁▁█
                   4.14 ipc ( 98.01% cache)    1.22 branch misses
         69.98k cycles 289.79k instructions   6.96k c-refs  138.21 c-misses

are-deeply-equal              32.62 µs/iter  32.76 µs               █ █    
                      (30.91 µs … 35.80 µs)  32.94 µs ▅         ▅ ▅ █▅█ ▅▅▅
                    (184.14  b … 184.48  b) 184.19  b █▁▁▁▁▁▁▁▁▁█▁█▁███▁███
                   3.97 ipc ( 98.93% cache)    1.69 branch misses
        124.80k cycles 494.95k instructions   5.58k c-refs   59.70 c-misses

fast-equals                   33.20 µs/iter  33.98 µs                     █
                      (32.07 µs … 34.05 µs)  34.01 µs   █                ██
                    (  0.10  b …   0.45  b)   0.13  b ███▁▁█▁▁▁▁▁▁█▁▁▁▁▁▁██
                   4.02 ipc ( 99.00% cache)    3.14 branch misses
        131.13k cycles 527.39k instructions   5.88k c-refs   58.52 c-misses

dequal                        32.60 µs/iter  32.80 µs      █               
                      (31.82 µs … 35.14 µs)  33.26 µs      █               
                    (  0.10  b …   0.41  b)   0.13  b ▇▇▁▇▁█▁▁▁▇▁▁▁▁▇▁▇▁▁▁▇
                   4.01 ipc ( 99.82% cache)    1.34 branch misses
        123.90k cycles 497.28k instructions   4.34k c-refs    8.04 c-misses

lodash.isEqual                27.93 µs/iter  28.43 µs  █                   
                      (26.62 µs … 29.89 µs)  28.61 µs  █                █  
                    (423.10  b … 529.23  b) 519.49  b ██▁▁▁▁▁▁▁▁▁▁▁█▁▁█████
                   4.30 ipc ( 98.09% cache)    1.56 branch misses
        110.21k cycles 473.46k instructions   5.76k c-refs  110.07 c-misses

node.isDeepStrictEqual        30.62 µs/iter  31.08 µs      █             █ 
                      (29.71 µs … 32.45 µs)  31.17 µs ▅▅ ▅▅█           ▅▅█▅
                    ( 64.10  b …  64.10  b)  64.10  b ██▁███▁▁▁▁▁▁▁▁▁▁▁████
                   3.68 ipc ( 99.12% cache)    1.68 branch misses
        124.74k cycles 458.55k instructions   5.21k c-refs   45.65 c-misses

summary
  object-equals
   1.57x faster than lodash.isEqual
   1.72x faster than node.isDeepStrictEqual
   1.83x faster than dequal
   1.83x faster than are-deeply-equal
   1.86x faster than fast-equals

• Array with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 72.42 µs/iter  73.48 µs    █                 
                     (68.94 µs … 128.78 µs)  85.85 µs  ▄██                 
                    (360.00  b … 192.45 kb) 652.97  b ▂████▆▆▆▅▃▂▂▁▁▁▁▁▁▁▁▁
                   3.91 ipc ( 91.04% cache)   33.72 branch misses
        296.28k cycles   1.16M instructions  41.84k c-refs   3.75k c-misses

are-deeply-equal             136.20 µs/iter 136.29 µs    █                 
                    (122.18 µs … 389.85 µs) 193.09 µs   ▆█▄                
                    (544.00  b … 192.63 kb)   1.22 kb ▃████▆▃▂▂▂▂▂▂▁▁▁▁▁▁▁▁
                   3.80 ipc ( 93.22% cache)   38.84 branch misses
        524.72k cycles   1.99M instructions  42.10k c-refs   2.86k c-misses

fast-equals                  137.47 µs/iter 137.53 µs █                    
                    (133.58 µs … 239.86 µs) 187.91 µs █                    
                    (  0.00  b … 224.10 kb) 630.84  b ██▇▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.98 ipc ( 96.92% cache)   37.17 branch misses
        529.63k cycles   2.11M instructions  38.49k c-refs   1.19k c-misses

dequal                       134.75 µs/iter 135.74 µs       █              
                    (122.51 µs … 259.29 µs) 166.36 µs       █              
                    (  0.00  b … 160.44 kb) 507.74  b ▃▄▃▄▅▁█▂▄▂▁▁▁▁▁▁▁▁▁▁▁
                   3.79 ipc ( 90.38% cache)   35.62 branch misses
        525.46k cycles   1.99M instructions  39.04k c-refs   3.76k c-misses

lodash.isEqual               109.87 µs/iter 107.70 µs █                    
                    (105.76 µs … 658.59 µs) 164.80 µs █▄                   
                    (528.00  b … 464.93 kb)   1.75 kb ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.23 ipc ( 96.31% cache)   37.84 branch misses
        448.73k cycles   1.90M instructions  36.79k c-refs   1.36k c-misses

node.isDeepStrictEqual       121.78 µs/iter 122.61 µs   █▂                 
                    (115.90 µs … 241.10 µs) 149.09 µs  ▇██▃                
                    ( 64.00  b … 228.95 kb) 678.65  b ▃█████▅▃▂▂▁▁▁▁▁▁▁▁▁▁▁
                   3.67 ipc ( 96.43% cache)   36.88 branch misses
        497.90k cycles   1.83M instructions  35.84k c-refs   1.28k c-misses

summary
  object-equals
   1.52x faster than lodash.isEqual
   1.68x faster than node.isDeepStrictEqual
   1.86x faster than dequal
   1.88x faster than are-deeply-equal
   1.9x faster than fast-equals
```

</details>

### Nested Array with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 2.19 µs | 82.92 µs | 623.37 µs | 4.27 ms | 1.00x (baseline) |
| dequal | 3.11 µs | 103.05 µs | 855.45 µs | 5.89 ms | 1.42x-1.38x slower |
| fast-equals | 3.41 µs | 113.04 µs | 865.02 µs | 6.01 ms | 1.56x-1.41x slower |
| are-deeply-equal | 4.07 µs | 141.15 µs | 1.21 ms | 7.92 ms | 1.86x-1.85x slower |
| lodash.isEqual | 6.04 µs | 177.29 µs | 1.39 ms | 8.32 ms | 2.76x-1.95x slower |
| node.isDeepStrictEqual | 8.06 µs | 249.32 µs | 1.96 ms | 10.62 ms | 3.68x-2.49x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.66 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Array with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  2.19 µs/iter   2.25 µs  ▃▅▃ █               
                        (2.10 µs … 2.52 µs)   2.36 µs  ███▆█▆▃    ▆▃▃      
                    (  0.16  b …  10.45  b)   0.31  b ████████▄▆▆▆███▁▆▄▁▄▆
                   3.55 ipc ( 99.58% cache)   21.11 branch misses
          8.93k cycles  31.66k instructions  114.88 c-refs    0.49 c-misses

are-deeply-equal               4.07 µs/iter   4.15 µs  █                   
                        (3.97 µs … 4.27 µs)   4.24 µs  █                   
                    (  1.82 kb …   1.83 kb)   1.83 kb ███▆▆▁▃▆▃▁▁▃█▃█▆▃▃▃▁▃
                   3.27 ipc ( 98.68% cache)   39.67 branch misses
         16.54k cycles  54.11k instructions  383.08 c-refs    5.04 c-misses

fast-equals                    3.41 µs/iter   3.49 µs      █     ▅         
                        (3.16 µs … 3.75 µs)   3.72 µs     ██     █▃        
                    (  0.15  b …   2.43  b)   0.21  b ▆▄▆▁██▄▁▆▄▄██▆▁▄█▁▁▄▆
                   3.62 ipc ( 99.65% cache)   24.11 branch misses
         13.01k cycles  47.08k instructions  138.15 c-refs    0.48 c-misses

dequal                         3.11 µs/iter   3.16 µs  ▃       █▅          
                        (2.96 µs … 3.34 µs)   3.34 µs  █▃      ██▆         
                    (  0.15  b …   2.32  b)   0.20  b ███▄▁▆▄▆▄███▄▆▄▆▄▁▁▁▄
                   3.57 ipc ( 99.41% cache)   24.09 branch misses
         12.01k cycles  42.86k instructions   78.16 c-refs    0.46 c-misses

lodash.isEqual                 6.04 µs/iter   6.08 µs  █     █             
                        (5.95 µs … 6.16 µs)   6.16 µs  █ █ █ ██  ██   █    
                    (  5.56 kb …   5.78 kb)   5.67 kb ██▁█▁████▁████▁▁██▁▁█
                   3.09 ipc ( 97.45% cache)   24.62 branch misses
         23.39k cycles  72.26k instructions  535.77 c-refs   13.65 c-misses

node.isDeepStrictEqual         8.06 µs/iter   8.09 µs    █                 
                       (7.37 µs … 81.43 µs)  12.06 µs    █                 
                    (672.00  b … 306.52 kb)   1.79 kb █▅▄█▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.66 ipc ( 99.49% cache)   56.42 branch misses
         32.88k cycles  87.44k instructions   1.00k c-refs    5.14 c-misses

summary
  object-equals
   1.42x faster than dequal
   1.56x faster than fast-equals
   1.86x faster than are-deeply-equal
   2.76x faster than lodash.isEqual
   3.68x faster than node.isDeepStrictEqual

• Nested Array with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 82.92 µs/iter  82.55 µs     █                
                     (77.31 µs … 214.26 µs) 102.01 µs    ▅█                
                    (360.00  b … 208.10 kb) 783.32  b ▃█▂██▂▂▂▃▂▁▁▂▁▁▂▁▁▁▁▁
                   3.19 ipc ( 70.93% cache)  716.32 branch misses
        316.53k cycles   1.01M instructions  31.85k c-refs   9.26k c-misses

are-deeply-equal             141.15 µs/iter 141.73 µs █                    
                    (135.96 µs … 502.33 µs) 204.41 µs ██▂                  
                    (424.00  b … 265.36 kb)  61.19 kb ███▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.16 ipc ( 77.01% cache)   1.36k branch misses
        540.37k cycles   1.71M instructions  41.42k c-refs   9.52k c-misses

fast-equals                  113.04 µs/iter 114.20 µs  ▃  █▂               
                    (106.80 µs … 223.84 µs) 137.34 µs  █ ███               
                    (  0.00  b … 172.83 kb) 563.26  b ▅█████▇▄▄▂▂▁▁▁▁▁▁▁▁▁▁
                   3.44 ipc ( 81.62% cache)  806.78 branch misses
        436.12k cycles   1.50M instructions  27.66k c-refs   5.09k c-misses

dequal                       103.05 µs/iter 107.72 µs  █       ▅           
                     (95.56 µs … 181.34 µs) 121.87 µs  █   ▆   █           
                    (  0.00  b … 160.44 kb) 409.26  b ▃██▅▇█▃▂▂██▂▂▄▂▁▁▁▁▁▁
                   3.41 ipc ( 80.58% cache)  815.14 branch misses
        407.73k cycles   1.39M instructions  26.96k c-refs   5.24k c-misses

lodash.isEqual               177.29 µs/iter 175.50 µs   █                  
                    (160.41 µs … 648.89 µs) 275.77 µs   █                  
                    ( 32.02 kb … 458.55 kb) 166.74 kb ▃▃█▇▂▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   3.32 ipc ( 94.70% cache)  861.99 branch misses
        675.02k cycles   2.24M instructions  37.42k c-refs   1.98k c-misses

node.isDeepStrictEqual       249.32 µs/iter 250.53 µs    █                 
                    (240.70 µs … 401.26 µs) 279.37 µs   ▆█▂▂               
                    ( 40.08 kb … 328.18 kb)  41.02 kb ▁▂████▆▄▂▂▂▁▁▁▁▁▁▁▁▁▁
                   2.79 ipc ( 94.99% cache)  834.22 branch misses
        960.93k cycles   2.69M instructions  32.47k c-refs   1.63k c-misses

summary
  object-equals
   1.24x faster than dequal
   1.36x faster than fast-equals
   1.7x faster than are-deeply-equal
   2.14x faster than lodash.isEqual
   3.01x faster than node.isDeepStrictEqual

• Nested Array with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                623.37 µs/iter 639.31 µs     ▃     ▂█         
                    (573.94 µs … 782.21 µs) 690.68 µs    ▆██▆▅▄▄██▆        
                    ( 48.00  b … 192.27 kb) 222.19  b ▂▃▄███████████▆▄▃▃▂▁▂
                   3.30 ipc ( 82.90% cache)   5.21k branch misses
          2.47M cycles   8.13M instructions 239.12k c-refs  40.88k c-misses

are-deeply-equal               1.21 ms/iter   1.22 ms  ▃█▄                 
                        (1.16 ms … 2.40 ms)   1.37 ms  ████▃               
                    (448.44 kb … 481.21 kb) 479.72 kb ▄██████▆▆▃▃▃▂▁▁▁▁▁▁▁▁
                   3.03 ipc ( 78.55% cache)  10.94k branch misses
          4.50M cycles  13.62M instructions 328.47k c-refs  70.46k c-misses

fast-equals                  865.02 µs/iter 863.93 µs  █                   
                      (822.21 µs … 1.55 ms)   1.13 ms  █                   
                    ( 48.00  b …   1.43 kb)  49.74  b ▆█▄▃▅▂▂▁▁▁▁▁▁▁▂▁▁▁▁▁▁
                   3.49 ipc ( 78.55% cache)   6.27k branch misses
          3.44M cycles  12.01M instructions 218.99k c-refs  46.97k c-misses

dequal                       855.45 µs/iter 849.64 µs   █                  
                      (814.34 µs … 1.22 ms)   1.07 ms  ▇█                  
                    ( 48.00  b …   1.28 kb)  49.53  b ▁██▅▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.41 ipc ( 78.11% cache)   6.20k branch misses
          3.26M cycles  11.13M instructions 220.85k c-refs  48.35k c-misses

lodash.isEqual                 1.39 ms/iter   1.39 ms  █                   
                        (1.36 ms … 1.87 ms)   1.61 ms  █▂                  
                    (851.82 kb …   1.29 mb)   1.29 mb ███▅▃▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.33 ipc ( 93.73% cache)   6.37k branch misses
          5.36M cycles  17.87M instructions 297.66k c-refs  18.65k c-misses

node.isDeepStrictEqual         1.96 ms/iter   1.99 ms  █▂                  
                        (1.86 ms … 2.47 ms)   2.32 ms  ██  ▂▇              
                    (320.11 kb … 320.13 kb) 320.11 kb ▃███▇██▅▃▂▂▂▂▂▂▁▂▁▂▁▁
                   2.80 ipc ( 95.91% cache)   6.43k branch misses
          7.72M cycles  21.64M instructions 267.26k c-refs  10.94k c-misses

summary
  object-equals
   1.37x faster than dequal
   1.39x faster than fast-equals
   1.94x faster than are-deeply-equal
   2.23x faster than lodash.isEqual
   3.14x faster than node.isDeepStrictEqual

• Nested Array with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                  4.27 ms/iter   4.31 ms       █              
                        (4.09 ms … 4.58 ms)   4.57 ms   ▃▂█████▃           
                    ( 48.00  b …   1.75 kb)  58.51  b ▃▇██████████▅▇▃▇▂▁▃▁▂
                   1.99 ipc ( 88.19% cache)  20.67k branch misses
         16.34M cycles  32.53M instructions   1.05M c-refs 123.46k c-misses

are-deeply-equal               7.92 ms/iter   7.96 ms        █             
                        (7.70 ms … 8.30 ms)   8.29 ms   ▃▅ ███▅▅           
                    (  1.75 mb …   1.78 mb)   1.78 mb ▄▃████████▆▄▃▃▄▁▄▃▄▃▃
                   1.97 ipc ( 83.21% cache)  43.46k branch misses
         27.61M cycles  54.51M instructions   1.46M c-refs 244.82k c-misses

fast-equals                    6.01 ms/iter   6.04 ms    █▄  ▃             
                        (5.87 ms … 6.35 ms)   6.31 ms  ▄▄███▄█             
                    ( 48.00  b …   1.43 kb)  60.00  b ▄█████████▆█▂▅▂▂▂▁▂▁▄
                   2.10 ipc ( 85.19% cache)  24.93k branch misses
         23.03M cycles  48.27M instructions   1.08M c-refs 160.25k c-misses

dequal                         5.89 ms/iter   5.94 ms   ▄▆█▄               
                        (5.79 ms … 6.19 ms)   6.12 ms ▂▅████▅██▅▄ ▄        
                    ( 48.00  b …   1.28 kb)  58.53  b ███████████▆█▃▅▁▃▅▃▁▃
                   1.97 ipc ( 83.76% cache)  24.73k branch misses
         22.63M cycles  44.50M instructions   1.02M c-refs 166.37k c-misses

lodash.isEqual                 8.32 ms/iter   8.48 ms  █▃                  
                        (8.02 ms … 9.14 ms)   8.77 ms  ██▂▂▅▅▅ █ ▂▂ ▅▂     
                    (  5.16 mb …   5.28 mb)   5.16 mb ▆███████▆█▃█████▆▃▆▃▃
                   2.17 ipc ( 83.51% cache)  25.35k branch misses
         33.12M cycles  71.81M instructions   1.31M c-refs 216.80k c-misses

node.isDeepStrictEqual        10.62 ms/iter  10.70 ms        █ ▂           
                      (10.39 ms … 10.96 ms)  10.94 ms  ▅ ▅▇▅▂█▇█▂▂▂▂       
                    (  1.25 mb …   1.25 mb)   1.25 mb ▄█▇███████████▄▇▇▁▇▁▄
                   2.14 ipc ( 84.58% cache)  25.27k branch misses
         40.56M cycles  86.60M instructions   1.19M c-refs 184.19k c-misses

summary
  object-equals
   1.38x faster than dequal
   1.41x faster than fast-equals
   1.85x faster than are-deeply-equal
   1.95x faster than lodash.isEqual
   2.49x faster than node.isDeepStrictEqual
```

</details>

### Map with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 395.99 ns | 17.50 µs | 200.67 µs | 735.97 µs | 1.00x (baseline) |
| dequal | 508.43 ns | 19.43 µs | 213.86 µs | 797.60 µs | 1.28x-1.08x slower |
| are-deeply-equal | 609.52 ns | 21.74 µs | 214.69 µs | 826.17 µs | 1.54x-1.12x slower |
| node.isDeepStrictEqual | 764.66 ns | 18.79 µs | 204.95 µs | 773.55 µs | 1.93x-1.05x slower |
| fast-equals | 1.35 µs | 868.07 µs | 55.61 ms | 918.17 ms | 3.42x-1247.57x slower |
| lodash.isEqual | 11.87 µs | 1.42 ms | 72.35 ms | 1.06 s | 29.97x-1435.69x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.66 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Map with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                395.99 ns/iter 405.38 ns  █                   
                    (370.75 ns … 665.25 ns) 466.98 ns ▃█ ▄▅                
                    (786.85  b …   1.78 kb)   1.01 kb ██▇██▆▇▇▆▄▅▅▃▂▃▂▂▂▂▁▂
                   3.85 ipc ( 96.37% cache)    0.10 branch misses
          1.52k cycles   5.84k instructions   34.18 c-refs    1.24 c-misses

are-deeply-equal             609.52 ns/iter 622.71 ns   █                  
                    (577.49 ns … 729.98 ns) 697.52 ns  ███   ▆▄            
                    (899.74  b …   3.52 kb)   1.19 kb ▅████▇▇██▇▃▃▄▃▄▂▁▁▁▁▂
                   3.07 ipc ( 95.95% cache)    1.18 branch misses
          2.35k cycles   7.19k instructions   41.04 c-refs    1.66 c-misses

fast-equals                    1.35 µs/iter   1.38 µs  ▂   █▇              
                        (1.27 µs … 1.59 µs)   1.56 µs ▃█▇████▅▃▅           
                    (  9.63 kb …  12.63 kb)   9.70 kb ██████████▇▄▅▂▁▄▂▁▂▂▂
                   3.49 ipc ( 96.57% cache)    9.12 branch misses
          5.19k cycles  18.08k instructions  326.95 c-refs   11.22 c-misses

dequal                       508.43 ns/iter 513.87 ns        █▂            
                    (475.90 ns … 603.94 ns) 571.43 ns   ▂    ██            
                    (723.76  b …   1.78 kb)   1.00 kb ▂▆██▅▄▆██▄▂▃▂▂▂▂▂▂▂▂▁
                   3.60 ipc ( 96.43% cache)    2.18 branch misses
          1.99k cycles   7.18k instructions   34.11 c-refs    1.22 c-misses

lodash.isEqual                11.87 µs/iter  11.59 µs  █                   
                     (10.72 µs … 250.21 µs)  20.55 µs  █                   
                    (256.00  b … 679.21 kb)  26.13 kb ▄█▇▂▁▁▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.43 ipc ( 98.01% cache)   64.84 branch misses
         48.64k cycles 118.08k instructions   4.73k c-refs   93.85 c-misses

node.isDeepStrictEqual       764.66 ns/iter 768.47 ns  █▂▃                 
                    (740.86 ns … 918.63 ns) 846.55 ns  ███▇                
                    (  1.09 kb …   1.87 kb)   1.25 kb ██████▅▄▂▃▆▄▂▄▃▂▂▂▂▂▂
                   3.13 ipc ( 95.37% cache)    0.12 branch misses
          3.12k cycles   9.76k instructions   52.48 c-refs    2.43 c-misses

summary
  object-equals
   1.28x faster than dequal
   1.54x faster than are-deeply-equal
   1.93x faster than node.isDeepStrictEqual
   3.42x faster than fast-equals
   29.97x faster than lodash.isEqual

• Map with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                 17.50 µs/iter  17.55 µs       █              
                      (16.65 µs … 18.52 µs)  18.47 µs       █             █
                    (  8.13  b …   8.44  b)   8.16  b █▁█▁▁██▁███▁▁▁▁▁▁▁▁▁█
                   2.82 ipc ( 98.86% cache)  242.55 branch misses
         65.99k cycles 186.03k instructions   6.34k c-refs   71.92 c-misses

are-deeply-equal              21.74 µs/iter  21.69 µs   █                  
                      (21.28 µs … 23.80 µs)  22.17 µs   ██                 
                    (192.25  b … 192.44  b) 192.26  b █▁██▁▁█▁██▁▁▁█▁▁▁▁▁▁█
                   2.60 ipc ( 98.94% cache)  343.52 branch misses
         82.04k cycles 213.17k instructions   6.89k c-refs   72.99 c-misses

fast-equals                  868.07 µs/iter 909.24 µs   █                  
                      (776.05 µs … 1.24 ms)   1.15 ms  ▄█                  
                    (  8.05 mb …   8.06 mb)   8.05 mb ▂██▇▄▃▃▄▃▂▂▄▄▃▂▂▁▂▁▁▁
                   3.21 ipc ( 96.64% cache)   1.08k branch misses
          3.33M cycles  10.71M instructions 335.01k c-refs  11.27k c-misses

dequal                        19.43 µs/iter  19.49 µs         █           █
                      (19.27 µs … 19.66 µs)  19.51 µs ▅     ▅▅█   ▅  ▅ ▅ ▅█
                    (  8.13  b …   8.38  b)   8.16  b █▁▁▁▁▁███▁▁▁█▁▁█▁█▁██
                   2.93 ipc ( 99.00% cache)  302.13 branch misses
         74.64k cycles 218.61k instructions   6.09k c-refs   60.85 c-misses

lodash.isEqual                 1.42 ms/iter   1.34 ms █                    
                        (1.27 ms … 2.27 ms)   2.22 ms █                    
                    (272.52 kb …   1.49 mb) 769.87 kb ██▂▃▁▂▁▁▁▁▁▁▁▁▁▁▁▁▃▂▂
                   3.84 ipc ( 97.28% cache)   1.11k branch misses
          5.51M cycles  21.14M instructions 175.46k c-refs   4.77k c-misses

node.isDeepStrictEqual        18.79 µs/iter  19.29 µs   █                  
                      (18.16 µs … 19.52 µs)  19.45 µs ▅▅█▅   ▅  ▅    ▅ ▅▅ ▅
                    (264.11  b … 264.95  b) 264.21  b ████▁▁▁█▁▁█▁▁▁▁█▁██▁█
                   2.81 ipc ( 98.49% cache)  289.49 branch misses
         74.42k cycles 208.83k instructions   6.42k c-refs   97.17 c-misses

summary
  object-equals
   1.07x faster than node.isDeepStrictEqual
   1.11x faster than dequal
   1.24x faster than are-deeply-equal
   49.61x faster than fast-equals
   81.37x faster than lodash.isEqual

• Map with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                200.67 µs/iter 200.36 µs  █                   
                    (189.78 µs … 400.09 µs) 290.50 µs ▇█                   
                    ( 11.37 kb … 498.98 kb) 257.00 kb ███▆▃▂▁▁▂▂▂▂▁▁▁▁▁▁▁▁▁
                   1.88 ipc ( 79.19% cache)   3.93k branch misses
        801.55k cycles   1.51M instructions  93.99k c-refs  19.56k c-misses

are-deeply-equal             214.69 µs/iter 215.18 µs  █                   
                    (206.47 µs … 441.46 µs) 268.70 µs  █                   
                    ( 12.11 kb … 512.33 kb) 256.99 kb ▂██▇▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.95 ipc ( 79.47% cache)   3.85k branch misses
        873.61k cycles   1.70M instructions  93.97k c-refs  19.29k c-misses

fast-equals                   55.61 ms/iter  56.44 ms ██ █ █ █ █         ██
                      (54.79 ms … 56.56 ms)  56.52 ms ██ █ █ █ █         ██
                    (608.03 kb … 608.84 kb) 608.75 kb ██▁█▁█▁█▁█▁▁▁▁▁▁▁▁▁██
                   3.18 ipc ( 97.41% cache)  18.32k branch misses
        211.21M cycles 672.02M instructions  24.90M c-refs 644.67k c-misses

dequal                       213.86 µs/iter 213.66 µs ██                   
                    (206.37 µs … 439.89 µs) 307.78 µs ██▂                  
                    ( 45.25 kb … 544.15 kb) 256.61 kb ███▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.13 ipc ( 83.42% cache)   3.97k branch misses
        821.31k cycles   1.75M instructions  82.81k c-refs  13.73k c-misses

lodash.isEqual                72.35 ms/iter  67.72 ms ██                   
                     (66.07 ms … 118.95 ms)  81.48 ms ██                   
                    (  5.98 mb …   6.22 mb)   6.01 mb ██▇▇▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▇
                   4.29 ipc ( 98.03% cache)  11.86k branch misses
        277.02M cycles   1.19G instructions   3.52M c-refs  69.53k c-misses

node.isDeepStrictEqual       204.95 µs/iter 209.43 µs  █▂                  
                    (193.03 µs … 424.75 µs) 256.29 µs  ██▂ ▄               
                    ( 58.79 kb … 544.40 kb) 256.90 kb ▇███▇██▅▃▃▂▁▁▁▁▁▁▁▁▁▁
                   1.98 ipc ( 83.03% cache)   4.06k branch misses
        824.20k cycles   1.64M instructions  82.70k c-refs  14.03k c-misses

summary
  object-equals
   1.02x faster than node.isDeepStrictEqual
   1.07x faster than dequal
   1.07x faster than are-deeply-equal
   277.11x faster than fast-equals
   360.55x faster than lodash.isEqual

• Map with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                735.97 µs/iter 728.47 µs  █                   
                      (709.24 µs … 1.10 ms) 977.23 µs  █                   
                    (  1.00 mb …   1.00 mb)   1.00 mb ▅█▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.84 ipc ( 75.89% cache)   9.18k branch misses
          2.97M cycles   5.48M instructions 303.87k c-refs  73.27k c-misses

are-deeply-equal             826.17 µs/iter 824.45 µs  █▇                  
                      (800.41 µs … 1.09 ms)   1.01 ms  ██                  
                    (977.63 kb …   1.05 mb)   1.00 mb ▃██▇▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.87 ipc ( 76.22% cache)   9.18k branch misses
          3.37M cycles   6.31M instructions 325.15k c-refs  77.33k c-misses

fast-equals                  918.17 ms/iter 928.62 ms █ █   ████  █ █  █ ██
                    (895.77 ms … 938.84 ms) 935.23 ms █ █   ████  █ █  █ ██
                    (  5.63 mb …  17.74 mb)   6.73 mb █▁█▁▁▁████▁▁█▁█▁▁█▁██
                   3.71 ipc ( 97.24% cache) 162.16k branch misses
          3.58G cycles  13.28G instructions 430.40M c-refs  11.87M c-misses

dequal                       797.60 µs/iter 794.20 µs  █                   
                      (779.02 µs … 1.28 ms) 974.23 µs  █                   
                    (  1.00 mb …   1.00 mb)   1.00 mb ▃█▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.01 ipc ( 75.47% cache)   9.19k branch misses
          3.25M cycles   6.53M instructions 296.09k c-refs  72.64k c-misses

lodash.isEqual                  1.06 s/iter    1.02 s  █               █   
                       (955.15 ms … 1.72 s)    1.03 s ▅█ ▅          ▅▅▅█▅ ▅
                    ( 24.02 mb …  24.41 mb)  24.16 mb ██▁█▁▁▁▁▁▁▁▁▁▁█████▁█
                   4.35 ipc ( 98.27% cache)  57.33k branch misses
          4.12G cycles  17.92G instructions  57.14M c-refs 987.87k c-misses

node.isDeepStrictEqual       773.55 µs/iter 766.45 µs  █                   
                      (743.28 µs … 1.85 ms) 977.84 µs  █▃                  
                    (767.20 kb …   1.26 mb)   1.00 mb ▃██▄▂▂▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁
                   1.91 ipc ( 75.07% cache)   9.30k branch misses
          3.13M cycles   5.99M instructions 287.41k c-refs  71.66k c-misses

summary
  object-equals
   1.05x faster than node.isDeepStrictEqual
   1.08x faster than dequal
   1.12x faster than are-deeply-equal
   1247.57x faster than fast-equals
   1435.69x faster than lodash.isEqual
```

</details>

### Nested Map with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 11.11 µs | 452.49 µs | 5.36 ms | 25.96 ms | 1.00x (baseline) |
| dequal | 12.52 µs | 492.70 µs | 5.59 ms | 29.22 ms | 1.13x-1.13x slower |
| are-deeply-equal | 14.16 µs | 534.26 µs | 7.60 ms | 32.83 ms | 1.28x-1.26x slower |
| node.isDeepStrictEqual | 19.28 µs | 676.61 µs | 7.97 ms | 33.75 ms | 1.74x-1.30x slower |
| fast-equals | 27.01 µs | 1.84 ms | 64.92 ms | 979.69 ms | 2.43x-37.73x slower |
| lodash.isEqual | 288.05 µs | 10.14 ms | 143.49 ms | 1.41 s | 25.93x-54.35x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.67 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Map with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                 11.11 µs/iter  10.95 µs   █                  
                      (9.60 µs … 223.26 µs)  17.85 µs   █▃                 
                    (  5.31 kb … 262.25 kb)  21.64 kb ▃▆██▄▂▂▃▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.86 ipc ( 97.58% cache)  180.03 branch misses
         43.69k cycles 125.12k instructions   3.15k c-refs   76.23 c-misses

are-deeply-equal              14.16 µs/iter  14.04 µs   █▃                 
                     (12.84 µs … 253.86 µs)  21.43 µs   ██                 
                    (  6.68 kb … 295.95 kb)  23.46 kb ▄███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.67 ipc ( 97.09% cache)  219.62 branch misses
         56.47k cycles 150.74k instructions   3.87k c-refs  112.39 c-misses

fast-equals                   27.01 µs/iter  26.11 µs   █                  
                     (23.77 µs … 259.97 µs)  42.84 µs   █                  
                    ( 50.43 kb … 599.16 kb) 203.32 kb ▁██▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.42 ipc ( 96.05% cache)  270.15 branch misses
        111.22k cycles 380.70k instructions  10.07k c-refs  397.70 c-misses

dequal                        12.52 µs/iter  12.77 µs  █                   
                      (12.05 µs … 13.22 µs)  13.19 µs  █                   
                    (  5.00 kb …   6.67 kb)   5.17 kb ██▁█▁▁▁▁█▁▁▁▁█▁█▁▁▁▁█
                   3.02 ipc ( 98.18% cache)  179.19 branch misses
         46.84k cycles 141.39k instructions   2.54k c-refs   46.26 c-misses

lodash.isEqual               288.05 µs/iter 282.13 µs █                    
                      (271.95 µs … 1.18 ms) 505.78 µs █▆                   
                    ( 32.52 kb …   1.98 mb) 531.31 kb ██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.56 ipc ( 97.46% cache)   1.06k branch misses
          1.11M cycles   2.84M instructions  97.09k c-refs   2.46k c-misses

node.isDeepStrictEqual        19.28 µs/iter  18.83 µs  █                   
                     (17.85 µs … 250.06 µs)  28.53 µs  █▂                  
                    (384.00  b … 391.17 kb)  26.56 kb ▁██▃▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.63 ipc ( 97.23% cache)  228.37 branch misses
         75.05k cycles 197.67k instructions   4.01k c-refs  111.01 c-misses

summary
  object-equals
   1.13x faster than dequal
   1.28x faster than are-deeply-equal
   1.74x faster than node.isDeepStrictEqual
   2.43x faster than fast-equals
   25.93x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                452.49 µs/iter 446.02 µs   █                  
                    (418.46 µs … 744.53 µs) 639.76 µs   █                  
                    (173.55 kb … 765.78 kb) 671.62 kb ▂▃█▄▂▁▁▁▁▂▂▁▁▁▁▁▁▁▁▁▁
                   2.33 ipc ( 80.04% cache)  11.85k branch misses
          1.72M cycles   4.01M instructions 132.59k c-refs  26.46k c-misses

are-deeply-equal             534.26 µs/iter 535.58 µs    █                 
                    (495.42 µs … 836.02 µs) 716.95 µs    █                 
                    (538.07 kb … 920.90 kb) 730.90 kb ▂▃▃██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.31 ipc ( 81.17% cache)  11.71k branch misses
          2.07M cycles   4.78M instructions 159.65k c-refs  30.06k c-misses

fast-equals                    1.84 ms/iter   1.95 ms  █                   
                        (1.62 ms … 2.35 ms)   2.30 ms ▂██▃  ▂▆▆            
                    ( 14.08 mb …  14.08 mb)  14.08 mb █████████████▂▃▃▄▃▂▁▂
                   3.09 ipc ( 95.01% cache)   7.95k branch misses
          7.07M cycles  21.88M instructions 633.75k c-refs  31.63k c-misses

dequal                       492.70 µs/iter 492.52 µs  █▄                  
                    (471.03 µs … 812.32 µs) 684.95 µs  ██                  
                    (513.19 kb … 832.34 kb) 672.16 kb ███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.45 ipc ( 80.32% cache)  11.58k branch misses
          1.89M cycles   4.62M instructions 128.78k c-refs  25.34k c-misses

lodash.isEqual                10.14 ms/iter  10.29 ms  ▅▂ █                
                       (9.85 ms … 10.90 ms)  10.61 ms  ██▅█▂▅ ▂▅▂▂▇  ▅     
                    ( 15.46 mb …  16.47 mb)  16.44 mb ▇██████▇█████▄▄█▁▇▄▄▄
                   2.67 ipc ( 97.88% cache)  27.71k branch misses
         39.01M cycles 104.08M instructions   3.05M c-refs  64.70k c-misses

node.isDeepStrictEqual       676.61 µs/iter 684.53 µs     █                
                    (637.58 µs … 912.88 µs) 862.40 µs  ▅ ▂█                
                    (832.33 kb … 832.47 kb) 832.40 kb ▇█▆██▇▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.35 ipc ( 81.09% cache)  11.97k branch misses
          2.66M cycles   6.26M instructions 139.18k c-refs  26.32k c-misses

summary
  object-equals
   1.09x faster than dequal
   1.18x faster than are-deeply-equal
   1.5x faster than node.isDeepStrictEqual
   4.06x faster than fast-equals
   22.42x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  5.36 ms/iter   5.44 ms    ▃ █               
                        (5.06 ms … 6.17 ms)   6.07 ms  █▇█▇█   ▂           
                    (  5.25 mb …   5.25 mb)   5.25 mb ▅█████████▄▃▂▂▃▃▃▁▂▂▃
                   1.39 ipc ( 79.35% cache)  91.49k branch misses
         21.28M cycles  29.68M instructions 982.42k c-refs 202.84k c-misses

are-deeply-equal               7.60 ms/iter   7.79 ms         ██▃█         
                        (6.83 ms … 8.50 ms)   8.33 ms     ▅ █▇████▅▂ █▇    
                    (  5.66 mb …   5.73 mb)   5.72 mb ▃▁▁▁██████████▃██▃█▁▃
                   1.38 ipc ( 77.83% cache)  99.78k branch misses
         27.79M cycles  38.27M instructions   1.41M c-refs 311.51k c-misses

fast-equals                   64.92 ms/iter  65.23 ms        █ █           
                      (63.86 ms … 66.73 ms)  65.64 ms ▅  ▅  ▅█ █   ▅ ▅   ▅▅
                    ( 48.79 mb …  48.79 mb)  48.79 mb █▁▁█▁▁██▁█▁▁▁█▁█▁▁▁██
                   3.09 ipc ( 96.67% cache)  74.79k branch misses
        247.37M cycles 764.39M instructions  27.48M c-refs 915.44k c-misses

dequal                         5.59 ms/iter   5.66 ms     ▃▃ ▆█▅           
                        (5.31 ms … 6.13 ms)   5.98 ms    ███▃███▅  ▅       
                    (  5.25 mb …   5.25 mb)   5.25 mb ▃▃████████████▄▄█▁▄▃▃
                   1.54 ipc ( 80.18% cache)  91.56k branch misses
         21.40M cycles  33.01M instructions 800.67k c-refs 158.68k c-misses

lodash.isEqual               143.49 ms/iter 144.79 ms          █           
                    (135.46 ms … 153.39 ms) 150.65 ms ▅        █           
                    (  4.99 mb …   5.53 mb)   5.08 mb █▁▁▁▁▁▁▁▁█▇▇▇▁▇▁▁▁▁▁▇
                   3.29 ipc ( 97.95% cache) 221.49k branch misses
        553.33M cycles   1.82G instructions  31.19M c-refs 639.05k c-misses

node.isDeepStrictEqual         7.97 ms/iter   8.07 ms     █ ▄              
                        (7.65 ms … 8.90 ms)   8.61 ms █▆▆██▆█▆      ▃      
                    (  6.50 mb …   6.50 mb)   6.50 mb █████████▅▇▅▃▇█▁▃▅▁▁▇
                   1.60 ipc ( 77.69% cache)  93.33k branch misses
         31.59M cycles  50.49M instructions   1.23M c-refs 273.67k c-misses

summary
  object-equals
   1.04x faster than dequal
   1.42x faster than are-deeply-equal
   1.49x faster than node.isDeepStrictEqual
   12.12x faster than fast-equals
   26.79x faster than lodash.isEqual

• Nested Map with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 25.96 ms/iter  26.29 ms ▂  █                 
                      (25.46 ms … 26.93 ms)  26.47 ms █  █   ▅        ▅  ▅ 
                    ( 21.00 mb …  21.00 mb)  21.00 mb █▇▁█▇▁▁█▇▇▇▁▇▇▁▁█▇▇█▇
                   1.30 ipc ( 78.87% cache) 354.86k branch misses
         98.55M cycles 128.01M instructions   4.62M c-refs 976.45k c-misses

are-deeply-equal              32.83 ms/iter  33.12 ms      █               
                      (32.16 ms … 33.65 ms)  33.65 ms ██   █     █      █  
                    ( 22.75 mb …  22.80 mb)  22.78 mb ███▁▁█▁█▁▁▁████▁▁▁█▁█
                   1.26 ipc ( 77.03% cache) 400.23k branch misses
        121.71M cycles 153.68M instructions   5.44M c-refs   1.25M c-misses

fast-equals                  979.69 ms/iter 987.46 ms              █     █ 
                    (960.64 ms … 988.98 ms) 988.65 ms ▅  ▅     ▅   █▅▅  ▅█▅
                    (  6.94 mb …   6.94 mb)   6.94 mb █▁▁█▁▁▁▁▁█▁▁▁███▁▁███
                   3.58 ipc ( 96.82% cache) 357.27k branch misses
          3.75G cycles  13.44G instructions 440.79M c-refs  14.02M c-misses

dequal                        29.22 ms/iter  29.40 ms             █        
                      (28.66 ms … 29.98 ms)  29.92 ms   █ ██  █ █ █        
                    ( 21.00 mb …  21.00 mb)  21.00 mb █▁████▁▁█████▁█▁█▁▁▁█
                   1.33 ipc ( 76.83% cache) 370.55k branch misses
        111.21M cycles 148.06M instructions   4.67M c-refs   1.08M c-misses

lodash.isEqual                  1.41 s/iter    1.43 s                ██    
                          (1.35 s … 1.44 s)    1.43 s ▅   ▅         ▅██▅▅▅▅
                    ( 19.53 mb …  20.48 mb)  19.67 mb █▁▁▁█▁▁▁▁▁▁▁▁▁███████
                   3.79 ipc ( 97.40% cache) 929.57k branch misses
          5.47G cycles  20.72G instructions 178.72M c-refs   4.65M c-misses

node.isDeepStrictEqual        33.75 ms/iter  33.93 ms        █             
                      (33.24 ms … 34.49 ms)  34.43 ms     ▂  █             
                    ( 26.00 mb …  26.00 mb)  26.00 mb ▆▆▆▁█▆▁█▆▁▁▁▆▁▁▁▆▁▁▆▆
                   1.47 ipc ( 77.79% cache) 363.32k branch misses
        136.89M cycles 201.83M instructions   5.15M c-refs   1.14M c-misses

summary
  object-equals
   1.13x faster than dequal
   1.26x faster than are-deeply-equal
   1.3x faster than node.isDeepStrictEqual
   37.73x faster than fast-equals
   54.35x faster than lodash.isEqual
```

</details>

### Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 140.51 ns | 3.69 µs | 43.47 µs | 234.04 µs | 1.00x (baseline) |
| dequal | 168.72 ns | 4.15 µs | 48.58 µs | 265.02 µs | 1.20x-1.13x slower |
| are-deeply-equal | 226.58 ns | 5.16 µs | 55.28 µs | 310.28 µs | 1.61x-1.33x slower |
| fast-equals | 462.66 ns | 187.97 µs | 12.18 ms | 188.35 ms | 3.29x-804.76x slower |
| node.isDeepStrictEqual | 471.02 ns | 4.18 µs | 44.28 µs | 245.33 µs | 3.35x-1.05x slower |
| lodash.isEqual | 3.81 µs | 462.62 µs | 26.62 ms | 405.68 ms | 27.08x-1733.39x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.68 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                140.51 ns/iter 139.00 ns   █                  
                    (129.25 ns … 353.47 ns) 191.08 ns   █▅                 
                    (  0.10  b … 737.46  b)   3.37  b ▁▆██▄▃▂▁▁▂▁▁▂▂▁▁▁▁▁▁▁
                   3.88 ipc ( 87.08% cache)    0.01 branch misses
         562.13 cycles   2.18k instructions    0.31 c-refs    0.04 c-misses

are-deeply-equal             226.58 ns/iter 224.96 ns  █                   
                    (214.98 ns … 330.96 ns) 295.16 ns  █                   
                    (848.10  b …   2.77 kb)   0.99 kb ▆█▆▄▂▁▂▁▁▁▁▂▂▂▁▁▁▁▁▁▁
                   3.45 ipc ( 96.35% cache)    0.04 branch misses
         910.62 cycles   3.14k instructions   33.57 c-refs    1.23 c-misses

fast-equals                  462.66 ns/iter 462.51 ns  █                   
                    (432.25 ns … 738.82 ns) 591.97 ns ▅█▂█                 
                    ( 72.67  b …   3.65 kb) 130.82  b ████▅▄▃▂▂▄▁▂▂▃▂▂▂▂▁▁▁
                   4.66 ipc ( 93.96% cache)    1.06 branch misses
          1.80k cycles   8.41k instructions    4.84 c-refs    0.29 c-misses

dequal                       168.72 ns/iter 167.85 ns  █                   
                    (158.81 ns … 386.81 ns) 222.35 ns  ██                  
                    (  0.09  b … 704.44  b)   2.86  b ▄███▅▂▁▁▂▁▂▁▂▂▁▁▁▁▁▁▁
                   3.80 ipc ( 85.53% cache)    0.02 branch misses
         676.65 cycles   2.57k instructions    0.24 c-refs    0.03 c-misses

lodash.isEqual                 3.81 µs/iter   3.68 µs   █                  
                      (3.33 µs … 225.73 µs)   6.06 µs   █                  
                    (880.00  b …   1.01 mb)   3.43 kb ▂▅█▅▂▂▁▂▂▂▁▁▁▁▁▁▁▁▁▁▁
                   2.41 ipc ( 97.53% cache)   51.79 branch misses
         15.99k cycles  38.47k instructions   1.95k c-refs   48.28 c-misses

node.isDeepStrictEqual       471.02 ns/iter 476.52 ns  ▃█▃▆                
                    (430.75 ns … 689.93 ns) 602.17 ns  ████▅               
                    ( 78.05  b … 937.26  b) 258.83  b ▆██████▅▃▃▂▄▂▃▃▂▂▂▁▁▂
                   3.00 ipc ( 95.37% cache)    0.05 branch misses
          1.83k cycles   5.48k instructions   12.38 c-refs    0.57 c-misses

summary
  object-equals
   1.2x faster than dequal
   1.61x faster than are-deeply-equal
   3.29x faster than fast-equals
   3.35x faster than node.isDeepStrictEqual
   27.08x faster than lodash.isEqual

• Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  3.69 µs/iter   3.73 µs  ▃ ▃█    ▃ █         
                        (3.61 µs … 3.86 µs)   3.85 µs ▇█▂██▂ ▇▂█▇█         
                    (  0.10  b …   0.53  b)   0.11  b ██████▆█████▆▆▁▁▁▁▆▁▆
                   3.82 ipc ( 99.87% cache)   25.36 branch misses
         14.22k cycles  54.30k instructions  499.20 c-refs    0.67 c-misses

are-deeply-equal               5.16 µs/iter   5.18 µs    ▃   █             
                        (5.04 µs … 5.31 µs)   5.30 µs    █▂ ▂█ ▂▇ ▂        
                    (  5.67 kb …   5.68 kb)   5.68 kb ▆▁▁██▆██▆██▆█▁▆▆▁▆▁▆▆
                   3.45 ipc ( 97.94% cache)   28.21 branch misses
         19.68k cycles  67.94k instructions   1.50k c-refs   30.94 c-misses

fast-equals                  187.97 µs/iter 187.01 µs  █                   
                      (179.19 µs … 1.05 ms) 246.40 µs  █                   
                    (  3.05 kb … 227.16 kb)   3.74 kb ▃██▃▄▂▁▁▁▁▁▁▁▁▂▁▁▁▁▁▁
                   5.06 ipc ( 96.73% cache)  538.79 branch misses
        752.06k cycles   3.80M instructions   1.70k c-refs   55.57 c-misses

dequal                         4.15 µs/iter   4.25 µs ██                   
                        (3.97 µs … 4.66 µs)   4.59 µs ██▅▅  ▅  █           
                    (  0.09  b …   0.41  b)   0.10  b █████▅█▁██▅█▁▅▅▅▁▁▁▁▅
                   3.78 ipc ( 99.81% cache)   39.95 branch misses
         16.51k cycles  62.48k instructions  421.42 c-refs    0.81 c-misses

lodash.isEqual               462.62 µs/iter 431.37 µs █                    
                      (398.56 µs … 1.20 ms)   1.05 ms █▆                   
                    ( 35.89 kb …   1.51 mb)  39.23 kb ██▂▂▂▁▁▁▁▁▁▁▁▁▁▂▁▁▁▂▁
                   4.33 ipc ( 81.64% cache)  639.40 branch misses
          1.75M cycles   7.56M instructions   8.53k c-refs   1.57k c-misses

node.isDeepStrictEqual         4.18 µs/iter   4.19 µs  █                   
                        (4.11 µs … 4.55 µs)   4.40 µs  █▄                  
                    (247.45  b … 257.60  b) 255.85  b ▅██▅▆▅▅▅▃▁▅▃▁▁▁▁▁▁▁▁▃
                   3.85 ipc ( 99.78% cache)   21.10 branch misses
         16.14k cycles  62.14k instructions  877.47 c-refs    1.90 c-misses

summary
  object-equals
   1.12x faster than dequal
   1.13x faster than node.isDeepStrictEqual
   1.4x faster than are-deeply-equal
   50.89x faster than fast-equals
   125.24x faster than lodash.isEqual

• Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 43.47 µs/iter  43.54 µs  █                   
                      (42.52 µs … 46.95 µs)  45.47 µs  █                   
                    (  0.10  b …   0.53  b)   0.14  b ▆█▆▁▆▁▁▆▁▆▁▁▁▁▁▁▁▁▁▁▆
                   2.50 ipc ( 95.78% cache)   1.10k branch misses
        173.60k cycles 433.99k instructions  21.40k c-refs  904.17 c-misses

are-deeply-equal              55.28 µs/iter  54.31 µs  █                   
                     (51.93 µs … 270.61 µs)  79.59 µs  █                   
                    ( 28.27 kb … 331.46 kb) 171.24 kb ▂██▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.39 ipc ( 94.05% cache)   1.19k branch misses
        226.23k cycles 541.39k instructions  30.58k c-refs   1.82k c-misses

fast-equals                   12.18 ms/iter  12.40 ms  █ ▄                 
                      (11.71 ms … 13.25 ms)  13.24 ms  █ █▆                
                    ( 21.41 kb …  40.13 kb)  23.03 kb ▅█▇██▃▅▇▃▇▃▃▁▇▇▃▁▃▁▃▃
                   5.15 ipc ( 99.78% cache)   4.53k branch misses
         45.79M cycles 235.89M instructions   1.17M c-refs   2.60k c-misses

dequal                        48.58 µs/iter  48.90 µs               █     █
                      (47.58 µs … 49.35 µs)  49.33 µs ▅ ▅  ▅▅ ▅    ▅█▅    █
                    (  0.01  b …   0.32  b)   0.04  b █▁█▁▁██▁█▁▁▁▁███▁▁▁▁█
                   2.69 ipc ( 97.77% cache)   1.15k branch misses
        185.75k cycles 499.92k instructions  20.35k c-refs  452.77 c-misses

lodash.isEqual                26.62 ms/iter  29.25 ms █                    
                      (24.28 ms … 34.69 ms)  30.74 ms █▅                  ▅
                    ( 65.37 kb … 552.33 kb) 290.03 kb ██▄▇▁▁▁▁▁▁▁▁▁▁▁▄▁▁▁▄█
                   4.45 ipc ( 97.79% cache)   5.82k branch misses
        106.17M cycles 472.90M instructions 615.84k c-refs  13.63k c-misses

node.isDeepStrictEqual        44.28 µs/iter  45.55 µs █  █                 
                      (42.14 µs … 48.94 µs)  46.22 µs █  █▅▅   ▅   ▅   ▅ ▅▅
                    (256.02  b … 256.86  b) 256.09  b █▁▁███▁▁▁█▁▁▁█▁▁▁█▁██
                   2.71 ipc ( 96.26% cache)   1.04k branch misses
        172.82k cycles 468.76k instructions  21.86k c-refs  816.93 c-misses

summary
  object-equals
   1.02x faster than node.isDeepStrictEqual
   1.12x faster than dequal
   1.27x faster than are-deeply-equal
   280.26x faster than fast-equals
   612.44x faster than lodash.isEqual

• Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                234.04 µs/iter 233.40 µs  █                   
                      (224.23 µs … 1.14 ms) 331.65 µs ██▅                  
                    (  0.00  b … 256.11 kb) 868.14  b ███▃▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.79 ipc ( 82.67% cache)   8.10k branch misses
        944.93k cycles   1.69M instructions  93.90k c-refs  16.27k c-misses

are-deeply-equal             310.28 µs/iter 309.47 µs  █                   
                    (287.26 µs … 627.71 µs) 476.50 µs  █                   
                    ( 35.38 kb … 989.19 kb) 683.25 kb ██▄▄▂▂▁▂▂▂▁▁▁▁▁▁▁▁▁▁▁
                   1.73 ipc ( 77.95% cache)   8.28k branch misses
          1.23M cycles   2.14M instructions 129.39k c-refs  28.54k c-misses

fast-equals                  188.35 ms/iter 189.22 ms         █    █       
                    (186.59 ms … 190.44 ms) 189.71 ms ▅ ▅  ▅▅ █    █   ▅▅ ▅
                    ( 85.42 kb … 170.25 kb) 120.77 kb █▁█▁▁██▁█▁▁▁▁█▁▁▁██▁█
                   5.20 ipc ( 99.82% cache)  21.26k branch misses
        723.78M cycles   3.76G instructions  24.31M c-refs  42.56k c-misses

dequal                       265.02 µs/iter 266.51 µs  █                   
                    (257.00 µs … 439.26 µs) 324.47 µs  █                   
                    (  0.00  b … 281.65 kb) 980.02  b ▅███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.93 ipc ( 81.48% cache)   8.23k branch misses
          1.02M cycles   1.97M instructions  91.95k c-refs  17.03k c-misses

lodash.isEqual               405.68 ms/iter 407.26 ms             █        
                    (387.56 ms … 423.28 ms) 418.20 ms             ██       
                    (  1.20 mb …   1.30 mb)   1.25 mb █▁█▁▁▁▁▁██▁▁██▁▁▁█▁▁█
                   4.57 ipc ( 99.55% cache)  22.99k branch misses
          1.57G cycles   7.18G instructions  16.10M c-refs  71.90k c-misses

node.isDeepStrictEqual       245.33 µs/iter 246.61 µs █                    
                    (229.23 µs … 407.72 µs) 317.51 µs █▇▄▂                 
                    (256.00  b … 288.37 kb)   1.13 kb ██████▂▂▁▂▁▁▂▃▃▃▂▂▁▁▁
                   1.91 ipc ( 82.65% cache)   8.24k branch misses
        957.38k cycles   1.83M instructions  92.10k c-refs  15.98k c-misses

summary
  object-equals
   1.05x faster than node.isDeepStrictEqual
   1.13x faster than dequal
   1.33x faster than are-deeply-equal
   804.76x faster than fast-equals
   1733.39x faster than lodash.isEqual
```

</details>

### Shuffled Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 137.55 ns | 3.47 µs | 52.11 µs | 314.87 µs | 1.00x (baseline) |
| dequal | 146.11 ns | 3.78 µs | 57.90 µs | 316.53 µs | 1.06x-1.01x slower |
| are-deeply-equal | 241.06 ns | 5.09 µs | 66.43 µs | 389.94 µs | 1.75x-1.24x slower |
| node.isDeepStrictEqual | 610.50 ns | 4.03 µs | 52.24 µs | 325.85 µs | 4.44x-1.03x slower |
| fast-equals | 1.03 µs | 591.48 µs | 45.19 ms | 703.20 ms | 7.48x-2233.34x slower |
| lodash.isEqual | 4.34 µs | 1.02 ms | 67.46 ms | 1.17 s | 31.54x-3715.51x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.67 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Shuffled Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                137.55 ns/iter 137.00 ns  █                   
                    (132.94 ns … 343.52 ns) 183.95 ns  █▂                  
                    (  0.04  b … 700.28  b)   2.97  b ▆██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.29 ipc ( 91.24% cache)    0.02 branch misses
         532.40 cycles   2.28k instructions    0.25 c-refs    0.02 c-misses

are-deeply-equal             241.06 ns/iter 237.09 ns  █                   
                    (231.41 ns … 412.15 ns) 304.69 ns  █                   
                    (845.56  b …   2.77 kb)   1.00 kb ▄█▄▂▂▁▁▂▂▁▁▁▁▂▂▁▁▁▁▁▁
                   3.43 ipc ( 96.49% cache)    0.04 branch misses
         927.52 cycles   3.18k instructions   33.82 c-refs    1.19 c-misses

fast-equals                    1.03 µs/iter   1.05 µs           █          
                      (955.34 ns … 1.15 µs)   1.10 µs           ██▇▃       
                    (114.78  b …   1.98 kb) 133.63  b ▅▂▅▄▃▄▂▂▅▄█████▆▄▂▂▂▂
                   3.85 ipc ( 94.04% cache)    4.40 branch misses
          3.99k cycles  15.35k instructions    5.19 c-refs    0.31 c-misses

dequal                       146.11 ns/iter 145.44 ns    █                 
                    (139.13 ns … 352.17 ns) 177.66 ns   ▇█                 
                    (  0.09  b … 707.46  b)   2.35  b ▂▄██▆▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.32 ipc ( 90.98% cache)    0.01 branch misses
         562.87 cycles   2.43k instructions    0.18 c-refs    0.02 c-misses

lodash.isEqual                 4.34 µs/iter   4.24 µs ▂█                   
                      (4.08 µs … 236.00 µs)   7.42 µs ██                   
                    ( 64.00  b … 801.98 kb)   3.45 kb ██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.50 ipc ( 98.53% cache)   45.04 branch misses
         18.05k cycles  45.14k instructions   1.98k c-refs   29.11 c-misses

node.isDeepStrictEqual       610.50 ns/iter 620.00 ns   ▄█  █              
                     (550.00 ns … 90.63 µs) 770.00 ns   ██ ██▅             
                    (632.00  b … 669.02 kb) 654.45  b ▁▇██████▄▁▁▁▁▁▂▃▂▁▁▁▁
                   1.78 ipc ( 99.81% cache)   30.08 branch misses
          3.85k cycles   6.86k instructions  525.57 c-refs    1.02 c-misses

summary
  object-equals
   1.06x faster than dequal
   1.75x faster than are-deeply-equal
   4.44x faster than node.isDeepStrictEqual
   7.48x faster than fast-equals
   31.54x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                  3.47 µs/iter   3.52 µs  █ █                 
                        (3.43 µs … 3.56 µs)   3.56 µs ▆█▃█          ▃      
                    (  0.10  b …   0.53  b)   0.11  b ████▁▄▁▄▁▄▁▄▄▁█▄██▁▁▆
                   3.88 ipc ( 99.97% cache)   10.91 branch misses
         14.23k cycles  55.26k instructions   1.05k c-refs    0.27 c-misses

are-deeply-equal               5.09 µs/iter   5.17 µs ▂  ▂  █   █ ▂        
                        (4.91 µs … 5.52 µs)   5.35 µs █  █  █▅  █ █▅      ▅
                    (  5.53 kb …   5.68 kb)   5.67 kb █▇▇█▇▇██▁▇█▁██▁▇▁▁▁▁█
                   3.50 ipc ( 98.33% cache)   16.98 branch misses
         19.39k cycles  67.89k instructions   1.66k c-refs   27.72 c-misses

fast-equals                  591.48 µs/iter 595.37 µs        █             
                    (574.05 µs … 865.66 µs) 630.94 µs   ▆▆▇▄▆█▄            
                    (  3.10 kb …   5.55 kb)   3.11 kb ▃▇████████▅▃▃▂▂▂▁▁▁▁▁
                   3.52 ipc ( 99.24% cache)  13.58k branch misses
          2.28M cycles   8.03M instructions   9.55k c-refs   72.21 c-misses

dequal                         3.78 µs/iter   3.78 µs  ███▄                
                        (3.68 µs … 4.18 µs)   4.05 µs ██████               
                    (  0.09  b …   0.41  b)   0.10  b ███████▁▁▅▅▅▁▁▁█▅▅▁▁▅
                   4.13 ipc ( 99.93% cache)   10.10 branch misses
         15.32k cycles  63.36k instructions  363.63 c-refs    0.26 c-misses

lodash.isEqual                 1.02 ms/iter 991.00 µs █                    
                      (893.30 µs … 1.72 ms)   1.68 ms █▅                   
                    ( 32.13 kb …   0.99 mb)  37.73 kb ██▇▅▂▂▁▁▂▁▁▁▁▁▁▁▂▄▂▁▂
                   2.86 ipc ( 91.42% cache)  24.81k branch misses
          4.17M cycles  11.91M instructions  16.92k c-refs   1.45k c-misses

node.isDeepStrictEqual         4.03 µs/iter   4.04 µs █  ▅                 
                        (3.93 µs … 4.42 µs)   4.31 µs █▂ █▇▇▅              
                    (247.83  b … 256.86  b) 255.78  b ██▁████▄▁▄▁▁▁▁▄▁▇▁▁▁▄
                   3.91 ipc ( 99.88% cache)    4.51 branch misses
         15.41k cycles  60.29k instructions   1.54k c-refs    1.89 c-misses

summary
  object-equals
   1.09x faster than dequal
   1.16x faster than node.isDeepStrictEqual
   1.47x faster than are-deeply-equal
   170.38x faster than fast-equals
   293.8x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                 52.11 µs/iter  51.17 µs  █                   
                     (49.14 µs … 207.70 µs)  85.09 µs  █                   
                    (376.00  b … 433.25 kb)   2.47 kb ▇█▃▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.05 ipc ( 94.84% cache)   1.97k branch misses
        213.99k cycles 438.09k instructions  34.42k c-refs   1.77k c-misses

are-deeply-equal              66.43 µs/iter  66.65 µs ▇█                   
                     (60.13 µs … 323.63 µs) 117.55 µs ██▅                  
                    ( 27.37 kb … 770.76 kb) 172.61 kb ███▅▃▂▆▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.09 ipc ( 93.57% cache)   2.10k branch misses
        262.04k cycles 547.41k instructions  41.17k c-refs   2.65k c-misses

fast-equals                   45.19 ms/iter  45.42 ms                    █ 
                      (44.30 ms … 45.53 ms)  45.50 ms          █         █ 
                    ( 21.95 kb …   4.70 mb) 322.29 kb █▁▁▁▁▁▁▁▁█▁▁▁▁████▁██
                   3.23 ipc ( 98.16% cache)   1.59M branch misses
        173.75M cycles 561.28M instructions   4.24M c-refs  77.86k c-misses

dequal                        57.90 µs/iter  58.78 µs ▅█                   
                     (54.46 µs … 266.37 µs)  86.18 µs ██ ▄                 
                    (360.00  b … 339.31 kb)   1.27 kb ████▄▂▃▂▁▂▁▁▁▁▁▁▁▁▁▁▁
                   2.16 ipc ( 97.28% cache)   2.29k branch misses
        234.01k cycles 504.78k instructions  32.41k c-refs  883.17 c-misses

lodash.isEqual                67.46 ms/iter  66.55 ms █                    
                      (66.23 ms … 78.16 ms)  66.95 ms █  ▅▅▅▅▅▅▅       ▅  ▅
                    (293.43 kb … 349.08 kb) 305.69 kb █▁▁███████▁▁▁▁▁▁▁█▁▁█
                   2.74 ipc ( 96.46% cache)   2.14M branch misses
        274.78M cycles 753.82M instructions   4.07M c-refs 144.27k c-misses

node.isDeepStrictEqual        52.24 µs/iter  52.13 µs  ██                  
                     (49.11 µs … 325.64 µs)  70.33 µs  ██▂                 
                    (632.00  b … 493.32 kb)   1.45 kb ▄███▄▃▃▃▃▂▁▁▁▁▁▁▁▁▁▁▁
                   2.19 ipc ( 95.74% cache)   2.03k branch misses
        213.36k cycles 468.00k instructions  33.12k c-refs   1.41k c-misses

summary
  object-equals
   1x faster than node.isDeepStrictEqual
   1.11x faster than dequal
   1.27x faster than are-deeply-equal
   867.19x faster than fast-equals
   1294.64x faster than lodash.isEqual

• Shuffled Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                314.87 µs/iter 321.48 µs  █                   
                    (299.38 µs … 506.24 µs) 401.25 µs  █▄                  
                    (  0.00  b … 512.17 kb)   1.01 kb ███▃▆▆▅▁▁▁▁▁▁▁▁▂▁▁▁▁▁
                   1.35 ipc ( 72.44% cache)  14.26k branch misses
          1.25M cycles   1.70M instructions 122.50k c-refs  33.76k c-misses

are-deeply-equal             389.94 µs/iter 392.92 µs    █▂                
                    (360.79 µs … 637.67 µs) 524.90 µs  ▂ ██                
                    ( 35.38 kb …   1.01 mb) 683.24 kb ▇████▃▂▁▂▁▂▂▂▁▁▁▁▁▁▁▁
                   1.40 ipc ( 73.28% cache)  14.64k branch misses
          1.52M cycles   2.13M instructions 140.56k c-refs  37.56k c-misses

fast-equals                  703.20 ms/iter 710.66 ms          █   █       
                    (688.06 ms … 717.25 ms) 713.19 ms ▅   ▅  ▅ █▅  █    ▅▅▅
                    ( 85.42 kb … 170.25 kb) 120.77 kb █▁▁▁█▁▁█▁██▁▁█▁▁▁▁███
                   2.88 ipc ( 86.24% cache)  32.39M branch misses
          2.87G cycles   8.25G instructions  93.21M c-refs  12.82M c-misses

dequal                       316.53 µs/iter 316.78 µs  █                   
                    (308.09 µs … 735.12 µs) 406.62 µs ▆█▆                  
                    (  0.00  b … 256.11 kb)   0.98 kb ███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.51 ipc ( 73.91% cache)  14.05k branch misses
          1.30M cycles   1.96M instructions 115.42k c-refs  30.11k c-misses

lodash.isEqual                  1.17 s/iter    1.19 s  ██                  
                          (1.13 s … 1.26 s)    1.21 s ▅██ ▅      ▅▅   ▅▅  ▅
                    (  1.20 mb …   1.31 mb)   1.25 mb ███▁█▁▁▁▁▁▁██▁▁▁██▁▁█
                   2.57 ipc ( 82.86% cache)  37.46M branch misses
          4.64G cycles  11.94G instructions  96.90M c-refs  16.61M c-misses

node.isDeepStrictEqual       325.85 µs/iter 327.00 µs  █                   
                    (318.43 µs … 491.37 µs) 385.22 µs  █                   
                    (256.00  b … 320.38 kb)   1.37 kb ███▆▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.45 ipc ( 72.97% cache)  14.34k branch misses
          1.26M cycles   1.83M instructions 118.49k c-refs  32.03k c-misses

summary
  object-equals
   1.01x faster than dequal
   1.03x faster than node.isDeepStrictEqual
   1.24x faster than are-deeply-equal
   2233.34x faster than fast-equals
   3715.51x faster than lodash.isEqual
```

</details>

### Nested Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 5.27 µs | 231.10 µs | 1.96 ms | 10.50 ms | 1.00x (baseline) |
| are-deeply-equal | 9.32 µs | 321.39 µs | 3.46 ms | 17.71 ms | 1.77x-1.69x slower |
| fast-equals | 9.80 µs | 519.93 µs | 17.78 ms | 247.68 ms | 1.86x-23.59x slower |
| node.isDeepStrictEqual | 12.17 µs | 386.77 µs | 3.29 ms | 18.81 ms | 2.31x-1.79x slower |
| lodash.isEqual | 74.81 µs | 2.92 ms | 55.57 ms | 620.38 ms | 14.20x-59.08x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.68 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Nested Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  5.27 µs/iter   5.30 µs        ▂ ▂          █
                        (5.19 µs … 5.37 µs)   5.32 µs ▅      █▅█▅▅  ▅▅    █
                    (  3.38 kb …   8.18 kb)   3.57 kb █▁▁▁▇▁▁█████▇▇██▁▇▇▇█
                   3.02 ipc ( 99.01% cache)   36.97 branch misses
         21.63k cycles  65.24k instructions  731.78 c-refs    7.21 c-misses

are-deeply-equal               9.32 µs/iter   9.44 µs                     █
                        (9.11 µs … 9.54 µs)   9.50 µs  █                  █
                    (  5.50 kb …   8.36 kb)   5.73 kb ██▁█▁▁█████▁█▁▁▁▁█▁▁█
                   2.88 ipc ( 97.14% cache)   51.68 branch misses
         35.37k cycles 101.70k instructions   1.56k c-refs   44.58 c-misses

fast-equals                    9.80 µs/iter   9.82 µs   █                  
                       (9.11 µs … 83.63 µs)  14.98 µs  ▂█                  
                    (576.00  b … 271.23 kb)   3.04 kb ███▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.42 ipc ( 99.29% cache)   72.98 branch misses
         39.84k cycles 176.01k instructions  868.36 c-refs    6.13 c-misses

lodash.isEqual                74.81 µs/iter  74.77 µs  █                   
                     (68.91 µs … 526.03 µs) 110.11 µs  █                   
                    (  5.45 kb … 913.50 kb)  58.11 kb ▄█▅▆▂▂▂▁▁▃▁▁▁▁▁▁▁▁▁▁▁
                   2.69 ipc ( 98.80% cache)  498.06 branch misses
        298.79k cycles 803.94k instructions  29.16k c-refs  349.18 c-misses

node.isDeepStrictEqual        12.17 µs/iter  12.03 µs  ▂ █▂                
                     (10.72 µs … 229.63 µs)  17.63 µs  ████                
                    (  2.20 kb … 906.29 kb)   6.82 kb ▂████▂▂▂▂▅▅▂▂▁▁▂▁▁▁▁▁
                   2.56 ipc ( 99.04% cache)   91.98 branch misses
         48.33k cycles 123.85k instructions   1.85k c-refs   17.66 c-misses

summary
  object-equals
   1.77x faster than are-deeply-equal
   1.86x faster than fast-equals
   2.31x faster than node.isDeepStrictEqual
   14.2x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                231.10 µs/iter 232.04 µs  █                   
                    (224.02 µs … 444.48 µs) 280.02 µs  █▃                  
                    ( 59.31 kb … 357.70 kb) 102.55 kb ▄██▇▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.32 ipc ( 76.37% cache)   5.09k branch misses
        889.97k cycles   2.06M instructions  43.49k c-refs  10.28k c-misses

are-deeply-equal             321.39 µs/iter 324.63 µs  █                   
                    (302.77 µs … 637.45 µs) 503.40 µs ▂█▄                  
                    ( 42.42 kb … 990.92 kb) 672.20 kb ███▆▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.47 ipc ( 77.31% cache)   4.34k branch misses
          1.29M cycles   3.17M instructions  72.98k c-refs  16.56k c-misses

fast-equals                  519.93 µs/iter 520.63 µs  ▃█                  
                    (508.00 µs … 743.46 µs) 592.56 µs  ███                 
                    ( 78.07 kb …  80.19 kb)  78.11 kb ▃████▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.78 ipc ( 94.72% cache)   2.12k branch misses
          2.11M cycles  10.07M instructions  42.67k c-refs   2.25k c-misses

lodash.isEqual                 2.92 ms/iter   2.90 ms █                    
                        (2.72 ms … 5.13 ms)   4.19 ms █▇                   
                    (  1.32 mb …   2.10 mb)   1.70 mb ██▄▃▃▂▂▂▂▁▂▂▁▁▁▁▁▂▁▁▁
                   2.94 ipc ( 98.71% cache)  14.53k branch misses
         11.55M cycles  33.94M instructions 926.10k c-refs  11.95k c-misses

node.isDeepStrictEqual       386.77 µs/iter 386.68 µs  █                   
                    (376.14 µs … 610.29 µs) 459.37 µs  ██                  
                    ( 42.41 kb … 537.70 kb) 186.25 kb ▃██▇▅▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.41 ipc ( 87.14% cache)   5.31k branch misses
          1.58M cycles   3.81M instructions  50.02k c-refs   6.43k c-misses

summary
  object-equals
   1.39x faster than are-deeply-equal
   1.67x faster than node.isDeepStrictEqual
   2.25x faster than fast-equals
   12.64x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  1.96 ms/iter   2.04 ms █▄                   
                        (1.79 ms … 2.85 ms)   2.75 ms ██                   
                    (832.01 kb … 841.77 kb) 832.60 kb ██▇█▆▄▄▄▂▃▂▂▃▁▃▁▂▂▁▁▂
                   2.14 ipc ( 74.89% cache)  44.07k branch misses
          7.73M cycles  16.53M instructions 353.60k c-refs  88.80k c-misses

are-deeply-equal               3.46 ms/iter   3.65 ms  █▄▅▃                
                        (3.09 ms … 4.44 ms)   4.29 ms  ████▂▂▂▂▂▂▂         
                    (  5.14 mb …   5.34 mb)   5.25 mb ▇███████████▅▅▄▂▄▄▃▃▃
                   1.89 ipc ( 83.46% cache)  40.23k branch misses
         13.42M cycles  25.30M instructions 599.84k c-refs  99.20k c-misses

fast-equals                   17.78 ms/iter  18.14 ms     █                
                      (16.46 ms … 21.44 ms)  21.11 ms     █                
                    (624.15 kb … 636.55 kb) 625.44 kb █▆▁▃█▄▁▆▃█▃▁▁▁▁▃▁▁▁▁▃
                   5.08 ipc ( 98.97% cache)  13.23k branch misses
         67.01M cycles 340.72M instructions   1.98M c-refs  20.32k c-misses

lodash.isEqual                55.57 ms/iter  55.71 ms   █                  
                      (55.05 ms … 56.68 ms)  56.22 ms ▅ █▅  ▅ ▅  ▅        ▅
                    ( 13.62 mb …  13.72 mb)  13.64 mb █▁██▁▁█▁█▁▁█▁▁▁▁▁▁▁▁█
                   3.53 ipc ( 98.47% cache) 130.32k branch misses
        216.33M cycles 764.30M instructions   8.49M c-refs 129.47k c-misses

node.isDeepStrictEqual         3.29 ms/iter   3.31 ms  ██▃                 
                        (3.18 ms … 3.79 ms)   3.72 ms  ███▆▃               
                    (  1.46 mb …   1.46 mb)   1.46 mb ▇█████▆▅▃▃▄▂▁▂▂▂▂▂▁▁▂
                   2.28 ipc ( 84.39% cache)  49.64k branch misses
         13.43M cycles  30.58M instructions 425.79k c-refs  66.48k c-misses

summary
  object-equals
   1.67x faster than node.isDeepStrictEqual
   1.76x faster than are-deeply-equal
   9.05x faster than fast-equals
   28.28x faster than lodash.isEqual

• Nested Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 10.50 ms/iter  10.83 ms   █                  
                      (10.05 ms … 11.62 ms)  11.62 ms  ██                  
                    (  3.23 mb …   3.26 mb)   3.25 mb ▄██▆▅▂▄▂▅▄▄▆▁▆▄▂▂▁▁▂▂
                   1.59 ipc ( 85.08% cache) 177.43k branch misses
         41.31M cycles  65.70M instructions   1.38M c-refs 206.32k c-misses

are-deeply-equal              17.71 ms/iter  18.00 ms  █   █               
                      (17.27 ms … 18.45 ms)  18.40 ms  █  ██       ▅   ▅   
                    ( 20.97 mb …  21.07 mb)  21.03 mb ███▅██▅▁▁▅█▁▁█▁▁▅█▅▅▅
                   1.58 ipc ( 82.10% cache) 164.29k branch misses
         64.26M cycles 101.45M instructions   2.62M c-refs 469.32k c-misses

fast-equals                  247.68 ms/iter 252.50 ms █                   █
                    (237.70 ms … 263.85 ms) 255.68 ms █▅▅▅         ▅▅▅▅   █
                    (  2.44 mb …   2.50 mb)   2.49 mb ████▁▁▁▁▁▁▁▁▁████▁▁▁█
                   5.10 ipc ( 98.83% cache)  68.08k branch misses
        967.42M cycles   4.93G instructions  33.90M c-refs 395.72k c-misses

lodash.isEqual               620.38 ms/iter 626.79 ms               █  █   
                    (591.63 ms … 673.98 ms) 633.55 ms ▅ ▅   ▅   ▅▅ ▅█  █  ▅
                    ( 54.52 mb …  54.55 mb)  54.54 mb █▁█▁▁▁█▁▁▁██▁██▁▁█▁▁█
                   4.02 ipc ( 98.00% cache) 524.24k branch misses
          2.42G cycles   9.70G instructions  55.70M c-refs   1.11M c-misses

node.isDeepStrictEqual        18.81 ms/iter  19.16 ms  ▃█ ▃                
                      (18.08 ms … 20.30 ms)  20.05 ms ▂██ █▂▂  ▂ ▂▇       ▂
                    (  5.82 mb …   5.84 mb)   5.82 mb ███▁███▁▆█▆██▆▆▆▁▁▁▁█
                   1.66 ipc ( 75.96% cache) 197.53k branch misses
         73.78M cycles 122.38M instructions   1.92M c-refs 460.78k c-misses

summary
  object-equals
   1.69x faster than are-deeply-equal
   1.79x faster than node.isDeepStrictEqual
   23.59x faster than fast-equals
   59.08x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> `dequal` is excluded from the test because it returns an incorrect result. An issue has been opened on the official GitHub repository: [https://github.com/lukeed/dequal/issues/31](https://github.com/lukeed/dequal/issues/31).

### Shuffled nested Set with mixed primitive values

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 5.16 µs | 266.59 µs | 2.37 ms | 12.41 ms | 1.00x (baseline) |
| are-deeply-equal | 11.21 µs | 754.99 µs | 24.21 ms | 345.58 ms | 2.17x-27.85x slower |
| node.isDeepStrictEqual | 11.28 µs | 422.36 µs | 3.54 ms | 18.47 ms | 2.19x-1.49x slower |
| fast-equals | 20.27 µs | 1.44 ms | 48.39 ms | 795.07 ms | 3.93x-64.08x slower |
| lodash.isEqual | 164.02 µs | 14.83 ms | 657.67 ms | 10.06 s | 31.80x-811.19x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.69 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.2.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Shuffled nested Set with mixed primitive values [size=16]
------------------------------------------- -------------------------------
object-equals                  5.16 µs/iter   5.25 µs  ▄       █           
                        (4.81 µs … 5.85 µs)   5.61 µs ██       █▅▅         
                    (  3.38 kb …   8.54 kb)   3.58 kb ██▅▅▁▁▁▁▁███▁▁▅▁▅▁▅▅█
                   3.26 ipc ( 99.06% cache)   13.93 branch misses
         20.06k cycles  65.34k instructions  742.26 c-refs    6.95 c-misses

are-deeply-equal              11.21 µs/iter  11.19 µs    █                 
                     (10.23 µs … 232.65 µs)  16.03 µs    █                 
                    (  2.48 kb … 343.46 kb)  21.66 kb ▂█▃█▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.68 ipc ( 98.79% cache)   88.86 branch misses
         45.29k cycles 121.34k instructions   2.24k c-refs   26.96 c-misses

fast-equals                   20.27 µs/iter  20.15 µs  █▅                  
                      (19.66 µs … 83.54 µs)  24.84 µs  ██                  
                    ( 96.00  b … 227.70 kb)   3.14 kb ▃██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.50 ipc ( 99.17% cache)  287.66 branch misses
         84.51k cycles 295.89k instructions   1.22k c-refs   10.18 c-misses

lodash.isEqual               164.02 µs/iter 161.89 µs   █                  
                    (148.51 µs … 674.77 µs) 232.41 µs   █                  
                    ( 33.25 kb …   1.25 mb)  69.56 kb ▁▁█▇▃▃▁▁▁▁▁▂▂▁▁▁▁▁▁▁▁
                   2.50 ipc ( 99.03% cache)   1.54k branch misses
        655.13k cycles   1.64M instructions  55.30k c-refs  535.23 c-misses

node.isDeepStrictEqual        11.28 µs/iter  11.35 µs  █                   
                     (10.35 µs … 219.57 µs)  15.92 µs  █ █▅                
                    (  1.84 kb … 251.45 kb)   6.43 kb ▃█▂██▂▂▁▁▁▂▂▁▁▁▁▁▁▁▁▁
                   2.70 ipc ( 99.37% cache)   73.75 branch misses
         45.70k cycles 123.30k instructions   1.87k c-refs   11.76 c-misses

summary
  object-equals
   2.17x faster than are-deeply-equal
   2.19x faster than node.isDeepStrictEqual
   3.93x faster than fast-equals
   31.8x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=512]
------------------------------------------- -------------------------------
object-equals                266.59 µs/iter 267.41 µs  █                   
                    (259.31 µs … 479.78 µs) 333.08 µs  █▄                  
                    ( 21.58 kb … 389.81 kb) 102.39 kb ▅██▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   1.94 ipc ( 73.26% cache)  11.31k branch misses
          1.03M cycles   1.99M instructions  43.41k c-refs  11.61k c-misses

are-deeply-equal             754.99 µs/iter 753.72 µs   █                  
                    (735.32 µs … 993.22 µs) 904.08 µs   █                  
                    (118.69 kb … 683.71 kb) 664.43 kb ▂██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   2.25 ipc ( 82.15% cache)  24.91k branch misses
          2.91M cycles   6.54M instructions 101.78k c-refs  18.17k c-misses

fast-equals                    1.44 ms/iter   1.44 ms       █              
                        (1.40 ms … 1.52 ms)   1.50 ms      ██              
                    ( 78.07 kb …  80.19 kb)  78.11 kb ▃▄▄▄▆███▃▂▂▂▃▂▃▄▃▄▄▂▁
                   2.97 ipc ( 90.99% cache)  61.34k branch misses
          5.80M cycles  17.25M instructions  70.79k c-refs   6.38k c-misses

lodash.isEqual                14.83 ms/iter  14.76 ms  █                   
                      (14.20 ms … 17.45 ms)  17.16 ms  █                   
                    (  2.27 mb …   3.51 mb)   2.94 mb ███▅▅▁▁▄▁▂▁▁▂▂▁▄▁▁▂▁▂
                   2.49 ipc ( 99.10% cache) 128.46k branch misses
         59.66M cycles 148.65M instructions   3.87M c-refs  34.85k c-misses

node.isDeepStrictEqual       422.36 µs/iter 423.31 µs   █▄                 
                    (411.23 µs … 614.32 µs) 479.95 µs  ▅██                 
                    ( 42.20 kb … 569.71 kb) 186.00 kb ▃████▅▃▂▂▂▂▁▁▁▁▁▁▁▁▁▁
                   2.20 ipc ( 84.56% cache)  11.82k branch misses
          1.73M cycles   3.80M instructions  50.65k c-refs   7.82k c-misses

summary
  object-equals
   1.58x faster than node.isDeepStrictEqual
   2.83x faster than are-deeply-equal
   5.39x faster than fast-equals
   55.64x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=4096]
------------------------------------------- -------------------------------
object-equals                  2.37 ms/iter   2.39 ms  █                   
                        (2.26 ms … 3.27 ms)   3.07 ms ▅█                   
                    (832.01 kb … 841.77 kb) 832.60 kb ██▅▅▃▄▃▃▂▂▂▂▁▁▁▁▁▁▁▁▁
                   1.84 ipc ( 79.03% cache) 102.33k branch misses
          8.90M cycles  16.38M instructions 360.21k c-refs  75.54k c-misses

are-deeply-equal              24.21 ms/iter  24.34 ms      █      ██       
                      (23.88 ms … 24.71 ms)  24.59 ms █  █ █    █ ██ █     
                    (  5.17 mb …   5.22 mb)   5.21 mb ██████▁▁▁████████▁▁▁█
                   2.39 ipc ( 90.17% cache) 835.71k branch misses
         92.57M cycles 221.18M instructions   3.64M c-refs 357.60k c-misses

fast-equals                   48.39 ms/iter  48.79 ms   █                 █
                      (47.86 ms … 49.21 ms)  48.88 ms ▅ █▅  ▅ ▅ ▅       ▅ █
                    (624.15 kb … 636.55 kb) 625.03 kb █▁██▁▁█▁█▁█▁▁▁▁▁▁▁█▁█
                   3.08 ipc ( 97.85% cache)   2.05M branch misses
        198.47M cycles 610.36M instructions   3.84M c-refs  82.43k c-misses

lodash.isEqual               657.67 ms/iter 670.83 ms  █   █               
                    (635.76 ms … 701.90 ms) 681.33 ms ▅█▅ ▅█       ▅ ▅   ▅▅
                    ( 14.27 mb …  14.39 mb)  14.29 mb ███▁██▁▁▁▁▁▁▁█▁█▁▁▁██
                   2.58 ipc ( 99.05% cache)   4.49M branch misses
          2.63G cycles   6.79G instructions 128.98M c-refs   1.23M c-misses

node.isDeepStrictEqual         3.54 ms/iter   3.56 ms  █▃                  
                        (3.45 ms … 4.30 ms)   3.89 ms  ██                  
                    (  1.46 mb …   1.46 mb)   1.46 mb ▅██▅█▇▅▅▂▃▂▂▁▂▃▁▁▁▂▁▁
                   2.11 ipc ( 82.65% cache) 102.45k branch misses
         14.40M cycles  30.46M instructions 430.84k c-refs  74.77k c-misses

summary
  object-equals
   1.49x faster than node.isDeepStrictEqual
   10.22x faster than are-deeply-equal
   20.43x faster than fast-equals
   277.64x faster than lodash.isEqual

• Shuffled nested Set with mixed primitive values [size=16386]
------------------------------------------- -------------------------------
object-equals                 12.41 ms/iter  12.47 ms  █     ▄▄▄           
                      (12.21 ms … 12.73 ms)  12.71 ms  ███▅  ████   ▅      
                    (  3.23 mb …   3.26 mb)   3.25 mb ▅█████▅████▁███▅▅▁▅▅▅
                   1.31 ipc ( 81.00% cache) 440.70k branch misses
         50.74M cycles  66.23M instructions   1.54M c-refs 291.75k c-misses

are-deeply-equal             345.58 ms/iter 354.02 ms  █                   
                    (336.31 ms … 356.82 ms) 356.20 ms ██                   
                    ( 20.78 mb …  20.88 mb)  20.81 mb ███▁▁▁▁▁▁▁▁▁█▁▁▁▁████
                   2.29 ipc ( 84.94% cache)  15.16M branch misses
          1.37G cycles   3.14G instructions  58.21M c-refs   8.77M c-misses

fast-equals                  795.07 ms/iter 814.29 ms   █            █     
                    (764.57 ms … 824.97 ms) 821.71 ms ▅ █▅ ▅  ▅      █ ▅ ▅▅
                    (  2.44 mb …   2.50 mb)   2.49 mb █▁██▁█▁▁█▁▁▁▁▁▁█▁█▁██
                   2.87 ipc ( 85.00% cache)  35.48M branch misses
          3.13G cycles   8.98G instructions 109.42M c-refs  16.41M c-misses

lodash.isEqual                 10.06 s/iter   10.07 s █                    
                         (9.82 s … 11.12 s)   10.29 s █     █              
                    ( 56.16 mb …  56.34 mb)  56.25 mb ███▁▁██▁▁▁▁█▁▁▁▁█▁▁▁█
                   2.57 ipc ( 98.52% cache)  65.98M branch misses
         40.46G cycles 103.93G instructions   2.11G c-refs  31.28M c-misses

node.isDeepStrictEqual        18.47 ms/iter  18.52 ms     █                
                      (18.31 ms … 18.82 ms)  18.78 ms  ▅ ██ ▅  ▅           
                    (  5.82 mb …   5.84 mb)   5.82 mb █████▅████▁▁▁▅▅▅▅▅▁▁▅
                   1.61 ipc ( 76.22% cache) 389.73k branch misses
         75.48M cycles 121.31M instructions   1.88M c-refs 448.25k c-misses

summary
  object-equals
   1.49x faster than node.isDeepStrictEqual
   27.85x faster than are-deeply-equal
   64.08x faster than fast-equals
   811.19x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> `dequal` is excluded from the test because it returns an incorrect result. An issue has been opened on the official GitHub repository: [https://github.com/lukeed/dequal/issues/31](https://github.com/lukeed/dequal/issues/31).

### Array Buffer

#### Runtime-specific

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 50.61 ns | 162.56 ns | 179.35 ns | 334.22 ns | 1.00x (baseline) |
| dequal | 54.22 ns | 397.93 ns | 3.03 µs | 11.83 µs | 1.07x-35.39x slower |
| are-deeply-equal | 89.08 ns | 396.00 ns | 2.41 µs | 9.87 µs | 1.76x-29.54x slower |
| node.isDeepStrictEqual | 770.16 ns | 536.87 ns | 577.67 ns | 846.07 ns | 15.22x-2.53x slower |
| lodash.isEqual | 3.81 µs | 5.16 µs | 16.59 µs | 56.45 µs | 75.34x-168.90x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.81 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.2.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Array Buffer [size=16]
------------------------------------------- -------------------------------
object-equals                 50.61 ns/iter  50.01 ns ▆█                   
                     (47.62 ns … 144.32 ns)  94.39 ns ██                   
                    ( 50.38  b … 274.81  b) 208.15  b ██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.87 ipc ( 96.56% cache)    0.01 branch misses
         205.63 cycles  795.05 instructions    6.87 c-refs    0.24 c-misses

are-deeply-equal              89.08 ns/iter  87.98 ns  █                   
                     (83.81 ns … 195.85 ns) 134.25 ns ▂█▂                  
                    (215.25  b … 520.28  b) 392.20  b ███▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.72 ipc ( 96.49% cache)    0.02 branch misses
         362.41 cycles   1.35k instructions   12.95 c-refs    0.45 c-misses

dequal                        54.22 ns/iter  53.78 ns   █                  
                     (47.33 ns … 161.67 ns)  96.43 ns  ▆█                  
                    ( 90.16  b … 271.12  b) 208.19  b ▁███▂▂▃▃▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.87 ipc ( 96.63% cache)    0.01 branch misses
         213.68 cycles  827.43 instructions    6.88 c-refs    0.23 c-misses

lodash.isEqual                 3.81 µs/iter   3.83 µs     ▄  █             
                        (3.75 µs … 4.07 µs)   3.89 µs    ▅█ ▅█   █         
                    (  1.23 kb …   1.26 kb)   1.24 kb █████▅██▁▁██▅▅█▁█▁█▅▅
                   2.37 ipc ( 99.71% cache)   17.49 branch misses
         14.74k cycles  34.87k instructions   1.65k c-refs    4.74 c-misses

node.isDeepStrictEqual       770.16 ns/iter 770.00 ns      █               
                     (670.00 ns … 67.56 µs)   1.01 µs      █               
                    (920.00  b … 232.86 kb) 934.48  b ▁▂▃▃███▁▂▁▁▁▁▁▂▁▁▁▁▁▁
                   1.42 ipc ( 99.70% cache)   30.15 branch misses
          4.38k cycles   6.22k instructions  831.38 c-refs    2.51 c-misses

summary
  object-equals
   1.07x faster than dequal
   1.76x faster than are-deeply-equal
   15.22x faster than node.isDeepStrictEqual
   75.34x faster than lodash.isEqual

• Array Buffer [size=512]
------------------------------------------- -------------------------------
object-equals                162.56 ns/iter 160.16 ns  █                   
                    (153.11 ns … 366.40 ns) 241.00 ns  █                   
                    (240.59  b … 573.70  b) 416.18  b ▃██▂▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.99 ipc ( 96.09% cache)    0.02 branch misses
         623.10 cycles   1.86k instructions   14.07 c-refs    0.55 c-misses

are-deeply-equal             396.00 ns/iter 395.57 ns     █▂               
                    (377.43 ns … 461.29 ns) 444.93 ns     ██               
                    (241.92  b … 502.29  b) 391.95  b ▂▂▄▄██▄▂▁▂▃▃▂▁▂▂▁▁▁▂▁
                   5.36 ipc ( 95.95% cache)    1.02 branch misses
          1.52k cycles   8.17k instructions   13.24 c-refs    0.54 c-misses

dequal                       397.93 ns/iter 396.77 ns  █                   
                    (390.16 ns … 466.69 ns) 442.49 ns  █▅                  
                    ( 41.97  b … 364.64  b) 208.10  b ▆██▄▂▁▂▄▂▁▁▁▂▁▁▁▁▁▁▁▁
                   5.35 ipc ( 96.03% cache)    1.02 branch misses
          1.62k cycles   8.64k instructions    7.06 c-refs    0.28 c-misses

lodash.isEqual                 5.16 µs/iter   5.17 µs   █  ████            
                        (5.09 µs … 5.34 µs)   5.31 µs   █ ▅████            
                    (  1.23 kb …   1.28 kb)   1.24 kb ▇▁█▇█████▇▁▇▇▁▇▁▁▁▁▁▇
                   2.96 ipc ( 99.68% cache)   19.53 branch misses
         21.20k cycles  62.67k instructions   1.77k c-refs    5.58 c-misses

node.isDeepStrictEqual       536.87 ns/iter 544.09 ns    ▄█                
                    (512.09 ns … 621.92 ns) 598.80 ns  ██████▇             
                    (209.22  b … 723.38  b) 544.11  b ▅█████████▅▅▅▅▃▂▂▂▂▁▂
                   2.37 ipc ( 99.46% cache)    0.11 branch misses
          2.19k cycles   5.19k instructions  183.14 c-refs    0.99 c-misses

summary
  object-equals
   2.44x faster than are-deeply-equal
   2.45x faster than dequal
   3.3x faster than node.isDeepStrictEqual
   31.77x faster than lodash.isEqual

• Array Buffer [size=4096]
------------------------------------------- -------------------------------
object-equals                179.35 ns/iter 177.85 ns  █                   
                    (171.94 ns … 270.65 ns) 235.60 ns  █                   
                    (298.28  b … 528.22  b) 416.17  b ▅██▃▂▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   3.21 ipc ( 95.72% cache)    0.02 branch misses
         724.22 cycles   2.32k instructions   14.35 c-refs    0.61 c-misses

are-deeply-equal               2.41 µs/iter   2.40 µs  █                   
                        (2.35 µs … 2.72 µs)   2.70 µs  █▅                  
                    (334.53  b … 392.23  b) 391.20  b ███▆▃▁▂▁▂▁▂▁▃▁▄▁▁▁▂▁▂
                   5.95 ipc ( 94.92% cache)    1.04 branch misses
          9.66k cycles  57.47k instructions   15.45 c-refs    0.79 c-misses

dequal                         3.03 µs/iter   2.99 µs █                    
                        (2.97 µs … 3.49 µs)   3.40 µs ██                   
                    (199.49  b … 208.45  b) 207.88  b ██▂▁▁▃▂▁▁▃▂▂▁▁▁▁▂▁▁▁▂
                   5.62 ipc ( 94.12% cache)    1.04 branch misses
         11.59k cycles  65.11k instructions    8.79 c-refs    0.52 c-misses

lodash.isEqual                16.59 µs/iter  16.83 µs   █▂▅                
                     (15.65 µs … 138.85 µs)  22.32 µs ▄████                
                    (  1.59 kb … 336.98 kb)   1.79 kb █████▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.96 ipc ( 98.83% cache)   46.93 branch misses
         66.49k cycles 263.18k instructions   2.71k c-refs   31.79 c-misses

node.isDeepStrictEqual       577.67 ns/iter 580.77 ns   █▅                 
                    (564.35 ns … 635.44 ns) 626.66 ns  ▇███                
                    (233.22  b … 723.19  b) 544.11  b ▄██████▆▄▂▂▁▁▁▂▁▂▁▂▂▂
                   2.40 ipc ( 99.52% cache)    0.10 branch misses
          2.36k cycles   5.66k instructions  222.78 c-refs    1.08 c-misses

summary
  object-equals
   3.22x faster than node.isDeepStrictEqual
   13.45x faster than are-deeply-equal
   16.87x faster than dequal
   92.49x faster than lodash.isEqual

• Array Buffer [size=16386]
------------------------------------------- -------------------------------
object-equals                334.22 ns/iter 330.21 ns  █                   
                    (320.44 ns … 422.88 ns) 405.83 ns  █▂                  
                    (277.36  b … 534.60  b) 416.10  b ▅██▃▂▂▂▂▁▁▁▁▂▂▂▁▁▁▁▁▂
                   2.98 ipc ( 99.82% cache)    1.02 branch misses
          1.33k cycles   3.96k instructions  556.04 c-refs    1.02 c-misses

are-deeply-equal               9.87 µs/iter   9.80 µs █▃                   
                       (9.75 µs … 10.36 µs)  10.35 µs ██▂                  
                    (386.95  b … 392.54  b) 391.93  b ███▁▁▁▁▁▁▁▆▁▁▁▁▁▁▁▁▁▆
                   6.05 ipc ( 99.63% cache)    1.09 branch misses
         37.47k cycles 226.52k instructions  499.97 c-refs    1.83 c-misses

dequal                        11.83 µs/iter  11.82 µs █                    
                      (11.80 µs … 11.90 µs)  11.88 µs █    █               
                    (208.14  b … 208.16  b) 208.15  b █▁██▁██▁▁▁▁▁▁▁▁▁▁▁█▁█
                   5.66 ipc ( 99.68% cache)    1.13 branch misses
         45.74k cycles 258.74k instructions  428.20 c-refs    1.37 c-misses

lodash.isEqual                56.45 µs/iter  55.14 µs    █                 
                     (51.72 µs … 194.31 µs)  72.68 µs    █                 
                    (  1.59 kb … 566.70 kb)   2.28 kb ▁▂▁█▂▁▁▂▁▁▁▁▁▂▂▁▁▁▁▁▁
                   4.42 ipc ( 98.48% cache)   54.54 branch misses
        216.25k cycles 955.30k instructions   3.29k c-refs   49.92 c-misses

node.isDeepStrictEqual       846.07 ns/iter 849.97 ns          ██          
                    (795.04 ns … 902.55 ns) 901.10 ns          ██▂         
                    (322.75  b … 756.89  b) 544.09  b ▁▃▃▂▃▃▃▅████▂▁▂▁▂▅▃▁▂
                   2.22 ipc ( 99.78% cache)    1.10 branch misses
          3.29k cycles   7.30k instructions  889.97 c-refs    1.97 c-misses

summary
  object-equals
   2.53x faster than node.isDeepStrictEqual
   29.54x faster than are-deeply-equal
   35.39x faster than dequal
   168.9x faster than lodash.isEqual
```

</details>

#### Web-safe

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 49.26 ns | 172.12 ns | 698.99 ns | 2.57 µs | 1.00x (baseline) |
| dequal | 52.80 ns | 407.28 ns | 3.02 µs | 11.90 µs | 1.07x-4.64x slower |
| are-deeply-equal | 93.65 ns | 379.90 ns | 2.46 µs | 9.85 µs | 1.90x-3.84x slower |
| lodash.isEqual | 3.88 µs | 5.17 µs | 17.07 µs | 54.68 µs | 78.83x-21.31x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.66 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.2.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Array Buffer (web-safe) [size=16]
------------------------------------------- -------------------------------
object-equals                 49.26 ns/iter  48.46 ns █▂                   
                     (46.20 ns … 133.12 ns)  94.15 ns ██                   
                    ( 50.38  b … 290.26  b) 208.15  b ██▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.96 ipc ( 96.59% cache)    0.01 branch misses
         200.66 cycles  794.17 instructions    6.87 c-refs    0.23 c-misses

are-deeply-equal              93.65 ns/iter  92.44 ns  █                   
                     (87.27 ns … 200.32 ns) 141.24 ns  █▃                  
                    (215.24  b … 520.28  b) 392.20  b ▆██▃▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▂▁
                   3.56 ipc ( 96.31% cache)    0.02 branch misses
         380.62 cycles   1.36k instructions   13.00 c-refs    0.48 c-misses

dequal                        52.80 ns/iter  53.90 ns  █                   
                     (46.69 ns … 134.28 ns)  97.27 ns ▂█▃                  
                    (  2.54  b … 272.39  b) 208.12  b ███▃▅▆▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.08 ipc ( 96.54% cache)    0.01 branch misses
         199.47 cycles  814.05 instructions    6.87 c-refs    0.24 c-misses

lodash.isEqual                 3.88 µs/iter   3.91 µs    ▂█                
                        (3.81 µs … 4.08 µs)   4.06 µs ▂▅ ██   ▅ ▂          
                    (  1.23 kb …   1.26 kb)   1.24 kb ██▇██▄▇▄█▁█▇▄▁▁▄▁▄▁▁▄
                   2.33 ipc ( 99.68% cache)   17.89 branch misses
         15.02k cycles  34.94k instructions   1.64k c-refs    5.19 c-misses

summary
  object-equals
   1.07x faster than dequal
   1.9x faster than are-deeply-equal
   78.83x faster than lodash.isEqual

• Array Buffer (web-safe) [size=512]
------------------------------------------- -------------------------------
object-equals                172.12 ns/iter 171.82 ns     █                
                    (157.16 ns … 634.66 ns) 226.32 ns    ▆█                
                    (201.71  b … 633.35  b) 416.18  b ▂▇▇██▆▃▂▁▁▁▁▁▁▁▁▁▁▂▁▁
                   4.60 ipc ( 96.34% cache)    0.02 branch misses
         674.29 cycles   3.10k instructions   13.91 c-refs    0.51 c-misses

are-deeply-equal             379.90 ns/iter 377.90 ns  █                   
                    (370.74 ns … 581.11 ns) 431.17 ns  █▆                  
                    (241.92  b … 531.67  b) 392.18  b ▃██▅▂▁▁▂▂▂▁▁▁▁▁▁▁▂▂▁▁
                   5.33 ipc ( 96.04% cache)    1.02 branch misses
          1.53k cycles   8.17k instructions   13.23 c-refs    0.52 c-misses

dequal                       407.28 ns/iter 412.99 ns █▃                   
                    (391.28 ns … 523.69 ns) 492.61 ns ██                   
                    (202.35  b … 347.34  b) 208.81  b ██▅▅▆▆▂▂▃▂▂▂▂▂▂▂▂▁▁▂▁
                   5.37 ipc ( 95.68% cache)    1.02 branch misses
          1.61k cycles   8.63k instructions    7.12 c-refs    0.31 c-misses

lodash.isEqual                 5.17 µs/iter   5.18 µs  █                   
                        (5.03 µs … 5.70 µs)   5.69 µs ▇█▇                  
                    (  1.23 kb …   1.28 kb)   1.24 kb ███▄▇▇▇▁▄▁▁▁▁▁▁▄▁▁▄▁▄
                   3.00 ipc ( 99.64% cache)   17.80 branch misses
         20.88k cycles  62.69k instructions   1.70k c-refs    6.11 c-misses

summary
  object-equals
   2.21x faster than are-deeply-equal
   2.37x faster than dequal
   30.07x faster than lodash.isEqual

• Array Buffer (web-safe) [size=4096]
------------------------------------------- -------------------------------
object-equals                698.99 ns/iter 693.81 ns  █                   
                    (665.42 ns … 889.69 ns) 851.31 ns  █                   
                    (293.31  b … 529.60  b) 416.13  b ██▇▅▂▂▂▁▁▂▂▂▁▂▂▂▁▂▁▂▂
                   5.58 ipc ( 95.28% cache)    1.04 branch misses
          2.76k cycles  15.41k instructions   17.03 c-refs    0.80 c-misses

are-deeply-equal               2.46 µs/iter   2.43 µs █▅                   
                        (2.37 µs … 2.86 µs)   2.81 µs ██▆                  
                    (383.32  b … 392.54  b) 392.01  b ███▄▁▂▁▁▁▂▂▂▁▃▄▁▂▃▁▂▂
                   5.92 ipc ( 93.81% cache)    1.07 branch misses
          9.72k cycles  57.47k instructions   17.08 c-refs    1.06 c-misses

dequal                         3.02 µs/iter   3.07 µs       █              
                        (2.84 µs … 3.32 µs)   3.32 µs       █▇  ▂          
                    (110.43  b … 208.17  b) 206.16  b ▅█▃█▃▅██▅▅█▃▃▆▁▁▅▁▁▁▃
                   5.61 ipc ( 91.61% cache)    1.06 branch misses
         11.61k cycles  65.10k instructions   10.91 c-refs    0.92 c-misses

lodash.isEqual                17.07 µs/iter  16.83 µs  █                   
                     (16.04 µs … 147.47 µs)  26.20 µs  █▂                  
                    (  1.59 kb … 397.43 kb)   1.80 kb ███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.94 ipc ( 98.85% cache)   48.88 branch misses
         66.75k cycles 263.12k instructions   2.75k c-refs   31.63 c-misses

summary
  object-equals
   3.51x faster than are-deeply-equal
   4.32x faster than dequal
   24.41x faster than lodash.isEqual

• Array Buffer (web-safe) [size=16386]
------------------------------------------- -------------------------------
object-equals                  2.57 µs/iter   2.58 µs ▅ ▂ █▂▅              
                        (2.53 µs … 2.66 µs)   2.65 µs █▇█▅███▂▂▂  ▅        
                    (306.82  b … 416.19  b) 414.33  b ██████████▄▄█▄▄▁▁▁▇▁▄
                   5.85 ipc ( 99.67% cache)    1.09 branch misses
          9.87k cycles  57.71k instructions  555.19 c-refs    1.84 c-misses

are-deeply-equal               9.85 µs/iter   9.86 µs            █         
                        (9.76 µs … 9.98 µs)   9.93 µs ▅▅  ▅ ▅▅▅ ▅█▅  ▅ ▅  ▅
                    (386.95  b … 392.54  b) 391.93  b ██▁▁█▁███▁███▁▁█▁█▁▁█
                   5.99 ipc ( 99.37% cache)    1.19 branch misses
         37.82k cycles 226.52k instructions  479.03 c-refs    3.04 c-misses

dequal                        11.90 µs/iter  11.93 µs █ ██   █ █   ████   █
                      (11.82 µs … 11.99 µs)  11.97 µs █ ██   █ █   ████   █
                    (208.14  b … 208.16  b) 208.15  b █▁██▁▁▁█▁█▁▁▁████▁▁▁█
                   5.65 ipc ( 99.52% cache)    1.19 branch misses
         45.83k cycles 258.73k instructions  430.62 c-refs    2.06 c-misses

lodash.isEqual                54.68 µs/iter  54.88 µs  █                   
                     (51.13 µs … 375.22 µs)  77.23 µs  █                   
                    (  1.59 kb … 586.53 kb)   2.26 kb ▄█▂▅▂▂▂▁▁▁▂▂▁▁▁▁▁▁▁▁▁
                   4.40 ipc ( 97.53% cache)   57.56 branch misses
        217.09k cycles 955.14k instructions   3.32k c-refs   82.29 c-misses

summary
  object-equals
   3.84x faster than are-deeply-equal
   4.64x faster than dequal
   21.31x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> This table reflects `web-safe` operation and for fairness, excludes `node.isDeepStrictEqual`, which is not available in browser runtimes and would distort the comparison. `object-equals` also leverages `Buffer.compare` internally when is available, but gracefully falls back to cross-platform logic in web to ensure consistent and deterministic results.

> [!NOTE]  
> `fast-equals` is also excluded from the both tests because it does not natively support ArrayBuffer and returns misleading results despite executing without errors. This behavior could lead to incorrect conclusions about its performance or correctness.

### Typed Array

#### Runtime-specific

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 19.44 ns | 128.15 ns | 146.13 ns | 310.52 ns | 1.00x (baseline) |
| dequal | 19.58 ns | 390.30 ns | 2.88 µs | 11.65 µs | 1.01x-37.51x slower |
| fast-equals | 22.95 ns | 388.46 ns | 2.81 µs | 11.82 µs | 1.18x-38.05x slower |
| are-deeply-equal | 44.95 ns | 343.79 ns | 2.37 µs | 9.90 µs | 2.31x-31.89x slower |
| node.isDeepStrictEqual | 635.04 ns | 610.07 ns | 680.73 ns | 916.30 ns | 32.67x-2.95x slower |
| lodash.isEqual | 1.95 µs | 3.56 µs | 14.72 µs | 54.47 µs | 100.49x-175.40x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.66 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Typed Array [size=16]
------------------------------------------- -------------------------------
object-equals                 19.44 ns/iter  19.08 ns    █                 
                      (17.94 ns … 83.96 ns)  26.22 ns    █                 
                    (  0.10  b …  50.29  b)   0.21  b ▂▄██▂▃▂▁▁▁▁▁▂▁▁▁▁▁▁▁▁
                   5.24 ipc ( 93.33% cache)    0.01 branch misses
          75.05 cycles  393.19 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              44.95 ns/iter  44.24 ns █                    
                     (42.69 ns … 139.71 ns)  91.34 ns █                    
                    ( 34.94  b … 280.21  b) 184.24  b ██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.02 ipc ( 96.68% cache)    0.01 branch misses
         172.93 cycles  695.33 instructions    6.11 c-refs    0.20 c-misses

fast-equals                   22.95 ns/iter  22.87 ns  █ ▄                 
                      (21.30 ns … 91.93 ns)  29.58 ns ▂█ █                 
                    (  0.09  b …  48.15  b)   0.22  b ████▇▃▄▂▂▁▁▁▁▄▃▂▂▂▁▁▁
                   4.90 ipc ( 92.72% cache)    0.01 branch misses
          89.42 cycles  437.96 instructions    0.04 c-refs    0.00 c-misses

dequal                        19.58 ns/iter  19.06 ns █                    
                     (18.83 ns … 138.42 ns)  28.50 ns █                    
                    (  0.09  b …  64.31  b)   0.19  b █▂▂▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.12 ipc ( 91.12% cache)    0.01 branch misses
          75.16 cycles  384.83 instructions    0.04 c-refs    0.00 c-misses

lodash.isEqual                 1.95 µs/iter   1.97 µs    ▂ ███ ▆           
                        (1.86 µs … 2.12 µs)   2.11 µs    █▃███▃█▃          
                    (591.00  b …   1.10 kb) 740.80  b ▃▅▃████████▅▇▁▇▁▃▅▁▃▃
                   2.38 ipc ( 99.73% cache)    7.07 branch misses
          7.49k cycles  17.80k instructions  862.64 c-refs    2.30 c-misses

node.isDeepStrictEqual       635.04 ns/iter 639.04 ns    █                 
                    (594.77 ns … 856.31 ns) 798.58 ns   ▇█▅                
                    (322.09  b … 629.86  b) 480.13  b ▃▄███▇▆▂▂▂▂▂▂▁▁▁▁▁▁▁▂
                   2.32 ipc ( 99.60% cache)    0.14 branch misses
          2.44k cycles   5.66k instructions  244.86 c-refs    0.97 c-misses

summary
  object-equals
   1.01x faster than dequal
   1.18x faster than fast-equals
   2.31x faster than are-deeply-equal
   32.67x faster than node.isDeepStrictEqual
   100.49x faster than lodash.isEqual

• Typed Array [size=512]
------------------------------------------- -------------------------------
object-equals                128.15 ns/iter 126.21 ns  █                   
                    (119.74 ns … 500.65 ns) 196.82 ns  █                   
                    ( 32.57  b … 328.19  b) 208.14  b ▅██▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.00 ipc ( 95.76% cache)    0.02 branch misses
         486.19 cycles   1.46k instructions    7.31 c-refs    0.31 c-misses

are-deeply-equal             343.79 ns/iter 347.35 ns     █                
                    (319.69 ns … 459.64 ns) 432.11 ns ▅▄  █                
                    ( 33.82  b … 293.95  b) 184.12  b ██▅▇█▄▃▅▃▃▂▂▁▂▂▂▁▁▂▁▁
                   5.66 ipc ( 95.35% cache)    1.02 branch misses
          1.33k cycles   7.52k instructions    6.43 c-refs    0.30 c-misses

fast-equals                  388.46 ns/iter 385.35 ns █                    
                    (381.92 ns … 578.41 ns) 457.42 ns █▄                   
                    (  0.09  b … 143.10  b)   0.80  b ██▃▂▁▁▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁
                   5.51 ipc ( 79.07% cache)    1.01 branch misses
          1.50k cycles   8.25k instructions    0.17 c-refs    0.04 c-misses

dequal                       390.30 ns/iter 392.57 ns ▃█                   
                    (378.01 ns … 541.94 ns) 464.06 ns ██                   
                    (  0.09  b … 156.63  b)   0.50  b ███▅▄▄▃▃▂▃▂▁▂▂▁▁▁▁▁▁▁
                   5.48 ipc ( 80.43% cache)    1.01 branch misses
          1.50k cycles   8.20k instructions    0.34 c-refs    0.07 c-misses

lodash.isEqual                 3.56 µs/iter   3.58 µs       ▃  █▃█ █       
                        (3.48 µs … 3.65 µs)   3.64 µs      ▇█▂▇███ █▇▇     
                    (650.56  b … 831.83  b) 737.19  b ▆▁▁▆▆███████▆███▁▆▆▁▆
                   3.39 ipc ( 99.64% cache)    7.69 branch misses
         13.79k cycles  46.80k instructions  918.11 c-refs    3.29 c-misses

node.isDeepStrictEqual       610.07 ns/iter 622.03 ns    █                 
                    (576.14 ns … 695.37 ns) 688.73 ns   ███  ▃▆▂           
                    (289.70  b … 621.71  b) 480.11  b ▂█████████▅▅▅▁▄▃▁▁▁▁▂
                   2.34 ipc ( 99.64% cache)    0.14 branch misses
          2.43k cycles   5.69k instructions  256.60 c-refs    0.91 c-misses

summary
  object-equals
   2.68x faster than are-deeply-equal
   3.03x faster than fast-equals
   3.05x faster than dequal
   4.76x faster than node.isDeepStrictEqual
   27.78x faster than lodash.isEqual

• Typed Array [size=4096]
------------------------------------------- -------------------------------
object-equals                146.13 ns/iter 145.59 ns   █                  
                    (137.96 ns … 210.06 ns) 192.11 ns  ▅█                  
                    ( 57.16  b … 328.20  b) 208.17  b ▁███▄▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.29 ipc ( 95.58% cache)    0.02 branch misses
         586.13 cycles   1.93k instructions    7.83 c-refs    0.35 c-misses

are-deeply-equal               2.37 µs/iter   2.35 µs ▅█                   
                        (2.32 µs … 2.78 µs)   2.75 µs ██                   
                    (175.28  b … 184.48  b) 183.98  b ██▄▁▁▂▁▄▃▂▁▁▂▁▁▁▁▁▁▁▂
                   5.99 ipc ( 93.26% cache)    1.04 branch misses
          9.49k cycles  56.81k instructions    8.54 c-refs    0.58 c-misses

fast-equals                    2.81 µs/iter   2.82 µs   █                  
                        (2.79 µs … 2.84 µs)   2.84 µs   █ ▃   ▃▆▃▃         
                    (  0.09  b …   0.46  b)   0.10  b ▆▆█▄█▆██████▁▄▆▆█▄█▁▆
                   5.68 ipc ( 80.86% cache)    1.04 branch misses
         11.40k cycles  64.73k instructions    1.68 c-refs    0.32 c-misses

dequal                         2.88 µs/iter   2.90 µs  █                   
                        (2.79 µs … 3.22 µs)   3.19 µs ▆█▃                  
                    (  0.09  b …   0.41  b)   0.10  b ███▇▅▅▅▁▁▁▂▂▂▄▁▁▁▂▂▂▄
                   5.66 ipc ( 80.18% cache)    1.04 branch misses
         11.43k cycles  64.67k instructions    1.68 c-refs    0.33 c-misses

lodash.isEqual                14.72 µs/iter  14.76 µs  █                   
                     (13.63 µs … 151.38 µs)  21.32 µs ▅█ ▇                 
                    (  1.07 kb … 394.01 kb)   1.26 kb ██▂█▁▁▁▁▁▂▂▂▂▁▁▁▁▁▁▁▁
                   4.17 ipc ( 99.02% cache)   38.05 branch misses
         59.41k cycles 247.52k instructions   1.79k c-refs   17.60 c-misses

node.isDeepStrictEqual       680.73 ns/iter 689.81 ns    ▅█▅▄              
                    (644.14 ns … 755.77 ns) 743.47 ns    ██████▅           
                    (373.54  b … 623.90  b) 480.11  b ▃▄▆███████▆█▇▄▆▃▂▅▃▂▂
                   2.36 ipc ( 99.61% cache)    0.17 branch misses
          2.61k cycles   6.17k instructions  283.14 c-refs    1.10 c-misses

summary
  object-equals
   4.66x faster than node.isDeepStrictEqual
   16.19x faster than are-deeply-equal
   19.25x faster than fast-equals
   19.73x faster than dequal
   100.71x faster than lodash.isEqual

• Typed Array [size=16386]
------------------------------------------- -------------------------------
object-equals                310.52 ns/iter 312.36 ns     █                
                    (291.90 ns … 409.40 ns) 379.15 ns  ▃  █▂               
                    ( 57.29  b … 328.52  b) 207.89  b ▇█▇▆██▄▂▂▂▂▂▂▂▁▁▁▁▁▁▁
                   2.94 ipc ( 99.91% cache)    1.02 branch misses
          1.21k cycles   3.56k instructions  546.08 c-refs    0.50 c-misses

are-deeply-equal               9.90 µs/iter   9.86 µs                    █ 
                       (9.75 µs … 10.80 µs)   9.90 µs ▅   ▅▅▅▅▅  ▅ ▅▅▅   █▅
                    (178.93  b … 184.48  b) 183.89  b █▁▁▁█████▁▁█▁███▁▁▁██
                   6.02 ipc ( 99.48% cache)    1.15 branch misses
         37.52k cycles 225.87k instructions  482.27 c-refs    2.49 c-misses

fast-equals                   11.82 µs/iter  11.84 µs           █        █ 
                      (11.76 µs … 11.87 µs)  11.85 µs ▅▅   ▅    █ ▅ ▅    █▅
                    (  0.10  b …   0.10  b)   0.10  b ██▁▁▁█▁▁▁▁█▁█▁█▁▁▁▁██
                   5.68 ipc ( 99.69% cache)    1.14 branch misses
         45.49k cycles 258.37k instructions  293.83 c-refs    0.91 c-misses

dequal                        11.65 µs/iter  11.86 µs           █        █ 
                      (11.30 µs … 11.89 µs)  11.89 µs ▅▅   ▅    █ ▅▅     █▅
                    (  0.10  b …   0.41  b)   0.12  b ██▁▁▁█▁▁▁▁█▁██▁▁▁▁▁██
                   5.67 ipc ( 99.66% cache)    1.13 branch misses
         45.57k cycles 258.31k instructions  364.61 c-refs    1.22 c-misses

lodash.isEqual                54.47 µs/iter  53.30 µs █                    
                     (52.67 µs … 176.37 µs)  73.85 µs █                    
                    (  1.07 kb … 170.23 kb)   1.50 kb █▆▂▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.48 ipc ( 98.13% cache)   40.40 branch misses
        209.07k cycles 937.49k instructions   2.53k c-refs   47.37 c-misses

node.isDeepStrictEqual       916.30 ns/iter 929.47 ns         █▃           
                      (855.19 ns … 1.02 µs) 994.24 ns        ▄██▄          
                    (156.62  b … 795.09  b) 480.09  b ▄▃▇▄▄▆▆████▇█▆▅▄▂▄▂▂▂
                   2.20 ipc ( 99.85% cache)    1.17 branch misses
          3.55k cycles   7.81k instructions  941.52 c-refs    1.37 c-misses

summary
  object-equals
   2.95x faster than node.isDeepStrictEqual
   31.89x faster than are-deeply-equal
   37.51x faster than dequal
   38.05x faster than fast-equals
   175.4x faster than lodash.isEqual
```

</details>

#### Web-safe

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 18.78 ns | 143.03 ns | 683.49 ns | 2.54 µs | 1.00x (baseline) |
| dequal | 19.30 ns | 385.19 ns | 2.97 µs | 12.02 µs | 1.03x-4.74x slower |
| fast-equals | 22.06 ns | 394.27 ns | 2.98 µs | 11.90 µs | 1.17x-4.69x slower |
| are-deeply-equal | 48.52 ns | 345.69 ns | 2.49 µs | 9.71 µs | 2.58x-3.83x slower |
| lodash.isEqual | 1.94 µs | 3.52 µs | 15.17 µs | 54.11 µs | 103.36x-21.34x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.62 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Typed Array [size=16]
------------------------------------------- -------------------------------
object-equals                 18.78 ns/iter  18.78 ns █                    
                      (17.86 ns … 75.90 ns)  26.90 ns ██▂                  
                    (  0.10  b …  58.52  b)   0.21  b ███▅▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.24 ipc ( 93.91% cache)    0.01 branch misses
          74.79 cycles  392.12 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              48.52 ns/iter  48.02 ns   █                  
                     (42.44 ns … 156.73 ns)  90.14 ns   █                  
                    ( 34.94  b … 264.18  b) 184.24  b ▁▁█▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.53 ipc ( 96.70% cache)    0.01 branch misses
         196.85 cycles  695.69 instructions    6.11 c-refs    0.20 c-misses

fast-equals                   22.06 ns/iter  21.88 ns █                    
                     (21.56 ns … 100.60 ns)  27.04 ns █▇                   
                    (  0.09  b …  64.14  b)   0.20  b ██▃▃▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.90 ipc ( 94.20% cache)    0.01 branch misses
          89.40 cycles  438.04 instructions    0.04 c-refs    0.00 c-misses

dequal                        19.30 ns/iter  19.06 ns █                    
                      (17.87 ns … 85.28 ns)  34.90 ns █▂                   
                    (  0.09  b …  52.21  b)   0.18  b ██▃▂▁▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.13 ipc ( 92.91% cache)    0.01 branch misses
          75.07 cycles  384.79 instructions    0.03 c-refs    0.00 c-misses

lodash.isEqual                 1.94 µs/iter   1.95 µs  █                   
                        (1.86 µs … 2.31 µs)   2.28 µs ▂█▄▂                 
                    (522.76  b … 982.76  b) 736.51  b ████▆▅▃▃▁▂▂▁▁▂▁▂▁▁▃▃▂
                   2.42 ipc ( 99.70% cache)    7.34 branch misses
          7.35k cycles  17.77k instructions  875.36 c-refs    2.63 c-misses

summary
  object-equals
   1.03x faster than dequal
   1.17x faster than fast-equals
   2.58x faster than are-deeply-equal
   103.36x faster than lodash.isEqual

• Typed Array [size=512]
------------------------------------------- -------------------------------
object-equals                143.03 ns/iter 140.04 ns  █                   
                    (134.79 ns … 371.58 ns) 235.04 ns ▅█                   
                    ( 53.18  b … 320.20  b) 208.14  b ██▃▂▂▁▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁
                   4.92 ipc ( 95.71% cache)    0.02 branch misses
         548.72 cycles   2.70k instructions    7.12 c-refs    0.31 c-misses

are-deeply-equal             345.69 ns/iter 345.19 ns    █                 
                    (329.11 ns … 545.74 ns) 404.24 ns    █                 
                    ( 45.88  b … 323.63  b) 184.14  b ▁▂▃██▅▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   5.65 ipc ( 95.67% cache)    1.02 branch misses
          1.33k cycles   7.52k instructions    6.37 c-refs    0.28 c-misses

fast-equals                  394.27 ns/iter 408.53 ns █▅ █                 
                    (361.02 ns … 599.40 ns) 510.18 ns ██▅█                 
                    (  0.09  b … 127.56  b)   0.50  b ████▆▃▃▃▄▄▄▃▃▅▄▃▁▁▂▂▂
                   5.52 ipc ( 79.96% cache)    1.01 branch misses
          1.49k cycles   8.25k instructions    0.22 c-refs    0.04 c-misses

dequal                       385.19 ns/iter 381.08 ns █                    
                    (377.70 ns … 521.27 ns) 483.92 ns █                    
                    (  0.09  b … 166.39  b)   0.83  b ██▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.55 ipc ( 80.64% cache)    1.01 branch misses
          1.48k cycles   8.20k instructions    0.20 c-refs    0.04 c-misses

lodash.isEqual                 3.52 µs/iter   3.54 µs        ▅█  ▅         
                        (3.40 µs … 3.74 µs)   3.62 µs        ██▆██▃   ▃    
                    (583.45  b … 898.58  b) 737.25  b █▁▁▁▁▁████████▁▄█▄▄▁▄
                   3.43 ipc ( 99.63% cache)    7.07 branch misses
         13.64k cycles  46.74k instructions  925.37 c-refs    3.44 c-misses

summary
  object-equals
   2.42x faster than are-deeply-equal
   2.69x faster than dequal
   2.76x faster than fast-equals
   24.6x faster than lodash.isEqual

• Typed Array [size=4096]
------------------------------------------- -------------------------------
object-equals                683.49 ns/iter 689.57 ns  █                   
                    (669.37 ns … 769.77 ns) 747.45 ns  █▃                  
                    (202.21  b … 428.27  b) 209.02  b ███▅▃▄▄▃▃▂▂▂▂▂▁▁▂▂▁▁▁
                   5.73 ipc ( 94.91% cache)    1.02 branch misses
          2.62k cycles  15.02k instructions    8.43 c-refs    0.43 c-misses

are-deeply-equal               2.49 µs/iter   2.50 µs   █                  
                        (2.44 µs … 2.77 µs)   2.75 µs ▇▇█▂▂                
                    (175.28  b … 184.48  b) 183.97  b █████▄▂▂▄▂▁▁▂▁▁▁▁▁▂▁▂
                   5.92 ipc ( 94.58% cache)    1.04 branch misses
          9.59k cycles  56.81k instructions   11.66 c-refs    0.63 c-misses

fast-equals                    2.98 µs/iter   2.98 µs  █▅                  
                        (2.94 µs … 3.17 µs)   3.15 µs ▂██                  
                    (  0.09  b …   0.46  b)   0.10  b ███▅▄▁▅▁▁▂▁▅▁▁▂▁▂▁▂▁▄
                   5.63 ipc ( 84.59% cache)    1.04 branch misses
         11.50k cycles  64.73k instructions    2.55 c-refs    0.39 c-misses

dequal                         2.97 µs/iter   2.99 µs  █▂▅                 
                        (2.94 µs … 3.08 µs)   3.06 µs ▇███▂▂ ▂▇    ▂       
                    (  0.09  b …   0.42  b)   0.10  b ██████▄██▇▇▁▇█▄▁▁▄▁▁▄
                   5.66 ipc ( 85.03% cache)    1.04 branch misses
         11.43k cycles  64.67k instructions    2.32 c-refs    0.35 c-misses

lodash.isEqual                15.17 µs/iter  14.92 µs  █                   
                     (14.44 µs … 171.50 µs)  23.37 µs  █                   
                    (  1.07 kb … 220.80 kb)   1.26 kb ▆█▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.14 ipc ( 98.88% cache)   37.90 branch misses
         59.72k cycles 247.25k instructions   1.75k c-refs   19.62 c-misses

summary
  object-equals
   3.64x faster than are-deeply-equal
   4.35x faster than dequal
   4.37x faster than fast-equals
   22.2x faster than lodash.isEqual

• Typed Array [size=16386]
------------------------------------------- -------------------------------
object-equals                  2.54 µs/iter   2.55 µs  ▄▂█                 
                        (2.48 µs … 2.76 µs)   2.71 µs ▃████                
                    (160.31  b … 208.16  b) 207.22  b █████▇▇▅▅▇▁▅▁▁▃▁▁▁▅▁▃
                   5.89 ipc ( 99.83% cache)    1.04 branch misses
          9.73k cycles  57.31k instructions  509.41 c-refs    0.87 c-misses

are-deeply-equal               9.71 µs/iter   9.72 µs   █                  
                        (9.67 µs … 9.85 µs)   9.81 µs █ ██    █            
                    (178.89  b … 184.48  b) 183.88  b █████▁▁▁█▁█▁▁▁▁▁▁▁▁▁█
                   6.02 ipc ( 99.56% cache)    1.10 branch misses
         37.53k cycles 225.87k instructions  396.65 c-refs    1.74 c-misses

fast-equals                   11.90 µs/iter  11.90 µs    █                 
                      (11.78 µs … 12.28 µs)  12.05 µs ▅ ▅█▅▅ ▅ ▅  ▅       ▅
                    (  0.10  b …   0.10  b)   0.10  b █▁████▁█▁█▁▁█▁▁▁▁▁▁▁█
                   5.63 ipc ( 99.65% cache)    1.15 branch misses
         45.91k cycles 258.37k instructions  326.91 c-refs    1.13 c-misses

dequal                        12.02 µs/iter  12.04 µs  █        █          
                      (11.84 µs … 12.40 µs)  12.16 µs ▅█   ▅   ▅█  ▅   ▅  ▅
                    (  0.10  b …   0.41  b)   0.12  b ██▁▁▁█▁▁▁██▁▁█▁▁▁█▁▁█
                   5.57 ipc ( 99.57% cache)    1.12 branch misses
         46.37k cycles 258.31k instructions  326.85 c-refs    1.40 c-misses

lodash.isEqual                54.11 µs/iter  53.11 µs █                    
                     (52.64 µs … 173.21 µs)  77.98 µs █                    
                    (624.00  b … 180.76 kb)   1.47 kb █▃▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.48 ipc ( 97.91% cache)   40.75 branch misses
        209.29k cycles 937.51k instructions   2.36k c-refs   49.34 c-misses

summary
  object-equals
   3.83x faster than are-deeply-equal
   4.69x faster than fast-equals
   4.74x faster than dequal
   21.34x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> This table reflects `web-safe` operation and for fairness, excludes `node.isDeepStrictEqual`, which is not available in browser runtimes and would distort the comparison. `object-equals` also leverages `Buffer.compare` internally when is available, but gracefully falls back to cross-platform logic in web to ensure consistent and deterministic results.

### Data View

#### Runtime-specific

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 12.38 ns | 111.63 ns | 155.57 ns | 309.08 ns | 1.00x (baseline) |
| dequal | 19.41 ns | 368.89 ns | 2.96 µs | 11.92 µs | 1.57x-38.57x slower |
| are-deeply-equal | 89.22 ns | 395.22 ns | 2.51 µs | 9.95 µs | 7.20x-32.18x slower |
| node.isDeepStrictEqual | 559.34 ns | 545.81 ns | 583.50 ns | 861.16 ns | 45.17x-2.79x slower |
| lodash.isEqual | 3.95 µs | 5.22 µs | 16.48 µs | 56.18 µs | 318.74x-181.76x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.65 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Data View [size=16]
------------------------------------------- -------------------------------
object-equals                 12.38 ns/iter  12.16 ns █                    
                      (12.09 ns … 50.63 ns)  17.07 ns █                    
                    (  0.10  b …  87.50  b)   0.18  b █▁▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.84 ipc ( 95.44% cache)    0.01 branch misses
          50.91 cycles  246.50 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              89.22 ns/iter  88.26 ns  █                   
                     (84.59 ns … 199.33 ns) 135.25 ns  █                   
                    (191.03  b … 520.28  b) 392.21  b ▆█▆▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁
                   3.39 ipc ( 96.33% cache)    0.02 branch misses
         364.18 cycles   1.24k instructions   12.99 c-refs    0.48 c-misses

dequal                        19.41 ns/iter  20.72 ns █                    
                      (18.28 ns … 65.45 ns)  24.65 ns █                    
                    (  0.09  b …  52.20  b)   0.18  b █▁▁▂▂▁▁▁▁▂▃▃▃▂▁▁▁▁▁▁▁
                   4.77 ipc ( 94.27% cache)    0.01 branch misses
          71.80 cycles  342.72 instructions    0.04 c-refs    0.00 c-misses

lodash.isEqual                 3.95 µs/iter   3.97 µs    █                 
                        (3.85 µs … 4.18 µs)   4.17 µs   ▆█ ▃  ▃            
                    (  1.23 kb …   1.26 kb)   1.24 kb ▆▄█████▄█▁▁▄█▁▁▁▄▄▁▁▄
                   2.33 ipc ( 99.73% cache)   18.10 branch misses
         15.15k cycles  35.27k instructions   1.75k c-refs    4.65 c-misses

node.isDeepStrictEqual       559.34 ns/iter 566.90 ns    █▂                
                    (523.54 ns … 787.46 ns) 753.33 ns  █▄██                
                    (313.79  b … 621.71  b) 480.16  b █████▆▅▂▂▁▁▁▁▁▁▁▁▁▁▁▁
                   2.38 ipc ( 99.49% cache)    0.15 branch misses
          2.20k cycles   5.24k instructions  180.74 c-refs    0.93 c-misses

summary
  object-equals
   1.57x faster than dequal
   7.2x faster than are-deeply-equal
   45.17x faster than node.isDeepStrictEqual
   318.74x faster than lodash.isEqual

• Data View [size=512]
------------------------------------------- -------------------------------
object-equals                111.63 ns/iter 110.60 ns   █▅                 
                     (98.30 ns … 305.59 ns) 172.83 ns   ██                 
                    ( 80.34  b … 319.51  b) 208.32  b ▂███▆▂▂▃▃▃▂▁▁▁▁▁▁▁▁▁▁
                   3.13 ipc ( 95.78% cache)    0.02 branch misses
         428.12 cycles   1.34k instructions    7.28 c-refs    0.31 c-misses

are-deeply-equal             395.22 ns/iter 394.97 ns   █                  
                    (386.00 ns … 450.30 ns) 442.91 ns  ▂█▆                 
                    (241.86  b … 531.67  b) 392.18  b ▁███▄▄▃▂▁▁▁▁▂▁▁▁▁▁▁▁▁
                   5.30 ipc ( 95.78% cache)    1.02 branch misses
          1.52k cycles   8.05k instructions   13.30 c-refs    0.56 c-misses

dequal                       368.89 ns/iter 377.65 ns  █                   
                    (356.49 ns … 545.97 ns) 418.59 ns ██▃    █             
                    (  0.09  b … 182.39  b)   0.85  b ███▇▅▅▄█▅▂▂▂▂▁▁▁▁▁▁▁▁
                   4.86 ipc ( 79.51% cache)    1.01 branch misses
          1.47k cycles   7.17k instructions    0.17 c-refs    0.03 c-misses

lodash.isEqual                 5.22 µs/iter   5.24 µs    █▄                
                        (5.17 µs … 5.38 µs)   5.35 µs   ▅██ ▅ ▅            
                    (  1.23 kb …   1.28 kb)   1.24 kb █████▁█▁██▅▁▁▁▁▁▁▁▁▁▅
                   2.94 ipc ( 99.67% cache)   18.52 branch misses
         21.43k cycles  63.10k instructions   1.81k c-refs    5.99 c-misses

node.isDeepStrictEqual       545.81 ns/iter 553.14 ns       █▂▂            
                    (507.97 ns … 610.82 ns) 604.56 ns      ▃███▆▆          
                    (180.50  b … 659.18  b) 480.11  b ▂▁▄▆▇██████▅▅▃▄▂▂▁▂▁▁
                   2.38 ipc ( 99.51% cache)    0.19 branch misses
          2.22k cycles   5.28k instructions  190.20 c-refs    0.94 c-misses

summary
  object-equals
   3.3x faster than dequal
   3.54x faster than are-deeply-equal
   4.89x faster than node.isDeepStrictEqual
   46.77x faster than lodash.isEqual

• Data View [size=4096]
------------------------------------------- -------------------------------
object-equals                155.57 ns/iter 164.60 ns  █                   
                    (133.68 ns … 260.33 ns) 225.03 ns  █▂   █▄             
                    ( 77.28  b … 320.20  b) 208.14  b ▄██▃▃▅██▆▄▂▂▂▂▂▁▁▁▁▁▁
                   3.31 ipc ( 96.83% cache)    0.02 branch misses
         546.09 cycles   1.81k instructions   12.35 c-refs    0.39 c-misses

are-deeply-equal               2.51 µs/iter   2.52 µs    ▅▂  █ ▂           
                        (2.48 µs … 2.57 µs)   2.56 µs  ▂▅██▂▇█ █ ▅   ▂     
                    (383.32  b … 392.54  b) 392.01  b ▇███████▇█▇█▄▇▇█▄▁▄▄▄
                   5.96 ipc ( 94.75% cache)    1.05 branch misses
          9.62k cycles  57.35k instructions   16.98 c-refs    0.89 c-misses

dequal                         2.96 µs/iter   2.97 µs  █   █               
                        (2.94 µs … 3.15 µs)   3.02 µs ▃█▆▃██▃ █▆           
                    (  0.09  b …   0.42  b)   0.10  b ███████████▄▄█▄▁▁█▁▁▄
                   4.93 ipc ( 81.93% cache)    1.04 branch misses
         11.45k cycles  56.47k instructions    1.89 c-refs    0.34 c-misses

lodash.isEqual                16.48 µs/iter  16.08 µs  █                   
                     (15.18 µs … 162.59 µs)  25.05 µs  █▆                  
                    (  1.59 kb … 260.41 kb)   1.80 kb ▂██▃▁▁▁▁▁▃▁▁▁▁▁▁▁▁▁▁▁
                   3.95 ipc ( 99.03% cache)   48.05 branch misses
         66.81k cycles 263.83k instructions   2.75k c-refs   26.75 c-misses

node.isDeepStrictEqual       583.50 ns/iter 585.84 ns   █▇                 
                    (556.47 ns … 724.28 ns) 707.57 ns  ███▂                
                    (178.56  b … 651.15  b) 480.11  b ▄████▅▄▃▃▁▂▂▂▁▁▂▁▁▁▁▁
                   2.45 ipc ( 99.59% cache)    0.14 branch misses
          2.35k cycles   5.76k instructions  231.14 c-refs    0.94 c-misses

summary
  object-equals
   3.75x faster than node.isDeepStrictEqual
   16.12x faster than are-deeply-equal
   19.06x faster than dequal
   105.95x faster than lodash.isEqual

• Data View [size=16386]
------------------------------------------- -------------------------------
object-equals                309.08 ns/iter 308.50 ns  █▆                  
                    (297.96 ns … 389.74 ns) 377.00 ns  ██                  
                    ( 93.37  b … 326.56  b) 208.27  b ▄██▇▄▃▂▁▁▃▁▁▁▁▁▁▁▁▁▁▁
                   2.78 ipc ( 99.92% cache)    1.02 branch misses
          1.24k cycles   3.45k instructions  631.64 c-refs    0.53 c-misses

are-deeply-equal               9.95 µs/iter  10.24 µs █                 █  
                       (9.34 µs … 10.73 µs)  10.36 µs █ ▅    ▅▅ ▅▅ ▅▅   █▅▅
                    (387.01  b … 392.54  b) 391.94  b █▁█▁▁▁▁██▁██▁██▁▁▁███
                   6.00 ipc ( 99.40% cache)    1.15 branch misses
         37.72k cycles 226.40k instructions  542.04 c-refs    3.25 c-misses

dequal                        11.92 µs/iter  11.93 µs        █             
                      (11.88 µs … 11.98 µs)  11.96 µs        █   █         
                    (  0.10  b …   0.10  b)   0.10  b █▁█▁▁▁▁█▁▁██▁▁█▁▁▁▁▁█
                   4.93 ipc ( 99.75% cache)    1.13 branch misses
         45.75k cycles 225.53k instructions  363.81 c-refs    0.93 c-misses

lodash.isEqual                56.18 µs/iter  55.18 µs  █                   
                     (54.36 µs … 195.26 µs)  74.72 µs  █                   
                    (  1.59 kb … 626.24 kb)   2.29 kb ▅█▂▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.41 ipc ( 97.27% cache)   55.13 branch misses
        216.80k cycles 955.24k instructions   3.56k c-refs   97.31 c-misses

node.isDeepStrictEqual       861.16 ns/iter 864.33 ns      ▄█▃             
                    (824.40 ns … 982.87 ns) 927.28 ns     ▅███▃            
                    (250.78  b … 700.86  b) 480.09  b ▂▂▄▅█████▅▄▄▃▃▃▃▂▂▂▂▂
                   2.23 ipc ( 99.86% cache)    1.19 branch misses
          3.31k cycles   7.40k instructions  883.27 c-refs    1.27 c-misses

summary
  object-equals
   2.79x faster than node.isDeepStrictEqual
   32.18x faster than are-deeply-equal
   38.57x faster than dequal
   181.76x faster than lodash.isEqual
```

</details>

#### Web-safe

| Library | 16 | 512 | 4096 | 16386 | Speed Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| object-equals | 12.31 ns | 92.20 ns | 669.83 ns | 3.00 µs | 1.00x (baseline) |
| dequal | 19.21 ns | 387.72 ns | 3.00 µs | 12.05 µs | 1.56x-4.01x slower |
| are-deeply-equal | 95.61 ns | 395.93 ns | 2.55 µs | 9.38 µs | 7.77x-3.12x slower |
| lodash.isEqual | 3.85 µs | 5.41 µs | 17.13 µs | 56.60 µs | 312.74x-18.84x slower |

<details>
<summary>Full benchmark results with hardware counters</summary>

```console
clk: ~3.74 GHz
cpu: AMD Ryzen 5 3600 6-Core Processor
runtime: node 24.1.0 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• Data View [size=16]
------------------------------------------- -------------------------------
object-equals                 12.31 ns/iter  11.92 ns  █                   
                      (11.65 ns … 44.38 ns)  19.22 ns  █                   
                    (  0.10  b …  60.78  b)   0.18  b ▂█▃▂▂▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁
                   4.85 ipc ( 93.48% cache)    0.01 branch misses
          49.53 cycles  240.41 instructions    0.04 c-refs    0.00 c-misses

are-deeply-equal              95.61 ns/iter 102.67 ns  █                   
                     (82.14 ns … 197.50 ns) 151.91 ns  ██                  
                    (227.23  b … 512.27  b) 392.22  b ▅██▇▃▃▅▇▃▂▂▁▂▂▂▂▂▂▁▁▁
                   3.36 ipc ( 96.16% cache)    0.02 branch misses
         368.19 cycles   1.24k instructions   13.10 c-refs    0.50 c-misses

dequal                        19.21 ns/iter  18.54 ns  █                   
                      (17.28 ns … 87.50 ns)  33.16 ns  █                   
                    (  0.09  b …  60.44  b)   0.19  b ▅█▃▃▂▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.65 ipc ( 88.85% cache)    0.01 branch misses
          73.70 cycles  342.64 instructions    0.04 c-refs    0.00 c-misses

lodash.isEqual                 3.85 µs/iter   4.00 µs   ▂   ██▂▂▂    ▂     
                        (3.55 µs … 4.25 µs)   4.19 µs ▅ █ ▅ █████▅   █▅▅   
                    (  1.23 kb …   1.26 kb)   1.24 kb █▇█▁█▇██████▇▇▇███▁▇▇
                   2.40 ipc ( 99.61% cache)   18.75 branch misses
         14.67k cycles  35.28k instructions   1.75k c-refs    6.87 c-misses

summary
  object-equals
   1.56x faster than dequal
   7.77x faster than are-deeply-equal
   312.74x faster than lodash.isEqual

• Data View [size=512]
------------------------------------------- -------------------------------
object-equals                 92.20 ns/iter  91.83 ns  █                   
                     (88.52 ns … 167.46 ns) 118.59 ns  █▄                  
                    (  0.10  b …  96.13  b)   0.33  b ▁██▄▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   5.85 ipc ( 83.06% cache)    0.01 branch misses
         353.95 cycles   2.07k instructions    0.09 c-refs    0.01 c-misses

are-deeply-equal             395.93 ns/iter 397.61 ns      █               
                    (370.88 ns … 570.94 ns) 457.62 ns      █▆              
                    ( 88.98  b … 550.70  b) 392.18  b ▃▅▄▅▆██▆▃▂▂▂▁▁▁▁▁▂▁▁▁
                   5.23 ipc ( 95.57% cache)    1.03 branch misses
          1.54k cycles   8.05k instructions   13.68 c-refs    0.61 c-misses

dequal                       387.72 ns/iter 388.30 ns    ██                
                    (359.75 ns … 571.28 ns) 486.62 ns ▂▂ ██                
                    (  0.09  b … 150.38  b)   0.81  b ██▄██▇▃▃▄▂▂▂▂▂▁▁▃▁▁▁▁
                   4.81 ipc ( 76.94% cache)    1.01 branch misses
          1.49k cycles   7.17k instructions    0.19 c-refs    0.04 c-misses

lodash.isEqual                 5.41 µs/iter   5.44 µs   █                  
                        (5.30 µs … 5.72 µs)   5.62 µs ▅ █   █              
                    (  1.23 kb …   1.28 kb)   1.24 kb █▁█▅▅██▅█▅█▁▁▅▅▁▅▁▁▁▅
                   3.01 ipc ( 99.55% cache)   19.10 branch misses
         20.95k cycles  63.01k instructions   1.79k c-refs    8.07 c-misses

summary
  object-equals
   4.21x faster than dequal
   4.29x faster than are-deeply-equal
   58.69x faster than lodash.isEqual

• Data View [size=4096]
------------------------------------------- -------------------------------
object-equals                669.83 ns/iter 671.92 ns      █               
                    (649.44 ns … 791.05 ns) 713.60 ns     ▇█▃              
                    (  0.10  b … 128.21  b)   0.60  b ▂▅▅▅███▆▃▄▄▂▂▃▃▂▂▂▂▁▁
                   5.94 ipc ( 82.84% cache)    1.02 branch misses
          2.57k cycles  15.29k instructions    0.75 c-refs    0.13 c-misses

are-deeply-equal               2.55 µs/iter   2.59 µs        █▂▂           
                        (2.37 µs … 2.80 µs)   2.77 µs        ███           
                    (383.32  b … 392.54  b) 392.01  b ▇▃▇▇▃▅▇████▇▅▅▃▁▁▅▃▅▇
                   5.84 ipc ( 94.66% cache)    1.07 branch misses
          9.83k cycles  57.35k instructions   21.57 c-refs    1.15 c-misses

dequal                         3.00 µs/iter   3.01 µs  █                   
                        (2.95 µs … 3.19 µs)   3.15 µs  █▅                  
                    (  0.09  b …   0.42  b)   0.10  b ▇███▇▄▇▃▃▃▃▃▁▁▃▃▁▃▃▃▃
                   4.92 ipc ( 81.89% cache)    1.04 branch misses
         11.48k cycles  56.47k instructions    2.54 c-refs    0.46 c-misses

lodash.isEqual                17.13 µs/iter  16.70 µs  █                   
                     (15.99 µs … 178.07 µs)  27.33 µs  █                   
                    (  1.59 kb … 226.95 kb)   1.79 kb ▇█▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   3.93 ipc ( 98.14% cache)   48.93 branch misses
         67.14k cycles 263.69k instructions   2.81k c-refs   52.11 c-misses

summary
  object-equals
   3.8x faster than are-deeply-equal
   4.47x faster than dequal
   25.57x faster than lodash.isEqual

• Data View [size=16386]
------------------------------------------- -------------------------------
object-equals                  3.00 µs/iter   2.92 µs    █                 
                      (2.56 µs … 219.61 µs)   4.80 µs    █                 
                    (360.00  b … 319.79 kb) 394.16  b ▁▁▄█▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁
                   4.82 ipc ( 99.77% cache)   31.10 branch misses
         12.84k cycles  61.96k instructions  749.95 c-refs    1.73 c-misses

are-deeply-equal               9.38 µs/iter   9.39 µs   █                  
                        (9.30 µs … 9.62 µs)   9.55 µs   █ █  █             
                    (383.44  b … 392.54  b) 391.49  b ██████▁███▁▁▁▁▁▁▁▁▁▁█
                   6.00 ipc ( 99.40% cache)    1.18 branch misses
         37.75k cycles 226.40k instructions  487.18 c-refs    2.94 c-misses

dequal                        12.05 µs/iter  11.93 µs    █                 
                      (11.67 µs … 13.01 µs)  12.76 µs    █▅                
                    (  0.10  b …   0.10  b)   0.10  b ▇▁▁██▇▁▇▁▁▁▁▁▁▁▁▁▁▁▁▇
                   4.94 ipc ( 99.57% cache)    1.16 branch misses
         45.68k cycles 225.53k instructions  293.91 c-refs    1.27 c-misses

lodash.isEqual                56.60 µs/iter  55.11 µs █                    
                     (54.30 µs … 184.11 µs)  97.29 µs █                    
                    (  1.59 kb … 704.98 kb)   2.26 kb █▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                   4.37 ipc ( 97.39% cache)   57.49 branch misses
        218.74k cycles 955.06k instructions   3.36k c-refs   87.56 c-misses

summary
  object-equals
   3.12x faster than are-deeply-equal
   4.01x faster than dequal
   18.84x faster than lodash.isEqual
```

</details>

> [!NOTE]  
> This table reflects `web-safe` operation and for fairness, excludes `node.isDeepStrictEqual`, which is not available in browser runtimes and would distort the comparison. `object-equals` also leverages `Buffer.compare` internally when is available, but gracefully falls back to cross-platform logic in web to ensure consistent and deterministic results.

> [!NOTE]  
> `fast-equals` is also excluded from the both tests because it does not natively support DataView and returns misleading results despite executing without errors. This behavior could lead to incorrect conclusions about its performance or correctness.

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

## Build

This package uses [rollup](https://rollupjs.org/) to generate clean and optimized ESM builds. 

To build package from source code, run:

```bash
npm run build
```

This will generate the output in the `dist/` folder. Main (web-safe) and node (runtime-specific) builds are handled via custom rollup config and exposed under appropriate `exports` in `package.json`.

## Testing

This package includes a carefully structured test suite, ensuring correctness and compatibility with expected semantics.

### Structure

```bash
tests/
├─ objectEquals.test.js          # Core tests with basic and edge cases
└─ objectEquals.lodash.test.js   # Parity tests ported from lodash.isEqual
```

### Notes

- The **core tests** cover basic type-specific checks, circular references, cross-realm objects, symbols, etc.
- The **parity tests** ensure alignment with lodash’s deep equality expectations (ported from QUnit to Vitest).
- All tests are written in [Vitest](https://vitest.dev) with native ESM support and zero transform overhead.

You can run the full suite with:

```bash
npm test
```

or run individual tests:

```bash
npx vitest run tests/objectEquals.test.js
npx vitest run tests/objectEquals.lodash.test.js
```

## Support

If you find this project useful, you can support it with a one-time donation over [PayPal](https://www.paypal.com/donate/?hosted_button_id=PPPN7F3VXXE8W). Thank you!

## Contributing

Feel free to open issues or submit pull requests on [GitHub](https://github.com/observ33r/object-equals).

## License

This project is licensed under the [MIT License](LICENSE).