import {FastifyInstance} from "fastify";
import Options from "../../../Const";
import {Logger} from "winston";
import mLogger from "../../../Function/Helper/logger";
import {CliProgress} from "../../../Function/Helper/CliProgress";
import Delay from "../../../Function/Helper/Delay";
import {ConfigFastify} from "../../../Interfaces/Config/Fastify";

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
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin point of view enabled. but module `@fastify/view` not found. skipped" }) : null;
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

export async function ServerStaticInstance(config : ConfigFastify, app : FastifyInstance) : Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.static !== undefined){
            if (config.plugins?.static?.enabled){
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin static enabled. check resolution modules exists" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("@fastify/static")){
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "static module exist. start registering plugins" }) : null;
                    await CliProgress.setTotal(CliProgress.getTotal())
                    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.static.settings){
                        await app.register(require("@fastify/static"), config.plugins.static.settings);
                        await resolve(app);
                    } else{
                        await rejected({ status : false, code : 500, msg : `static is Enabled, but plugins.static.settings. not declare`})
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

export async function ServerNgrokTunnelingInstance(config : ConfigFastify, app : FastifyInstance) : Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.ngrok !== undefined) {
            if (config.plugins?.ngrok?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                    CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin ngrok enabled. check resolution modules exists" }) : null;
                await CliProgress.setTotal(CliProgress.getTotal())
                await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("ngrok")){
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "ngrok module exist. start registering plugins" }) : null;
                    await CliProgress.setTotal(CliProgress.getTotal())
                    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.ngrok.settings){
                        const ngrok = require("ngrok");
                        await ngrok.authtoken(config.plugins.ngrok.settings.authToken as string)
                            .then(async () => {
                                await ngrok.connect({
                                    proto : config.plugins?.ngrok?.settings?.proto,
                                    addr : config.port
                                }).then(async () => {
                                    let api = ngrok.getApi();
                                    switch (config.plugins?.ngrok?.settings?.proto){
                                        case "http" :
                                            await api?.listTunnels()
                                                .then(async (result : any) => {
                                                    console.log([ result.tunnels[0].public_url, result.tunnels[1].public_url])
                                                })
                                                .catch(async (error : any) => {
                                                    await rejected({ status : false, code : 500, msg : `ngrok list Tunnels Error`, error : error});
                                                });
                                            await resolve(app);
                                            break;
                                        case "tcp" :
                                            await api?.listTunnels()
                                                .then(async (result : any) => {
                                                    console.log([ result.tunnels[0].public_url])
                                                })
                                                .catch(async (error : any) => {
                                                    await rejected({ status : false, code : 500, msg : `ngrok list Tunnels Error`, error : error});
                                                })
                                            await resolve(app);
                                            break;
                                        default :
                                            await rejected({ status : false, code : 500, msg : `ngrok unknown proto method`});
                                    }

                                }).catch(async (error : any) => {
                                    await rejected({ status : false, code : 500, msg : `ngrok error connect`, error : error});
                                })
                            }).catch(async (error : any) => {
                                await rejected({ status : false, code : 500, msg : `ngrok error auth token`, error : error});
                            });
                    } else{
                        await rejected({ status : false, code : 500, msg : `ngrok is Enabled, but plugins.ngrok.settings. not declare`});
                    }
                }else{
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Options.Server.State.SERVER_STATE_DEVELOPMENT)?
                        CliProgress.increment({ state : config.state, status : Options.READY_STATE, descriptions : "plugin ngrok enabled. but module not found. skipped" }) : null;
                    await CliProgress.setTotal(CliProgress.getTotal())
                    await Delay(config.Constanta?.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    await rejected({ status : false, code : 500, msg : `plugin ngrok enabled. but module not found. skipped`})
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
        await ServerViewInstance(config, app),
        await ServerStaticInstance(config,app),
        await ServerNgrokTunnelingInstance(config, app)
    ]).then(async () => {
        mApp = app;
    }).catch(async (error) => {
        await Promise.reject(error)
    })
    return mApp;
}