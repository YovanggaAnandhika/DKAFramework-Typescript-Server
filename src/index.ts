import {
    FastifyConfigurationDefault,
    ReactJSConfigurationDefault,
    SocketIOClientConfigurationDefault,
    SocketIOConfigurationDefault
} from "./Config";
import * as DKATypes from "./Type/types";
import {merge} from "lodash";
import * as tcpPortUsed from "tcp-port-used";
import {Logger} from "winston";
import FASTIFY from "./Component/FASTIFY";
import SOCKET_IO from "./Component/SocketIO";
import {DKAServerCallback} from "./Interfaces/Callback";
import Options from "./Const";
import mLogger from "./Function/Helper/logger";
import {Delay} from "./Function/Helper/Delay";
import {CliProgress} from "./Function/Helper/CliProgress";
import {ConfigFastify, ConfigReactJS, ConfigSocketIO, ConfigSocketIOClient} from "./Interfaces/Config";
import REACTJS from "./Component/REACTJS";
import SOCKET_IO_CLIENT from "./Component/SocketIOClient";

/** Declare Variable **/
let mTempFastify : ConfigFastify | never = { engine : "FASTIFY" };
let mTempSocketIO : ConfigSocketIO = { engine : "SOCKET.IO" };
let mTempSocketIOClient : ConfigSocketIOClient = { engine : "SOCKET.IO-CLIENT"};
let mTempReactJS : ConfigReactJS = { engine : "REACTJS" };
let logger : Logger = mLogger.logger;
function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}
/**
 * @function Server
 * @typedef { Config }
 * @return Promise<ServerCallback>
 *
 */

