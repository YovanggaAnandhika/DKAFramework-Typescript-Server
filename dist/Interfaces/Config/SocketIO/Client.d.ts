import { EngineSocketIOClient, MetaDataSocketIOClient, SocketIOInstanceClient, SocketIOInstancesClient, State } from "../../../Type/types";
import { ManagerOptions, SocketOptions } from "socket.io-client";
import { ConfigSystemMultiTypes } from "../../Global";
export interface ConfigSocketIOClient {
    /**
     * The State Development or Production
     * **/
    state?: State;
    engine?: EngineSocketIOClient | undefined;
    host?: string | undefined;
    port?: number | undefined;
    io?: SocketIOInstancesClient | undefined;
    costumNameSpace?: string | undefined;
    onConnect?: (io: SocketIOInstanceClient) => Promise<void> | void;
    onConnectError?: (error: any) => Promise<void> | void | undefined;
    onDisconnect?: (id: MetaDataSocketIOClient) => Promise<void> | void | undefined;
    events?: {
        onReconnect?: (attempt: number) => Promise<void> | void | undefined;
        onReconnectAttempt?: (attempt: number) => Promise<void> | void | undefined;
        onReconnectError?: (error: any) => Promise<void> | void | undefined;
        onReconnectFailed?: () => Promise<void> | void | undefined;
        onPing?: () => Promise<void> | void | undefined;
        onError?: (error: any) => Promise<void> | void | undefined;
    };
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
    getConfig?: (config: ConfigSocketIOClient) => void | Promise<void>;
    settings?: Partial<ManagerOptions & SocketOptions> | undefined;
    Constanta?: ConfigSystemMultiTypes | undefined;
}
//# sourceMappingURL=Client.d.ts.map