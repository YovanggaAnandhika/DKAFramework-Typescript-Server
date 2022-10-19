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
exports.Types = exports.Options = exports.Client = exports.Server = void 0;
const Config_1 = require("./Config");
const DKATypes = __importStar(require("./Type/types"));
exports.Types = DKATypes;
const lodash_1 = require("lodash");
const tcpPortUsed = __importStar(require("tcp-port-used"));
const FASTIFY_1 = __importDefault(require("./Component/FASTIFY"));
const Server_1 = __importDefault(require("./Component/SOCKET.IO/Server"));
const Const_1 = __importDefault(require("./Const"));
exports.Options = Const_1.default;
const logger_1 = __importDefault(require("./Function/Helper/logger"));
const Delay_1 = require("./Function/Helper/Delay");
const CliProgress_1 = require("./Function/Helper/CliProgress");
const REACTJS_1 = __importDefault(require("./Component/REACTJS"));
const Client_1 = __importDefault(require("./Component/SOCKET.IO/Client"));
/** Declare Variable **/
let mTempFastify = { engine: "FASTIFY" };
let mTempSocketIO = { engine: "SOCKET.IO" };
let mTempSocketIOClient = { engine: "SOCKET.IO-CLIENT" };
let mTempReactJS = { engine: "REACTJS" };
let logger = logger_1.default.logger;
function Server(config = Config_1.FastifyConfigurationDefault) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            switch (config.engine) {
                case Const_1.default.Server.Engine.FASTIFY:
                    //## Set Configuration merger
                    mTempFastify = yield (0, lodash_1.merge)(Config_1.FastifyConfigurationDefault, config);
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.start(43, 0, { state: mTempFastify.state, status: Const_1.default.READY_STATE, descriptions: "Prepare Running Program" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_a = mTempFastify === null || mTempFastify === void 0 ? void 0 : mTempFastify.Constanta) === null || _a === void 0 ? void 0 : _a.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempFastify.getConfig;
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempFastify.state, status: Const_1.default.READY_STATE, descriptions: "Deleting Temporary Get Config Self" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_b = mTempFastify.Constanta) === null || _b === void 0 ? void 0 : _b.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield ((_c = config.getConfig) === null || _c === void 0 ? void 0 : _c.call(config, mTempFastify));
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "Send Setter Configuration Callback" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_d = mTempFastify.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempFastify.state, status: Const_1.default.READY_STATE, descriptions: "Fastify Engine Selected Started" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_e = mTempFastify.Constanta) === null || _e === void 0 ? void 0 : _e.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //nodemon(mTempFastify.settings?.nodemon?.settings as Settings)
                    //$$$$$$$$$$$ CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                    yield (0, FASTIFY_1.default)(mTempFastify)
                        .then((app) => __awaiter(this, void 0, void 0, function* () {
                        var _p;
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        /** ================= DEBUG CONSOLE ======================= **/
                        (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: mTempFastify.state, status: Const_1.default.READY_STATE, descriptions: "Check Port Used Started" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.Delay)((_p = mTempFastify.Constanta) === null || _p === void 0 ? void 0 : _p.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                        yield tcpPortUsed.check({
                            host: mTempFastify.host,
                            port: mTempFastify.port,
                        }).then((inUse) => __awaiter(this, void 0, void 0, function* () {
                            if (!inUse) {
                                //$$$$$$$$$$$ ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                                yield app.listen({
                                    host: mTempFastify.host,
                                    port: mTempFastify.port,
                                }, (error) => __awaiter(this, void 0, void 0, function* () {
                                    var _q;
                                    if (!error) {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        if (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) {
                                            CliProgress_1.CliProgress.increment(CliProgress_1.CliProgress.getTotal(), { state: mTempFastify.state, status: Const_1.default.COMPLETE_STATE, descriptions: `Server "FASTIFY" Running Successfully - host : ${mTempFastify.host} - port : ${mTempFastify.port}` });
                                            CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                                            CliProgress_1.CliProgress.stop();
                                        }
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        yield resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server "FASTIFY" Running Successfully`,
                                            metadata: {
                                                author: Const_1.default.Information.author,
                                                version: Const_1.default.Information.version
                                            }
                                        });
                                    }
                                    else {
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                            CliProgress_1.CliProgress.increment({ state: mTempFastify.state, status: Const_1.default.ERROR_STATE, descriptions: `Check Port Used Started [DKA_SERVER_LISTEN_FAILED] ${error}` }) : null;
                                        yield (0, Delay_1.Delay)((_q = mTempFastify.Constanta) === null || _q === void 0 ? void 0 : _q.DEFAULT_DELAY_PROGRESS);
                                        /** ================= DEBUG CONSOLE ======================= **/
                                        yield rejected({
                                            status: false,
                                            code: 500,
                                            msg: `Server "FASTIFY" Running Failed`,
                                            error: { errorNames: "DKA_SERVER_LISTEN_FAILED", raw: error }
                                        });
                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                            yield process.exit(0);
                                        }), 2000);
                                    }
                                }));
                                //$$$$$$$$$$$ END ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                            }
                            else {
                                /** ================= DEBUG CONSOLE ======================= **/
                                (mTempFastify.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                    logger.error(`Check Port Used Started [DKA_PORT_SERVER_IN_USE]`) : null;
                                /** ================= DEBUG CONSOLE ======================= **/
                                yield rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Server "FASTIFY" Running Failed`,
                                    error: { errorNames: "DKA_PORT_SERVER_IN_USE" }
                                });
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield process.exit(0);
                                }), 2000);
                            }
                        }), (err) => __awaiter(this, void 0, void 0, function* () {
                            yield rejected({
                                status: false,
                                code: 500,
                                msg: `Failed, to Check Port Server`,
                                error: { errorNames: "DKA_PORT_SERVER_FAILED_CHECK", raw: err }
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield process.exit(0);
                            }), 2000);
                        }));
                        //$$$$$$$$$$$ END CHECK PORT USED $$$$$$$$$$$$
                    }))
                        .catch((e) => __awaiter(this, void 0, void 0, function* () {
                        yield rejected(e);
                    }));
                    //$$$$$$$$$$$ END CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                    break;
                case Const_1.default.Server.Engine.SOCKETIO:
                    //## Set Configuration merger
                    mTempSocketIO = yield (0, lodash_1.merge)(Config_1.SocketIOConfigurationDefault, config);
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIO.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.start(43, 0, { state: mTempSocketIO.state, status: Const_1.default.READY_STATE, descriptions: "Prepare Running Program" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_f = mTempSocketIO === null || mTempSocketIO === void 0 ? void 0 : mTempSocketIO.Constanta) === null || _f === void 0 ? void 0 : _f.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempSocketIO.getConfig;
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIO.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempSocketIO.state, status: Const_1.default.READY_STATE, descriptions: "Deleting Temporary Get Config Self" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_g = mTempSocketIO.Constanta) === null || _g === void 0 ? void 0 : _g.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield ((_h = config.getConfig) === null || _h === void 0 ? void 0 : _h.call(config, mTempSocketIO));
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIO.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempSocketIO.state, status: Const_1.default.READY_STATE, descriptions: "Send Setter Configuration Callback" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_j = mTempSocketIO.Constanta) === null || _j === void 0 ? void 0 : _j.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIO.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        logger.info(`Socket IO Engine Selected Started`) : null;
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield (0, Server_1.default)(mTempSocketIO)
                        .then((http) => __awaiter(this, void 0, void 0, function* () {
                        yield http.listen(mTempSocketIO.port, () => __awaiter(this, void 0, void 0, function* () {
                            (mTempSocketIO.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                logger.info(`Server "SOCKET.IO" Running Successfully - port : "${mTempSocketIO.port}"`) : null;
                            yield resolve({
                                status: true,
                                code: 200,
                                msg: `Server "SOCKET.IO" Running Successfully`,
                                metadata: {
                                    author: Const_1.default.Information.author,
                                    version: Const_1.default.Information.version
                                }
                            });
                        }));
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_HTTP_SOCKET_IO_ERROR",
                                raw: error
                            }
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield process.exit(0);
                        }), 2000);
                    }));
                    break;
                case Const_1.default.Server.Engine.REACTJS:
                    //## Set Configuration merger
                    mTempReactJS = yield (0, lodash_1.merge)(Config_1.ReactJSConfigurationDefault, config);
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempReactJS.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.start(43, 0, { state: mTempReactJS.state, status: Const_1.default.READY_STATE, descriptions: "Prepare Running Program" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_k = mTempReactJS === null || mTempReactJS === void 0 ? void 0 : mTempReactJS.Constanta) === null || _k === void 0 ? void 0 : _k.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempReactJS.getConfig;
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempReactJS.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempReactJS.state, status: Const_1.default.READY_STATE, descriptions: "Deleting Temporary Get Config Self" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_l = mTempReactJS.Constanta) === null || _l === void 0 ? void 0 : _l.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield ((_m = config.getConfig) === null || _m === void 0 ? void 0 : _m.call(config, mTempReactJS));
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempReactJS.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempReactJS.state, status: Const_1.default.READY_STATE, descriptions: "Send Setter Configuration Callback" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_o = mTempReactJS.Constanta) === null || _o === void 0 ? void 0 : _o.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    yield (0, REACTJS_1.default)(mTempReactJS)
                        .then((server) => __awaiter(this, void 0, void 0, function* () {
                        /*await server.listen(config.port, config.host, async (error) => {
                            if (!error){
                                /!** ================= DEBUG CONSOLE ======================= **!/
                                (mTempReactJS.state === Options.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                    logger.info(`Finish Prosessing Library`) : null;
                                /!** ================= DEBUG CONSOLE ======================= **!/
                                await resolve({
                                    status: true,
                                    code: 200,
                                    msg: `Server Running Successfully`,
                                    metadata: {
                                        author: Options.Information.author,
                                        version: Options.Information.version
                                    }
                                });
                            }else{
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Server Listenning Failed`,
                                    error: {
                                        errorNames: "DKA_SERVER_REACT_JS_LISTENING_ERROR",
                                        raw : error
                                    }
                                });
                                setTimeout(async () => {
                                    await process.exit(0);
                                }, 2000);
                            }
                        })*/
                        yield server.start()
                            .then(() => __awaiter(this, void 0, void 0, function* () {
                            (mTempReactJS.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                                logger.info(`Server Running Successfully - port : "${mTempReactJS.port}"`) : null;
                            yield resolve({
                                status: true,
                                code: 200,
                                msg: `Server Running Successfully`,
                                metadata: {
                                    author: Const_1.default.Information.author,
                                    version: Const_1.default.Information.version
                                }
                            });
                        }))
                            .catch((error) => __awaiter(this, void 0, void 0, function* () {
                            yield rejected({
                                status: false,
                                code: 500,
                                msg: `Server Listenning Failed`,
                                error: {
                                    errorNames: "DKA_SERVER_REACT_JS_LISTENING_ERROR",
                                    raw: error
                                }
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield process.exit(0);
                            }), 2000);
                        }));
                    }))
                        .catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_REACT_JS_ERROR",
                                raw: error
                            }
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield process.exit(0);
                        }), 2000);
                    }));
                    break;
                default:
                    yield rejected({ status: false, code: 500, msg: `illegal method unknown or not available` });
                    //await process.exit(0)
                    break;
            }
        }));
    });
}
exports.Server = Server;
function Client(config = Config_1.SocketIOClientConfigurationDefault) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            switch (config.engine) {
                case Const_1.default.Server.Engine.SOCKETIOCLIENT:
                    //## Set Configuration merger
                    mTempSocketIOClient = yield (0, lodash_1.merge)(Config_1.SocketIOClientConfigurationDefault, config);
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIOClient.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.start(43, 0, { state: mTempSocketIOClient.state, status: Const_1.default.READY_STATE, descriptions: "Prepare Running Program" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_a = mTempSocketIOClient === null || mTempSocketIOClient === void 0 ? void 0 : mTempSocketIOClient.Constanta) === null || _a === void 0 ? void 0 : _a.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempSocketIOClient.getConfig;
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIOClient.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempSocketIOClient.state, status: Const_1.default.READY_STATE, descriptions: "Deleting Temporary Get Config Self" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_b = mTempSocketIOClient.Constanta) === null || _b === void 0 ? void 0 : _b.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield ((_c = config.getConfig) === null || _c === void 0 ? void 0 : _c.call(config, mTempSocketIOClient));
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIOClient.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: mTempSocketIOClient.state, status: Const_1.default.READY_STATE, descriptions: "Send Setter Configuration Callback" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.Delay)((_d = mTempSocketIOClient.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    /** ================= DEBUG CONSOLE ======================= **/
                    (mTempSocketIOClient.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        logger.info(`Socket IO Client Engine Selected Started`) : null;
                    yield (0, Delay_1.Delay)((_e = mTempSocketIOClient.Constanta) === null || _e === void 0 ? void 0 : _e.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield (0, Client_1.default)(mTempSocketIOClient)
                        .then((io) => __awaiter(this, void 0, void 0, function* () {
                        (mTempSocketIOClient.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            logger.info(`Server "SOCKET.IO Client" Running Successfully - port : "${mTempSocketIOClient.port}"`) : null;
                        yield resolve({
                            status: true,
                            code: 200,
                            msg: `Server "SOCKET.IO-CLIENT" Running Successfully`,
                            metadata: {
                                author: Const_1.default.Information.author,
                                version: Const_1.default.Information.version
                            }
                        });
                    }))
                        .catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield rejected({
                            status: false,
                            code: 500,
                            msg: `Server Running Failed`,
                            error: {
                                errorNames: "DKA_SERVER_HTTP_SOCKET_IO_CLIENT_ERROR",
                                raw: error
                            }
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield process.exit(0);
                        }), 2000);
                    }));
                    break;
                default:
                    yield rejected({ status: false, code: 500, msg: `illegal method unknown or not available` });
                    //await process.exit(0)
                    break;
            }
        }));
    });
}
exports.Client = Client;
exports.default = Server;
