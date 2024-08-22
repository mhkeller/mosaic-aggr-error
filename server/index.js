import { DuckDB, dataServer } from '@uwdata/mosaic-duckdb';
import launchDuckDb from './launchDuckDb.js';

const port = 3030;
export default async function launchServer() {
	await launchDuckDb(port, { DuckDB, dataServer });
}
