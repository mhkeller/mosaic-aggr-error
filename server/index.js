import { DuckDB, dataServer } from '@uwdata/mosaic-duckdb';
import launchDuckDb from './launchDuckDb.js';

const port = 3000;
launchDuckDb(port, { DuckDB, dataServer });
