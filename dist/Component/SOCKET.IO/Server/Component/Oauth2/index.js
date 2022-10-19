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
    var _a, _b, _c;
    if (checkHeaders(headers, "secret_id")) {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "secret_id" not exist or Empty [DKA_AUTH_FIELD_SECRET_KEY_REQUIRE_OR_EMPTY]`) : null;
        yield next(new Error("Field Header `secret_id` not exist"));
    }
    else {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "secret_id" PASS and NOT EMPTY [DKA_AUTH_FIELD_SECRET_ID_PASS]`) : null;
    }
    if (checkHeaders(headers, "secret_key")) {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "secret_key" not exist or Empty [DKA_AUTH_FIELD_SECRET_KEY_REQUIRE_OR_EMPTY]`) : null;
        yield next(new Error("Field Header `secret_key` not exist"));
    }
    else {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "secret_key" PASS and NOT EMPTY [DKA_AUTH_FIELD_SECRET_KEY_PASS]`) : null;
    }
    if (checkHeaders(headers, "redirect_uri")) {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.error(`Field Header "redirect_uri" not exist or Empty [DKA_AUTH_FIELD_REDIRECT_URI_REQUIRE_OR_EMPTY]`) : null;
        yield next(new Error("Field Header `redirect_uri` not exist"));
    }
    else {
        (config.state === Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT) ?
            logger.info(`Field Header "redirect_uri" PASS and NOT EMPTY [DKA_AUTH_FIELD_REDIRECT_URI_PASS]`) : null;
    }
    yield mAuth.callback({
        secret_id: (_a = headers === null || headers === void 0 ? void 0 : headers["secret_id"]) === null || _a === void 0 ? void 0 : _a.toString(),
        secret_key: (_b = headers === null || headers === void 0 ? void 0 : headers["secret_key"]) === null || _b === void 0 ? void 0 : _b.toString(),
        redirect_uri: (_c = headers === null || headers === void 0 ? void 0 : headers["redirect_uri"]) === null || _c === void 0 ? void 0 : _c.toString()
    }, next);
});
exports.Oauth2 = Oauth2;
exports.default = exports.Oauth2;
