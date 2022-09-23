import {ConfigSocketIO} from "../../Interfaces/Config";
import {Server, Socket} from "socket.io";
import { createServer, Server as mServerHTTP } from "http";
import {SocketIOInstances} from "../../Type/types";
import Middleware from "./Middleware";
// @ts-ignore
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


/**
 * @constructor
 * @param { ConfigSocketIO } config
 * @param { SocketIOInstances } config.app
 * @return Promise<mServerHTTP>
 *
 */

let mClientList : Array<Socket<DefaultEventsMap, DefaultEventsMap, any>> = [];
const SOCKET_IO = async (config : ConfigSocketIO) : Promise<mServerHTTP> => {
    let mHttp = createServer();
    let io = await new Server(mHttp, config.settings);
    return new Promise(async (resolve, rejected) => {

        try {
            if (config.settings?.costumMiddleware !== undefined){
                await io.use(config.settings.costumMiddleware);
            }else{
                await io.use(await Middleware(config));
            }

            await io.on("connection", async (io) => {
                (config.onConnection !== undefined) ? config.onConnection(io) : null;
                mClientList.push(io);
                (config.getClientConnected !== undefined) ? config.getClientConnected({
                    ClientList : mClientList,
                    CurrentClient : io,
                    TotalClientConnected : mClientList.length
                }) : null;

                await io.on("disconnect", async (reason) => {
                    (config.onDisconnect !== undefined) ? config.onDisconnect(reason) : null;
                    mClientList = mClientList.filter(item => item !== io);
                    (config.getClientConnected !== undefined) ? config.getClientConnected({
                        ClientList : mClientList,
                        CurrentClient : io,
                        TotalClientConnected : mClientList.length
                    }) : null;
                })
            });
            if (config.io !== undefined) {
                await config.io(io);
            }

            process.on("SIGHUP", function (){
                io.close();
                mHttp.close();
                process.kill(process.pid);
            })

            await resolve(mHttp)

        }catch (e) {
            await rejected(e);
        }
    })
};

export default SOCKET_IO;