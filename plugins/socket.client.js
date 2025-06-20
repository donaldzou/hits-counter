import { io } from "socket.io-client"

export default defineNuxtPlugin(() => {
	if (import.meta.client){
		const socket = io({
			transports: ["websocket"], // Optional: to force WebSocket and avoid polling
		})
		return {
			provide: {
				socket: socket
			}
		}
	}
})