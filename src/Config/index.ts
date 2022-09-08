import * as Config from "./../Interfaces/Config";
import Const from "../Const";
import {DKAConfig} from "../Type/types";
import path from "path";


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
export const DKAServerConfiguration : DKAConfig = {
    engine : Const.Server.Engine.FASTIFY,
    host : Const.Server.Host.LOCALHOST,
    port : Const.Server.Port.DEFAULT,
    app : async (app, opts, next) => {

        next();
    },
    settings : ServerSettingsFastify,
    plugins : {
        pointOfView : {
            settings : {
                engine : {
                    ejs : (checkModuleExist("ejs")) ? require("ejs") : null
                },
                root : path.join(require?.main?.filename!,"./../Layout"),
                /*viewExt: 'html'*/
                includeViewExtension: true
            }
        }
    },
    Constanta : {
        DEFAULT_DELAY_PROGRESS : 0
    }
}

export const mConfig = {
    Server : DKAServerConfiguration
}

export default mConfig;
