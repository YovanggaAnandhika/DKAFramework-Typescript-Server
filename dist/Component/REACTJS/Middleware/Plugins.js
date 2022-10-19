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
exports.Plugins = void 0;
const lodash_1 = require("lodash");
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const path_1 = __importDefault(require("path"));
function Plugins(config) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, rejected) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let pluginsModules = [];
            if ((_b = (_a = config.plugins) === null || _a === void 0 ? void 0 : _a.HtmlWebpackPlugin) === null || _b === void 0 ? void 0 : _b.enabled) {
                let defaultOptionsHTMLWebpackPlugin = {
                    template: path_1.default.join(__dirname, "./../Template/index.html"),
                };
                let mergeConfigOptionsHTMLWebpackPlugin = (0, lodash_1.merge)(defaultOptionsHTMLWebpackPlugin, config.plugins.HtmlWebpackPlugin.options);
                pluginsModules.push(new html_webpack_plugin_1.default(mergeConfigOptionsHTMLWebpackPlugin));
            }
            yield ((_d = (_c = config.plugins) === null || _c === void 0 ? void 0 : _c.costumPlugins) === null || _d === void 0 ? void 0 : _d.forEach(function (value) {
                pluginsModules.push(value);
            }));
            let defaultPluginsWebpack = (0, lodash_1.merge)(pluginsModules, config.plugins);
            resolve(defaultPluginsWebpack);
        }));
    });
}
exports.Plugins = Plugins;
