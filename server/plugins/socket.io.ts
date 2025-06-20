import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { setIO } from '../utils/socket'

export default defineNitroPlugin((nitroApp: NitroApp) => {
    const engine = new Engine();
    const io = new Server({
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.bind(engine);

    io.on("connection", (socket) => {
        console.log("Connected Socket: " + socket.id + " | Connected Total: " + io.engine.clientsCount)
    });



    nitroApp.router.use("/socket.io", defineEventHandler({
        handler(event) {
            engine.handleRequest(event.node.req, event.node.res);
            event._handled = true;
        },
        websocket: {
            open(peer) {
                // @ts-expect-error private method and property
                engine.prepare(peer._internal.nodeReq);
                // @ts-expect-error private method and property
                engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
            }
        }
    }));

    setIO(io)
});