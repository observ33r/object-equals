import { run } from 'mitata';
import reactFastCompare from 'react-fast-compare';
import React from 'react';
import { benchSizes, candidates } from "./helpers.mjs";

candidates.push({
    label: 'react-fast-compare',
    create: (target, source) => () => reactFastCompare(target, source)
});

const sizes = [16, 512, 4096, 16386];

const generateReactTree = (size) =>
    React.createElement('ul', {
        className: 'itemList',
        children: Array.from({ length: size }, (_, i) =>
            React.createElement('li', { className: 'item' }, `Item ${i}`))
    });

benchSizes(sizes, `React elements`,
    ({size}) => generateReactTree(size), { react: true });

await run();
