import {
    FastifyInstance,
    FastifyLoggerInstance, FastifyPluginOptions, FastifyRegisterOptions,
    RawRequestDefaultExpression,
    RawServerDefault
} from "fastify";
import {FastifyTypeProviderDefault} from "fastify/types/type-provider";
import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ExtendedError} from "socket.io/dist/namespace";
import {
    ConfigFastify,
    ConfigServerSocketIOSettingsSecurityAuthorizationCallbackBasic,
    ConfigServerSocketIOSettingsSecurityAuthorizationCallbackOauth, ConfigSocketIO
} from "../Interfaces/Config";


export type SocketIOInstance = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstances = (io : SocketIOInstance) => Promise<void> | void | undefined;
export type SocketIOInstancesMiddleware = (io : Socket<DefaultEventsMap, DefaultEventsMap>, next: (err?: (ExtendedError | undefined)) => void) => Promise<void> | void | undefined;
export type FastifyRegistringPlugins = (app : FastifyInstance) => Promise<FastifyInstance>;
export type FastifyInstances = (app : FastifyInstance, opts: FastifyPluginOptions, next : any) => Promise<void> | void | undefined;

export type SocketIOMiddleware = (io : ConfigServerSocketIOSettingsSecurityAuthorizationCallbackOauth, next : (error ?: Error) => void) => void | Promise<void>;

export type SecurityAuthorizationCallbackOauth = (callback : ConfigServerSocketIOSettingsSecurityAuthorizationCallbackOauth, next : (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationCallbackBasic = (callback : ConfigServerSocketIOSettingsSecurityAuthorizationCallbackBasic, next : (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationMode = "OAUTH2" | "BASIC";
export type State = "DEVELOPMENT" | "PRODUCTION";
export type EngineFastify = "FASTIFY";

/**
 * @typedef { ConfigFastify | ConfigSocketIO } Config
 */
export type DKAConfig = ConfigFastify | ConfigSocketIO | never;

/**
 * @type EngineSocketIO
 */
export type EngineSocketIO = "SOCKET.IO"