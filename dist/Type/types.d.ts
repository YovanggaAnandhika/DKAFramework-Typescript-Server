import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Server, Socket } from "socket.io";
import * as Sock from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ExtendedError } from "socket.io/dist/namespace";
import { ConfigReactJS } from "../Interfaces/Config/ReactJS";
import { ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic, ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, ConfigSocketIO } from "../Interfaces/Config/SocketIO/Server";
import { ConfigFastify } from "../Interfaces/Config/Fastify";
import { Router } from "express";
export * from "fastify";
export declare type SocketIOInstance = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export declare type SocketIOInstanceSocket = Socket<DefaultEventsMap, DefaultEventsMap, any>;
export declare type SocketIOInstanceClient = Sock.Socket<DefaultEventsMap, DefaultEventsMap>;
export declare type SocketIOInstances = (io: SocketIOInstance) => Promise<void> | void | undefined;
export declare type SocketIOInstancesMiddleware = (io: Socket<DefaultEventsMap, DefaultEventsMap>, next: (err?: (ExtendedError | undefined)) => void) => Promise<void> | void | undefined;
export declare type FastifyRegistringPlugins = (app: FastifyInstance) => Promise<FastifyInstance>;
export declare type FastifyInstances = (app: FastifyInstance, opts: FastifyPluginOptions, next: any) => Promise<void> | void | undefined;
export declare type SocketIOInstancesClient = (io: SocketIOInstanceClient) => Promise<void> | void | undefined;
export declare type SocketIOMiddleware = (io: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next: (error?: Error) => void) => void | Promise<void>;
export declare type ExpressJSRoutesInstance = (router: Router) => void | Promise<void>;
export declare type SecurityAuthorizationCallbackOauth = (callback: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next: (error?: Error) => void) => void | Promise<void>;
export declare type SecurityAuthorizationCallbackBasic = (callback: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic, next: (error?: Error) => void) => void | Promise<void>;
export declare type SecurityAuthorizationMode = "OAUTH2" | "BASIC";
export declare type State = "none" | "development" | "production";
export declare type Mode = "compile" | "server";
export declare type EngineFastify = "FASTIFY";
/**
 * @typedef { ConfigFastify | ConfigSocketIO } Config
 */
export declare type DKAConfig = ConfigFastify | ConfigSocketIO | ConfigReactJS | object;
export declare function isFastify(obj: any): obj is ConfigFastify;
export declare function isSocketIO(obj: any): obj is ConfigSocketIO;
export declare function isReactJS(obj: any): obj is ConfigReactJS;
export declare type MetaDataSocketIOClient = {
    id?: string;
    timestamp?: {
        lastTime?: {
            onConnect?: {
                unix?: number;
                humanize?: string;
            };
            onDisconnect?: {
                unix?: number;
                humanize?: string;
            };
        };
    };
} | undefined;
/**
 * @type EngineSocketIO
 */
export declare type EngineSocketIO = "SOCKET.IO";
export declare type EngineSocketIOClient = "SOCKET.IO-CLIENT";
export declare type EngineReactJS = "REACTJS";
export declare type EngineExpressJS = "EXPRESSJS";
//# sourceMappingURL=types.d.ts.map