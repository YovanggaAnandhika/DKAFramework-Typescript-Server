import {ConfigSocketIOClient} from "../../../Interfaces/Config/SocketIO/Client";
import * as Sock from "socket.io-client"
import moment from "moment-timezone";
import {MetaDataSocketIOClient} from "../../../Type/types";
import {merge} from "lodash";
import {Logger} from "winston";

const encryptSocket = require('socket.io-encrypt')


export const SOCKET_IO_CLIENT = async (config: ConfigSocketIOClient, logger: Logger): Promise<Sock.Socket> => {

    (config.state === "development") ? await logger.info(`setting moment js locales default`) : null;
    moment.locale("id")

    let metaDataSocketIOClient: MetaDataSocketIOClient = {
        id: undefined
    };

    let mPingTime = moment();

    return new Promise(async (resolve) => {
        (config.logger?.enabled) ? await logger.info(`checked variable costum namespace`) : null;
        let mNameSpace = (config.costumNameSpace !== undefined) ?
            (config.costumNameSpace.charAt(0) !== "/") ? `/${config.costumNameSpace}`
                : `${config.costumNameSpace}`
            : ``;

        (config.state === "development") ? await logger.info(`set Socket Client Host Instance `) : null;
        let mProtocol = (config?.settings?.secure) ? `https://` : `http://`;
        let io = Sock.io(`${mProtocol}${config.host}:${config.port}${mNameSpace}`, config.settings);
        if (config?.settings?.encryption?.enabled) {
            await encryptSocket(config?.settings.encryption.settings?.key)(io);
        }
        await io.on("connect", async () => {
            metaDataSocketIOClient = merge(metaDataSocketIOClient, {
                id: io.id,
                io: io,
                timestamp: {
                    lastTime: {
                        onConnect: {
                            humanize: moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: moment().unix()
                        }
                    }
                }
            });
            config.onConnect?.(metaDataSocketIOClient);
        });

        await io.on("connect_error", async (error) => {
            (config.logger?.enabled) ? await logger.info(`callback on Connect Error ${JSON.stringify(error)}`) : null;
            config.onConnectError?.(error);
        });

        await io.io.on("reconnect", async (attempt) => {
            (config.logger?.enabled) ? await logger.info(`callback on Reconnect`) : null;
            config.events?.onReconnect?.(attempt);
        });


        await io.io.on("reconnect_attempt", async (attempt) => {
            (config.logger?.enabled) ? await logger.info(`callback on Reconnect Attempt ${attempt}`) : null;
            config.events?.onReconnectAttempt?.(attempt);
        });

        await io.io.on("reconnect_error", async (error) => {
            config.events?.onReconnectError?.(error);
        });

        await io.io.on("reconnect_failed", async () => {
            config.events?.onReconnectFailed?.();
        });


        await io.io.on("ping", async () => {
            let mTimeNow = await moment();
            let mDifferentsTime = moment.duration(mTimeNow.diff(mPingTime)).milliseconds();
            mPingTime = mTimeNow;
            (config.events?.onPing !== undefined) ? config.events?.onPing(mDifferentsTime) : null;
        });

        await io.io.on("error", async (error) => {
            (config.logger?.enabled) ? await logger.info(`callback on Error ${JSON.stringify(error)}`) : null;
            config.events?.onError?.(error);
        });

        await io.on("disconnect", async (reason, description) => {
            (config.logger?.enabled) ? await logger.info(`callback on disconnected ${JSON.stringify({
                reason: reason,
                description: description
            })}`) : null;
            metaDataSocketIOClient = await merge(metaDataSocketIOClient, {
                id: io.id,
                io: io,
                reason: reason,
                description: description,
                timestamp: {
                    lastTime: {
                        onDisconnect: {
                            humanize: moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: moment().unix()
                        }
                    }
                }
            });
            config.onDisconnect?.(metaDataSocketIOClient);
        });


        await process.on("SIGHUP", function () {
            io.disconnect();
            io.close();
            process.kill(process.pid);
        });
        await process.on("SIGINT", function () {
            io.disconnect();
            io.close();
            process.kill(process.pid);
        })

        if (config.io !== undefined) {
            await config.io(io);
            resolve(io);
        } else {
            resolve(io);
        }
    })
}

export default SOCKET_IO_CLIENT;