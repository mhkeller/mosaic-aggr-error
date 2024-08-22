/**
 * Set up duckdb server
 */
import tcpPortUsed from 'tcp-port-used';

export default async function launchDuckDb(port, { DuckDB, dataServer }) {
	const duckdbPortInUse = await tcpPortUsed.check(port, '127.0.0.1');
	if (duckdbPortInUse === false) {
		const db = new DuckDB(':memory:');
		dataServer(db, { port, rest: true, socket: true });
		return db;
	}
	throw new Error('Could not launch perspective server. Port in use.');
}
