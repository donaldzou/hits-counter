import pool from "~/utils/db";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    let data = {
        total_hits: 0,
        today_hits: 0,
        history: [] as Object[]
    }

    const url: string = query.url as string

    if (url && url.replace(" ", "").length > 0){
        const total =
            await pool.query('SELECT * FROM tracking_urls WHERE url = $1', [query.url])
        if (total.rowCount === 1){
            data.total_hits = total.rows[0].total_hits
            const existId = total.rows[0].id;

            const daily =
                await pool.query(
                    `SELECT hit_count, hit_date::DATE, (CASE WHEN hit_date::DATE = NOW()::DATE THEN 1 ELSE 0 END) AS is_today FROM "${existId}" ORDER BY hit_date ASC`)

            const today = daily.rows.find(x => x.is_today === 1)
            if (today) data.today_hits = today.hit_count;

            if (daily.rows.length > 0){
                data.history = daily.rows as Object[];
            }
        }
    }


    return data
})