import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {Server, Socket} from "socket.io";
import * as Sock from "socket.io-client";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ExtendedError} from "socket.io/dist/namespace";
import {ConfigReactJS} from "../Interfaces/Config/ReactJS";
import {
    ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic,
    ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth,
    ConfigSocketIO
} from "../Interfaces/Config/SocketIO/Server";
import {ConfigFastify} from "../Interfaces/Config/Fastify";

export * from "fastify";

export type SocketIOInstance = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstanceSocket = Socket<DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstanceClient = Sock.Socket<DefaultEventsMap, DefaultEventsMap>;
export type SocketIOInstances = (io : SocketIOInstance) => Promise<void> | void | undefined;
export type SocketIOInstancesMiddleware = (io : Socket<DefaultEventsMap, DefaultEventsMap>, next: (err?: (ExtendedError | undefined)) => void) => Promise<void> | void | undefined;
export type FastifyRegistringPlugins = (app : FastifyInstance) => Promise<FastifyInstance>;
export type FastifyInstances = (app : FastifyInstance, opts: FastifyPluginOptions, next : any) => Promise<void> | void | undefined;
export type SocketIOInstancesClient = (io : SocketIOInstanceClient) => Promise<void> | void | undefined;
export type SocketIOMiddleware = (io : ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next : (error ?: Error) => void) => void | Promise<void>;

export type SecurityAuthorizationCallbackOauth = (callback : ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next : (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationCallbackBasic = (callback : ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic, next : (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationMode = "OAUTH2" | "BASIC";
export type State = "none" | "development" | "production";
export type Mode = "compile" | "server";
export type EngineFastify = "FASTIFY";

/**
 * @typedef { ConfigFastify | ConfigSocketIO } Config
 */
export type DKAConfig = ConfigFastify | ConfigSocketIO | ConfigReactJS | object;

export function isFastify(obj: any): obj is ConfigFastify {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'FASTIFY';
}

export function isSocketIO(obj: any): obj is ConfigSocketIO {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'SOCKET.IO';
}

export function isReactJS(obj: any): obj is ConfigReactJS {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'REACTJS';
}

export type MetaDataSocketIOClient = {
    id ?: string,
    timestamp ?: {
        lastTime ?: {
            onConnect ?: {
                unix ?: number,
                humanize ?: string
            },
            onDisconnect ?: {
                unix ?: number,
                humanize ?: string
            }
        }
    }
} | undefined;


/**
 * @type EngineSocketIO
 */
export type EngineSocketIO = "SOCKET.IO";
export type EngineSocketIOClient = "SOCKET.IO-CLIENT";
export type EngineReactJS = "REACTJS"