"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const Delay = function (delay) {
    return new Promise(function (fulfill) {
        if (delay !== undefined) {
            setTimeout(fulfill, delay);
        }
        else {
            setTimeout(fulfill, 0);
        }
    });
};
exports.Delay = Delay;
exports.default = exports.Delay;
