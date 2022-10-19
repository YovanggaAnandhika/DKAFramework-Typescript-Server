import {ConfigSocketIO} from "../../../Interfaces/Config/SocketIO/Server";
import {Server, Socket} from "socket.io";
import {createServer, Server as mServerHTTP} from "http";
import {createServer as createSecureServer, Server as mServerHTTPS} from "https";
import {SocketIOInstances} from "../../../Type/types";
import Middleware from "./Middleware";
// @ts-ignore
import {setupMaster, setupWorker} from "@socket.io/sticky";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {createClient} from "redis";
import {createAdapter} from "@socket.io/redis-adapter";


/**
 * @constructor
 * @param { ConfigSocketIO } config
 * @param { SocketIOInstances } config.app
 * @return Promise<mServerHTTP>
 *
 */

let mClientList : Array<Socket<DefaultEventsMap, DefaultEventsMap, any>> = [];

const SOCKET_IO = async (config : ConfigSocketIO) : Promise<mServerHTTP | mServerHTTPS> => {
    let mHttp : mServerHTTP | mServerHTTPS;
    switch (config.options?.server?.protocol) {
        case "HTTPS" :
            mHttp = (config.options?.server?.settings !== undefined) ?
                createSecureServer(config.options?.server?.settings) : createSecureServer();
            break;
        default :
            mHttp = (config.options?.server?.settings !== undefined) ?
                createServer(config.options?.server?.settings) : createServer();
    }
    let io = await new Server(mHttp, config.options?.socket);
    return new Promise(async (resolve, rejected) => {

        try {
            if (config.options?.socket?.costumMiddleware !== undefined){
                await io.use(config.options.socket.costumMiddleware);
            }else{
                await io.use(await Middleware(config));
            }

            await io.on("connection", async (io) => {
                (config.onConnection !== undefined) ? config.onConnection(io) : null;
                mClientList.push(io);
                (config.onClient !== undefined) ? config.onClient({
                    ClientList : mClientList,
                    CurrentClient : io,
                    TotalClientConnected : mClientList.length
                }) : null;

                await io.on("disconnect", async (reason) => {
                    (config.onDisconnect !== undefined) ? config.onDisconnect(reason) : null;
                    mClientList = mClientList.filter(item => item !== io);
                    (config.onClient !== undefined) ? config.onClient({
                        ClientList : mClientList,
                        CurrentClient : io,
                        TotalClientConnected : mClientList.length
                    }) : null;
                })
            });

            //@@ Detect IO Callback
            if (config.io !== undefined) {
                await config.io(io);
            }
            //End @@ Detect IO Callback

            process.on("SIGHUP", function (){
                io.close();
                mHttp.close();
                process.kill(process.pid);
            })

            if (config.plugins?.redis?.enabled === true){
                if (config.plugins.redis.settings !== undefined){
                    const pubClient = createClient(config.plugins.redis.settings);
                    const subClient = pubClient.duplicate();
                    pubClient.on("error", async (error) => {
                        console.log("terjadi error")
                    });
                    const createAdapterRedist = createAdapter(pubClient, subClient);
                    await io.adapter(createAdapterRedist)
                    await resolve(mHttp);
                }else{
                    await rejected({ status : false, msg : `redis plugins enabled. but, the settings not declare options`})
                }
            }else{
                await resolve(mHttp);
            }



        }catch (e) {
            await rejected(e);
        }
    })
};

export default SOCKET_IO;