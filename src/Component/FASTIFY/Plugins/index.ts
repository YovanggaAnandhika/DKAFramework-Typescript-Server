import {ConfigFastify} from "../../../Interfaces/Config";
import Fastify, {FastifyInstance} from "fastify";
import {existsSync} from "fs";
import {check} from "tcp-port-used";
import Options from "../../../Const";
import {Logger} from "winston";
import mLogger from "../../../Function/Helper/logger";
import {CliProgress} from "../../../Function/Helper/CliProgress";
import Delay from "../../../Function/Helper/Delay";
import {reject} from "lodash";

let logger : Logger = mLogger.logger;

function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

export async function ServerViewInstance(config : ConfigFastify, app : FastifyInstance) : Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.pointOfView !== undefined){
            if (config.plugins?.pointOfView?.enabled){
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin point of view enabled. check resolution modules exists" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("@fastify/view")){
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin point of view module exist. start registering plugins" }) : null;
                    await CliProgress.setTotal(CliProgress.getTotal())
                    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.pointOfView.settings !== undefined){
                        await app.register(require("@fastify/view"), config.plugins.pointOfView.settings);
                        await resolve(app);
                    } else{
                        await rejected({ status : false, code : 500, msg : `point of view is Enabled, but plugins.pointOfView.settings. not declare`})
                    }
                }else{
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin point of view enabled. but module not found. skipped" }) : null;
                    await CliProgress.setTotal(CliProgress.getTotal())
                    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    rejected({ status : false, code : 500, msg : `plugin point of view enabled. but module not found. skipped`})
                }
            }else{
                await resolve(app);
            }
        }else{
            await resolve(app);
        }

    })
}
export async function Plugins(config : ConfigFastify, app : FastifyInstance) : Promise<FastifyInstance> {
    let mApp : FastifyInstance = app;
    await Promise.all([
        await ServerViewInstance(config, app)
    ]).then(async () => {
        mApp = app;
    }).catch(async (error) => {
        await Promise.reject(error)
    })
    return mApp;
}