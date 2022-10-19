import {
    EngineSocketIO,
    SecurityAuthorizationCallbackBasic,
    SecurityAuthorizationCallbackOauth,
    SocketIOInstances,
    SocketIOInstancesMiddleware,
    SocketIOInstanceSocket,
    State
} from "../../../Type/types";
import {RedisClientOptions} from "redis";
import {Server, ServerOptions} from "socket.io";
import {ConfigSystemMultiTypes, MultiplePluginsServer} from "../../Global";
import {ServerOptions as ServerOptionsHttps} from "https";
import {ServerOptions as ServerOptionsHttp} from "http";


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
    engine ?: EngineSocketIO | undefined,
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