export async function Server(config : ConfigFastify | ConfigSocketIO | ConfigReactJS = FastifyConfigurationDefault) : Promise<DKAServerCallback> {
    return new Promise(async (resolve, rejected) => {
        switch (config.engine) {
            case Options.Server.Engine.FASTIFY :
                //## Set Configuration merger
                mTempFastify = await merge(FastifyConfigurationDefault, config);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.start(43, 0, { state : mTempFastify.state, status : Options.READY_STATE, descriptions : "Prepare Running Program" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempFastify?.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                delete mTempFastify.getConfig;
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.increment({ state : mTempFastify.state, status : Options.READY_STATE, descriptions : "Deleting Temporary Get Config Self" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempFastify.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await config.getConfig?.(mTempFastify as ConfigFastify);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "Send Setter Configuration Callback" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempFastify.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : mTempFastify.state, status : Options.READY_STATE, descriptions : "Fastify Engine Selected Started" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempFastify.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //nodemon(mTempFastify.settings?.nodemon?.settings as Settings)
                //$$$$$$$$$$$ CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                await FASTIFY(mTempFastify)
                    .then(async (app) => {
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        /** ================= DEBUG CONSOLE ======================= **/
                        (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                            CliProgress.increment({ state : mTempFastify.state, status : Options.READY_STATE, descriptions : "Check Port Used Started" }) : null;
                        await CliProgress.setTotal(CliProgress.getTotal())
                        await Delay(mTempFastify.Constanta?.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        await tcpPortUsed.check({
                            host: mTempFastify.host,
                            port: mTempFastify.port as number,
                        }).then(async (inUse) => {
                            if (!inUse) {
                                //$$$$$$$$$$$ ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                                await app.listen({
                                    host: mTempFastify.host,
                                    port: mTempFastify.port as number,
                                }, async (error) => {
                                    if (!error) {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        if (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT){
                                            CliProgress.increment(CliProgress.getTotal(),{ state : mTempFastify.state, status : Options.COMPLETE_STATE, descriptions : `Server "FASTIFY" Running Successfully - host : ${mTempFastify.host} - port : ${mTempFastify.port}` });
                                            CliProgress.setTotal(CliProgress.getTotal())
                                            CliProgress.stop();
                                        }
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        await resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server "FASTIFY" Running Successfully`,
                                            metadata: {
                                                author: Options.Information.author,
                                                version: Options.Information.version
                                            }
                                        });
                                    } else {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                                            CliProgress.increment({ state : mTempFastify.state, status : Options.ERROR_STATE, descriptions : `Check Port Used Started [DKA_SERVER_LISTEN_FAILED] ${error}` }) : null;
                                        await Delay(mTempFastify.Constanta?.DEFAULT_DELAY_PROGRESS);
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        await rejected({
                                            status: false,
                                            code: 500,
                                            msg: `Server "FASTIFY" Running Failed`,
                                            error: {errorNames: "DKA_SERVER_LISTEN_FAILED", raw: error}
                                        });
                                        setTimeout(async () => {
                                            await process.exit(0)
                                        }, 2000);
                                    }
                                });
                                //$$$$$$$$$$$ END ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                            } else {
                                /** ================= DEBUG CONSOLE ======================= **/
                                (mTempFastify.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                    logger.error(`Check Port Used Started [DKA_PORT_SERVER_IN_USE]`) : null;

                                /** ================= DEBUG CONSOLE ======================= **/
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Server "FASTIFY" Running Failed`,
                                    error: {errorNames: "DKA_PORT_SERVER_IN_USE"}
                                });
                                setTimeout(async () => {
                                    await process.exit(0)
                                }, 2000)
                            }
                        }, async (err) => {
                            await rejected({
                                status: false,
                                code: 500,
                                msg: `Failed, to Check Port Server`,
                                error: {errorNames: "DKA_PORT_SERVER_FAILED_CHECK", raw: err}
                            });
                            setTimeout(async () => {
                                await process.exit(0)
                            }, 2000)
                        });
                        //$$$$$$$$$$$ END CHECK PORT USED $$$$$$$$$$$$


                    })
                    .catch(async (e) => {
                        await rejected(e)
                    });
                //$$$$$$$$$$$ END CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                break;
            case Options.Server.Engine.SOCKETIO :
                //## Set Configuration merger
                mTempSocketIO = await merge(SocketIOConfigurationDefault, config);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIO.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.start(43, 0, { state : mTempSocketIO.state, status : Options.READY_STATE, descriptions : "Prepare Running Program" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIO?.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/

                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                delete mTempSocketIO.getConfig;
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIO.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.increment({ state : mTempSocketIO.state, status : Options.READY_STATE, descriptions : "Deleting Temporary Get Config Self" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIO.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await config.getConfig?.(mTempSocketIO as ConfigSocketIO);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIO.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : mTempSocketIO.state, status : Options.READY_STATE, descriptions : "Send Setter Configuration Callback" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIO.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$

                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIO.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Socket IO Engine Selected Started`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                await SOCKET_IO(mTempSocketIO)
                    .then(async (http) => {
                        await http.listen(mTempSocketIO.port, async () => {
                            (mTempSocketIO.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                logger.info(`Server "SOCKET.IO" Running Successfully - port : "${mTempSocketIO.port}"`) : null;
                            await resolve({
                                status: true,
                                code: 200,
                                msg: `Server "SOCKET.IO" Running Successfully`,
                                metadata: {
                                    author: Options.Information.author,
                                    version: Options.Information.version
                                }
                            });
                        });
                    }).catch(async (error) => {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_HTTP_SOCKET_IO_ERROR",
                                raw : error
                            }
                        });
                        setTimeout(async () => {
                            await process.exit(0);
                        }, 2000);
                    });
                break;
            case Options.Server.Engine.REACTJS :
                //## Set Configuration merger
                mTempReactJS = await merge(ReactJSConfigurationDefault, config);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.start(43, 0, { state : mTempReactJS.state, status : Options.READY_STATE, descriptions : "Prepare Running Program" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempReactJS?.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                delete mTempReactJS.getConfig;
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.increment({ state : mTempReactJS.state, status : Options.READY_STATE, descriptions : "Deleting Temporary Get Config Self" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempReactJS.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await config.getConfig?.(mTempReactJS as ConfigReactJS);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : mTempReactJS.state, status : Options.READY_STATE, descriptions : "Send Setter Configuration Callback" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempReactJS.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$

                /** ================= DEBUG CONSOLE ======================= **/
                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Socket IO Engine Selected Started`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`ReactJS Selected Started`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                await REACTJS(mTempReactJS)
                    .then(async (server) => {
                        await server.listen(mTempReactJS.port as number, mTempReactJS.host as string, async (error) => {
                            if (!error){
                                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                    logger.info(`Server Running Successfully - port : "${mTempReactJS.port}"`) : null;
                                await resolve({
                                    status: true,
                                    code: 200,
                                    msg: `Server Running Successfully`,
                                    metadata: {
                                        author: Options.Information.author,
                                        version: Options.Information.version
                                    }
                                });
                            }else{
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Server Listenning Failed`,
                                    error: {
                                        errorNames: "DKA_SERVER_REACT_JS_LISTENING_ERROR",
                                        raw : error
                                    }
                                });
                                setTimeout(async () => {
                                    await process.exit(0);
                                }, 2000);
                            }
                        })
                    })
                    .catch(async (error) => {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_REACT_JS_ERROR",
                                raw : error
                            }
                        });
                        setTimeout(async () => {
                            await process.exit(0);
                        }, 2000);
                    });
                break;
            default :
                await rejected({ status : false, code : 500, msg : `illegal method unknown or not available`});
                //await process.exit(0)
                break;
        }
    });
}

export async function Client(config : ConfigSocketIOClient = SocketIOClientConfigurationDefault) : Promise<DKAServerCallback> {
    return new Promise(async (resolve, rejected) => {
        switch (config.engine) {
            case Options.Server.Engine.SOCKETIOCLIENT :
                //## Set Configuration merger
                mTempSocketIOClient = await merge(SocketIOClientConfigurationDefault, config);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIOClient.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.start(43, 0, { state : mTempSocketIOClient.state, status : Options.READY_STATE, descriptions : "Prepare Running Program" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIOClient?.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/

                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                delete mTempSocketIOClient.getConfig;
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIOClient.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress.increment({ state : mTempSocketIOClient.state, status : Options.READY_STATE, descriptions : "Deleting Temporary Get Config Self" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIOClient.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await config.getConfig?.(mTempSocketIOClient as ConfigSocketIOClient);
                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIOClient.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : mTempSocketIOClient.state, status : Options.READY_STATE, descriptions : "Send Setter Configuration Callback" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(mTempSocketIOClient.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$

                /** ================= DEBUG CONSOLE ======================= **/
                (mTempSocketIOClient.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Socket IO Client Engine Selected Started`) : null;
                await Delay(mTempSocketIOClient.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await SOCKET_IO_CLIENT(mTempSocketIOClient)
                    .then(async (io) => {
                        (mTempSocketIOClient.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            logger.info(`Server "SOCKET.IO Client" Running Successfully - port : "${mTempSocketIOClient.port}"`) : null;
                        await resolve({
                            status: true,
                            code: 200,
                            msg: `Server "SOCKET.IO-CLIENT" Running Successfully`,
                            metadata: {
                                author: Options.Information.author,
                                version: Options.Information.version
                            }
                        });
                    })
                    .catch(async (error) => {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_HTTP_SOCKET_IO_CLIENT_ERROR",
                                raw : error
                            }
                        });
                        setTimeout(async () => {
                            await process.exit(0);
                        }, 2000);
                    })
                break;
        }
    })
}

export {
    Options,
    DKATypes as Types
}

export default Server;