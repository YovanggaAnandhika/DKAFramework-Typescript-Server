import { EngineFastify, EngineReactJS, EngineSocketIO, EngineSocketIOClient } from "../Type/types";
export interface ConfigState {
    SERVER_STATE_DEVELOPMENT: "development";
    SERVER_STATE_PRODUCTION: "production";
}
export interface ConfigEngine {
    FASTIFY: EngineFastify;
    EXPRESSSJS: "EXPRESSJS";
    SOCKETIO: EngineSocketIO;
    SOCKETIOCLIENT: EngineSocketIOClient;
    REACTJS: EngineReactJS;
    HTTP: "HTTP";
    UDP: "UDP";
}
export interface ConfigHost {
    LOCALHOST: "127.0.0.1";
    WILDCARD: "0.0.0.0";
}
export interface ConfigPort {
    DEFAULT: 80;
}
export interface ConfigSystemMultiTypes {
    DEFAULT_DELAY_PROGRESS?: number;
    BASE_PATH?: string;
}
export interface MultiplePluginsServerNgrokSettings {
    authToken: string | undefined;
    proto: "tcp" | "http" | "tls";
}
export interface MultiplePluginsServerNgrok {
    enabled?: boolean | undefined;
    settings?: MultiplePluginsServerNgrokSettings;
}
export interface MultiplePluginsServer {
    ngrok?: MultiplePluginsServerNgrok;
}
//# sourceMappingURL=Global.d.ts.map