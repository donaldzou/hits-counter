import {timezones} from "~/utils/timezones";

export default defineEventHandler(async () => {
    return await timezones()
})