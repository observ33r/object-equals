import { bench, group, summary } from 'mitata';
import candidates from './candidates.mjs';

export { candidates }

export { getBigData } from './bigData.mjs';

export function benchAll(groupName, createData, options = {}) {
  const target = createData(options);
  const source = createData(options);
  group(groupName, () => {
    summary(() => {
      for (const {label, enabled, create: createDeepEqual} of candidates) {
        if (enabled === false) {
          continue;
        }
        const deepEqual = createDeepEqual(target, source, options);
        bench(label, function* () {
          yield deepEqual;
        });
      }
    });
  });
}

export function benchSizes(sizes, groupName, createData, options = {}) {
  sizes.forEach(size => {
    benchAll(`${groupName} [size=${size}]`, createData, {...options, size});
  });
}
