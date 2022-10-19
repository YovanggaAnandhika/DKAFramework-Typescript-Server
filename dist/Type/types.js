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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactJS = exports.isSocketIO = exports.isFastify = void 0;
__exportStar(require("fastify"), exports);
function isFastify(obj) {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'FASTIFY';
}
exports.isFastify = isFastify;
function isSocketIO(obj) {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'SOCKET.IO';
}
exports.isSocketIO = isSocketIO;
function isReactJS(obj) {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'REACTJS';
}
exports.isReactJS = isReactJS;
