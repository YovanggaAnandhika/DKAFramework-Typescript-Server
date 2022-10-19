import {EngineFastify, FastifyInstances, FastifyRegistringPlugins, State} from "../../Type/types";
import {ConfigSystemMultiTypes, MultiplePluginsServer} from "../Global";
import nodemon from "nodemon";
import {FastifyServerOptions} from "fastify";
import http from "http";
import {FastifyBaseLogger} from "fastify/types/logger";

export interface ConfigServerFastifySettingsNodemon {
    enabled ?: boolean,
    settings ?: nodemon.Settings
}

export interface ConfigServerFastifySettings extends FastifyServerOptions<http.Server, FastifyBaseLogger> {
    registerModule ?: FastifyRegistringPlugins | undefined,
    nodemon ?: ConfigServerFastifySettingsNodemon
}

export interface ConfigServerFastifyPluginsPointOfViewSettingsEngine {
    ejs ?: any
}


export interface ConfigServerFastifyPluginsPointOfViewSettings {
    engine ?: ConfigServerFastifyPluginsPointOfViewSettingsEngine,
    root ?: string,
    includeViewExtension ?: boolean
}

export interface ConfigServerFastifyPluginsPointOfView {
    enabled ?: boolean,
    settings ?: ConfigServerFastifyPluginsPointOfViewSettings
}


export interface ConfigServerFastifyPluginsStaticSettings {
    root ?: string,
    prefix ?: string
}
export interface ConfigServerFastifyPluginsStatic {
    enabled ?: boolean,
    settings ?: ConfigServerFastifyPluginsStaticSettings
}

export interface ConfigServerFastifyPlugins extends MultiplePluginsServer {
    pointOfView ?: ConfigServerFastifyPluginsPointOfView,
    static ?: ConfigServerFastifyPluginsStatic
}

export interface ConfigFastify {
    /**
     * The State Development or Production
     * **/
    state ?: State,
    engine : EngineFastify,
    host ?: string | undefined,
    port ?: number | string | undefined,
    app ?: FastifyInstances,
    getConfig ?: (config : ConfigFastify) => void | Promise<void>,
    settings ?: ConfigServerFastifySettings | undefined,
    plugins ?: ConfigServerFastifyPlugins | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}