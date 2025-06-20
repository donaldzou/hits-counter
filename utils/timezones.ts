import pool from "~/utils/db";

export const timezones = async () => {
    const tzs = await pool.query("select name from pg_timezone_names WHERE NAME NOT LIKE 'posix%' order by name")
    return tzs.rows.map(x => x.name)
}