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
exports.Plugins = exports.ServerNgrokTunnelingInstance = exports.ServerStaticInstance = exports.ServerViewInstance = void 0;
const Const_1 = __importDefault(require("../../../Const"));
const logger_1 = __importDefault(require("../../../Function/Helper/logger"));
const CliProgress_1 = require("../../../Function/Helper/CliProgress");
const Delay_1 = __importDefault(require("../../../Function/Helper/Delay"));
let logger = logger_1.default.logger;
function checkModuleExist(name) {
    try {
        require.resolve(name);
        return true;
    }
    catch (e) {
        return false;
    }
}
function ServerViewInstance(config, app) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = config.plugins) === null || _a === void 0 ? void 0 : _a.pointOfView) !== undefined) {
                if ((_c = (_b = config.plugins) === null || _b === void 0 ? void 0 : _b.pointOfView) === null || _c === void 0 ? void 0 : _c.enabled) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin point of view enabled. check resolution modules exists" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.default)((_d = config.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (checkModuleExist("@fastify/view")) {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin point of view module exist. start registering plugins" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_e = config.Constanta) === null || _e === void 0 ? void 0 : _e.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        if (config.plugins.pointOfView.settings !== undefined) {
                            yield app.register(require("@fastify/view"), config.plugins.pointOfView.settings);
                            yield resolve(app);
                        }
                        else {
                            yield rejected({ status: false, code: 500, msg: `point of view is Enabled, but plugins.pointOfView.settings. not declare` });
                        }
                    }
                    else {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin point of view enabled. but module `@fastify/view` not found. skipped" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_f = config.Constanta) === null || _f === void 0 ? void 0 : _f.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        rejected({ status: false, code: 500, msg: `plugin point of view enabled. but module not found. skipped` });
                    }
                }
                else {
                    yield resolve(app);
                }
            }
            else {
                yield resolve(app);
            }
        }));
    });
}
exports.ServerViewInstance = ServerViewInstance;
function ServerStaticInstance(config, app) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = config.plugins) === null || _a === void 0 ? void 0 : _a.static) !== undefined) {
                if ((_c = (_b = config.plugins) === null || _b === void 0 ? void 0 : _b.static) === null || _c === void 0 ? void 0 : _c.enabled) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin static enabled. check resolution modules exists" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.default)((_d = config.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (checkModuleExist("@fastify/static")) {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "static module exist. start registering plugins" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_e = config.Constanta) === null || _e === void 0 ? void 0 : _e.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        if (config.plugins.static.settings) {
                            yield app.register(require("@fastify/static"), config.plugins.static.settings);
                            yield resolve(app);
                        }
                        else {
                            yield rejected({ status: false, code: 500, msg: `static is Enabled, but plugins.static.settings. not declare` });
                        }
                    }
                    else {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin point of view enabled. but module not found. skipped" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_f = config.Constanta) === null || _f === void 0 ? void 0 : _f.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        rejected({ status: false, code: 500, msg: `plugin point of view enabled. but module not found. skipped` });
                    }
                }
                else {
                    yield resolve(app);
                }
            }
            else {
                yield resolve(app);
            }
        }));
    });
}
exports.ServerStaticInstance = ServerStaticInstance;
function ServerNgrokTunnelingInstance(config, app) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = config.plugins) === null || _a === void 0 ? void 0 : _a.ngrok) !== undefined) {
                if ((_c = (_b = config.plugins) === null || _b === void 0 ? void 0 : _b.ngrok) === null || _c === void 0 ? void 0 : _c.enabled) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin ngrok enabled. check resolution modules exists" }) : null;
                    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                    yield (0, Delay_1.default)((_d = config.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (checkModuleExist("ngrok")) {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "ngrok module exist. start registering plugins" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_e = config.Constanta) === null || _e === void 0 ? void 0 : _e.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        if (config.plugins.ngrok.settings) {
                            const ngrok = require("ngrok");
                            yield ngrok.authtoken(config.plugins.ngrok.settings.authToken)
                                .then(() => __awaiter(this, void 0, void 0, function* () {
                                var _g, _h, _j;
                                yield ngrok.connect({
                                    proto: (_j = (_h = (_g = config.plugins) === null || _g === void 0 ? void 0 : _g.ngrok) === null || _h === void 0 ? void 0 : _h.settings) === null || _j === void 0 ? void 0 : _j.proto,
                                    addr: config.port
                                }).then(() => __awaiter(this, void 0, void 0, function* () {
                                    var _k, _l, _m;
                                    let api = ngrok.getApi();
                                    switch ((_m = (_l = (_k = config.plugins) === null || _k === void 0 ? void 0 : _k.ngrok) === null || _l === void 0 ? void 0 : _l.settings) === null || _m === void 0 ? void 0 : _m.proto) {
                                        case "http":
                                            yield (api === null || api === void 0 ? void 0 : api.listTunnels().then((result) => __awaiter(this, void 0, void 0, function* () {
                                                console.log([result.tunnels[0].public_url, result.tunnels[1].public_url]);
                                            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                                                yield rejected({ status: false, code: 500, msg: `ngrok list Tunnels Error`, error: error });
                                            })));
                                            yield resolve(app);
                                            break;
                                        case "tcp":
                                            yield (api === null || api === void 0 ? void 0 : api.listTunnels().then((result) => __awaiter(this, void 0, void 0, function* () {
                                                console.log([result.tunnels[0].public_url]);
                                            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                                                yield rejected({ status: false, code: 500, msg: `ngrok list Tunnels Error`, error: error });
                                            })));
                                            yield resolve(app);
                                            break;
                                        default:
                                            yield rejected({ status: false, code: 500, msg: `ngrok unknown proto method` });
                                    }
                                })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                                    yield rejected({ status: false, code: 500, msg: `ngrok error connect`, error: error });
                                }));
                            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                                yield rejected({ status: false, code: 500, msg: `ngrok error auth token`, error: error });
                            }));
                        }
                        else {
                            yield rejected({ status: false, code: 500, msg: `ngrok is Enabled, but plugins.ngrok.settings. not declare` });
                        }
                    }
                    else {
                        /** ================= DEBUG CONSOLE ======================= **/
                        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                            CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "plugin ngrok enabled. but module not found. skipped" }) : null;
                        yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                        yield (0, Delay_1.default)((_f = config.Constanta) === null || _f === void 0 ? void 0 : _f.DEFAULT_DELAY_PROGRESS);
                        /** ================= DEBUG CONSOLE ======================= **/
                        yield rejected({ status: false, code: 500, msg: `plugin ngrok enabled. but module not found. skipped` });
                    }
                }
                else {
                    yield resolve(app);
                }
            }
            else {
                yield resolve(app);
            }
        }));
    });
}
exports.ServerNgrokTunnelingInstance = ServerNgrokTunnelingInstance;
function Plugins(config, app) {
    return __awaiter(this, void 0, void 0, function* () {
        let mApp = app;
        yield Promise.all([
            yield ServerViewInstance(config, app),
            yield ServerStaticInstance(config, app),
            yield ServerNgrokTunnelingInstance(config, app)
        ]).then(() => __awaiter(this, void 0, void 0, function* () {
            mApp = app;
        })).catch((error) => __awaiter(this, void 0, void 0, function* () {
            yield Promise.reject(error);
        }));
        return mApp;
    });
}
exports.Plugins = Plugins;
