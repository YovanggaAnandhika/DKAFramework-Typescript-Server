import {ConfigState, ConfigEngine, ConfigHost, ConfigPort} from "../../Interfaces/Config";

export const State : ConfigState = {
    SERVER_STATE_DEVELOPMENT : "development",
    SERVER_STATE_PRODUCTION : "production"
}

export const Engine : ConfigEngine = {
    FASTIFY : "FASTIFY",
    HTTP : "HTTP",
    UDP : "UDP",
    SOCKETIO : "SOCKET.IO",
    REACTJS : "REACTJS",
    EXPRESSSJS : "EXPRESSJS"
}
export const Host : ConfigHost = {
    LOCALHOST : "127.0.0.1",
    WILDCARD : "0.0.0.0"
}

export const Port : ConfigPort = {
    DEFAULT : 3339
}

const Server = {
    State : State,
    Engine : Engine,
    Host : Host,
    Port : Port,

}

export default Server;