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
exports.middleware = void 0;
const Const_1 = __importDefault(require("../../../Const"));
const logger_1 = __importDefault(require("../../../Function/Helper/logger"));
const Oauth2_1 = __importDefault(require("./Component/Oauth2"));
const Basic_1 = __importDefault(require("./Component/Basic"));
let logger = logger_1.default.logger;
const middleware = (config) => __awaiter(void 0, void 0, void 0, function* () {
    return (io, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        /** ================= DEBUG CONSOLE ======================= **/
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Socket.IO use Middleware Decorator`) : null;
        /** ================= DEBUG CONSOLE ======================= **/
        let mAuth = (_c = (_b = (_a = config.options) === null || _a === void 0 ? void 0 : _a.socket) === null || _b === void 0 ? void 0 : _b.security) === null || _c === void 0 ? void 0 : _c.authorization;
        let headers = io.request.headers;
        /** ================= DEBUG CONSOLE ======================= **/
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`checked auth settings Middleware`) : null;
        /** ================= DEBUG CONSOLE ======================= **/
        if ((mAuth === null || mAuth === void 0 ? void 0 : mAuth.enabled) !== undefined && mAuth.enabled) {
            (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                logger.info(`Authorization Security Authorization is Enabled`) : null;
            switch (mAuth === null || mAuth === void 0 ? void 0 : mAuth.mode) {
                case "OAUTH2":
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        logger.info(`Oauth2 type Authorization Selected`) : null;
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield (0, Oauth2_1.default)(config, headers, mAuth, next);
                    //await next();
                    break;
                case "BASIC":
                    /** ================= DEBUG CONSOLE ======================= **/
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        logger.info(`Basic type Authorization Selected`) : null;
                    /** ================= DEBUG CONSOLE ======================= **/
                    yield (0, Basic_1.default)(config, headers, mAuth, next);
                    break;
                default:
                    (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                        logger.error(`Authorization is Enabled. Mode Unknown and Illegal [DKA_AUTH_ENABLED_ILLEGAL_MODE]`) : null;
                    yield next(new Error("Authorization is Enabled. Mode Unknown and Illegal"));
                    break;
            }
        }
        else {
            (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                logger.info(`Authorization Security Authorization is Disabled`) : null;
            yield next();
        }
    });
});
exports.middleware = middleware;
exports.default = exports.middleware;
