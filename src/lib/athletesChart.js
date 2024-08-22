export default async function loadChart() {
	const vg = await import('@uwdata/vgplot');

	const columnOptions = [
		// { label: 'id', value: vg.column('id') },
		{ label: 'height', value: vg.column('height') },
		{ label: 'weight', value: vg.column('weight') }
		// { label: 'gold', value: vg.column('gold') },
		// { label: 'silver', value: vg.column('silver') },
		// { label: 'bronze', value: vg.column('bronze') }
	];

	const $x = vg.Param.value(columnOptions[0].value);
	const $y = vg.Param.value(columnOptions[1].value);

	await vg
		.coordinator()
		.exec([
			vg.loadParquet(
				'athletes',
				'https://raw.githubusercontent.com/uwdata/mosaic/main/data/athletes.parquet'
			)
		]);

	const $query = vg.Selection.intersect();
	return vg.hconcat(
		vg.vconcat(
			vg.hconcat(
				vg.menu({ label: 'X-axis', as: $x, options: [...columnOptions] }),
				vg.hspace(10),
				vg.menu({ label: 'Y-axis', as: $y, options: [...columnOptions] })
			),
			vg.vspace(10),
			vg.plot(
				// vg.dot(vg.from('athletes', { filterBy: $query }), {
				// 	x: vg.sql`${$x}`,
				// 	y: vg.sql`${$y}`,
				// 	fill: 'sex',
				// 	r: 2,
				// 	opacity: 0.1
				// }),
				vg.regressionY(vg.from('athletes', { filterBy: $query }), {
					// x: 'weight', // hardcoding the columns works just fine
					// y: 'height', // hardcoding the columns works just fine
					x: vg.sql`${$x}`,
					y: vg.sql`${$y}`,
					stroke: 'sex'
				}),
				vg.intervalXY({ as: $query, brush: { fillOpacity: 0, stroke: 'black' } }),
				vg.xyDomain(vg.Fixed),
				vg.colorDomain(vg.Fixed)
			)
		)
	);
}
