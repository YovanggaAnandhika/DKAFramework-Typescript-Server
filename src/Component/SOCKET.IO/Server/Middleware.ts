import {SocketIOInstancesMiddleware} from "../../../Type/types";
import {ConfigSocketIO} from "../../../Interfaces/Config/SocketIO/Server";
import {Logger} from "winston";

export const middleware = async (config: ConfigSocketIO, logger: Logger): Promise<SocketIOInstancesMiddleware> => async (io, next) => {
    /** ================= DEBUG CONSOLE ======================= **/
    let headers = io.request.headers;
    /** ================= DEBUG CONSOLE ======================= **/
    io.onAny(async (eventName, ...args) => {
        if (config.logger?.enabled) {
            switch (typeof args) {
                case "object" :
                    logger.info(`${eventName} - ${JSON.stringify(args)}`);
                    break;
                default :
                    logger.info(`${eventName} - ${args}`)
                    break;
            }
        }
    });
    /** ================= DEBUG CONSOLE ======================= **/
    await next();

}

export default middleware;