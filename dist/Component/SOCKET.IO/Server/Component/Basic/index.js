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
exports.Oauth2 = void 0;
const Const_1 = __importDefault(require("../../../../../Const"));
const logger_1 = __importDefault(require("../../../../../Function/Helper/logger"));
const lodash_1 = require("lodash");
let logger = logger_1.default.logger;
function checkHeaders(headers, key) {
    return undefined === headers[key] && (0, lodash_1.isEmpty)(headers[key]);
}
const Oauth2 = (config, headers, mAuth, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (checkHeaders(headers, "authorization")) {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "authorization" not exist or Empty [DKA_AUTH_FIELD_AUTHORIZATION_REQUIRE_OR_EMPTY]`) : null;
        yield next(new Error("Field Header `authorization` not exist"));
    }
    else {
        if ((_a = headers === null || headers === void 0 ? void 0 : headers["authorization"]) === null || _a === void 0 ? void 0 : _a.toString().includes("Basic")) {
            let mAuthorizationField = (_b = headers === null || headers === void 0 ? void 0 : headers["authorization"]) === null || _b === void 0 ? void 0 : _b.toString();
            let arrayData = mAuthorizationField.split(" ");
            if (arrayData.length > 1 && arrayData.length < 3) {
                (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.info(`Field Header "authorization" PASS and NOT EMPTY [DKA_AUTH_FIELD_AUTORIZATION_PASS]`) : null;
                yield mAuth.callback({
                    token: arrayData === null || arrayData === void 0 ? void 0 : arrayData[1].toString()
                }, next);
            }
            else {
                (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                    logger.error(`Field Header "authorization" illegal format [DKA_AUTH_FIELD_AUTORIZATION_ILLEGAL_FIELD]`) : null;
                yield next(new Error("Field Header 'authorization' illegal format"));
            }
        }
        else {
            (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
                logger.error(`Field Header "authorization" enough "Basic" or Empty [DKA_AUTH_FIELD_AUTHORIZATION_REQUIRE_OR_BASIC_VARIABLE]`) : null;
            yield next(new Error("Field Header `authorization` enough 'Basic' "));
        }
    }
});
exports.Oauth2 = Oauth2;
exports.default = exports.Oauth2;
