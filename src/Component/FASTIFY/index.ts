import {ConfigFastify} from "../../Interfaces/Config";
import { FastifyInstances } from "../../Type/types";
import Fastify, {FastifyInstance} from "fastify";
import Options from "../../Const";
import {Logger} from "winston";
import mLogger from "../../Function/Helper/logger";
import {Plugins} from "./Plugins";
import {CliProgress} from "../../Function/Helper/CliProgress";
import Delay from "../../Function/Helper/Delay";

let logger : Logger = mLogger.logger;

/**
 *
 * @param { ConfigFastify } config
 * @param { FastifyInstances } config.app
 * @constructor
 * @return Promise<FastifyInstance>
 */


const FASTIFY = async (config : ConfigFastify) : Promise<FastifyInstance> => {
    /** ================= DEBUG CONSOLE ======================= **/
    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "adding fastify engine instances & apply settings" }) : null;
    await CliProgress.setTotal(CliProgress.getTotal())
    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
    /** ================= DEBUG CONSOLE ======================= **/
    let mFastify = await Fastify(config.settings);
    /*let mApp = */
    let mPluginsApp =  (config.plugins !== undefined) ? await Plugins(config, mFastify) : mFastify
    let mApp = (config.settings?.registerModule !== undefined) ? await config.settings.registerModule(mFastify) : mPluginsApp;
    return new Promise(async (resolve, rejected) => {
        try {
            if (config.app !== undefined) {
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "fastify registering pointing app settings" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await mApp.register(config.app);
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "fastify registering pointing app finished" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                await resolve(mApp)
            } else {
                rejected({status: false, code: 500, msg: `app must Declaration For Routes`})
            }

        }catch (e) {
            await rejected(e);
        }
    })
};

export default FASTIFY;