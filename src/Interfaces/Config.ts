import Webpack, {
    Compiler as WebpackCompiler,
    Configuration,
    EntryObject,
    MultiCompiler as WebpackMultiCompiler
} from "webpack";
import http, {ServerOptions as ServerOptionsHttp} from "http";
import {ServerOptions as ServerOptionsHttps} from "https";
import {Configuration as WebpackDevConfig} from "webpack-dev-server";
import {
    EngineFastify,
    EngineReactJS,
    EngineSocketIO,
    EngineSocketIOClient,
    FastifyInstances,
    FastifyRegistringPlugins,
    MetaDataSocketIOClient,
    SecurityAuthorizationCallbackBasic,
    SecurityAuthorizationCallbackOauth,
    SocketIOInstanceClient,
    SocketIOInstances,
    SocketIOInstancesClient,
    SocketIOInstancesMiddleware,
    SocketIOInstanceSocket,
    State
} from "../Type/types";
import {Server, ServerOptions} from "socket.io";
import * as Sock from "socket.io-client";
import {FastifyServerOptions} from "fastify";
import {FastifyBaseLogger} from "fastify/types/logger";

import nodemon from "nodemon";
import {RedisClientOptions} from "redis";

export interface ConfigState {
    SERVER_STATE_DEVELOPMENT : "development",
    SERVER_STATE_PRODUCTION : "production"
}

export interface ConfigEngine {
    FASTIFY : EngineFastify,
    EXPRESSSJS : "EXPRESSJS",
    SOCKETIO : EngineSocketIO,
    SOCKETIOCLIENT : EngineSocketIOClient,
    REACTJS : EngineReactJS,
    HTTP : "HTTP",
    UDP : "UDP"
}

export interface ConfigHost {
    LOCALHOST : "127.0.0.1",
    WILDCARD : "0.0.0.0"
}

