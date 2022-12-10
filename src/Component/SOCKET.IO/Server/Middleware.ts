import {SocketIOInstancesMiddleware} from "../../../Type/types";
import Oauth2 from "./Component/Oauth2";
import Basic from "./Component/Basic";
import {ConfigSocketIO} from "../../../Interfaces/Config/SocketIO/Server";
import {Logger} from "winston";

export const middleware = async (config: ConfigSocketIO, logger: Logger): Promise<SocketIOInstancesMiddleware> => async (io, next) => {
    /** ================= DEBUG CONSOLE ======================= **/

    /** ================= DEBUG CONSOLE ======================= **/
    let mAuth = config.options?.socket?.security?.authorization;
    let headers = io.request.headers;
    /** ================= DEBUG CONSOLE ======================= **/

    io.onAny(async (eventName, ...args) => {
        if (config.logger) {
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
    if (mAuth?.enabled !== undefined && mAuth.enabled) {

        switch (mAuth?.mode) {
            case "OAUTH2" :
                /** ================= DEBUG CONSOLE ======================= **/

                /** ================= DEBUG CONSOLE ======================= **/
                await Oauth2(config, headers, mAuth, next);
                //await next();
                break;
            case "BASIC" :
                /** ================= DEBUG CONSOLE ======================= **/

                /** ================= DEBUG CONSOLE ======================= **/
                await Basic(config, headers, mAuth, next);
                break;
            default :

                await next(new Error("Authorization is Enabled. Mode Unknown and Illegal"));

                break;
        }
    }else{

        await next();
    }

}

export default middleware;