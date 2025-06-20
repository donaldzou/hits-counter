import generateBadge from "~/utils/generateBadge";
import pool from "~/utils/db";
import { v4 } from "uuid";
import {getIO} from "~/server/utils/socket";

export default defineEventHandler(async (event) => {
	console.log(`URL: ${event.node.req.url} | IP: ${getRequestIP(event)}`)

	const query = getQuery(event)
	let currentCount = 1;
	let totalCount = 1;
	const url: string = query.url as string
	const timezone: string = query.tz as string
	if (url && url.replace(" ", "").length > 0){
		const io = getIO()
		if (io && io.engine.clientsCount > 0) {
			io.emit('hit', query.url)
		}
		const total =
			await pool.query(`UPDATE tracking_urls AS T SET total_hits = total_hits + 1 WHERE T.url = $1 RETURNING T.total_hits, T.id`, [query.url])
		if (total.rowCount === 0){
			const newId = v4().toString()
			await pool.query('INSERT INTO tracking_urls (id, url, total_hits) VALUES ($1, $2, 1);', [newId, query.url])
			await pool.query(`CREATE TABLE "${newId}" (hit_date DATE, hit_count INT)`)
			await pool.query(`INSERT INTO "${newId}" (hit_date, hit_count) VALUES ((NOW()::DATE AT TIME ZONE $1), 1)`, [timezone ? timezone : 'UTC'])
		}else{
			totalCount = total.rows[0].total_hits
			const existId = total.rows[0].id;
			let newhit;
			if (timezone){
				newhit = await pool.query(`SELECT update_hit_count_dynamic('${existId}', '${timezone}')`)
			}else{
				newhit = await pool.query(`SELECT update_hit_count_dynamic('${existId}', 'UTC')`)
			}
			currentCount = newhit.rows[0].update_hit_count_dynamic

		}
	}
	if (query.output && query.output === 'json'){
		return {
			today_hits: currentCount,
			total_hits: totalCount
		}
	}else{
		setResponseHeaders(event, {
			"Content-Type": "image/svg+xml;charset=utf-8",
		});
		query.message = `${currentCount} / ${totalCount}`
		return generateBadge(query)
	}
})
