import Webpack, {Configuration, Compiler as WebpackCompiler, MultiCompiler as WebpackMultiCompiler, EntryObject } from "webpack";
import { Configuration as WebpackDevConfig } from "webpack-dev-server";
import {
    EngineFastify, EngineReactJS,
    EngineSocketIO,
    FastifyInstances, FastifyRegistringPlugins, SecurityAuthorizationCallbackBasic, SecurityAuthorizationCallbackOauth,
    SecurityAuthorizationMode,
    SocketIOInstances, SocketIOInstancesMiddleware,
    State
} from "../Type/types";
import {Server, ServerOptions} from "socket.io";
import {FastifyLoggerInstance, FastifyServerOptions, RawServerDefault} from "fastify";
import http from "http";
import {FastifyBaseLogger} from "fastify/types/logger";
import exp from "constants";
import path from "path";
import nodemon from "nodemon";

export interface ConfigState {
    SERVER_STATE_DEVELOPMENT : "development",
    SERVER_STATE_PRODUCTION : "production"
}

export interface ConfigEngine {
    FASTIFY : EngineFastify,
    EXPRESSSJS : "EXPRESSJS",
    SOCKETIO : EngineSocketIO,
    REACTJS : EngineReactJS,
    HTTP : "HTTP",
    UDP : "UDP"
}

export interface ConfigHost {
    LOCALHOST : "127.0.0.1",
    WILDCARD : "0.0.0.0"
}

export interface ConfigPort {
    DEFAULT : 3339
}

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

export interface ConfigServerFastifyPlugins {
    pointOfView ?: ConfigServerFastifyPluginsPointOfView,
    static ?: ConfigServerFastifyPluginsStatic
}

export interface ConfigServerSocketIOSettingsSecurityAuthorizationCallbackOauth {
    secret_id? : string | undefined,
    secret_key? : string | undefined,
    redirect_uri? : string | undefined
}

export interface ConfigServerSocketIOSettingsSecurityAuthorizationCallbackBasic {
    token? : string;
}

export interface ConfigServerSocketIOSettingsSecurityAuthorizationOauth {
    enabled? : Boolean | undefined,
    mode? : "OAUTH2" | undefined,
    callback : SecurityAuthorizationCallbackOauth
}

export interface ConfigServerSocketIOSettingsSecurityAuthorizationBasic {
    enabled? : Boolean | undefined,
    mode? : "BASIC" | undefined,
    callback : SecurityAuthorizationCallbackBasic
}


export interface ConfigServerSocketIOSettingsSecurity {
    authorization? : ConfigServerSocketIOSettingsSecurityAuthorizationBasic | ConfigServerSocketIOSettingsSecurityAuthorizationOauth | undefined,
}
export interface ConfigServerSocketIOSettings extends Partial<ServerOptions> {
    security? : ConfigServerSocketIOSettingsSecurity | undefined,
    costumMiddleware? : SocketIOInstancesMiddleware | undefined
}

export interface ConfigSystemMultiTypes {
    DEFAULT_DELAY_PROGRESS ?: number,
    BASE_PATH ?: string
}

export interface ConfigFastify {
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


export interface ConfigSocketIO {
    state? : State,
    engine : EngineSocketIO,
    port? : number | Server,
    use? : SocketIOInstances,
    getConfig? : (config : ConfigSocketIO) => void | Promise<void>,
    settings? : ConfigServerSocketIOSettings | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}


export interface ConfigReactJSConfig {
    compiler : Configuration
}

export type webpackDevTypes = WebpackCompiler | WebpackMultiCompiler | WebpackDevConfig;

export type ConfigReactJS = {
    state? : State,
    host ?: string | undefined,
    port ?: number | undefined,
    engine : EngineReactJS,
    entry ?:
        | string
        | (() => string | EntryObject | string[] | Promise<string | EntryObject | string[]>)
        | EntryObject
        | string[],
    plugins ?: (
        | ((this: WebpackCompiler, compiler: WebpackCompiler) => void)
        | Webpack.WebpackPluginInstance
        )[],
    serverConfig ?: webpackDevTypes,
    getConfig? : (config : ConfigReactJS) => void | Promise<void>,
    Constanta ?: ConfigSystemMultiTypes | undefined
};


