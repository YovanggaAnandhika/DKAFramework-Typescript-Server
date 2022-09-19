import * as Config from "./../Interfaces/Config";
import Const from "../Const";
import {DKAConfig} from "../Type/types";
import path from "path";
import {ConfigFastify, ConfigReactJS, ConfigSocketIO} from "./../Interfaces/Config";


function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

export const ServerSettingsFastify : Config.ConfigServerFastifySettings  = {
    logger : false
}

/**
 * @typedef { Config.Config }
 */
export const FastifyConfigurationDefault : ConfigFastify = {
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : "FASTIFY",
    host : Const.Server.Host.LOCALHOST,
    port : Const.Server.Port.DEFAULT,
    app : async (app, opts, next) => {

        next();
    },
    settings : ServerSettingsFastify,
    plugins : {
        pointOfView : {
            enabled : false,
            settings : {
                engine : {
                    ejs : (checkModuleExist("ejs")) ? require("ejs") : null
                },
                root : path.join(require?.main?.filename!,"./../Layout"),
                /*viewExt: 'html'*/
                includeViewExtension: true
            }
        },
        static : {
            enabled : false,
        }
    },
    Constanta : {
        DEFAULT_DELAY_PROGRESS : 0
    }
}
export const SocketIOConfigurationDefault : ConfigSocketIO = {
    state : "development",
    engine : "SOCKET.IO",
    use : async (io) => {

    },
    settings : {
        costumMiddleware : undefined
    },
    port : 8081
}

export const ReactJSConfigurationDefault : ConfigReactJS = {
    state : "development",
    engine : "REACTJS",
    host : "127.0.0.1",
    port : 8082
}
