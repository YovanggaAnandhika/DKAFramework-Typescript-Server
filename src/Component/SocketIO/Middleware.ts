import {SocketIOInstancesMiddleware} from "../../Type/types";
import {ConfigSocketIO} from "../../Interfaces/Config";
import Options from "../../Const";
import mLogger from "../../Function/Helper/logger";
import Oauth2 from "./Component/Oauth2";
import Basic from "./Component/Basic";

let logger = mLogger.logger;

export const middleware = async (config : ConfigSocketIO) : Promise<SocketIOInstancesMiddleware> => async (io, next) => {
    /** ================= DEBUG CONSOLE ======================= **/
    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
        logger.info(`Socket.IO use Middleware Decorator`) : null;
    /** ================= DEBUG CONSOLE ======================= **/
    let mAuth = config.options?.socket?.security?.authorization;
    let headers = io.request.headers;
    /** ================= DEBUG CONSOLE ======================= **/
    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
        logger.info(`checked auth settings Middleware`) : null;
    /** ================= DEBUG CONSOLE ======================= **/
    if (mAuth?.enabled !== undefined && mAuth.enabled){
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Authorization Security Authorization is Enabled`) : null;
        switch (mAuth?.mode) {
            case "OAUTH2" :
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Oauth2 type Authorization Selected`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                await Oauth2(config, headers, mAuth, next);
                //await next();
                break;
            case "BASIC" :
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Basic type Authorization Selected`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                await Basic(config, headers, mAuth, next);
                break;
            default :
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.error(`Authorization is Enabled. Mode Unknown and Illegal [DKA_AUTH_ENABLED_ILLEGAL_MODE]`) : null;
                await next(new Error("Authorization is Enabled. Mode Unknown and Illegal"));

                break;
        }
    }else{
        (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Authorization Security Authorization is Disabled`) : null;
        await next();
    }

}

export default middleware;