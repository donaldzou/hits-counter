import { io } from "socket.io-client"
import {v4} from "uuid";
import dayjs from "dayjs";

export default defineNuxtPlugin(() => {
	const socket = io(`${document.location.hostname}:3001`)
	console.log(socket)
	return {
		provide: {
			socket: socket
		}
	}
});