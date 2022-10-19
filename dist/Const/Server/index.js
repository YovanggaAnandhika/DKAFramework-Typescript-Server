"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Port = exports.Host = exports.Engine = exports.State = void 0;
exports.State = {
    SERVER_STATE_DEVELOPMENT: "development",
    SERVER_STATE_PRODUCTION: "production"
};
exports.Engine = {
    FASTIFY: "FASTIFY",
    HTTP: "HTTP",
    UDP: "UDP",
    SOCKETIO: "SOCKET.IO",
    SOCKETIOCLIENT: "SOCKET.IO-CLIENT",
    REACTJS: "REACTJS",
    EXPRESSSJS: "EXPRESSJS"
};
exports.Host = {
    LOCALHOST: "127.0.0.1",
    WILDCARD: "0.0.0.0"
};
exports.Port = {
    DEFAULT: 80
};
const Server = {
    State: exports.State,
    Engine: exports.Engine,
    Host: exports.Host,
    Port: exports.Port,
};
exports.default = Server;
