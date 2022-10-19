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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Options = void 0;
const Server = __importStar(require("./Server"));
exports.Server = Server;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const path_1 = __importDefault(require("path"));
const mInformation = {
    author: require(path_1.default.join(__dirname, "./../../package.json")).author,
    version: require(path_1.default.join(__dirname, "./../../package.json")).version
};
exports.Options = {
    Server: Server,
    Information: mInformation,
    DELAY_DEFAULT: 0,
    READY_STATE: `${ansi_colors_1.default.blue('Ready')}`,
    LOADING_STATE: `${ansi_colors_1.default.blue('Loading')}`,
    LOADED_STATE: `${ansi_colors_1.default.green('Loaded')}`,
    COMPLETE_STATE: `${ansi_colors_1.default.green('Complete')}`,
    START_STATE: `${ansi_colors_1.default.green('Start')}`,
    STOP_STATE: `${ansi_colors_1.default.red('Stop')}`,
    ERROR_STATE: `${ansi_colors_1.default.red('Error')}`,
    WARNING_STATE: `${ansi_colors_1.default.bgYellow('Warning')}`,
};
exports.default = exports.Options;
