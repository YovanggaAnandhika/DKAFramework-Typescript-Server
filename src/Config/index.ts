import Const from "../Const";
import path from "path";
import {ConfigFastify} from "../Interfaces/Config/Fastify";
import {ConfigSocketIO} from "../Interfaces/Config/SocketIO/Server";
import {ConfigSocketIOClient} from "../Interfaces/Config/SocketIO/Client";
import {ConfigReactJS} from "../Interfaces/Config/ReactJS";
import {ConfigExpressJS} from "../Interfaces/Config/Express";


function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

/**
 * @typedef { Config.Config }
 */
export const FastifyConfigurationDefault : ConfigFastify = {
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : Const.Server.Engine.FASTIFY,
    host : Const.Server.Host.LOCALHOST,
    port : Const.Server.Port.DEFAULT,
    app : async (app, opts, next) => {

        next();
    },
    settings : {
        logger : false
    },
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
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : Const.Server.Engine.SOCKETIO,
    options : {
        socket : {
            costumMiddleware : undefined
        }
    },
    port : Const.Server.Port.DEFAULT
}
export const SocketIOClientConfigurationDefault : ConfigSocketIOClient = {
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : Const.Server.Engine.SOCKETIOCLIENT,
    host : "127.0.0.1",
    port : 80,
    settings : {
        reconnectionDelay : 1000
    }
}

export const ReactJSConfigurationDefault : ConfigReactJS = {
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : Const.Server.Engine.REACTJS,
    host : Const.Server.Host.LOCALHOST,
    port : Const.Server.Port.DEFAULT,
    plugins : {
        HtmlWebpackPlugin : {
            enabled : true,
            options : {
                inject : false
            }
        }
    },
    settings : {
        buildOutputFile : {
            enabled : false
        }
    },
    options : {
        Webpack : {
            configuration : {
                output : {
                    publicPath : "/",
                    filename : "DKAFramework.js"
                }
            }
        },
        WebpackDev : {
            open : false,
            hot : true,
            historyApiFallback: true
        }
    }
}

export const ExpressJSConfigurationDefault : ConfigExpressJS = {
    state : Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine : Const.Server.Engine.EXPRESSSJS,
    host : Const.Server.Host.LOCALHOST,
    port : Const.Server.Port.DEFAULT,
}
