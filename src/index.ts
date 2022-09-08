import {DKAServerConfiguration} from "./Config";
import * as DKATypes from "./Type/types";

import {merge} from "lodash";
import * as tcpPortUsed from "tcp-port-used";
import {Logger} from "winston";
import cliProgress from "cli-progress";

import FASTIFY from "./Component/FASTIFY";
import SOCKET_IO from "./Component/SocketIO";

import {DKAServerCallback} from "./Interfaces/Callback";

import Options from "./Const";

import mLogger from "./Function/Helper/logger";
import { Delay } from "./Function/Helper/Delay";
import {CliProgress} from "./Function/Helper/CliProgress";



let mTemp : DKATypes.DKAConfig = {};
let logger : Logger = mLogger.logger;

/**
 * @function Server
 * @typedef { Config }
 * @return Promise<ServerCallback>
 *
 */
export async function Server(config : DKATypes.DKAConfig = DKAServerConfiguration) : Promise<DKAServerCallback>{
    //## Set Configuration merger
    mTemp = await merge(DKAServerConfiguration, config);
    /** ================= DEBUG CONSOLE ======================= **/
    (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
        CliProgress.start(43, 0, { state : config.state, status : Options.READY_STATE, descriptions : "Prepare Running Program" }) : null;
    await CliProgress.setTotal(CliProgress.getTotal())
    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
    /** ================= DEBUG CONSOLE ======================= **/
    return new Promise(async (resolve, rejected) => {
        //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
        delete mTemp.getConfig;
        /** ================= DEBUG CONSOLE ======================= **/
        (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
            CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "Deleting Temporary Get Config Self" }) : null;
        await CliProgress.setTotal(CliProgress.getTotal())
        await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
        /** ================= DEBUG CONSOLE ======================= **/
        await config.getConfig?.(mTemp as object);
        /** ================= DEBUG CONSOLE ======================= **/
        (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
            CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "Send Setter Configuration Callback" }) : null;
        await CliProgress.setTotal(CliProgress.getTotal())
        await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
        /** ================= DEBUG CONSOLE ======================= **/
        //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
        switch (mTemp.engine) {
            case "FASTIFY" :
                /** ================= DEBUG CONSOLE ======================= **/
                (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "Fastify Engine Selected Started" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                //$$$$$$$$$$$ CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                await FASTIFY(mTemp)
                    .then(async (app) => {
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        /** ================= DEBUG CONSOLE ======================= **/
                        (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                            CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "Check Port Used Started" }) : null;
                        await CliProgress.setTotal(CliProgress.getTotal())
                        await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        await tcpPortUsed.check({
                            host: mTemp.host,
                            port: mTemp.port as number,
                        }).then(async (inUse) => {
                            if (!inUse) {
                                //$$$$$$$$$$$ ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                                await app.listen({
                                    host: mTemp.host,
                                    port: mTemp.port as number,
                                }, async (error) => {
                                    if (!error) {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        if (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT){
                                            CliProgress.increment(CliProgress.getTotal(),{ state : config.state, status : Options.COMPLETE_STATE, descriptions : `Server Running Successfully - host : ${config.host} - port : ${config.port}` });
                                            CliProgress.setTotal(CliProgress.getTotal())
                                            CliProgress.stop();
                                        }

                                        /** ================= DEBUG CONSOLE ======================= **/
                                        await resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server Running Successfully`,
                                            metadata: {
                                                author: Options.Information.author,
                                                version: Options.Information.version
                                            }
                                        });
                                    } else {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                                            CliProgress.increment({ state : config.state, status : Options.ERROR_STATE, descriptions : `Check Port Used Started [DKA_SERVER_LISTEN_FAILED] ${error}` }) : null;
                                        await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        await rejected({
                                            status: false,
                                            code: 500,
                                            msg: `Server Running Failed`,
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
                                (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                    logger.error(`Check Port Used Started [DKA_PORT_SERVER_IN_USE]`) : null;

                                /** ================= DEBUG CONSOLE ======================= **/
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Server Running Failed`,
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
            case "SOCKET.IO" :
                /** ================= DEBUG CONSOLE ======================= **/
                (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Socket IO Engine Selected Started`) : null;
                /** ================= DEBUG CONSOLE ======================= **/
                await SOCKET_IO(mTemp)
                    .then(async (http) => {
                        await http.listen(mTemp.port, async () => {
                            (mTemp.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                logger.info(`Server Running Successfully - port : "${config.port}"`) : null;
                            await resolve({
                                status: true,
                                code: 200,
                                msg: `Server Running Successfully`,
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
                        }, 2000)
                    });
                break;
            default :

                break;
        }
    })


}



export {
    DKAServerConfiguration as Config,
    Options,
    DKATypes as Types
}
export default Server;