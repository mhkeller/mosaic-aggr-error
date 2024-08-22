/**
 * Set up duckdb server
 */
const tcpPortUsed = require('tcp-port-used');

export default async function launchDuckDb(port, { DuckDB, duckdbServer }) {
	const duckdbPortInUse = await tcpPortUsed.check(port, '127.0.0.1');
	if (duckdbPortInUse === false) {
		const db = new DuckDB(':memory:');
		duckdbServer(db, { port, rest: true, socket: true });
		return db;
	}
	throw new Error('Could not launch perspective server. Port in use.');
}
