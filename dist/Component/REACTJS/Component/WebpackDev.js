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
exports.WebpackDev = void 0;
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const lodash_1 = require("lodash");
function WebpackDev(config, WebpackCompiler) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let mWebpackCompilerOptions = {
                host: config.host,
                port: config.port,
                historyApiFallback: (_b = (_a = config.options) === null || _a === void 0 ? void 0 : _a.WebpackDev) === null || _b === void 0 ? void 0 : _b.historyApiFallback
            };
            /*** Mergering Options Compiler Options WebPack Dev Server */
            let mWebpackDevDefaultCompilerOptions = (0, lodash_1.merge)(mWebpackCompilerOptions, (_c = config.options) === null || _c === void 0 ? void 0 : _c.WebpackDev);
            let mWebpackDev = new webpack_dev_server_1.default(mWebpackDevDefaultCompilerOptions, WebpackCompiler);
            /** Return Variable Data Webpack Development **/
            yield resolve(mWebpackDev);
        }));
    });
}
exports.WebpackDev = WebpackDev;
