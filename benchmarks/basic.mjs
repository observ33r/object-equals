import { run } from 'mitata';
import { benchAll, getBigData } from './helpers.mjs';

benchAll('Big JSON Object', () => getBigData());

await run();
