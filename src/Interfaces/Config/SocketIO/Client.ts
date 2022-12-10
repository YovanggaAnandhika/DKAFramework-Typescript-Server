import {EngineSocketIOClient, MetaDataSocketIOClient, SocketIOInstancesClient, State} from "../../../Type/types";
import {ManagerOptions, SocketOptions} from "socket.io-client"
import {ConfigSystemLogger, ConfigSystemMultiTypes} from "../../Global";
import {GlobalConfig} from "../Global";

export type ConfigSocketIOClientOnConnect = (io: MetaDataSocketIOClient) => Promise<void> | void;
export type ConfigSocketIOClientConnectError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientOnDisconnect = (id: MetaDataSocketIOClient) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnect = (attempt: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectAttempt = (attempt: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectFailed = () => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnPing = (latency ?: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnError = (error: any) => Promise<void> | void | undefined;

export interface ConfigSocketIOClientSettingsEncryptionSettings {
    key?: string
}

export interface ConfigSocketIOClientSettingsEncryption {
    enabled?: boolean,
    settings?: ConfigSocketIOClientSettingsEncryptionSettings
}

export interface ConfigSocketIOClientSettings extends Partial<ManagerOptions & SocketOptions> {
    encryption?: ConfigSocketIOClientSettingsEncryption
}

export interface ConfigSocketIOClient extends GlobalConfig {
    /**
     * The State Development or Production
     * **/
    state?: State,
    engine?: EngineSocketIOClient | undefined,
    logger?: ConfigSystemLogger | undefined,
    host?: string | undefined,
    port?: number | undefined,
    io?: SocketIOInstancesClient | undefined,
    costumNameSpace?: string | undefined,
    onConnect?: ConfigSocketIOClientOnConnect,
    onConnectError?: ConfigSocketIOClientConnectError,
    onError?: ConfigSocketIOClientError,
    onDisconnect?: ConfigSocketIOClientOnDisconnect,
    events?: {
        onReconnect?: ConfigSocketIOClientEventOnReconnect,
        onReconnectAttempt?: ConfigSocketIOClientEventOnReconnectAttempt,
        onReconnectError?: ConfigSocketIOClientEventOnReconnectError,
        onReconnectFailed?: ConfigSocketIOClientEventOnReconnectFailed,
        onPing?: ConfigSocketIOClientEventOnPing,
        onError?: ConfigSocketIOClientEventOnError,
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
    getConfig?: (config: ConfigSocketIOClient) => void | Promise<void>,
    settings?: ConfigSocketIOClientSettings | undefined,
    Constanta?: ConfigSystemMultiTypes | undefined
}