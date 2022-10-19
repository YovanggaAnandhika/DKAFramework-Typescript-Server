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
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTJS = void 0;
const lodash_1 = require("lodash");
const Plugins_1 = require("./Middleware/Plugins");
const Rules_1 = require("./Middleware/Rules");
const Entry_1 = require("./Middleware/Entry");
const Webpack_1 = require("./Component/Webpack");
const WebpackDev_1 = require("./Component/WebpackDev");
const REACTJS = (config) => __awaiter(void 0, void 0, void 0, function* () {
    function checkModuleExist(name) {
        try {
            require.resolve(name);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @return Promise<webpackDev>
     */
    return new Promise((resolve, rejected) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, Entry_1.Entry)(config)
            .then((entry) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, Plugins_1.Plugins)(config)
                .then((plugins) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, Rules_1.Rules)(config)
                    .then((rules) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b;
                    let defaultConfigurationWebpack = {
                        mode: config.state,
                        entry: entry,
                        plugins: plugins,
                        infrastructureLogging: {
                            level: "error"
                        },
                        performance: {
                            hints: false
                        },
                        optimization: {
                            splitChunks: {
                                minSize: 10000,
                                maxSize: 250000,
                            }
                        },
                        stats: "errors-only",
                        output: {
                            publicPath: "/",
                            filename: 'DKAFramework.js'
                        },
                        module: {
                            rules: rules
                        },
                        resolve: {
                            extensions: ['.tsx', '.ts', '.js', '.jsx'],
                        }
                    };
                    /*if (config.settings?.buildOutputFile?.enabled === true) {
                        defaultConfigurationWebpack.output.path = config.settings.buildOutputFile.path
                    }*/
                    let configurationWebpackMergered = (0, lodash_1.merge)(defaultConfigurationWebpack, (_b = (_a = config === null || config === void 0 ? void 0 : config.options) === null || _a === void 0 ? void 0 : _a.Webpack) === null || _b === void 0 ? void 0 : _b.configuration);
                    /** Init Webpack Compiler **/
                    (0, Webpack_1.Webpack)(configurationWebpackMergered)
                        .then((compiler) => __awaiter(void 0, void 0, void 0, function* () {
                        /** Init Webpack Dev Server **/
                        yield (0, WebpackDev_1.WebpackDev)(config, compiler)
                            .then((server) => __awaiter(void 0, void 0, void 0, function* () {
                            yield resolve(server);
                        }))
                            .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                            rejected(error);
                        }));
                    }))
                        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                        rejected(error);
                    }));
                }))
                    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                    rejected(error);
                }));
            }))
                .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
                rejected(error);
            }));
        }))
            .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            rejected(error);
        }));
    }));
});
exports.REACTJS = REACTJS;
exports.default = exports.REACTJS;
