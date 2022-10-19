"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const https_1 = require("https");
const Middleware_1 = __importDefault(require("./Middleware"));
const redis_1 = require("redis");
const redis_adapter_1 = require("@socket.io/redis-adapter");
/**
 * @constructor
 * @param { ConfigSocketIO } config
 * @param { SocketIOInstances } config.app
 * @return Promise<mServerHTTP>
 *
 */
let mClientList = [];
const SOCKET_IO = (config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let mHttp;
    switch ((_b = (_a = config.options) === null || _a === void 0 ? void 0 : _a.server) === null || _b === void 0 ? void 0 : _b.protocol) {
        case "HTTPS":
            mHttp = (((_d = (_c = config.options) === null || _c === void 0 ? void 0 : _c.server) === null || _d === void 0 ? void 0 : _d.settings) !== undefined) ?
                (0, https_1.createServer)((_f = (_e = config.options) === null || _e === void 0 ? void 0 : _e.server) === null || _f === void 0 ? void 0 : _f.settings) : (0, https_1.createServer)();
            break;
        default:
            mHttp = (((_h = (_g = config.options) === null || _g === void 0 ? void 0 : _g.server) === null || _h === void 0 ? void 0 : _h.settings) !== undefined) ?
                (0, http_1.createServer)((_k = (_j = config.options) === null || _j === void 0 ? void 0 : _j.server) === null || _k === void 0 ? void 0 : _k.settings) : (0, http_1.createServer)();
    }
    let io = yield new socket_io_1.Server(mHttp, (_l = config.options) === null || _l === void 0 ? void 0 : _l.socket);
    return new Promise((resolve, rejected) => __awaiter(void 0, void 0, void 0, function* () {
        var _m, _o, _p, _q;
        try {
            if (((_o = (_m = config.options) === null || _m === void 0 ? void 0 : _m.socket) === null || _o === void 0 ? void 0 : _o.costumMiddleware) !== undefined) {
                yield io.use(config.options.socket.costumMiddleware);
            }
            else {
                yield io.use(yield (0, Middleware_1.default)(config));
            }
            yield io.on("connection", (io) => __awaiter(void 0, void 0, void 0, function* () {
                (config.onConnection !== undefined) ? config.onConnection(io) : null;
                mClientList.push(io);
                (config.onClient !== undefined) ? config.onClient({
                    ClientList: mClientList,
                    CurrentClient: io,
                    TotalClientConnected: mClientList.length
                }) : null;
                yield io.on("disconnect", (reason) => __awaiter(void 0, void 0, void 0, function* () {
                    (config.onDisconnect !== undefined) ? config.onDisconnect(reason) : null;
                    mClientList = mClientList.filter(item => item !== io);
                    (config.onClient !== undefined) ? config.onClient({
                        ClientList: mClientList,
                        CurrentClient: io,
                        TotalClientConnected: mClientList.length
                    }) : null;
                }));
            }));
            //@@ Detect IO Callback
            if (config.io !== undefined) {
                yield config.io(io);
            }
            //End @@ Detect IO Callback
            process.on("SIGHUP", function () {
                io.close();
                mHttp.close();
                process.kill(process.pid);
            });
            if (((_q = (_p = config.plugins) === null || _p === void 0 ? void 0 : _p.redis) === null || _q === void 0 ? void 0 : _q.enabled) === true) {
                if (config.plugins.redis.settings !== undefined) {
                    const pubClient = (0, redis_1.createClient)(config.plugins.redis.settings);
                    const subClient = pubClient.duplicate();
                    pubClient.on("error", (error) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log("terjadi error");
                    }));
                    const createAdapterRedist = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
                    yield io.adapter(createAdapterRedist);
                    yield resolve(mHttp);
                }
                else {
                    yield rejected({ status: false, msg: `redis plugins enabled. but, the settings not declare options` });
                }
            }
            else {
                yield resolve(mHttp);
            }
        }
        catch (e) {
            yield rejected(e);
        }
    }));
});
exports.default = SOCKET_IO;
