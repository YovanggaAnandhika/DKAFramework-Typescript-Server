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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressJSConfigurationDefault = exports.ReactJSConfigurationDefault = exports.SocketIOClientConfigurationDefault = exports.SocketIOConfigurationDefault = exports.FastifyConfigurationDefault = void 0;
const Const_1 = __importDefault(require("../Const"));
const path_1 = __importDefault(require("path"));
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
 * @typedef { Config.Config }
 */
exports.FastifyConfigurationDefault = {
    state: Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const_1.default.Server.Engine.FASTIFY,
    host: Const_1.default.Server.Host.LOCALHOST,
    port: Const_1.default.Server.Port.DEFAULT,
    app: (app, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
        next();
    }),
    settings: {
        logger: false
    },
    plugins: {
        pointOfView: {
            enabled: false,
            settings: {
                engine: {
                    ejs: (checkModuleExist("ejs")) ? require("ejs") : null
                },
                root: path_1.default.join((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename, "./../Layout"),
                /*viewExt: 'html'*/
                includeViewExtension: true
            }
        },
        static: {
            enabled: false,
        }
    },
    Constanta: {
        DEFAULT_DELAY_PROGRESS: 0
    }
};
exports.SocketIOConfigurationDefault = {
    state: Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const_1.default.Server.Engine.SOCKETIO.Server,
    options: {
        socket: {
            costumMiddleware: undefined
        }
    },
    port: Const_1.default.Server.Port.DEFAULT
};
exports.SocketIOClientConfigurationDefault = {
    state: Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const_1.default.Server.Engine.SOCKETIO.Client,
    host: "127.0.0.1",
    port: 80,
    settings: {
        reconnectionDelay: 1000
    }
};
exports.ReactJSConfigurationDefault = {
    state: Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const_1.default.Server.Engine.REACTJS,
    host: Const_1.default.Server.Host.LOCALHOST,
    port: Const_1.default.Server.Port.DEFAULT,
    plugins: {
        HtmlWebpackPlugin: {
            enabled: true,
            options: {
                inject: false
            }
        }
    },
    settings: {
        buildOutputFile: {
            enabled: false
        }
    },
    options: {
        Webpack: {
            configuration: {
                output: {
                    publicPath: "/",
                    filename: "DKAFramework.js"
                }
            }
        },
        WebpackDev: {
            open: false,
            hot: true,
            historyApiFallback: true
        }
    }
};
exports.ExpressJSConfigurationDefault = {
    state: Const_1.default.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const_1.default.Server.Engine.EXPRESSSJS,
    host: Const_1.default.Server.Host.LOCALHOST,
    port: Const_1.default.Server.Port.DEFAULT,
};
