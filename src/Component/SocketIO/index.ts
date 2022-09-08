import {ConfigSocketIO} from "../../Interfaces/Config";
import { cpus } from "node:os";
import {Server} from "socket.io";
import { createServer, Server as mServerHTTP } from "http";
import {SocketIOInstances} from "../../Type/types";
import Middleware from "./Middleware";
// @ts-ignore
import { setupMaster, setupWorker } from "@socket.io/sticky";


/**
 * @constructor
 * @param { ConfigSocketIO } config
 * @param { SocketIOInstances } config.app
 * @return Promise<mServerHTTP>
 *
 */
const CPUNumber = cpus().length;
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
            if (config.app !== undefined) {
                await config.app(io);
                await resolve(mHttp)
            } else {
                rejected({status: false, code: 500, msg: `app must Declaration For Routes`})
            }

        }catch (e) {
            await rejected(e);
        }
    })
};

export default SOCKET_IO;