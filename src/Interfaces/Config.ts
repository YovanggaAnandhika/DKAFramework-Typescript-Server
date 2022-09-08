import {
    EngineFastify,
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

export interface ConfigState {
    SERVER_STATE_DEVELOPMENT : "DEVELOPMENT",
    SERVER_STATE_PRODUCTION : "PRODUCTION"
}

export interface ConfigEngine {
    FASTIFY : EngineFastify,
    EXPRESSSJS : "EXPRESSJS",
    SOCKETIO : EngineSocketIO,
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



export interface ConfigServerFastifySettings extends FastifyServerOptions<http.Server, FastifyBaseLogger> {

}

export interface ConfigServerFastifyPluginsPointOfView {
    enabled ?: boolean,
    settings ?: object
}

export interface ConfigServerFastifyPlugins {
    pointOfView ?: ConfigServerFastifyPluginsPointOfView,

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
    DEFAULT_DELAY_PROGRESS ?: number
}

export interface ConfigFastify {
    state ?: State,
    engine ?: EngineFastify,
    host ?: string | undefined,
    port ?: number | string | undefined,
    registerModule ?: FastifyRegistringPlugins | undefined
    app ?: FastifyInstances,
    getConfig ?: (config : ConfigFastify) => void | Promise<void>,
    settings ?: ConfigServerFastifySettings | undefined,
    plugins ?: ConfigServerFastifyPlugins | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}


export interface ConfigSocketIO {
    state? : State,
    engine? : EngineSocketIO,
    host? : string | undefined,
    port? : number | Server,
    app? : SocketIOInstances,
    getConfig? : (config : ConfigSocketIO) => void | Promise<void>,
    settings? : ConfigServerSocketIOSettings | undefined,
    Constanta ?: ConfigSystemMultiTypes | undefined
}


