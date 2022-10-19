import {ConfigSocketIOClient} from "../../../Interfaces/Config/SocketIO/Client";
import * as Sock from "socket.io-client"
import moment from "moment-timezone";
import {MetaDataSocketIOClient} from "../../../Type/types";
import {merge} from "lodash";


const SOCKET_IO_CLIENT = async (config : ConfigSocketIOClient) : Promise<Sock.Socket> => {

    moment.locale("id")

    let metaDataSocketIOClient : MetaDataSocketIOClient = {
        id : undefined
    };

    return new Promise(async (resolve) => {
        let mNameSpace = (config.costumNameSpace !== undefined) ?
            (config.costumNameSpace.charAt(0) !== "/") ? `/${config.costumNameSpace}`
                : `${config.costumNameSpace}`
            : ``;
        let io = Sock.io(`http://${config.host}:${config.port}${mNameSpace}`, config.settings);

        await io.on("connect", async () => {
            (config.onConnect !== undefined) ? config.onConnect(io) : null;
            metaDataSocketIOClient = merge(metaDataSocketIOClient, {
                id : io.id,
                timestamp : { lastTime : {
                        onConnect : {
                            humanize : moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix : moment().unix()
                        }
                    }
                }
            });
        });

        await io.on("connect_error", async (error) => {
            (config.onConnectError !== undefined) ? config.onConnectError(error) : null;
        });

        await io.io.on("reconnect", async (attempt) => {
            (config.events?.onReconnect !== undefined) ? config.events?.onReconnect(attempt) : null;
        });

        await io.io.on("reconnect_attempt", async (attempt) => {
            (config.events?.onReconnectAttempt !== undefined) ? config.events?.onReconnectAttempt(attempt) : null;
        });

        await io.io.on("reconnect_error", async (error) => {
            (config.events?.onReconnectError !== undefined) ? config.events?.onReconnectError(error) : null;
        });

        await io.io.on("reconnect_failed", async () => {
            (config.events?.onReconnectFailed !== undefined) ? config.events?.onReconnectFailed() : null;
        });

        await io.io.on("ping", async () => {
            (config.events?.onPing !== undefined) ? config.events?.onPing() : null;
        });

        await io.io.on("error", async (error) => {
            (config.events?.onError !== undefined) ? config.events?.onError(error) : null;
        });


        await io.on("disconnect", async () => {
            metaDataSocketIOClient = await merge(metaDataSocketIOClient, {
                id : io.id,
                timestamp : {
                    lastTime : {
                        onDisconnect : {
                            humanize : moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix : moment().unix()
                        }
                    }
                }
            });
            (config.onDisconnect !== undefined) ? config.onDisconnect(metaDataSocketIOClient) : null;
        });

        process.on("SIGHUP", function () {
            io.disconnect();
            io.close();
            process.kill(process.pid);
        })

        if (config.io !== undefined){
            await config.io(io);
            resolve(io);
        }else{
            resolve(io);
        }
    })
}

export default SOCKET_IO_CLIENT;