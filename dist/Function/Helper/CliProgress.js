"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliProgress = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
exports.CliProgress = new cli_progress_1.default.Bar({
    format: '{state} - [DKA_FRAMEWORK] ' + ansi_colors_1.default.blue('{bar}') + ' [{status}] - {descriptions} | {percentage}% || {value} Chunks',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});