export interface ConfigPort {
    DEFAULT : 80
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

export interface ConfigServerFastifyPlugins extends MultiplePluginsServer {
    pointOfView ?: ConfigServerFastifyPluginsPointOfView,
    static ?: ConfigServerFastifyPluginsStatic
}

export interface ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth {
    secret_id? : string | undefined,
    secret_key? : string | undefined,
    redirect_uri? : string | undefined
}

export interface ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic {
    token? : string;
}

export interface ConfigServerSocketIOOptionsSecurityAuthorizationOauth {
    enabled? : Boolean | undefined,
    mode? : "OAUTH2" | undefined,
    callback : SecurityAuthorizationCallbackOauth
}

export interface ConfigServerSocketIOOptionsSecurityAuthorizationBasic {
    enabled? : Boolean | undefined,
    mode? : "BASIC" | undefined,
    callback : SecurityAuthorizationCallbackBasic
}


export interface ConfigServerSocketIOOptionsSecurity {
    authorization? : ConfigServerSocketIOOptionsSecurityAuthorizationBasic | ConfigServerSocketIOOptionsSecurityAuthorizationOauth | undefined,
}

export interface ConfigServerSocketIOOptionsSocket extends Partial<ServerOptions> {
    security? : ConfigServerSocketIOOptionsSecurity | undefined,
    costumMiddleware? : SocketIOInstancesMiddleware | undefined,
}

export interface ConfigSocketIOHTTPSSettings {
    protocol ?: "HTTPS",
    settings ?: ServerOptionsHttps | undefined
}

export interface ConfigSocketIOHTTPSettings {
    protocol ?: "HTTP",
    settings ?: ServerOptionsHttp | undefined
}

export interface ConfigServerSocketIOOptions {
    socket ?: ConfigServerSocketIOOptionsSocket | undefined,
    server ?: ConfigSocketIOHTTPSettings | ConfigSocketIOHTTPSSettings | undefined
}



export interface ConfigSystemMultiTypes {
    DEFAULT_DELAY_PROGRESS ?: number,
    BASE_PATH ?: string
}

export interface MultiplePluginsServerNgrokSettings {
    authToken : string | undefined,
    proto : "tcp" | "http" | "tls"
}
export interface MultiplePluginsServerNgrok {
    enabled ?: boolean | undefined,
    settings ?: MultiplePluginsServerNgrokSettings
}
export interface MultiplePluginsServer {
    ngrok ?: MultiplePluginsServerNgrok
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


export interface ConfigSocketIOGetClientConnected {
    ClientList ?: Array<SocketIOInstanceSocket>,
    CurrentClient ?: SocketIOInstanceSocket,
    TotalClientConnected ?: number
}

export interface ConfigSocketIOPluginsRedisSettingsSocket {
    host : string,
    port : number
}
export interface ConfigSocketIOPluginsRedisSettings extends RedisClientOptions {
    socket : ConfigSocketIOPluginsRedisSettingsSocket,
    password : string
}

export interface ConfigSocketIOPluginsRedis {
    enabled ?: boolean | undefined,
    settings ?: ConfigSocketIOPluginsRedisSettings
}
export interface ConfigSocketIOPlugins extends MultiplePluginsServer {
    redis ?: ConfigSocketIOPluginsRedis | undefined
}



export interface ConfigSocketIO {
    /**
     * The State Development or Production
     * **/
    state? : State,
    engine : EngineSocketIO,
    port? : number | Server,
    io? : SocketIOInstances,
    onConnection ?: (io : SocketIOInstanceSocket) => Promise<void> | void | undefined,
    onDisconnect ?: (reason : string) => Promise<void> | void | undefined,
    onClient ?: (io : ConfigSocketIOGetClientConnected) => Promise<void> | undefined,
    getConfig? : (config : ConfigSocketIO) => void | Promise<void>,
    options ?: ConfigServerSocketIOOptions,
    plugins? : ConfigSocketIOPlugins | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}

export interface ConfigSocketIOClient {
    /**
     * The State Development or Production
     * **/
    state? : State,
    engine : EngineSocketIOClient,
    host ?: string | undefined,
    port ?: number | undefined,
    io ?: SocketIOInstancesClient | undefined,
    costumNameSpace ?: string | undefined,
    onConnect ?: (io : SocketIOInstanceClient) => Promise<void> | void,
    onConnectError ?: (error : any) => Promise<void> | void | undefined,
    onDisconnect ?: (id : MetaDataSocketIOClient) => Promise<void> | void | undefined,
    events ?: {
        onReconnect ?: (attempt : number) => Promise<void> | void | undefined,
        onReconnectAttempt ?: (attempt : number) => Promise<void> | void | undefined,
        onReconnectError ?: (error : any) => Promise<void> | void | undefined,
        onReconnectFailed ?: () => Promise<void> | void | undefined,
        onPing ?: () => Promise<void> | void | undefined,
        onError ?: (error : any) => Promise<void> | void | undefined,
    }

    /**
     *
     * await io.io.on("reconnect", async (attempt) => {
     *             console.log(`connection socket.io-client reconnect, with message ${attempt.toString()} attempt`);
     *         })
     *
     *         await io.io.on("reconnect_attempt", async (attempt) => {
     *             console.log(`connection socket.io-client reconnect_attempt, with message ${attempt.toString()} attempt`);
     *         });
     *         await io.io.on("reconnect_error", async (error) => {
     *             console.log(`connection socket.io-client reconnect_error, with message ${error.toString()}`);
     *         });
     *
     *         await io.io.on("reconnect_failed", async () => {
     *             console.log(`connection socket.io-client failed`);
     *         });
     *
     *         await io.io.on("ping", async () => {
     *             console.log(`connection socket.io-client ping events`)
     *         })
     *         await io.io.on("error", async (error) => {
     *             console.log(`connection socket.io-client fatal error, with message ${error.toString()}`)
     *         });
     */
    getConfig? : (config : ConfigSocketIOClient) => void | Promise<void>,
    settings? : Partial<Sock.ManagerOptions & Sock.SocketOptions> | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}


export interface ConfigReactJSConfig {
    compiler : Configuration
}

export type webpackDevTypes = WebpackCompiler | WebpackMultiCompiler | WebpackDevConfig;

export type ConfigReactJS = {
    /**
     * The State Development or Production
     * **/
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

/*export type ConfigReactJS = WebpackDevConfig | WebpackDevCompiler | WebpackDevMultiCompiler & {
    engine : EngineReactJS
}*/


