Mosaic aggregation bug
===

## Description

When using dynamic column name assignments, the addition of the `regressionY` element throws an error when the user hovers or tries to brush.

```
> EXEC CREATE TEMP TABLE IF NOT EXISTS cube_index_ea68316b AS SELECT CAST(MIN("x") FILTER (WHERE ("y" IS NOT NULL)) AS DOUBLE) AS "x0", CAST(MAX("x") FILTER (WHERE ("y" IS NOT NULL)) AS DOUBLE) AS "x1", "sex", FLOOR(580::DOUBLE * ("height" - 1.21::DOUBLE))::INTEGER AS "active0", FLOOR(3.4769349124067936::DOUBLE * ("weight" - 20.767793662748627::DOUBLE))::INTEGER AS "active1", REGR_COUNT("y", "x") AS "__count_y_x__", REGR_AVGX("y", "x") AS "__avg_x_y__", REGR_AVGY("y", "x") AS "__avg_y_x__", SUM(("x" - (SELECT AVG("x") FROM "athletes")) * ("y" - (SELECT AVG("y") FROM "athletes"))) AS "__sxy_y_x__", SUM("x" - (SELECT AVG("x") FROM "athletes")) FILTER ("y" IS NOT NULL) AS "__rs_x__", SUM("y" - (SELECT AVG("y") FROM "athletes")) FILTER ("x" IS NOT NULL) AS "__rs_y__", SUM(("x" - (SELECT AVG("x") FROM "athletes")) ** 2) FILTER ("y" IS NOT NULL) AS "__rss_x__", SUM(("y" - (SELECT AVG("y") FROM "athletes")) ** 2) FILTER ("x" IS NOT NULL) AS "__rss_y__" FROM (SELECT "height" AS "x", "weight" AS "y", "sex", "height", "weight" FROM "athletes" AS "source") GROUP BY "sex", "active0", "active1"
[Error: Binder Error: aggregate function calls cannot be nested
LINE 1: ...) AS "__avg_y_x__", SUM(("x" - (SELECT AVG("x") FROM "athletes")) * ("y" - (SE...
                                                  ^] {
  errno: -1,
  code: 'DUCKDB_NODEJS_ERROR',
  errorType: 'Binder'
}
REQUEST 3.5
```

## Steps to reproduce

1. `npm i`
2. `npm run server`
3. `npm run dev`
4. Navigate to [http://localhost:5173/](http://localhost:5173/)
5. Mouse over the chart area and you'll see the error in the console
