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
const fastify_1 = __importDefault(require("fastify"));
const Const_1 = __importDefault(require("../../Const"));
const logger_1 = __importDefault(require("../../Function/Helper/logger"));
const Plugins_1 = require("./Plugins");
const CliProgress_1 = require("../../Function/Helper/CliProgress");
const Delay_1 = __importDefault(require("../../Function/Helper/Delay"));
let logger = logger_1.default.logger;
/**
 *
 * @param { ConfigFastify } config
 * @param { FastifyInstances } config.app
 * @constructor
 * @return Promise<FastifyInstance>
 */
const FASTIFY = (config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    /** ================= DEBUG CONSOLE ======================= **/
    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
        CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "adding fastify engine instances & apply settings" }) : null;
    yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
    yield (0, Delay_1.default)((_a = config.Constanta) === null || _a === void 0 ? void 0 : _a.DEFAULT_DELAY_PROGRESS);
    /** ================= DEBUG CONSOLE ======================= **/
    let mFastify = yield (0, fastify_1.default)(config.settings);
    /*let mApp = */
    let mPluginsApp = (config.plugins !== undefined) ? yield (0, Plugins_1.Plugins)(config, mFastify) : mFastify;
    let mApp = (((_b = config.settings) === null || _b === void 0 ? void 0 : _b.registerModule) !== undefined) ? yield config.settings.registerModule(mFastify) : mPluginsApp;
    return new Promise((resolve, rejected) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            if (config.app !== undefined) {
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "fastify registering pointing app settings" }) : null;
                yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                yield (0, Delay_1.default)((_c = config.Constanta) === null || _c === void 0 ? void 0 : _c.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                yield mApp.register(config.app);
                /** ================= DEBUG CONSOLE ======================= **/
                (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    CliProgress_1.CliProgress.increment({ state: config.state, status: Const_1.default.READY_STATE, descriptions: "fastify registering pointing app finished" }) : null;
                yield CliProgress_1.CliProgress.setTotal(CliProgress_1.CliProgress.getTotal());
                yield (0, Delay_1.default)((_d = config.Constanta) === null || _d === void 0 ? void 0 : _d.DEFAULT_DELAY_PROGRESS);
                /** ================= DEBUG CONSOLE ======================= **/
                yield resolve(mApp);
            }
            else {
                rejected({ status: false, code: 500, msg: `app must Declaration For Routes` });
            }
        }
        catch (e) {
            yield rejected(e);
        }
    }));
});
exports.default = FASTIFY;
