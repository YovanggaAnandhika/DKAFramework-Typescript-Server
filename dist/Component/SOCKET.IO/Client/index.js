"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Sock = __importStar(require("socket.io-client"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const lodash_1 = require("lodash");
const SOCKET_IO_CLIENT = (config) => __awaiter(void 0, void 0, void 0, function* () {
    moment_timezone_1.default.locale("id");
    let metaDataSocketIOClient = {
        id: undefined
    };
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        let mNameSpace = (config.costumNameSpace !== undefined) ?
            (config.costumNameSpace.charAt(0) !== "/") ? `/${config.costumNameSpace}`
                : `${config.costumNameSpace}`
            : ``;
        let io = Sock.io(`http://${config.host}:${config.port}${mNameSpace}`, config.settings);
        yield io.on("connect", () => __awaiter(void 0, void 0, void 0, function* () {
            (config.onConnect !== undefined) ? config.onConnect(io) : null;
            metaDataSocketIOClient = (0, lodash_1.merge)(metaDataSocketIOClient, {
                id: io.id,
                timestamp: { lastTime: {
                        onConnect: {
                            humanize: (0, moment_timezone_1.default)().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: (0, moment_timezone_1.default)().unix()
                        }
                    }
                }
            });
        }));
        yield io.on("connect_error", (error) => __awaiter(void 0, void 0, void 0, function* () {
            (config.onConnectError !== undefined) ? config.onConnectError(error) : null;
        }));
        yield io.io.on("reconnect", (attempt) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            (((_a = config.events) === null || _a === void 0 ? void 0 : _a.onReconnect) !== undefined) ? (_b = config.events) === null || _b === void 0 ? void 0 : _b.onReconnect(attempt) : null;
        }));
        yield io.io.on("reconnect_attempt", (attempt) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            (((_c = config.events) === null || _c === void 0 ? void 0 : _c.onReconnectAttempt) !== undefined) ? (_d = config.events) === null || _d === void 0 ? void 0 : _d.onReconnectAttempt(attempt) : null;
        }));
        yield io.io.on("reconnect_error", (error) => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f;
            (((_e = config.events) === null || _e === void 0 ? void 0 : _e.onReconnectError) !== undefined) ? (_f = config.events) === null || _f === void 0 ? void 0 : _f.onReconnectError(error) : null;
        }));
        yield io.io.on("reconnect_failed", () => __awaiter(void 0, void 0, void 0, function* () {
            var _g, _h;
            (((_g = config.events) === null || _g === void 0 ? void 0 : _g.onReconnectFailed) !== undefined) ? (_h = config.events) === null || _h === void 0 ? void 0 : _h.onReconnectFailed() : null;
        }));
        yield io.io.on("ping", () => __awaiter(void 0, void 0, void 0, function* () {
            var _j, _k;
            (((_j = config.events) === null || _j === void 0 ? void 0 : _j.onPing) !== undefined) ? (_k = config.events) === null || _k === void 0 ? void 0 : _k.onPing() : null;
        }));
        yield io.io.on("error", (error) => __awaiter(void 0, void 0, void 0, function* () {
            var _l, _m;
            (((_l = config.events) === null || _l === void 0 ? void 0 : _l.onError) !== undefined) ? (_m = config.events) === null || _m === void 0 ? void 0 : _m.onError(error) : null;
        }));
        yield io.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            metaDataSocketIOClient = yield (0, lodash_1.merge)(metaDataSocketIOClient, {
                id: io.id,
                timestamp: {
                    lastTime: {
                        onDisconnect: {
                            humanize: (0, moment_timezone_1.default)().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: (0, moment_timezone_1.default)().unix()
                        }
                    }
                }
            });
            (config.onDisconnect !== undefined) ? config.onDisconnect(metaDataSocketIOClient) : null;
        }));
        process.on("SIGHUP", function () {
            io.disconnect();
            io.close();
            process.kill(process.pid);
        });
        if (config.io !== undefined) {
            yield config.io(io);
            resolve(io);
        }
        else {
            resolve(io);
        }
    }));
});
exports.default = SOCKET_IO_CLIENT;
